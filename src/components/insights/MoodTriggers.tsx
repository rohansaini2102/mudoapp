import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { MoodEntry } from '../../types/mood';
import { Icon } from '../Icon';

interface MoodTriggersProps {
  entries: MoodEntry[];
  period: string;
}

interface TriggerItem {
  text: string;
  count: number;
  averageMood: number;
  emoji: string;
}

export function MoodTriggers({ entries, period }: MoodTriggersProps) {
  const triggers = useMemo(() => {
    // Analyze text content for common patterns
    const positiveKeywords = [
      'family', 'friends', 'love', 'happy', 'great', 'amazing', 'wonderful',
      'success', 'achieved', 'accomplished', 'fun', 'enjoyed', 'beautiful',
      'grateful', 'blessed', 'excited', 'peaceful', 'relaxed', 'good day',
      'productive', 'exercise', 'workout', 'nature', 'sunshine', 'walk'
    ];
    
    const negativeKeywords = [
      'stress', 'tired', 'exhausted', 'angry', 'frustrated', 'sad', 'lonely',
      'worried', 'anxious', 'sick', 'pain', 'headache', 'bad day', 'failed',
      'disappointed', 'upset', 'conflict', 'argument', 'work', 'deadline',
      'pressure', 'overwhelmed', 'insomnia', 'difficult'
    ];

    const positiveTriggers: Map<string, TriggerItem> = new Map();
    const negativeTriggers: Map<string, TriggerItem> = new Map();
    
    // Analyze entries with text content
    entries.forEach(entry => {
      if (!entry.text_content) return;
      
      const text = entry.text_content.toLowerCase();
      const isPositive = entry.mood_score >= 7;
      const isNegative = entry.mood_score <= 4;
      
      if (isPositive) {
        positiveKeywords.forEach(keyword => {
          if (text.includes(keyword)) {
            const existing = positiveTriggers.get(keyword) || {
              text: keyword,
              count: 0,
              averageMood: 0,
              emoji: '✨'
            };
            
            existing.count++;
            existing.averageMood = ((existing.averageMood * (existing.count - 1)) + entry.mood_score) / existing.count;
            positiveTriggers.set(keyword, existing);
          }
        });
      }
      
      if (isNegative) {
        negativeKeywords.forEach(keyword => {
          if (text.includes(keyword)) {
            const existing = negativeTriggers.get(keyword) || {
              text: keyword,
              count: 0,
              averageMood: 0,
              emoji: '⚡'
            };
            
            existing.count++;
            existing.averageMood = ((existing.averageMood * (existing.count - 1)) + entry.mood_score) / existing.count;
            negativeTriggers.set(keyword, existing);
          }
        });
      }
    });
    
    // Sort by frequency and get top items
    const topPositive = Array.from(positiveTriggers.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
      
    const topNegative = Array.from(negativeTriggers.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return { positive: topPositive, negative: topNegative };
  }, [entries]);

  const formatTriggerText = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mood Triggers</Text>
        <Text style={styles.subtitle}>What influences your emotions</Text>
      </View>

      {/* Positive Triggers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="sunny" size={20} color={Colors.success} />
          <Text style={styles.sectionTitle}>Mood Boosters</Text>
        </View>
        
        {triggers.positive.length > 0 ? (
          triggers.positive.map((trigger, index) => (
            <TouchableOpacity key={index} style={styles.triggerItem}>
              <View style={styles.triggerLeft}>
                <Text style={styles.triggerEmoji}>{trigger.emoji}</Text>
                <Text style={styles.triggerText}>{formatTriggerText(trigger.text)}</Text>
              </View>
              <View style={styles.triggerRight}>
                <Text style={styles.triggerCount}>{trigger.count}x</Text>
                <View style={[styles.moodIndicator, { backgroundColor: '#C8E6C9' }]}>
                  <Text style={styles.moodScore}>{trigger.averageMood.toFixed(1)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>Track more moods to discover your boosters</Text>
        )}
      </View>

      {/* Negative Triggers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="rainy" size={20} color={Colors.danger} />
          <Text style={styles.sectionTitle}>Mood Dampeners</Text>
        </View>
        
        {triggers.negative.length > 0 ? (
          triggers.negative.map((trigger, index) => (
            <TouchableOpacity key={index} style={styles.triggerItem}>
              <View style={styles.triggerLeft}>
                <Text style={styles.triggerEmoji}>{trigger.emoji}</Text>
                <Text style={styles.triggerText}>{formatTriggerText(trigger.text)}</Text>
              </View>
              <View style={styles.triggerRight}>
                <Text style={styles.triggerCount}>{trigger.count}x</Text>
                <View style={[styles.moodIndicator, { backgroundColor: '#FFE5E5' }]}>
                  <Text style={styles.moodScore}>{trigger.averageMood.toFixed(1)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No negative patterns detected</Text>
        )}
      </View>

      {/* Insights */}
      <View style={styles.insightBox}>
        <Icon name="bulb" size={16} color={Colors.primary} />
        <Text style={styles.insightText}>
          {triggers.positive.length > 0 
            ? `"${formatTriggerText(triggers.positive[0].text)}" appears to boost your mood the most!`
            : "Add notes to your mood entries to discover patterns"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: BorderRadius.xlarge,
    padding: Spacing.xl,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.medium,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.headline,
    color: Colors.label,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.callout,
    color: Colors.label,
    fontWeight: '600',
  },
  triggerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  triggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  triggerEmoji: {
    fontSize: 20,
  },
  triggerText: {
    ...Typography.body,
    color: Colors.label,
    flex: 1,
  },
  triggerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  triggerCount: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    fontWeight: '600',
  },
  moodIndicator: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.small,
  },
  moodScore: {
    ...Typography.caption1,
    color: Colors.label,
    fontWeight: '700',
  },
  emptyText: {
    ...Typography.footnote,
    color: Colors.tertiaryLabel,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  insightBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.primary + '08',
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary + '15',
  },
  insightText: {
    ...Typography.footnote,
    color: Colors.label,
    flex: 1,
    lineHeight: 18,
  },
});