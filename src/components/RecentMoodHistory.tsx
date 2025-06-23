import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { AnimatedCard } from './AnimatedCard';
import { Icon } from './Icon';
import { MoodEntry } from '../types/mood';
import { useNavigation } from '@react-navigation/native';

interface RecentMoodHistoryProps {
  moods: MoodEntry[];
}

export function RecentMoodHistory({ moods }: RecentMoodHistoryProps) {
  const navigation = useNavigation();

  const getMoodColor = (score: number) => {
    if (score <= 3) return '#FF6B6B';
    if (score <= 5) return '#FFD93D';
    if (score <= 7) return '#6BCF7F';
    return '#4ECDC4';
  };

  const getMoodEmoji = (score: number) => {
    const emojis = ['😢', '😔', '😟', '😐', '🙂', '😊', '😄', '😃', '😁', '🤩'];
    return emojis[score - 1] || '😐';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Recent Moods</Text>
          <Text style={styles.subtitle}>Your emotional journey</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('History' as never)}
        >
          <Text style={styles.viewAllText}>View all</Text>
          <Icon name="chevronRight" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {moods.length > 0 ? (
          moods.slice(0, 5).map((mood, index) => (
            <AnimatedCard
              key={mood.id}
              index={index}
              style={styles.moodCard}
              onPress={() => {}}
            >
              <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(mood.mood_score) }]} />
              <Text style={styles.moodEmoji}>{getMoodEmoji(mood.mood_score)}</Text>
              <Text style={styles.moodScore}>{mood.mood_score}/10</Text>
              <Text style={styles.moodTime}>{formatTime(mood.created_at)}</Text>
              {mood.text_content && (
                <View style={styles.noteIndicator}>
                  <Icon name="mood" size={12} color={Colors.secondaryLabel} />
                </View>
              )}
            </AnimatedCard>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="mood" size={48} color={Colors.tertiaryLabel} />
            <Text style={styles.emptyText}>No moods yet</Text>
            <Text style={styles.emptySubtext}>Start tracking!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.title3,
    color: Colors.label,
  },
  subtitle: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    marginTop: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    ...Typography.subhead,
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  moodCard: {
    width: 120,
    alignItems: 'center',
    position: 'relative',
    marginRight: Spacing.sm,
  },
  moodIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: BorderRadius.large,
    borderTopRightRadius: BorderRadius.large,
  },
  moodEmoji: {
    fontSize: 36,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  moodScore: {
    ...Typography.headline,
    color: Colors.label,
    fontWeight: '700',
  },
  moodTime: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
    marginTop: 4,
  },
  noteIndicator: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  emptyState: {
    width: 280,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.secondaryLabel,
    marginTop: Spacing.sm,
  },
  emptySubtext: {
    ...Typography.footnote,
    color: Colors.tertiaryLabel,
    marginTop: 4,
  },
});