import React, { useEffect, useRef } from 'react';
import { View, Animated, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../constants/theme';
import { getPlatformShadow } from '../utils/platformStyles';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  delay?: number;
  style?: ViewStyle;
  index?: number;
}

export function AnimatedCard({ children, onPress, delay = 0, style, index = 0 }: AnimatedCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: delay + (index * 100),
        useNativeDriver: false,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 8,
        delay: delay + (index * 100),
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        delay: delay + (index * 100),
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      tension: 100,
      friction: 10,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 100,
      friction: 10,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { translateY },
      { scale },
    ],
  };

  const cardContent = (
    <Animated.View style={[styles.card, animatedStyle, style]}>
      {children}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {cardContent}
      </TouchableOpacity>
    );
  }

  return cardContent;
}

const styles = {
  card: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: BorderRadius.large,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...getPlatformShadow({
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    }),
  },
};