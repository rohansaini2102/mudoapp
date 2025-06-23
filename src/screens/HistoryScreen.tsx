import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useMood } from '../contexts/MoodContext';

export function HistoryScreen() {
  const { moodStats } = useMood();

  const getMoodEmoji = (score: number) => {
    if (score <= 2) return '😔';
    if (score <= 4) return '😐';
    if (score <= 6) return '🙂';
    if (score <= 8) return '😊';
    return '🤗';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>Your mood journey</Text>
        </View>

        {moodStats?.weekMoods && moodStats.weekMoods.length > 0 ? (
          moodStats.weekMoods.map((mood, index) => (
            <TouchableOpacity key={mood.id} style={styles.moodItem}>
              <View style={styles.moodLeft}>
                <Text style={styles.moodEmoji}>{getMoodEmoji(mood.mood_score)}</Text>
                <View style={styles.moodInfo}>
                  <Text style={styles.moodDate}>{formatDate(mood.created_at)}</Text>
                  <Text style={styles.moodTime}>{formatTime(mood.created_at)}</Text>
                </View>
              </View>
              <View style={styles.moodRight}>
                <Text style={styles.moodScore}>{mood.mood_score}</Text>
                {mood.text_content && (
                  <Text style={styles.noteIndicator}>📝</Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📊</Text>
            <Text style={styles.emptyTitle}>No mood entries yet</Text>
            <Text style={styles.emptySubtitle}>Start logging your moods to see your history</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.label,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.secondaryLabel,
  },
  moodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBackground,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
  },
  moodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  moodInfo: {
    justifyContent: 'center',
  },
  moodDate: {
    ...Typography.body,
    color: Colors.label,
    marginBottom: 2,
  },
  moodTime: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
  },
  moodRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  moodScore: {
    ...Typography.title2,
    color: Colors.primary,
    fontWeight: '700',
  },
  noteIndicator: {
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: Spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    ...Typography.title3,
    color: Colors.label,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.secondaryLabel,
    textAlign: 'center',
  },
});