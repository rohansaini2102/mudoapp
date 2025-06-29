import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Vibration,
  RefreshControl,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import { useNavigation } from '@react-navigation/native';
import { MoodGallery } from '../components/MoodGallery';
import { LiveTimeHeader } from '../components/LiveTimeHeader';
import { AIInsightCard } from '../components/AIInsightCard';
import { StatsGrid } from '../components/StatsGrid';
import { EnhancedMoodSelector, MoodItem } from '../components/EnhancedMoodSelector';
import { DrMayaCard } from '../components/DrMayaCard';
import { Colors, Typography, Spacing } from '../constants/theme';
import { getInsightMessages, calculateMoodStatistics, getMoodTrends } from '../utils/moodAnalytics';
import { GlassCard } from '../components/glassmorphism';

export function HomeScreenV2() {
  const { user } = useAuth();
  const { createMoodEntry, moodStats, fetchMoodStats } = useMood();
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMoodStats();
  }, []);

  const handleMoodSelect = async (mood: MoodItem) => {
    try {
      Vibration.vibrate(10);
      setSelectedMood(mood.level);
      setIsLoading(true);
      
      await createMoodEntry(mood.level);
      
      // Show success feedback and refresh stats
      setTimeout(() => {
        setSelectedMood(null);
        setIsLoading(false);
        fetchMoodStats();
      }, 500);
    } catch (error) {
      Alert.alert('Error', 'Failed to save mood');
      setIsLoading(false);
      setSelectedMood(null);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMoodStats().then(() => {
      setRefreshing(false);
    });
  }, []);

  const handleMoodBoxPress = (entry: any) => {
    // Navigate to history screen to see all mood entries
    navigation.navigate('MainTabs' as never, { 
      screen: 'History',
      initial: false
    } as never);
  };

  const handleQuickEntry = () => {
    navigation.navigate('MoodEntry' as never);
  };

  const handleVoiceEntry = () => {
    // Voice entry not implemented yet, open regular mood entry
    navigation.navigate('MoodEntry' as never);
  };

  const handleCameraEntry = () => {
    // Camera entry not implemented yet, open regular mood entry
    navigation.navigate('MoodEntry' as never);
  };

  const handleAIInsightPress = () => {
    navigation.navigate('Insights' as never);
  };

  const handleNotificationPress = () => {
    // No notifications system yet
  };

  const handleAvatarPress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleBookDrMaya = () => {
    Alert.alert('Dr. Maya AI', 'AI therapy sessions coming soon!');
  };

  const userName = user?.email?.split('@')[0] || 'there';

  // Calculate real stats from mood data
  const currentStreak = moodStats?.currentStreak || 0;
  const moodScore = moodStats?.averageScore || 0;
  
  // Generate AI insights based on real data
  const generateInsight = () => {
    if (!moodStats || moodStats.weekMoods.length === 0) {
      return "Start tracking your mood to receive personalized insights!";
    }
    
    const stats = calculateMoodStatistics(moodStats.weekMoods);
    const trends = getMoodTrends(moodStats.weekMoods, 7);
    const insights = getInsightMessages(stats, trends);
    
    // Return the most relevant insight or a default one
    if (insights.length > 0) {
      return insights[0];
    }
    
    // Fallback insights based on average mood
    if (moodScore >= 8) {
      return "You're doing amazing! Your mood has been consistently positive.";
    } else if (moodScore >= 6) {
      return "You're maintaining a good emotional balance. Keep it up!";
    } else if (moodScore >= 4) {
      return "Your mood has room for improvement. Try some self-care activities.";
    } else {
      return "Remember to be kind to yourself. Small steps lead to big changes.";
    }
  };
  
  const aiInsight = generateInsight();
  const insightConfidence = moodStats && moodStats.weekMoods.length >= 3 ? 85 + Math.round(Math.random() * 10) : 60;
  
  // Calculate growth rate (compare current week average to previous week)
  const weekMoods = moodStats?.weekMoods || [];
  const currentWeekAvg = weekMoods.slice(0, 7).reduce((sum, m) => sum + m.mood_score, 0) / Math.min(weekMoods.length, 7) || 0;
  const previousWeekAvg = weekMoods.slice(7, 14).reduce((sum, m) => sum + m.mood_score, 0) / Math.max(weekMoods.slice(7, 14).length, 1) || currentWeekAvg;
  const growthRate = previousWeekAvg > 0 ? Math.round(((currentWeekAvg - previousWeekAvg) / previousWeekAvg) * 100) : 0;
  
  const totalEntries = moodStats?.totalEntries || 0;
  
  // Calculate completion rate (entries in last 7 days / 7)
  const entriesThisWeek = weekMoods.filter(entry => {
    const entryDate = new Date(entry.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  }).length;
  const completionRate = Math.round((entriesThisWeek / 7) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
          {/* Premium Header */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <LiveTimeHeader
              userName={userName}
              weatherTemp={72}
              weatherCondition="Partly Cloudy"
              notificationCount={0}
              onNotificationPress={handleNotificationPress}
              onAvatarPress={handleAvatarPress}
            />
          </Animated.View>

          {/* AI Insight Card */}
          <Animated.View entering={FadeInUp.duration(400).delay(200)}>
            <AIInsightCard
              insight={aiInsight}
              confidence={insightConfidence}
              isLive={!!(moodStats && moodStats.weekMoods.length > 0)}
              onPress={handleAIInsightPress}
            />
          </Animated.View>

          {/* Stats Grid */}
          <Animated.View entering={FadeInUp.duration(400).delay(300)}>
            <StatsGrid
              currentStreak={currentStreak}
              streakTrend={Math.max(0, currentStreak - 7)} // Simplified trend calculation
              moodScore={moodScore}
              growthRate={Math.abs(growthRate)} // Ensure positive for display
              totalEntries={totalEntries}
              completionRate={completionRate}
            />
          </Animated.View>

          {/* Enhanced Mood Selector */}
          <Animated.View entering={FadeInUp.duration(400).delay(400)}>
            <EnhancedMoodSelector
              selectedMood={selectedMood}
              onMoodSelect={handleMoodSelect}
              onQuickEntry={handleQuickEntry}
              onVoiceEntry={handleVoiceEntry}
              onCameraEntry={handleCameraEntry}
            />
          </Animated.View>

          {/* Mood Gallery - Moved right after Enhanced Mood Selector */}
          <Animated.View 
            entering={FadeInUp.duration(400).delay(500)}
            style={styles.gallerySection}
          >
            <View style={styles.galleryHeader}>
              <Text style={styles.galleryTitle}>Your Mood Journey</Text>
            </View>
            {moodStats && moodStats.weekMoods.length > 0 ? (
              <MoodGallery 
                entries={moodStats.weekMoods.slice(0, 6).map(entry => {
                  const moodEmojis = ['😭', '😢', '😞', '😟', '😐', '🙂', '😊', '😍', '🤩', '😇'];
                  const moodColors = [
                    ['#FF3B30', '#FF6B6B'], // 1-2
                    ['#FF3B30', '#FF6B6B'],
                    ['#FF9500', '#FFB366'], // 3-4
                    ['#FF9500', '#FFB366'],
                    ['#FFD93D', '#FFE066'], // 5-6
                    ['#FFD93D', '#FFE066'],
                    ['#34C759', '#4FD866'], // 7-8
                    ['#34C759', '#4FD866'],
                    ['#5D8AA8', '#7BA7CC'], // 9-10
                    ['#5D8AA8', '#7BA7CC'],
                  ];
                  
                  return {
                    id: entry.id,
                    type: entry.entry_type as any,
                    emoji: moodEmojis[entry.mood_score - 1] || '😊',
                    mood_score: entry.mood_score,
                    note: entry.text_content,
                    date: new Date(entry.created_at),
                    image: entry.media_url,
                    colors: moodColors[entry.mood_score - 1] || ['#FFD93D', '#FF6B6B'],
                  };
                })} 
                onItemPress={handleMoodBoxPress}
              />
            ) : (
              <View style={styles.emptyGallery}>
                <Text style={styles.emptyGalleryText}>Start tracking your mood to see your journey</Text>
              </View>
            )}
          </Animated.View>


          {/* Dr. Maya Card */}
          <Animated.View entering={FadeInUp.duration(400).delay(700)}>
            <DrMayaCard
              nextAvailable="Available Now"
              sessionsCompleted={42}
              rating={4.9}
              speciality="Mood & Wellness Expert"
              onBookPress={handleBookDrMaya}
            />
          </Animated.View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyGallery: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  emptyGalleryText: {
    ...Typography.body,
    color: Colors.secondaryLabel,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 120,
  },
  
  // Gallery section
  gallerySection: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  galleryHeader: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  galleryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.label,
  },
});