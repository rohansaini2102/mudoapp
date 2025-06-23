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
import { PeacefulSoundsWidget } from '../components/PeacefulSoundsWidget';
import { DrMayaCard } from '../components/DrMayaCard';
import { Colors, Typography, Spacing } from '../constants/theme';
import { generateMockMoodEntries, MockMoodEntry } from '../utils/mockMoodData';

export function HomeScreenV2() {
  const { user } = useAuth();
  const { createMoodEntry, moodStats, fetchMoodStats } = useMood();
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mockEntries, setMockEntries] = useState<MockMoodEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchMoodStats();
    // Generate 6 entries for home page gallery
    setMockEntries(generateMockMoodEntries(6));
  }, []);

  const handleMoodSelect = async (mood: MoodItem) => {
    try {
      Vibration.vibrate(10);
      setSelectedMood(mood.level);
      setIsLoading(true);
      
      await createMoodEntry(mood.level);
      
      // Show success feedback and refresh gallery
      setTimeout(() => {
        setSelectedMood(null);
        setIsLoading(false);
        fetchMoodStats();
        // Refresh mood gallery
        setMockEntries(generateMockMoodEntries(6));
      }, 500);
    } catch (error) {
      Alert.alert('Error', 'Failed to save mood');
      setIsLoading(false);
      setSelectedMood(null);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setMockEntries(generateMockMoodEntries(6));
      fetchMoodStats();
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleMoodBoxPress = (entry: MockMoodEntry) => {
    Alert.alert(
      'Mood Entry',
      `Score: ${entry.mood_score}/10\n${entry.note || entry.emoji || 'No details'}`,
      [{ text: 'OK' }]
    );
  };

  const handleQuickEntry = () => {
    navigation.navigate('MoodEntry' as never);
  };

  const handleVoiceEntry = () => {
    Alert.alert('Voice Entry', 'Voice recording feature coming soon!');
  };

  const handleCameraEntry = () => {
    Alert.alert('Photo Entry', 'Photo mood capture coming soon!');
  };

  const handleAIInsightPress = () => {
    navigation.navigate('Insights' as never);
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'No new notifications');
  };

  const handleAvatarPress = () => {
    navigation.navigate('Profile' as never);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBookDrMaya = () => {
    Alert.alert('Dr. Maya AI', 'AI therapy sessions coming soon!');
  };

  const userName = user?.email?.split('@')[0] || 'there';

  // Mock data for premium features
  const currentStreak = moodStats?.weekMoods.length || 7;
  const moodScore = moodStats?.averageScore || 7.8;
  const growthRate = 24;
  const totalEntries = 156;
  const completionRate = 88;

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
              insight="Your mood has improved 15% this week. Keep up the positive momentum!"
              confidence={87}
              isLive={true}
              onPress={handleAIInsightPress}
            />
          </Animated.View>

          {/* Stats Grid */}
          <Animated.View entering={FadeInUp.duration(400).delay(300)}>
            <StatsGrid
              currentStreak={currentStreak}
              streakTrend={2}
              moodScore={moodScore}
              growthRate={growthRate}
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
            <MoodGallery 
              entries={mockEntries} 
              onItemPress={handleMoodBoxPress}
            />
          </Animated.View>

          {/* Peaceful Sounds Widget */}
          <Animated.View entering={FadeInUp.duration(400).delay(600)}>
            <PeacefulSoundsWidget
              trackName="Peaceful Morning"
              category="Meditation Sounds"
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onSkip={() => Alert.alert('Skip', 'Next track')}
            />
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