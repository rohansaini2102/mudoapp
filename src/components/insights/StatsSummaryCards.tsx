import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Typography, Spacing, BorderRadius, Shadow, GlassMorphism } from '../../constants/theme';
import { MoodStatistics, MOOD_LABELS } from '../../utils/moodAnalytics';
import { Icon } from '../Icon';

interface StatsSummaryCardsProps {
  stats: MoodStatistics;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: string;
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <View style={styles.cardWrapper}>
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={GlassMorphism.blur.medium}
          tint="light"
          style={styles.card}
        >
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Icon name={icon} size={20} color={color} />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardValue}>{value}</Text>
          {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        </BlurView>
      ) : (
        <View style={styles.androidCard}>
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Icon name={icon} size={20} color={color} />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardValue}>{value}</Text>
          {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        </View>
      )}
    </View>
  );
}

export function StatsSummaryCards({ stats }: StatsSummaryCardsProps) {
  const moodInfo = MOOD_LABELS.find(m => m.value === Math.round(stats.average)) || MOOD_LABELS[4];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <StatCard
        title="Average Mood"
        value={stats.average.toFixed(1)}
        subtitle={`${moodInfo.emoji} ${moodInfo.label}`}
        icon="analytics"
        color={Colors.primary}
      />
      
      <StatCard
        title="Current Streak"
        value={stats.currentStreak}
        subtitle={stats.currentStreak === 1 ? "day" : "days"}
        icon="flame"
        color="#FF9500"
      />
      
      <StatCard
        title="Total Entries"
        value={stats.totalEntries}
        subtitle="All time"
        icon="list"
        color="#34C759"
      />
      
      <StatCard
        title="Mood Stability"
        value={stats.standardDeviation < 1.5 ? 'High' : stats.standardDeviation < 2.5 ? 'Medium' : 'Low'}
        subtitle={`Consistency score`}
        icon="pulse"
        color="#007AFF"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  cardWrapper: {
    width: 150,
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
    ...GlassMorphism.shadow.glassSubtle,
  },
  card: {
    padding: Spacing.lg,
    backgroundColor: GlassMorphism.backgroundColor.card,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.default,
  },
  androidCard: {
    backgroundColor: GlassMorphism.backgroundColor.cardAndroid,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.subtle,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
    marginBottom: Spacing.xs,
  },
  cardValue: {
    ...Typography.title1,
    color: Colors.label,
    fontWeight: '700',
  },
  cardSubtitle: {
    ...Typography.footnote,
    color: Colors.tertiaryLabel,
    marginTop: Spacing.xs,
  },
});