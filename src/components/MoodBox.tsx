import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Shadow } from '../constants/theme';
import { getMoodGradientColors } from '../utils/gradientHelpers';

const { width: screenWidth } = Dimensions.get('window');
const COLUMN_GAP = 12;
const HORIZONTAL_PADDING = 56; // 28 * 2 (Spacing.xl)
const COLUMN_WIDTH = (screenWidth - HORIZONTAL_PADDING - COLUMN_GAP) / 2;

interface MoodBoxProps {
  id: string;
  type: 'image' | 'text' | 'emoji' | 'mixed';
  mood_score: number;
  emoji?: string;
  note?: string;
  image?: ImageSourcePropType;
  timestamp: string;
  height: number;
  onPress?: () => void;
  index?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function MoodBox({
  type,
  mood_score,
  emoji,
  note,
  image,
  timestamp,
  height,
  onPress,
  index = 0,
}: MoodBoxProps) {
  const scale = useSharedValue(1);
  const gradientColors = getMoodGradientColors(mood_score);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.96, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const renderContent = () => {
    switch (type) {
      case 'image':
        return (
          <View style={[styles.container, { height }]}>
            <Image source={image!} style={styles.image} resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
              style={styles.imageOverlay}
            >
              {note && (
                <Text style={styles.imageText} numberOfLines={2}>
                  {note}
                </Text>
              )}
              <Text style={styles.imageTimestamp}>{timestamp}</Text>
            </LinearGradient>
          </View>
        );

      case 'emoji':
        return (
          <LinearGradient colors={gradientColors} style={[styles.container, { height }]}>
            <View style={styles.emojiContainer}>
              <Text style={styles.bigEmoji}>{emoji}</Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
          </LinearGradient>
        );

      case 'text':
        return (
          <LinearGradient colors={gradientColors} style={[styles.container, { height }]}>
            <View style={[styles.textContainer, styles.glassContainer]}>
              <Text style={styles.noteText}>
                {note}
              </Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
          </LinearGradient>
        );

      case 'mixed':
        return (
          <LinearGradient colors={gradientColors} style={[styles.container, { height }]}>
            <View style={[styles.mixedContainer, styles.glassContainer]}>
              <Text style={styles.mediumEmoji}>{emoji}</Text>
              <Text style={styles.mixedText}>
                {note}
              </Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
          </LinearGradient>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatedTouchable
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.boxContainer,
        animatedStyle,
        {
          width: COLUMN_WIDTH,
          marginBottom: COLUMN_GAP,
        },
      ]}
    >
      {renderContent()}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    borderRadius: BorderRadius.xlarge,
    overflow: 'hidden',
    shadowColor: Shadow.medium.shadowColor,
    shadowOffset: Shadow.medium.shadowOffset,
    shadowOpacity: Shadow.medium.shadowOpacity,
    shadowRadius: Shadow.medium.shadowRadius,
    elevation: Shadow.medium.elevation,
  },
  container: {
    borderRadius: BorderRadius.xlarge,
    overflow: 'hidden',
  },
  
  // Image styles
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  imageText: {
    ...Typography.body,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  imageTimestamp: {
    ...Typography.footnote,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  // Emoji styles
  emojiContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  bigEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  mediumEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  
  // Text styles
  textContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  noteText: {
    ...Typography.body,
    color: Colors.label,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Mixed styles
  mixedContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mixedText: {
    ...Typography.callout,
    color: Colors.label,
    textAlign: 'center',
    flex: 1,
  },
  
  // Common styles
  timestamp: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    marginTop: 'auto',
  },
  
  // Glass morphism effect
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: BorderRadius.large,
    margin: 8,
    flex: 1,
  },
});