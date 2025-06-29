import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Typography, Spacing, BorderRadius, Shadow, GlassMorphism } from '../../constants/theme';
import { MoodEntry } from '../../types/mood';
import { calculateMoodStatistics, MOOD_LABELS } from '../../utils/moodAnalytics';
import { Icon } from '../Icon';
import * as Haptics from 'expo-haptics';

interface WeeklyDigestProps {
  entries: MoodEntry[];
  onSharePress?: () => void;
}

export function WeeklyDigest({ entries, onSharePress }: WeeklyDigestProps) {
  const digest = useMemo(() => {
    // Get entries from last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekEntries = entries.filter(entry => 
      new Date(entry.created_at) >= weekAgo
    );
    
    const stats = calculateMoodStatistics(weekEntries);
    
    // Find best and worst days
    const entriesByDay: Map<string, MoodEntry[]> = new Map();
    weekEntries.forEach(entry => {
      const day = new Date(entry.created_at).toLocaleDateString();
      if (!entriesByDay.has(day)) {
        entriesByDay.set(day, []);
      }
      entriesByDay.get(day)!.push(entry);
    });
    
    let bestDay = { date: '', average: 0 };
    let worstDay = { date: '', average: 10 };
    
    entriesByDay.forEach((dayEntries, date) => {
      const avg = dayEntries.reduce((sum, e) => sum + e.mood_score, 0) / dayEntries.length;
      if (avg > bestDay.average) {
        bestDay = { date, average: avg };
      }
      if (avg < worstDay.average) {
        worstDay = { date, average: avg };
      }
    });
    
    // Calculate mood improvement
    const firstHalf = weekEntries.slice(0, Math.floor(weekEntries.length / 2));
    const secondHalf = weekEntries.slice(Math.floor(weekEntries.length / 2));
    
    const firstAvg = firstHalf.length > 0 
      ? firstHalf.reduce((sum, e) => sum + e.mood_score, 0) / firstHalf.length 
      : 0;
    const secondAvg = secondHalf.length > 0 
      ? secondHalf.reduce((sum, e) => sum + e.mood_score, 0) / secondHalf.length 
      : 0;
    
    const improvement = ((secondAvg - firstAvg) / firstAvg) * 100;
    
    // Get most frequent mood
    const moodCounts = new Map<number, number>();
    weekEntries.forEach(entry => {
      moodCounts.set(entry.mood_score, (moodCounts.get(entry.mood_score) || 0) + 1);
    });
    
    let mostFrequentMood = 5;
    let maxCount = 0;
    moodCounts.forEach((count, mood) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentMood = mood;
      }
    });
    
    const moodInfo = MOOD_LABELS.find(m => m.value === mostFrequentMood) || MOOD_LABELS[4];
    
    return {
      weekEntries,
      stats,
      bestDay,
      worstDay,
      improvement,
      mostFrequentMood: moodInfo,
      consistency: (weekEntries.length / 7) * 100,
    };
  }, [entries]);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={GlassMorphism.blur.medium}
          tint="light"
          style={styles.blurContainer}
        >
          <View style={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Weekly Digest</Text>
          <Text style={styles.subtitle}>Your mood summary for the past week</Text>
        </View>
        <TouchableOpacity 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onSharePress?.();
          }} 
          style={styles.shareButton}
        >
          <Icon name="share" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Key Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{digest.stats.average.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Average Mood</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{digest.consistency.toFixed(0)}%</Text>
          <Text style={styles.statLabel}>Consistency</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, digest.improvement > 0 ? styles.positiveValue : styles.negativeValue]}>
            {digest.improvement > 0 ? '+' : ''}{digest.improvement.toFixed(0)}%
          </Text>
          <Text style={styles.statLabel}>Change</Text>
        </View>
      </View>

      {/* Highlights */}
      <View style={styles.highlights}>
        <View style={styles.highlightItem}>
          <Icon name="trophy" size={16} color={Colors.warning} />
          <Text style={styles.highlightText}>
            Best day: <Text style={styles.highlightValue}>{formatDate(digest.bestDay.date)}</Text> ({digest.bestDay.average.toFixed(1)}/10)
          </Text>
        </View>
        
        <View style={styles.highlightItem}>
          <Icon name="trending" size={16} color={Colors.primary} />
          <Text style={styles.highlightText}>
            Most frequent: <Text style={styles.highlightValue}>{digest.mostFrequentMood.emoji} {digest.mostFrequentMood.label}</Text>
          </Text>
        </View>
        
        <View style={styles.highlightItem}>
          <Icon name="flame" size={16} color={Colors.danger} />
          <Text style={styles.highlightText}>
            Current streak: <Text style={styles.highlightValue}>{digest.stats.currentStreak} days</Text>
          </Text>
        </View>
      </View>

      {/* Mood Journey */}
      <View style={styles.moodJourney}>
        <Text style={styles.journeyTitle}>Your Week at a Glance</Text>
        <View style={styles.emojiRow}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - index));
            const dayStr = date.toLocaleDateString();
            
            const dayEntries = digest.weekEntries.filter(e => 
              new Date(e.created_at).toLocaleDateString() === dayStr
            );
            
            const avgMood = dayEntries.length > 0
              ? Math.round(dayEntries.reduce((sum, e) => sum + e.mood_score, 0) / dayEntries.length)
              : 0;
              
            const moodEmoji = avgMood > 0 
              ? MOOD_LABELS.find(m => m.value === avgMood)?.emoji || '😐'
              : '—';
            
            return (
              <View key={index} style={styles.dayColumn}>
                <Text style={styles.dayEmoji}>{moodEmoji}</Text>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Personalized Message */}
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>
          {digest.improvement > 10 
            ? "🎉 Amazing progress! Your mood improved significantly this week."
            : digest.improvement > 0
            ? "📈 Good job! You're trending upward."
            : digest.improvement < -10
            ? "💙 Tough week? Remember, it's okay to have ups and downs."
            : "⚖️ You maintained steady emotions this week."}
        </Text>
      </View>
          </View>
        </BlurView>
      ) : (
        <View style={styles.androidContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Weekly Digest</Text>
              <Text style={styles.subtitle}>Your mood summary for the past week</Text>
            </View>
            <TouchableOpacity 
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onSharePress?.();
              }} 
              style={styles.shareButton}
            >
              <Icon name="share" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Key Stats */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{digest.stats.average.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Average Mood</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{digest.consistency.toFixed(0)}%</Text>
              <Text style={styles.statLabel}>Consistency</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, digest.improvement > 0 ? styles.positiveValue : styles.negativeValue]}>
                {digest.improvement > 0 ? '+' : ''}{digest.improvement.toFixed(0)}%
              </Text>
              <Text style={styles.statLabel}>Change</Text>
            </View>
          </View>

          {/* Highlights */}
          <View style={styles.highlights}>
            <View style={styles.highlightItem}>
              <Icon name="trophy" size={16} color={Colors.warning} />
              <Text style={styles.highlightText}>
                Best day: <Text style={styles.highlightValue}>{formatDate(digest.bestDay.date)}</Text> ({digest.bestDay.average.toFixed(1)}/10)
              </Text>
            </View>
            
            <View style={styles.highlightItem}>
              <Icon name="trending" size={16} color={Colors.primary} />
              <Text style={styles.highlightText}>
                Most frequent: <Text style={styles.highlightValue}>{digest.mostFrequentMood.emoji} {digest.mostFrequentMood.label}</Text>
              </Text>
            </View>
            
            <View style={styles.highlightItem}>
              <Icon name="flame" size={16} color={Colors.danger} />
              <Text style={styles.highlightText}>
                Current streak: <Text style={styles.highlightValue}>{digest.stats.currentStreak} days</Text>
              </Text>
            </View>
          </View>

          {/* Mood Journey */}
          <View style={styles.moodJourney}>
            <Text style={styles.journeyTitle}>Your Week at a Glance</Text>
            <View style={styles.emojiRow}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - index));
                const dayStr = date.toLocaleDateString();
                
                const dayEntries = digest.weekEntries.filter(e => 
                  new Date(e.created_at).toLocaleDateString() === dayStr
                );
                
                const avgMood = dayEntries.length > 0
                  ? Math.round(dayEntries.reduce((sum, e) => sum + e.mood_score, 0) / dayEntries.length)
                  : 0;
                  
                const moodEmoji = avgMood > 0 
                  ? MOOD_LABELS.find(m => m.value === avgMood)?.emoji || '😐'
                  : '—';
                
                return (
                  <View key={index} style={styles.dayColumn}>
                    <Text style={styles.dayEmoji}>{moodEmoji}</Text>
                    <Text style={styles.dayLabel}>{day}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Personalized Message */}
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>
              {digest.improvement > 10 
                ? "🎉 Amazing progress! Your mood improved significantly this week."
                : digest.improvement > 0
                ? "📈 Good job! You're trending upward."
                : digest.improvement < -10
                ? "💙 Tough week? Remember, it's okay to have ups and downs."
                : "⚖️ You maintained steady emotions this week."}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xlarge,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    ...GlassMorphism.shadow.glass,
  },
  blurContainer: {
    backgroundColor: GlassMorphism.backgroundColor.card,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.default,
  },
  androidContainer: {
    backgroundColor: GlassMorphism.backgroundColor.cardAndroid,
    borderRadius: BorderRadius.xlarge,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.subtle,
  },
  content: {
    padding: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  shareButton: {
    padding: Spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.large,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.title2,
    color: Colors.label,
    fontWeight: '700',
  },
  positiveValue: {
    color: Colors.success,
  },
  negativeValue: {
    color: Colors.danger,
  },
  statLabel: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
    marginTop: 4,
  },
  highlights: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  highlightText: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
  },
  highlightValue: {
    color: Colors.label,
    fontWeight: '600',
  },
  moodJourney: {
    marginBottom: Spacing.xl,
  },
  journeyTitle: {
    ...Typography.callout,
    color: Colors.label,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  dayLabel: {
    ...Typography.caption2,
    color: Colors.secondaryLabel,
  },
  messageBox: {
    backgroundColor: Colors.primary + '08',
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary + '15',
  },
  messageText: {
    ...Typography.callout,
    color: Colors.label,
    lineHeight: 20,
    textAlign: 'center',
  },
});