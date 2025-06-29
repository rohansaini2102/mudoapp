import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { MoodStatistics, MOOD_LABELS } from '../../utils/moodAnalytics';
import { Icon } from '../Icon';

interface PatternAnalysisProps {
  stats: MoodStatistics;
}

interface PatternItemProps {
  label: string;
  value: number;
  icon?: string;
  isHighest?: boolean;
}

function PatternItem({ label, value, icon, isHighest }: PatternItemProps) {
  const moodInfo = MOOD_LABELS.find(m => m.value === Math.round(value)) || MOOD_LABELS[4];
  
  return (
    <View style={[styles.patternItem, isHighest && styles.patternItemHighest]}>
      <View style={styles.patternItemHeader}>
        {icon && (
          <Icon 
            name={icon} 
            size={16} 
            color={isHighest ? Colors.primary : Colors.secondaryLabel} 
          />
        )}
        <Text style={[styles.patternLabel, isHighest && styles.patternLabelHighest]}>
          {label}
        </Text>
      </View>
      <View style={styles.patternValue}>
        <Text style={styles.patternEmoji}>{moodInfo.emoji}</Text>
        <Text style={[styles.patternScore, isHighest && styles.patternScoreHighest]}>
          {value.toFixed(1)}
        </Text>
      </View>
    </View>
  );
}

export function PatternAnalysis({ stats }: PatternAnalysisProps) {
  // Sort weekdays by average score
  const weekdayEntries = Object.entries(stats.weekdayAverages)
    .filter(([_, avg]) => avg > 0)
    .sort((a, b) => b[1] - a[1]);

  // Sort time of day by average score
  const timeEntries = Object.entries(stats.timeOfDayAverages)
    .filter(([_, avg]) => avg > 0)
    .sort((a, b) => b[1] - a[1]);

  const timeIcons: Record<string, string> = {
    morning: 'sunny',
    afternoon: 'partly-sunny',
    evening: 'moon',
    night: 'bed',
  };

  return (
    <View style={styles.container}>
      {/* Weekday Patterns */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Patterns</Text>
        <Text style={styles.sectionSubtitle}>Average mood by day of week</Text>
        
        <View style={styles.patternGrid}>
          {weekdayEntries.map(([day, avg], index) => (
            <PatternItem
              key={day}
              label={day.slice(0, 3)}
              value={avg}
              isHighest={index === 0}
            />
          ))}
        </View>
        
        {weekdayEntries.length > 0 && (
          <View style={styles.insight}>
            <Icon name="bulb" size={14} color={Colors.primary} />
            <Text style={styles.insightText}>
              {weekdayEntries[0][0]} is typically your best day
            </Text>
          </View>
        )}
      </View>

      {/* Time of Day Patterns */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Patterns</Text>
        <Text style={styles.sectionSubtitle}>Average mood by time of day</Text>
        
        <View style={styles.timeGrid}>
          {timeEntries.map(([time, avg], index) => (
            <PatternItem
              key={time}
              label={time.charAt(0).toUpperCase() + time.slice(1)}
              value={avg}
              icon={timeIcons[time]}
              isHighest={index === 0}
            />
          ))}
        </View>
        
        {timeEntries.length > 0 && (
          <View style={styles.insight}>
            <Icon name="bulb" size={14} color={Colors.primary} />
            <Text style={styles.insightText}>
              You tend to feel best in the {timeEntries[0][0]}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  section: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: BorderRadius.xlarge,
    padding: Spacing.xl,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.medium,
  },
  sectionTitle: {
    ...Typography.headline,
    color: Colors.label,
    marginBottom: 4,
  },
  sectionSubtitle: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    marginBottom: Spacing.lg,
  },
  patternGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  timeGrid: {
    gap: Spacing.sm,
  },
  patternItem: {
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    minWidth: 80,
    alignItems: 'center',
  },
  patternItemHighest: {
    backgroundColor: Colors.primary + '10',
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  patternItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  patternLabel: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
    fontWeight: '600',
  },
  patternLabelHighest: {
    color: Colors.primary,
  },
  patternValue: {
    alignItems: 'center',
  },
  patternEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  patternScore: {
    ...Typography.footnote,
    color: Colors.label,
    fontWeight: '700',
  },
  patternScoreHighest: {
    color: Colors.primary,
  },
  insight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
  insightText: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    flex: 1,
  },
});