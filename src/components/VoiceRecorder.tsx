import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { Icon } from './Icon';
import { Colors, Typography, Spacing, BorderRadius, GlassMorphism } from '../constants/theme';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

interface VoiceRecorderProps {
  onRecordingComplete: (uri: string) => void;
  onDelete?: () => void;
  currentRecording?: string | null;
}

export function VoiceRecorder({ onRecordingComplete, onDelete, currentRecording }: VoiceRecorderProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(currentRecording || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const pulseAnim = useSharedValue(1);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (isRecording) {
      pulseAnim.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1
      );
    } else {
      pulseAnim.value = withTiming(1, { duration: 300 });
    }
  }, [isRecording]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  const requestPermissions = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please enable microphone access to record voice notes.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setDuration(0);

      // Update duration every second
      const interval = setInterval(async () => {
        const status = await recording.getStatusAsync();
        if (status.isRecording) {
          setDuration(Math.floor(status.durationMillis / 1000));
        }
      }, 1000);

      recording.setOnRecordingStatusUpdate((status) => {
        if (!status.isRecording) {
          clearInterval(interval);
        }
      });
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      
      const uri = recording.getURI();
      if (uri) {
        setRecordingUri(uri);
        onRecordingComplete(uri);
      }
      
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playRecording = async () => {
    if (!recordingUri) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recordingUri },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error('Failed to play recording', err);
    }
  };

  const stopPlaying = async () => {
    if (sound) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRecordingUri(null);
    setDuration(0);
    if (sound) {
      sound.unloadAsync();
    }
    onDelete?.();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (recordingUri && !isRecording) {
    return (
      <View style={styles.container}>
        <View style={styles.recordingCard}>
          {Platform.OS === 'ios' ? (
            <BlurView intensity={30} tint="light" style={styles.recordingCardBlur}>
              <Icon name="mic" size={20} color={Colors.primary} />
              <Text style={styles.recordingText}>Voice Note</Text>
              <View style={styles.recordingActions}>
                <TouchableOpacity
                  onPress={isPlaying ? stopPlaying : playRecording}
                  style={styles.playButton}
                >
                  <Icon 
                    name={isPlaying ? "pause" : "play"} 
                    size={16} 
                    color={Colors.primary} 
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteRecording} style={styles.deleteButton}>
                  <Icon name="trash" size={16} color={Colors.danger} />
                </TouchableOpacity>
              </View>
            </BlurView>
          ) : (
            <View style={styles.androidRecordingCard}>
              <Icon name="mic" size={20} color={Colors.primary} />
              <Text style={styles.recordingText}>Voice Note</Text>
              <View style={styles.recordingActions}>
                <TouchableOpacity
                  onPress={isPlaying ? stopPlaying : playRecording}
                  style={styles.playButton}
                >
                  <Icon 
                    name={isPlaying ? "pause" : "play"} 
                    size={16} 
                    color={Colors.primary} 
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteRecording} style={styles.deleteButton}>
                  <Icon name="trash" size={16} color={Colors.danger} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        style={styles.recordButton}
      >
        <Animated.View style={[styles.recordButtonInner, pulseStyle]}>
          {Platform.OS === 'ios' ? (
            <BlurView 
              intensity={60} 
              tint={isRecording ? "dark" : "light"} 
              style={styles.recordButtonBlur}
            >
              <Icon 
                name={isRecording ? "stop" : "mic"} 
                size={28} 
                color={isRecording ? "#FFFFFF" : Colors.primary} 
              />
            </BlurView>
          ) : (
            <View style={[
              styles.androidRecordButton,
              isRecording && styles.androidRecordButtonActive
            ]}>
              <Icon 
                name={isRecording ? "stop" : "mic"} 
                size={28} 
                color={isRecording ? "#FFFFFF" : Colors.primary} 
              />
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
      
      {isRecording && (
        <View style={styles.recordingInfo}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingTime}>{formatDuration(duration)}</Text>
          <Text style={styles.recordingHint}>Tap to stop</Text>
        </View>
      )}
      
      {!isRecording && !recordingUri && (
        <Text style={styles.hint}>Tap to record voice note</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  recordButton: {
    marginBottom: Spacing.md,
  },
  recordButtonInner: {
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
    ...GlassMorphism.shadow.glass,
  },
  recordButtonBlur: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlassMorphism.backgroundColor.card,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.default,
  },
  androidRecordButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlassMorphism.backgroundColor.cardAndroid,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.subtle,
  },
  androidRecordButtonActive: {
    backgroundColor: Colors.danger,
  },
  recordingInfo: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
  },
  recordingTime: {
    ...Typography.headline,
    color: Colors.label,
    fontWeight: '600',
  },
  recordingHint: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
  },
  hint: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
  },
  recordingCard: {
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
    ...GlassMorphism.shadow.glassSubtle,
  },
  recordingCardBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
    backgroundColor: GlassMorphism.backgroundColor.card,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.default,
  },
  androidRecordingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
    backgroundColor: GlassMorphism.backgroundColor.cardAndroid,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.subtle,
  },
  recordingText: {
    ...Typography.body,
    color: Colors.label,
    flex: 1,
  },
  recordingActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.danger + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
});