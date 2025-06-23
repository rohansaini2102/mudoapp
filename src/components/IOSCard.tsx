import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Shadow, Spacing } from '../constants/theme';
import { getPlatformShadow } from '../utils/platformStyles';

interface IOSCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'filled' | 'outlined';
  padding?: boolean;
}

export function IOSCard({ 
  children, 
  style, 
  variant = 'elevated',
  padding = true 
}: IOSCardProps) {
  return (
    <View style={[
      styles.base,
      variant === 'elevated' && styles.elevated,
      variant === 'filled' && styles.filled,
      variant === 'outlined' && styles.outlined,
      padding && styles.padding,
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: Colors.secondaryBackground,
    ...getPlatformShadow(Shadow.medium),
  },
  filled: {
    backgroundColor: Colors.tertiaryBackground,
  },
  outlined: {
    backgroundColor: Colors.secondaryBackground,
    borderWidth: 1,
    borderColor: Colors.opaqueSeparator,
  },
  padding: {
    padding: Spacing.md,
  },
});