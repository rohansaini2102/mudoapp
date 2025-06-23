import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import { MoodScoreRing } from '../components/MoodScoreRing';
import { QuickStatsCard } from '../components/QuickStatsCard';
import { MoodGallery } from '../components/MoodGallery';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { GradientBackground } from '../components/GradientBackground';
import { Icon } from '../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius, Gradients } from '../constants/theme';
import {
  generateMockMoodEntries,
  getMockUserStats,
  getRecentMoodPills,
  MockMoodEntry,
} from '../utils/mockMoodData';

export function HomeScreenNew() {
  const { user } = useAuth();
  const { moodStats, fetchMoodStats } = useMood();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Mock data states
  const [mockEntries, setMockEntries] = useState<MockMoodEntry[]>([]);
  const [mockStats] = useState(getMockUserStats());
  const [recentPills] = useState(getRecentMoodPills());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Generate initial mock data - only 5 recent entries
    setMockEntries(generateMockMoodEntries(5));
    fetchMoodStats();
  }, []);

  const handleLogMood = () => {
    navigation.navigate('MoodEntry' as never);
  };

  const handleMoodBoxPress = (entry: MockMoodEntry) => {
    Alert.alert(
      'Mood Entry',
      `Score: ${entry.mood_score}/10\n${entry.note || entry.emoji || 'No details'}`,
      [{ text: 'OK' }]
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setMockEntries(generateMockMoodEntries(5));
      setRefreshing(false);
    }, 1000);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.email?.split('@')[0] || 'there';
  const userAvatar = userName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => navigation.navigate('Profile' as never)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{userAvatar}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.scoreContainer}>
            <MoodScoreRing score={mockStats.currentMoodScore} />
          </View>
          <QuickStatsCard
            streak={mockStats.streak}
            positivityPercentage={mockStats.positivityPercentage}
          />
        </View>

        {/* Recent Moods Pills */}
        <View style={[styles.recentMoodsSection, styles.sectionSeparator]}>
          <Text style={styles.sectionTitle}>Recent moods</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillsContainer}
          >
            {recentPills.map((pill, index) => (
              <TouchableOpacity key={index} style={styles.moodPill}>
                <Text style={styles.pillEmoji}>{pill.emoji}</Text>
                <View style={styles.pillTextContainer}>
                  <Text style={styles.pillLabel}>{pill.label}</Text>
                  <Text style={styles.pillTime}>{pill.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Mood Gallery */}
        <View style={styles.gallerySection}>
          <MoodGallery entries={mockEntries} onItemPress={handleMoodBoxPress} />
          
          {/* View All Button */}
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('History' as never)}
          >
            <Text style={styles.viewAllText}>View All Entries</Text>
            <Icon name="chevronRight" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FloatingActionButton onPress={handleLogMood} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground, // Changed to white for consistency
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  
  // Header styles
  header: {
    backgroundColor: Colors.secondaryBackground,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opaqueSeparator,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...Typography.largeTitle,
    color: Colors.label,
  },
  avatarContainer: {
    padding: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  
  // Stats section
  statsSection: {
    backgroundColor: Colors.secondaryBackground,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  scoreContainer: {
    marginBottom: Spacing.lg,
  },
  
  // Section separator
  sectionSeparator: {
    borderTopWidth: 1,
    borderTopColor: Colors.opaqueSeparator,
  },
  
  // Recent moods section
  recentMoodsSection: {
    paddingTop: Spacing.lg,
    backgroundColor: Colors.secondaryBackground,
  },
  sectionTitle: {
    ...Typography.title3,
    color: Colors.label,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  pillsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  moodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.systemGray6,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
    marginRight: Spacing.sm,
  },
  pillEmoji: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  pillTextContainer: {
    marginRight: Spacing.xs,
  },
  pillLabel: {
    ...Typography.footnote,
    fontWeight: '600',
    color: Colors.label,
  },
  pillTime: {
    ...Typography.caption2,
    color: Colors.secondaryLabel,
  },
  
  // Gallery section
  gallerySection: {
    paddingTop: Spacing.lg,
    backgroundColor: Colors.secondaryBackground, // Keep consistent white background
  },
  
  // View All button
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.large,
  },
  viewAllText: {
    ...Typography.headline,
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
});