import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Icon } from './Icon';
import { Colors, Typography, Spacing, BorderRadius, GlassMorphism } from '../constants/theme';

interface StatCardProps {
  icon: string;
  iconColors: string[];
  label: string;
  value: string | number;
  subtitle: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  progress?: number; // 0-5 for dots
}

interface StatsGridProps {
  currentStreak: number;
  streakTrend: number;
  moodScore: number;
  growthRate: number;
  totalEntries: number;
  completionRate: number;
}

function StatCard({
  icon,
  iconColors,
  label,
  value,
  subtitle,
  trend,
  progress,
}: StatCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.95}>
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={GlassMorphism.blur.medium}
          tint="light"
          style={styles.blurView}
        >
          <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <LinearGradient
            colors={iconColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Icon name={icon} size={20} color="#FFFFFF" />
          </LinearGradient>
          {trend && (
            <View style={[styles.trendBadge, trend.positive && styles.trendPositive]}>
              {trend.positive ? (
                <Icon name="trending" size={12} color="#10B981" />
              ) : (
                <Text style={styles.trendText}>{trend.value}</Text>
              )}
            </View>
          )}
          {progress !== undefined && (
            <View style={styles.progressDots}>
              {[...Array(5)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i < progress && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={[styles.subtitle, trend?.positive && styles.subtitlePositive]}>
          {subtitle}
        </Text>
          </View>
        </BlurView>
      ) : (
        <View style={styles.androidCard}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <LinearGradient
                colors={iconColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconContainer}
              >
                <Icon name={icon} size={20} color="#FFFFFF" />
              </LinearGradient>
              {trend && (
                <View style={[styles.trendBadge, trend.positive && styles.trendPositive]}>
                  {trend.positive ? (
                    <Icon name="trending" size={12} color="#10B981" />
                  ) : (
                    <Text style={styles.trendText}>{trend.value}</Text>
                  )}
                </View>
              )}
              {progress !== undefined && (
                <View style={styles.progressDots}>
                  {[...Array(5)].map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        i < progress && styles.dotActive,
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
            <Text style={[styles.subtitle, trend?.positive && styles.subtitlePositive]}>
              {subtitle}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function StatsGrid({
  currentStreak,
  streakTrend,
  moodScore,
  growthRate,
  totalEntries,
  completionRate,
}: StatsGridProps) {
  const stats = [
    {
      icon: 'zap',
      iconColors: [Colors.primary, Colors.primaryLight],
      label: 'Current Streak',
      value: currentStreak,
      subtitle: `+${streakTrend} from last week`,
      trend: { value: '', positive: true },
    },
    {
      icon: 'target',
      iconColors: [Colors.label, Colors.systemGray],
      label: 'Mood Score',
      value: moodScore.toFixed(1),
      subtitle: 'Above average',
      progress: Math.round((moodScore / 10) * 5),
    },
    {
      icon: 'trending',
      iconColors: [Colors.primaryLight, Colors.primary],
      label: 'Growth Rate',
      value: `+${growthRate}%`,
      subtitle: 'This month',
      trend: { value: `+${growthRate}%`, positive: true },
    },
    {
      icon: 'calendar',
      iconColors: [Colors.systemGray, Colors.label],
      label: 'Total Entries',
      value: totalEntries,
      subtitle: `${completionRate}% completion`,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    borderRadius: BorderRadius.xlarge,
    overflow: 'hidden',
    ...GlassMorphism.shadow.glass,
  },
  blurView: {
    flex: 1,
    backgroundColor: GlassMorphism.backgroundColor.card,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.default,
  },
  androidCard: {
    flex: 1,
    backgroundColor: GlassMorphism.backgroundColor.cardAndroid,
    borderRadius: BorderRadius.xlarge,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.subtle,
  },
  cardContent: {
    padding: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  trendBadge: {
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.round,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  trendPositive: {
    backgroundColor: '#DCFCE7',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  progressDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.systemGray4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondaryLabel,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.label,
    lineHeight: 32,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.primary,
  },
  subtitlePositive: {
    color: '#10B981',
  },
});