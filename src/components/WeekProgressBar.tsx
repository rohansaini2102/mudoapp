import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';

interface WeekProgressBarProps {
  daysCompleted: number;
  average: number;
}

export function WeekProgressBar({ daysCompleted, average }: WeekProgressBarProps) {
  const progress = Math.min((daysCompleted / 7) * 100, 100);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your week</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.averageText}>{average.toFixed(1)} avg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    marginBottom: Spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.systemGray5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  averageText: {
    ...Typography.footnote,
    color: Colors.label,
    fontWeight: '600',
    minWidth: 50,
    textAlign: 'right',
  },
});