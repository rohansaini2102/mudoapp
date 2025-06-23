import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { MoodStats } from '../types/mood';

interface QuickStatsProps {
  stats: MoodStats | null;
}

export function QuickStats({ stats }: QuickStatsProps) {
  const getDayName = (date: string) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(date).getDay()];
  };

  const getMoodEmoji = (score: number) => {
    if (score <= 2) return '😔';
    if (score <= 4) return '😐';
    if (score <= 6) return '🙂';
    if (score <= 8) return '😊';
    return '🤗';
  };

  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    
    return days;
  };

  const getMoodForDay = (targetDate: Date) => {
    if (!stats?.weekMoods) return null;
    
    const targetDateStr = targetDate.toISOString().split('T')[0];
    const dayMoods = stats.weekMoods.filter(mood => {
      const moodDate = new Date(mood.created_at).toISOString().split('T')[0];
      return moodDate === targetDateStr;
    });
    
    if (dayMoods.length === 0) return null;
    
    const avgScore = dayMoods.reduce((sum, mood) => sum + mood.mood_score, 0) / dayMoods.length;
    return Math.round(avgScore);
  };

  return (
    <View style={styles.container}>
      <View style={styles.todaySection}>
        <Text style={styles.label}>Today</Text>
        <Text style={styles.todayScore}>
          {stats?.todayMood ? stats.todayMood.mood_score : '-'}
        </Text>
        <Text style={styles.todayEmoji}>
          {stats?.todayMood ? getMoodEmoji(stats.todayMood.mood_score) : '😐'}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.weekSection}>
        <View style={styles.weekGrid}>
          {getLast7Days().map((date, index) => {
            const moodScore = getMoodForDay(date);
            const isToday = index === 6;
            
            return (
              <View key={index} style={styles.dayColumn}>
                <Text style={[styles.dayName, isToday && styles.todayText]}>
                  {getDayName(date.toISOString())}
                </Text>
                <Text style={[styles.dayScore, isToday && styles.todayText]}>
                  {moodScore || '-'}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    ...(Platform.OS === 'web' 
      ? { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        }
    ),
  },
  todaySection: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 17,
    color: '#8E8E93',
    marginBottom: 8,
  },
  todayScore: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  todayEmoji: {
    fontSize: 32,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 20,
  },
  weekSection: {
    paddingVertical: 8,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayName: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 4,
  },
  dayScore: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  todayText: {
    color: '#007AFF',
  },
});