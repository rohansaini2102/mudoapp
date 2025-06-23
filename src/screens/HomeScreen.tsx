import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform, Animated } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import { QuickStats } from '../components/QuickStats';
import { RecentMoodHistory } from '../components/RecentMoodHistory';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { AnimatedCard } from '../components/AnimatedCard';
import { Icon } from '../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing } from '../constants/theme';

export function HomeScreen() {
  const { user, signOut } = useAuth();
  const { moodStats, fetchMoodStats } = useMood();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchMoodStats();
  }, []);

  const handleLogMood = () => {
    navigation.navigate('MoodEntry' as never);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Set to false for web compatibility
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.email?.split('@')[0] || 'there'}!</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}</Text>
          </View>
        </Animated.View>

        <AnimatedCard style={styles.statsCard}>
          <QuickStats stats={moodStats} />
        </AnimatedCard>

        <RecentMoodHistory moods={moodStats?.weekMoods || []} />

        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.actionCards}>
            <AnimatedCard 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Insights' as never)}
              index={0}
            >
              <Icon name="trending" size={32} color={Colors.primary} />
              <Text style={styles.actionTitle}>View Trends</Text>
              <Text style={styles.actionSubtitle}>Analyze patterns</Text>
            </AnimatedCard>
            
            <AnimatedCard 
              style={styles.actionCard}
              onPress={() => navigation.navigate('History' as never)}
              index={1}
            >
              <Icon name="calendar" size={32} color={Colors.purple} />
              <Text style={styles.actionTitle}>Full History</Text>
              <Text style={styles.actionSubtitle}>All entries</Text>
            </AnimatedCard>
          </View>
        </View>
      </Animated.ScrollView>
      
      <FloatingActionButton onPress={handleLogMood} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.title1,
    color: Colors.label,
    fontWeight: '700',
  },
  date: {
    ...Typography.body,
    color: Colors.secondaryLabel,
    marginTop: 4,
  },
  statsCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: 'transparent',
    padding: 0,
  },
  quickActions: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  quickActionsTitle: {
    ...Typography.title3,
    color: Colors.label,
    marginBottom: Spacing.md,
  },
  actionCards: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  actionTitle: {
    ...Typography.headline,
    color: Colors.label,
    marginTop: Spacing.sm,
  },
  actionSubtitle: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    marginTop: 2,
  },
});