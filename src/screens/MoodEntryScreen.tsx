import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Vibration,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMood } from '../contexts/MoodContext';
import { Colors, Spacing, BorderRadius, GlassMorphism } from '../constants/theme';
import { Icon } from '../components/Icon';
import { MediaPicker } from '../components/MediaPicker';
import { VoiceRecorder } from '../components/VoiceRecorder';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface MoodOption {
  emoji: string;
  label: string;
  value: number;
}

const MOOD_OPTIONS: MoodOption[] = [
  { emoji: '😭', label: 'Devastated', value: 1 },
  { emoji: '😢', label: 'Very Sad', value: 2 },
  { emoji: '😞', label: 'Sad', value: 3 },
  { emoji: '😟', label: 'Down', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 5 },
  { emoji: '🙂', label: 'Good', value: 6 },
  { emoji: '😊', label: 'Happy', value: 7 },
  { emoji: '😍', label: 'Great', value: 8 },
  { emoji: '🤩', label: 'Amazing', value: 9 },
  { emoji: '😇', label: 'Euphoric', value: 10 },
];

export function MoodEntryScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { createMoodEntry } = useMood();
  
  const [selectedMood, setSelectedMood] = useState<number>(5);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [voiceRecording, setVoiceRecording] = useState<string | null>(null);
  
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate modal in
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 120,
      mass: 1,
    });
    backdropOpacity.value = withTiming(1, { duration: 400 });
  }, []);

  const closeModal = () => {
    'worklet';
    translateY.value = withSpring(SCREEN_HEIGHT, {
      damping: 20,
      stiffness: 150,
    });
    backdropOpacity.value = withTiming(0, { duration: 300 });
    
    runOnJS(() => {
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          // If can't go back, navigate to home
          navigation.navigate('MainTabs' as never, { screen: 'Home' } as never);
        }
      }, 300);
    })();
  };

  const handleSave = async () => {
    setLoading(true);
    Vibration.vibrate(10);
    
    try {
      await createMoodEntry(
        selectedMood, 
        note.trim() || undefined,
        selectedImage || undefined,
        voiceRecording || undefined
      );
      closeModal();
    } catch (error) {
      Alert.alert('Error', 'Failed to save mood entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = (mood: MoodOption) => {
    Vibration.vibrate(10);
    setSelectedMood(mood.value);
  };

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Backdrop with blur */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View style={[styles.backdrop, backdropStyle]}>
            {Platform.OS === 'ios' ? (
              <BlurView 
                intensity={GlassMorphism.blur.max} 
                tint={GlassMorphism.tint.dark} 
                style={StyleSheet.absoluteFill} 
              />
            ) : (
              <View style={styles.androidBackdrop} />
            )}
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Modal content */}
        <Animated.View style={[styles.modalContainer, modalStyle]}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={[styles.modal, { paddingBottom: insets.bottom + 20 }]}>
              {/* Handle bar */}
              <View style={styles.handleBar} />

              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={closeModal} style={styles.headerButton}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Track Your Mood</Text>
                <TouchableOpacity 
                  onPress={handleSave} 
                  disabled={loading}
                  style={styles.headerButton}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    <Text style={styles.doneButton}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>

              <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Question */}
                <Text style={styles.question}>How are you feeling?</Text>

                {/* Selected mood display */}
                <View style={styles.selectedMoodContainer}>
                  <Text style={styles.selectedEmoji}>
                    {MOOD_OPTIONS.find(m => m.value === selectedMood)?.emoji}
                  </Text>
                  <Text style={styles.selectedLabel}>
                    {MOOD_OPTIONS.find(m => m.value === selectedMood)?.label}
                  </Text>
                </View>

                {/* Mood grid */}
                <View style={styles.moodGrid}>
                  {MOOD_OPTIONS.map((mood) => (
                    <TouchableOpacity
                      key={mood.value}
                      style={[
                        styles.moodOption,
                        selectedMood === mood.value && styles.moodOptionSelected,
                      ]}
                      onPress={() => handleMoodSelect(mood)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                      <Text style={[
                        styles.moodLabel,
                        selectedMood === mood.value && styles.moodLabelSelected,
                      ]}>
                        {mood.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Note section */}
                <View style={styles.noteSection}>
                  <Text style={styles.noteLabel}>Add a note (optional)</Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={styles.textInput}
                      value={note}
                      onChangeText={setNote}
                      placeholder="What's on your mind?"
                      placeholderTextColor={Colors.placeholderText}
                      multiline
                      maxLength={500}
                      textAlignVertical="top"
                    />
                    <Text style={styles.charCount}>{note.length}/500</Text>
                  </View>
                </View>

                {/* Media attachments */}
                {(selectedImage || voiceRecording) && (
                  <View style={styles.attachments}>
                    <Text style={styles.attachmentsTitle}>Attachments</Text>
                    {selectedImage && (
                      <View style={styles.attachmentItem}>
                        <Icon name="images" size={16} color={Colors.primary} />
                        <Text style={styles.attachmentText}>Photo added</Text>
                      </View>
                    )}
                    {voiceRecording && (
                      <View style={styles.attachmentItem}>
                        <Icon name="mic" size={16} color={Colors.primary} />
                        <Text style={styles.attachmentText}>Voice note added</Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Quick options */}
                <View style={styles.quickOptions}>
                  <TouchableOpacity 
                    style={styles.quickOption} 
                    onPress={() => {
                      Vibration.vibrate(10);
                      setShowMediaPicker(!showMediaPicker);
                      setShowVoiceRecorder(false);
                    }}
                  >
                    <View style={[styles.quickOptionIcon, showMediaPicker && styles.quickOptionActive]}>
                      <Icon name="camera" size={20} color={showMediaPicker ? Colors.primary : Colors.secondaryLabel} />
                    </View>
                    <Text style={[styles.quickOptionText, showMediaPicker && styles.quickOptionTextActive]}>Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.quickOption} 
                    onPress={() => {
                      Vibration.vibrate(10);
                      setShowVoiceRecorder(!showVoiceRecorder);
                      setShowMediaPicker(false);
                    }}
                  >
                    <View style={[styles.quickOptionIcon, showVoiceRecorder && styles.quickOptionActive]}>
                      <Icon name="mic" size={20} color={showVoiceRecorder ? Colors.primary : Colors.secondaryLabel} />
                    </View>
                    <Text style={[styles.quickOptionText, showVoiceRecorder && styles.quickOptionTextActive]}>Voice</Text>
                  </TouchableOpacity>
                </View>

                {/* Media picker */}
                {showMediaPicker && (
                  <MediaPicker
                    onImageSelected={(uri) => {
                      setSelectedImage(uri || null);
                      if (!uri) setShowMediaPicker(false);
                    }}
                    currentImage={selectedImage}
                  />
                )}

                {/* Voice recorder */}
                {showVoiceRecorder && (
                  <VoiceRecorder
                    onRecordingComplete={(uri) => {
                      setVoiceRecording(uri);
                    }}
                    onDelete={() => {
                      setVoiceRecording(null);
                      setShowVoiceRecorder(false);
                    }}
                    currentRecording={voiceRecording}
                  />
                )}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  androidBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  keyboardView: {
    flex: 1,
  },
  modal: {
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.98)' : '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: SCREEN_HEIGHT * 0.9,
    ...GlassMorphism.shadow.glass,
    // iOS glass effect
    ...(Platform.OS === 'ios' && {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: GlassMorphism.borderColor.subtle,
    }),
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.2)' : Colors.systemGray4,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.separator,
  },
  headerButton: {
    padding: Spacing.sm,
    minWidth: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.label,
  },
  cancelButton: {
    fontSize: 17,
    color: Colors.secondaryLabel,
  },
  doneButton: {
    fontSize: 17,
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    padding: Spacing.xl,
  },
  question: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.label,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  selectedMoodContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  selectedEmoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  selectedLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.label,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
  },
  moodOption: {
    width: '18%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.large,
    backgroundColor: Colors.systemGray6,
  },
  moodOptionSelected: {
    backgroundColor: Colors.primary + '20',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.secondaryLabel,
    textAlign: 'center',
  },
  moodLabelSelected: {
    color: Colors.primary,
  },
  noteSection: {
    marginBottom: Spacing.xl,
  },
  noteLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.label,
    marginBottom: Spacing.md,
  },
  textInputContainer: {
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    minHeight: 120,
  },
  textInput: {
    fontSize: 16,
    color: Colors.label,
    minHeight: 80,
  },
  charCount: {
    fontSize: 13,
    color: Colors.secondaryLabel,
    textAlign: 'right',
    marginTop: Spacing.sm,
  },
  quickOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xxl,
    paddingVertical: Spacing.lg,
  },
  quickOption: {
    alignItems: 'center',
  },
  quickOptionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.large,
    backgroundColor: Colors.systemGray6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quickOptionActive: {
    backgroundColor: Colors.primary + '20',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  quickOptionText: {
    fontSize: 13,
    color: Colors.secondaryLabel,
  },
  quickOptionTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  attachments: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.primary + '08',
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.primary + '15',
  },
  attachmentsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  attachmentText: {
    fontSize: 14,
    color: Colors.label,
  },
});