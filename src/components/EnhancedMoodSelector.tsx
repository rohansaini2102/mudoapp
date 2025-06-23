import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from './Icon';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

export interface MoodItem {
  emoji: string;
  label: string;
  level: number;
}

interface EnhancedMoodSelectorProps {
  selectedMood: number | null;
  onMoodSelect: (mood: MoodItem) => void;
  onQuickEntry: () => void;
  onVoiceEntry?: () => void;
  onCameraEntry?: () => void;
}

export function EnhancedMoodSelector({
  selectedMood,
  onMoodSelect,
  onQuickEntry,
  onVoiceEntry,
  onCameraEntry,
}: EnhancedMoodSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick Entry</Text>
        <Text style={styles.subtitle}>Track your daily mood</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onQuickEntry}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Icon name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Add Entry</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onVoiceEntry}
          activeOpacity={0.8}
        >
          <Icon name="mic" size={20} color={Colors.secondaryLabel} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onCameraEntry}
          activeOpacity={0.8}
        >
          <Icon name="camera" size={20} color={Colors.secondaryLabel} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: BorderRadius.xlarge,
    padding: Spacing.lg,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.label,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondaryLabel,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  gradientButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.large,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
});