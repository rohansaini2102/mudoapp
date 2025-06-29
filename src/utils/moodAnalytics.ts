import { MoodEntry } from '../types/mood';

export interface MoodStatistics {
  average: number;
  median: number;
  mode: number;
  min: number;
  max: number;
  standardDeviation: number;
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  moodDistribution: Record<number, number>;
  weekdayAverages: Record<string, number>;
  timeOfDayAverages: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
}

export interface MoodTrend {
  date: string;
  score: number;
  emoji: string;
  label: string;
  note?: string;
}

export const MOOD_LABELS = [
  { value: 1, emoji: '😭', label: 'Devastated' },
  { value: 2, emoji: '😢', label: 'Very Sad' },
  { value: 3, emoji: '😞', label: 'Sad' },
  { value: 4, emoji: '😟', label: 'Down' },
  { value: 5, emoji: '😐', label: 'Neutral' },
  { value: 6, emoji: '🙂', label: 'Good' },
  { value: 7, emoji: '😊', label: 'Happy' },
  { value: 8, emoji: '😍', label: 'Great' },
  { value: 9, emoji: '🤩', label: 'Amazing' },
  { value: 10, emoji: '😇', label: 'Euphoric' },
];

export function calculateMoodStatistics(entries: MoodEntry[]): MoodStatistics {
  if (entries.length === 0) {
    return {
      average: 0,
      median: 0,
      mode: 0,
      min: 0,
      max: 0,
      standardDeviation: 0,
      totalEntries: 0,
      currentStreak: 0,
      longestStreak: 0,
      moodDistribution: {},
      weekdayAverages: {},
      timeOfDayAverages: {
        morning: 0,
        afternoon: 0,
        evening: 0,
        night: 0,
      },
    };
  }

  // Sort entries by date
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Basic statistics
  const scores = entries.map(e => e.mood_score);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  // Median
  const sortedScores = [...scores].sort((a, b) => a - b);
  const median = sortedScores.length % 2 === 0
    ? (sortedScores[sortedScores.length / 2 - 1] + sortedScores[sortedScores.length / 2]) / 2
    : sortedScores[Math.floor(sortedScores.length / 2)];

  // Mode
  const frequency: Record<number, number> = {};
  scores.forEach(score => {
    frequency[score] = (frequency[score] || 0) + 1;
  });
  const mode = Number(Object.entries(frequency).sort((a, b) => b[1] - a[1])[0][0]);

  // Min and Max
  const min = Math.min(...scores);
  const max = Math.max(...scores);

  // Standard Deviation
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length;
  const standardDeviation = Math.sqrt(variance);

  // Mood Distribution
  const moodDistribution: Record<number, number> = {};
  for (let i = 1; i <= 10; i++) {
    moodDistribution[i] = frequency[i] || 0;
  }

  // Weekday Averages
  const weekdayData: Record<string, number[]> = {
    Sunday: [], Monday: [], Tuesday: [], Wednesday: [],
    Thursday: [], Friday: [], Saturday: []
  };
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  entries.forEach(entry => {
    const day = weekdays[new Date(entry.created_at).getDay()];
    weekdayData[day].push(entry.mood_score);
  });

  const weekdayAverages: Record<string, number> = {};
  Object.entries(weekdayData).forEach(([day, scores]) => {
    weekdayAverages[day] = scores.length > 0
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0;
  });

  // Time of Day Averages
  const timeData = {
    morning: [] as number[],    // 6 AM - 12 PM
    afternoon: [] as number[],  // 12 PM - 6 PM
    evening: [] as number[],    // 6 PM - 10 PM
    night: [] as number[]       // 10 PM - 6 AM
  };

  entries.forEach(entry => {
    const hour = new Date(entry.created_at).getHours();
    if (hour >= 6 && hour < 12) {
      timeData.morning.push(entry.mood_score);
    } else if (hour >= 12 && hour < 18) {
      timeData.afternoon.push(entry.mood_score);
    } else if (hour >= 18 && hour < 22) {
      timeData.evening.push(entry.mood_score);
    } else {
      timeData.night.push(entry.mood_score);
    }
  });

  const timeOfDayAverages = {
    morning: timeData.morning.length > 0
      ? timeData.morning.reduce((sum, score) => sum + score, 0) / timeData.morning.length
      : 0,
    afternoon: timeData.afternoon.length > 0
      ? timeData.afternoon.reduce((sum, score) => sum + score, 0) / timeData.afternoon.length
      : 0,
    evening: timeData.evening.length > 0
      ? timeData.evening.reduce((sum, score) => sum + score, 0) / timeData.evening.length
      : 0,
    night: timeData.night.length > 0
      ? timeData.night.reduce((sum, score) => sum + score, 0) / timeData.night.length
      : 0,
  };

  // Calculate streaks
  const { currentStreak, longestStreak } = calculateStreaks(sortedEntries);

  return {
    average: Math.round(average * 10) / 10,
    median,
    mode,
    min,
    max,
    standardDeviation: Math.round(standardDeviation * 100) / 100,
    totalEntries: entries.length,
    currentStreak,
    longestStreak,
    moodDistribution,
    weekdayAverages,
    timeOfDayAverages,
  };
}

function calculateStreaks(sortedEntries: MoodEntry[]): { currentStreak: number; longestStreak: number } {
  if (sortedEntries.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let currentStreak = 1;
  let longestStreak = 1;
  let tempStreak = 1;

  // Check if the last entry is today or yesterday for current streak
  const lastEntry = new Date(sortedEntries[sortedEntries.length - 1].created_at);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  lastEntry.setHours(0, 0, 0, 0);
  
  const daysDiff = Math.floor((today.getTime() - lastEntry.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff > 1) {
    currentStreak = 0;
  }

  // Calculate longest streak
  for (let i = 1; i < sortedEntries.length; i++) {
    const prevDate = new Date(sortedEntries[i - 1].created_at);
    const currDate = new Date(sortedEntries[i].created_at);
    prevDate.setHours(0, 0, 0, 0);
    currDate.setHours(0, 0, 0, 0);

    const daysBetween = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysBetween === 1) {
      tempStreak++;
      if (i === sortedEntries.length - 1 && daysDiff <= 1) {
        currentStreak = tempStreak;
      }
    } else if (daysBetween === 0) {
      // Same day, continue streak
      if (i === sortedEntries.length - 1 && daysDiff <= 1) {
        currentStreak = tempStreak;
      }
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  return { currentStreak, longestStreak };
}

export function getMoodTrends(entries: MoodEntry[], days: number): MoodTrend[] {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  const filteredEntries = entries.filter(entry => 
    new Date(entry.created_at) >= startDate
  );

  // Group by day and get average
  const dailyMoods: Record<string, { total: number; count: number; entries: MoodEntry[] }> = {};

  filteredEntries.forEach(entry => {
    const date = new Date(entry.created_at).toLocaleDateString();
    if (!dailyMoods[date]) {
      dailyMoods[date] = { total: 0, count: 0, entries: [] };
    }
    dailyMoods[date].total += entry.mood_score;
    dailyMoods[date].count++;
    dailyMoods[date].entries.push(entry);
  });

  return Object.entries(dailyMoods).map(([date, data]) => {
    const avgScore = Math.round(data.total / data.count);
    const moodInfo = MOOD_LABELS.find(m => m.value === avgScore) || MOOD_LABELS[4];
    const latestEntry = data.entries.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

    return {
      date,
      score: avgScore,
      emoji: moodInfo.emoji,
      label: moodInfo.label,
      note: latestEntry.text_content || undefined,
    };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getInsightMessages(stats: MoodStatistics, trends: MoodTrend[]): string[] {
  const insights: string[] = [];

  // Mood stability insight
  if (stats.standardDeviation < 1.5) {
    insights.push("Your mood has been very stable recently. Great emotional balance!");
  } else if (stats.standardDeviation > 2.5) {
    insights.push("Your moods have been quite variable. Consider tracking what triggers these changes.");
  }

  // Streak insight
  if (stats.currentStreak >= 7) {
    insights.push(`Amazing! You've logged your mood for ${stats.currentStreak} days straight!`);
  } else if (stats.currentStreak === 0) {
    insights.push("Welcome back! Let's start a new streak today.");
  }

  // Best day insight
  const bestDay = Object.entries(stats.weekdayAverages)
    .sort((a, b) => b[1] - a[1])[0];
  if (bestDay && bestDay[1] > 0) {
    insights.push(`${bestDay[0]} tends to be your happiest day (avg: ${bestDay[1].toFixed(1)}/10)`);
  }

  // Time of day insight
  const timeScores = Object.entries(stats.timeOfDayAverages)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);
  if (timeScores.length > 0) {
    const bestTime = timeScores[0];
    insights.push(`You tend to feel best in the ${bestTime[0]} (avg: ${bestTime[1].toFixed(1)}/10)`);
  }

  // Recent trend insight
  if (trends.length >= 3) {
    const recentTrend = trends.slice(-3);
    const avgRecent = recentTrend.reduce((sum, t) => sum + t.score, 0) / recentTrend.length;
    if (avgRecent > stats.average + 1) {
      insights.push("Your mood has been improving lately! Keep up the positive momentum.");
    } else if (avgRecent < stats.average - 1) {
      insights.push("Your recent moods have been lower than usual. Remember to practice self-care.");
    }
  }

  return insights;
}

export function getMoodGradient(score: number): string[] {
  if (score <= 2) return ['#FF3B30', '#FF6B6B'];
  if (score <= 4) return ['#FF9500', '#FFB366'];
  if (score <= 6) return ['#FFD93D', '#FFE066'];
  if (score <= 8) return ['#34C759', '#4FD866'];
  return ['#5D8AA8', '#7BA7CC'];
}