import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { MoodGallery } from '../components/MoodGallery';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useMood } from '../contexts/MoodContext';
import { generateMockMoodEntries, MockMoodEntry } from '../utils/mockMoodData';

export function HistoryScreenV2() {
  const { moodStats, fetchMoodStats } = useMood();
  const [mockEntries, setMockEntries] = useState<MockMoodEntry[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'week' | 'month'>('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Generate more entries for history
    setMockEntries(generateMockMoodEntries(30));
    fetchMoodStats();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setMockEntries(generateMockMoodEntries(30));
      fetchMoodStats();
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleMoodBoxPress = (entry: MockMoodEntry) => {
    Alert.alert(
      'Mood Details',
      `Date: ${entry.created_at}\nScore: ${entry.mood_score}/10\n${entry.note || entry.emoji || 'No details'}`,
      [{ text: 'OK' }]
    );
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Mood Journey</Text>
          <Text style={styles.subtitle}>
            {mockEntries.length} entries • {moodStats?.averageScore.toFixed(1) || '0.0'} avg
          </Text>
        </View>

        {/* Filter Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterPill,
                selectedFilter === filter.key && styles.filterPillActive
              ]}
              onPress={() => setSelectedFilter(filter.key as any)}
            >
              <Text 
                style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Mood Gallery */}
        <View style={styles.galleryContainer}>
          <MoodGallery 
            entries={mockEntries} 
            onItemPress={handleMoodBoxPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
  },
  
  // Header
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.title1,
    color: Colors.label,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.secondaryLabel,
  },
  
  // Filters
  filterContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  filterPill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.round,
    marginRight: Spacing.sm,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    ...Typography.callout,
    color: Colors.label,
    fontWeight: '500',
  },
  filterTextActive: {
    color: Colors.secondaryBackground,
  },
  
  // Gallery
  galleryContainer: {
    paddingTop: Spacing.sm,
  },
});