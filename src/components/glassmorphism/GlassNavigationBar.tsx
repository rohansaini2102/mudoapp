import React from 'react';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GlassNavigationBarProps {
  children: React.ReactNode;
  scrollY?: Animated.Value;
  maxBlur?: number;
  minBlur?: number;
}

export function GlassNavigationBar({ 
  children, 
  scrollY,
  maxBlur = 80,
  minBlur = 20
}: GlassNavigationBarProps) {
  const insets = useSafeAreaInsets();
  
  const blurIntensity = scrollY ? scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [minBlur, maxBlur],
    extrapolate: 'clamp'
  }) : maxBlur;

  const backgroundColor = scrollY ? scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.9)'],
    extrapolate: 'clamp'
  }) : 'rgba(255, 255, 255, 0.9)';

  if (Platform.OS === 'android') {
    return (
      <Animated.View 
        style={[
          styles.androidContainer, 
          { 
            paddingTop: insets.top,
            backgroundColor: backgroundColor as any
          }
        ]}
      >
        <View style={styles.content}>
          {children}
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={StyleSheet.absoluteFillObject}>
        <BlurView 
          intensity={blurIntensity as any} 
          tint="light"
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
      <Animated.View 
        style={[
          styles.overlay, 
          { backgroundColor: backgroundColor as any }
        ]} 
      />
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.bottomBorder} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    overflow: 'hidden',
  },
  androidContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});