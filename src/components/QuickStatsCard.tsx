import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import { Colors, Typography, BorderRadius, Spacing } from '../constants/theme';

interface QuickStatsCardProps {
  streak: number;
  positivityPercentage: number;
}

export function QuickStatsCard({ streak, positivityPercentage }: QuickStatsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <View style={styles.iconContainer}>
          <Icon name="trending" size={24} color={Colors.primary} />
        </View>
        <Text style={styles.statValue}>{streak} days</Text>
        <Text style={styles.statLabel}>in a row</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.statBox}>
        <View style={styles.iconContainer}>
          <Icon name="mood" size={24} color={Colors.success} />
        </View>
        <Text style={styles.statValue}>{positivityPercentage}%</Text>
        <Text style={styles.statLabel}>positive</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.large,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    ...Typography.title3,
    color: Colors.label,
    marginBottom: 2,
  },
  statLabel: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.opaqueSeparator,
    marginHorizontal: Spacing.lg,
  },
});