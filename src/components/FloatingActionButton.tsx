import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet, Vibration } from 'react-native';
import { Colors, Shadow } from '../constants/theme';
import { getPlatformShadow } from '../utils/platformStyles';
import { Icon } from './Icon';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  color?: string;
  size?: number;
}

export function FloatingActionButton({ 
  onPress, 
  icon = 'plus',
  color = Colors.primary,
  size = 56 
}: FloatingActionButtonProps) {
  const scale = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotation, {
        toValue: 1,
        duration: 600,
        delay: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Vibration.vibrate(10);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.9,
        tension: 100,
        friction: 10,
        useNativeDriver: false,
      }),
      Animated.timing(rotation, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 100,
        friction: 10,
        useNativeDriver: false,
      }),
      Animated.spring(rotation, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale },
            {
              rotate: rotation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color, width: size, height: size }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Icon name={icon} size={28} color={Colors.secondaryBackground} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 999,
  },
  button: {
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...getPlatformShadow({
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    }),
  },
});