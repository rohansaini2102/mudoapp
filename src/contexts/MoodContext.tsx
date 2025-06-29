import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MoodEntry, MoodStats, MoodContextType } from '../types/mood';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { checkAndSeedData } from '../utils/seedDummyData';
import { calculateMoodStatistics } from '../utils/moodAnalytics';

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentMood, setCurrentMood] = useState(5);
  const [moodStats, setMoodStats] = useState<MoodStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Automatically seed dummy data if no entries exist
      checkAndSeedData(user.id).then(() => {
        fetchMoodStats();
      });
    }
  }, [user]);

  const fetchMoodStats = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get today's mood entries
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString();

      const { data: todayData, error: todayError } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', todayStr)
        .order('created_at', { ascending: false })
        .limit(1);

      if (todayError) throw todayError;

      // Get last 7 days of mood entries
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 6);
      const weekAgoStr = weekAgo.toISOString();

      const { data: weekData, error: weekError } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', weekAgoStr)
        .order('created_at', { ascending: false });

      if (weekError) throw weekError;

      // Calculate basic stats
      const totalEntries = weekData?.length || 0;
      const averageScore = totalEntries > 0
        ? weekData.reduce((sum, entry) => sum + entry.mood_score, 0) / totalEntries
        : 0;

      // Get all entries for comprehensive statistics
      const { data: allData, error: allError } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (allError) throw allError;

      // Calculate comprehensive statistics
      const fullStats = calculateMoodStatistics(allData || []);

      setMoodStats({
        todayMood: todayData?.[0] || undefined,
        weekMoods: weekData || [],
        averageScore: Math.round(averageScore * 10) / 10,
        totalEntries: fullStats.totalEntries,
        currentStreak: fullStats.currentStreak,
        longestStreak: fullStats.longestStreak,
        weekdayAverages: fullStats.weekdayAverages,
        standardDeviation: fullStats.standardDeviation,
      });
    } catch (error) {
      console.error('Error fetching mood stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const createMoodEntry = async (mood: number, text?: string, imageUri?: string, voiceUri?: string) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      // Determine entry type based on what media is provided
      let entryType: 'text' | 'image' | 'voice' = 'text';
      let mediaUrl: string | null = null;

      if (imageUri) {
        entryType = 'image';
        // TODO: Upload image to Supabase storage and get URL
        // For now, we'll just store the local URI (won't work across devices)
        mediaUrl = imageUri;
      } else if (voiceUri) {
        entryType = 'voice';
        // TODO: Upload voice recording to Supabase storage and get URL
        // For now, we'll just store the local URI (won't work across devices)
        mediaUrl = voiceUri;
      }

      const entry: any = {
        user_id: user.id,
        mood_score: mood,
        entry_type: entryType,
        text_content: text || null,
        media_url: mediaUrl,
        synced: true,
      };

      const { data, error } = await supabase
        .from('mood_entries')
        .insert([entry])
        .select()
        .single();

      if (error) throw error;

      // Refresh stats after creating entry
      await fetchMoodStats();

      return data;
    } catch (error) {
      console.error('Error creating mood entry:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: MoodContextType = {
    currentMood,
    setCurrentMood,
    moodStats,
    loading,
    createMoodEntry,
    fetchMoodStats,
  };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}