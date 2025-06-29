import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  borderRadius?: number;
  noBlur?: boolean;
}

export function GlassCard({ 
  children, 
  style, 
  intensity = 40,
  tint = 'light',
  borderRadius = 20,
  noBlur = false
}: GlassCardProps) {
  if (Platform.OS === 'android' || noBlur) {
    return (
      <View style={[styles.androidCard, { borderRadius }, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.container, { borderRadius }, style]}>
      <BlurView 
        intensity={intensity} 
        tint={tint}
        style={[styles.blurView, { borderRadius }]}
      >
        <View style={styles.innerContent}>
          {children}
        </View>
      </BlurView>
      <View style={[styles.glassOverlay, { borderRadius }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  blurView: {
    flex: 1,
  },
  innerContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  androidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});