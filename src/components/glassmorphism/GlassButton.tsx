import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/theme';

interface GlassButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function GlassButton({ 
  onPress, 
  title, 
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  icon
}: GlassButtonProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const sizeStyles = {
    small: { height: 36, paddingHorizontal: 16 },
    medium: { height: 48, paddingHorizontal: 24 },
    large: { height: 56, paddingHorizontal: 32 },
  };

  const textSizes = {
    small: 14,
    medium: 16,
    large: 18,
  };

  const buttonContent = (
    <>
      {icon && <Animated.View style={styles.iconContainer}>{icon}</Animated.View>}
      <Text style={[
        styles.text,
        { fontSize: textSizes[size] },
        variant === 'primary' && styles.primaryText,
        variant === 'secondary' && styles.secondaryText,
        variant === 'ghost' && styles.ghostText,
        disabled && styles.disabledText,
        textStyle
      ]}>
        {title}
      </Text>
    </>
  );

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
        style={[
          styles.button,
          sizeStyles[size],
          variant === 'primary' && styles.primaryButton,
          variant === 'secondary' && styles.secondaryButton,
          variant === 'ghost' && styles.ghostButton,
          disabled && styles.disabledButton,
          style
        ]}
      >
        {Platform.OS === 'ios' && variant !== 'ghost' ? (
          <BlurView 
            intensity={variant === 'primary' ? 60 : 40} 
            tint={variant === 'primary' ? 'light' : 'default'}
            style={[StyleSheet.absoluteFillObject, styles.blurContainer]}
          >
            {buttonContent}
          </BlurView>
        ) : (
          buttonContent
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blurContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'rgba(93, 138, 168, 0.3)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: Platform.OS === 'android' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  primaryText: {
    color: Platform.OS === 'ios' ? Colors.primary : '#FFF',
  },
  secondaryText: {
    color: Colors.label,
  },
  ghostText: {
    color: Colors.primary,
  },
  disabledText: {
    color: Colors.secondaryLabel,
  },
  iconContainer: {
    marginRight: 8,
  },
});