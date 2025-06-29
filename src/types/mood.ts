export interface MoodEntry {
  id: string;
  user_id: string;
  mood_score: number;
  entry_type: 'text' | 'image' | 'video' | 'voice';
  text_content?: string;
  media_url?: string;
  created_at: string;
  synced: boolean;
}

export interface MoodStats {
  todayMood?: MoodEntry;
  weekMoods: MoodEntry[];
  averageScore: number;
  totalEntries: number;
  currentStreak?: number;
  longestStreak?: number;
  weekdayAverages?: Record<string, number>;
  standardDeviation?: number;
}

export interface MoodContextType {
  currentMood: number;
  setCurrentMood: (mood: number) => void;
  moodStats: MoodStats | null;
  loading: boolean;
  createMoodEntry: (mood: number, text?: string, imageUri?: string, voiceUri?: string) => Promise<void>;
  fetchMoodStats: () => Promise<void>;
}