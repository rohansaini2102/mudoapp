import { ImageSourcePropType } from 'react-native';

export interface MockMoodEntry {
  id: string;
  type: 'image' | 'text' | 'emoji' | 'mixed';
  mood_score: number;
  emoji?: string;
  note?: string;
  image?: ImageSourcePropType;
  timestamp: string;
  created_at: string;
}

// Mood emojis mapped to scores
const moodEmojis = {
  10: '🤩',
  9: '😄',
  8: '😊',
  7: '🙂',
  6: '😌',
  5: '😐',
  4: '😕',
  3: '😔',
  2: '😢',
  1: '😭',
};

// Sample notes for different moods
const happyNotes = [
  "Had an amazing day with friends!",
  "Finally completed my project, feeling accomplished!",
  "Beautiful weather today, went for a long walk",
  "Received great news today!",
  "Feeling grateful for everything",
];

const neutralNotes = [
  "Just another day at work",
  "Keeping myself busy with tasks",
  "Taking things one step at a time",
  "Quiet day, time for reflection",
  "Steady progress on my goals",
];

const sadNotes = [
  "Feeling a bit overwhelmed today",
  "Missing home and family",
  "Things didn't go as planned",
  "Need some time to process everything",
  "Tomorrow will be better",
];

// Time ago formatter
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

// Generate random mood score
function getRandomMoodScore(): number {
  // Weighted distribution - more likely to have positive moods
  const weights = [1, 1, 2, 2, 3, 4, 5, 6, 7, 8]; // 1-10
  return weights[Math.floor(Math.random() * weights.length)];
}

// Get appropriate notes based on mood score
function getNoteForMood(score: number): string {
  if (score >= 7) {
    return happyNotes[Math.floor(Math.random() * happyNotes.length)];
  } else if (score >= 4) {
    return neutralNotes[Math.floor(Math.random() * neutralNotes.length)];
  } else {
    return sadNotes[Math.floor(Math.random() * sadNotes.length)];
  }
}

// Box height calculation based on type
export function getBoxHeight(type: string, content?: string): number {
  switch (type) {
    case 'image':
      return Math.floor(Math.random() * (220 - 180 + 1)) + 180; // 180-220px
    case 'text':
      const baseHeight = 140;
      const extraHeight = content ? Math.min(content.length / 8, 80) : 0;
      return baseHeight + extraHeight; // 140-220px
    case 'emoji':
      return Math.floor(Math.random() * (120 - 100 + 1)) + 100; // 100-120px
    case 'mixed':
      const mixedBase = 160;
      const mixedExtra = content ? Math.min(content.length / 12, 40) : 0;
      return mixedBase + mixedExtra; // 160-200px
    default:
      return 150;
  }
}

// Generate mock mood entries
export function generateMockMoodEntries(count: number = 20): MockMoodEntry[] {
  const entries: MockMoodEntry[] = [];
  const now = new Date();
  
  // Type distribution
  const typeDistribution = [
    'image', 'image', 'image', // 30%
    'text', 'text', 'text', 'text', // 35%
    'emoji', 'emoji', // 20%
    'mixed', 'mixed', // 15%
  ];

  // Sample images from assets (you'll need to add these)
  const sampleImages = [
    require('../../assets/images/Screenshot 2025-06-23 013334.png'),
    require('../../assets/images/Screenshot 2025-06-23 014846.png'),
    require('../../assets/images/Screenshot 2025-06-23 014940.png'),
    require('../../assets/images/Screenshot 2025-06-23 015018.png'),
  ];

  for (let i = 0; i < count; i++) {
    const type = typeDistribution[Math.floor(Math.random() * typeDistribution.length)];
    const mood_score = getRandomMoodScore();
    const emoji = moodEmojis[mood_score as keyof typeof moodEmojis];
    
    // Create date going back in time
    const date = new Date(now.getTime() - (i * 3600000 * Math.random() * 12)); // Random hours back
    
    const entry: MockMoodEntry = {
      id: `mock-${i + 1}`,
      type,
      mood_score,
      timestamp: getTimeAgo(date),
      created_at: date.toISOString(),
    };

    // Add type-specific content
    switch (type) {
      case 'image':
        entry.image = sampleImages[Math.floor(Math.random() * sampleImages.length)];
        entry.note = Math.random() > 0.5 ? getNoteForMood(mood_score) : undefined;
        break;
      case 'text':
        entry.note = getNoteForMood(mood_score);
        break;
      case 'emoji':
        entry.emoji = emoji;
        break;
      case 'mixed':
        entry.emoji = emoji;
        entry.note = getNoteForMood(mood_score); // Show full text, no truncation
        break;
    }

    entries.push(entry);
  }

  return entries;
}

// Get gradient colors based on mood score
export function getMoodGradient(score: number): string[] {
  if (score >= 8) {
    return ['#FFD93D', '#FF6B6B']; // Happy - Yellow to Pink
  } else if (score >= 6) {
    return ['#667EEA', '#764BA2']; // Calm - Blue to Purple
  } else if (score >= 4) {
    return ['#A8EDEA', '#FED6E3']; // Neutral - Light Blue to Pink
  } else {
    return ['#4FACFE', '#00F2FE']; // Sad - Blue gradient
  }
}

// Get a random pastel gradient for variety
export function getRandomPastelGradient(): string[] {
  const gradients = [
    ['#FFE5B4', '#FFB6C1'], // Peach to Pink
    ['#B8E3FF', '#D8BFD8'], // Blue to Lavender
    ['#E6E6FA', '#DDA0DD'], // Lavender to Plum
    ['#F0E68C', '#98FB98'], // Khaki to Pale Green
    ['#FFE4E1', '#FFA07A'], // Misty Rose to Light Salmon
    ['#E0BBE4', '#957DAD'], // Lavender to Purple
    ['#FFDFD3', '#FEC8D8'], // Peach to Pink
    ['#D3E4FF', '#C6E2FF'], // Light Blue shades
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
}

// Mock user stats
export function getMockUserStats() {
  return {
    currentMoodScore: 8.2,
    streak: 3,
    positivityPercentage: 72,
    weeklyAverage: 7.5,
    totalEntries: 156,
    mostFrequentMood: '😊',
  };
}

// Recent mood pills data
export function getRecentMoodPills() {
  return [
    { emoji: '😊', label: 'Happy', time: 'Today' },
    { emoji: '😌', label: 'Calm', time: 'Today' },
    { emoji: '😔', label: 'Sad', time: 'Yesterday' },
    { emoji: '😄', label: 'Excited', time: '2 days ago' },
  ];
}