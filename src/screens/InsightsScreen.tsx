import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, GlassMorphism } from '../constants/theme';
import { GlassCard } from '../components/glassmorphism';
import { useMood } from '../contexts/MoodContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MoodEntry } from '../types/mood';
import { 
  calculateMoodStatistics, 
  getMoodTrends, 
  getInsightMessages,
  MoodStatistics 
} from '../utils/moodAnalytics';
import { PeriodSelector, Period } from '../components/insights/PeriodSelector';
import { StatsSummaryCards } from '../components/insights/StatsSummaryCards';
import { MoodTrendsChart } from '../components/insights/MoodTrendsChart';
import { PatternAnalysis } from '../components/insights/PatternAnalysis';
import { MoodHeatmapCalendar } from '../components/insights/MoodHeatmapCalendar';
import { MoodTriggers } from '../components/insights/MoodTriggers';
import { WeeklyDigest } from '../components/insights/WeeklyDigest';

export function InsightsScreen() {
  const { user } = useAuth();
  const { fetchMoodStats } = useMood();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30days');
  const [allEntries, setAllEntries] = useState<MoodEntry[]>([]);
  const [stats, setStats] = useState<MoodStatistics | null>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, [user, selectedPeriod]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch all mood entries
      let query = supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Apply date filter based on selected period
      if (selectedPeriod !== 'all') {
        const days = selectedPeriod === '7days' ? 7 : selectedPeriod === '30days' ? 30 : 90;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        query = query.gte('created_at', startDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      const entries = data || [];
      setAllEntries(entries);

      // Calculate statistics
      const statistics = calculateMoodStatistics(entries);
      setStats(statistics);

      // Get trends for chart
      const periodDays = selectedPeriod === '7days' ? 7 : selectedPeriod === '30days' ? 30 : selectedPeriod === '90days' ? 90 : 365;
      const trendData = getMoodTrends(entries, periodDays);
      setTrends(trendData);

      // Generate insights
      const insightMessages = getInsightMessages(statistics, trendData);
      setInsights(insightMessages);

    } catch (error) {
      console.error('Error fetching insights data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    fetchMoodStats();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading insights...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>Discover your mood patterns</Text>
        </View>

        {/* Period Selector */}
        <PeriodSelector 
          selectedPeriod={selectedPeriod} 
          onPeriodChange={setSelectedPeriod} 
        />

        {/* Weekly Digest - Show first for immediate value */}
        {allEntries.length > 0 && (
          <WeeklyDigest 
            entries={allEntries} 
            onSharePress={() => {
              Alert.alert('Share', 'Sharing feature coming soon!');
            }}
          />
        )}

        {/* Mood Trends Chart - Core visualization */}
        {trends.length > 0 && <MoodTrendsChart data={trends} />}

        {/* Mood Heatmap Calendar - Visual appeal */}
        {allEntries.length > 0 && (
          <MoodHeatmapCalendar 
            entries={allEntries}
            onDayPress={(date, entries) => {
              if (entries.length > 0) {
                const avgMood = entries.reduce((sum, e) => sum + e.mood_score, 0) / entries.length;
                Alert.alert(
                  date.toLocaleDateString(),
                  `${entries.length} entries, average mood: ${avgMood.toFixed(1)}/10`
                );
              }
            }}
          />
        )}

        {/* Pattern Analysis - Actionable insights */}
        {stats && <PatternAnalysis stats={stats} />}

        {/* Statistics Summary - Key metrics */}
        {stats && <StatsSummaryCards stats={stats} />}

        {/* AI Insights - More personalized */}
        {insights.length > 0 && (
          <View style={styles.insightsContainer}>
            <Text style={styles.sectionTitle}>Personalized Insights</Text>
            {insights.slice(0, 2).map((insight, index) => (
              <GlassCard key={index} style={styles.insightGlassCard}>
                <Text style={styles.insightEmoji}>💡</Text>
                <Text style={styles.insightText}>{insight}</Text>
              </GlassCard>
            ))}
          </View>
        )}

        {/* Mood Triggers Analysis - Keep at bottom */}
        {allEntries.length > 0 && (
          <MoodTriggers 
            entries={allEntries}
            period={selectedPeriod}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.body,
    color: Colors.secondaryLabel,
    marginTop: Spacing.md,
  },
  insightsContainer: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.title3,
    color: Colors.label,
    marginBottom: Spacing.md,
  },
  insightGlassCard: {
    marginBottom: Spacing.md,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  insightEmoji: {
    fontSize: 24,
  },
  insightText: {
    ...Typography.callout,
    color: Colors.label,
    flex: 1,
    lineHeight: 22,
  },
});