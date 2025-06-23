# MoodVibe Home Page UI Redesign Specification

## Overview
This document outlines the complete redesign of the MoodVibe home page, featuring a modern iOS-inspired interface with a Pinterest-style mood gallery.

## Design Philosophy
- **Visual Storytelling**: Each mood entry becomes a visual memory
- **Personalization**: Dynamic content that reflects user's unique emotional journey
- **Modern Aesthetics**: iOS design language with soft gradients and elegant typography
- **Engagement**: Interactive elements that encourage daily use

## Color System

### Primary Colors
```css
--primary-blue: #5D8AA8;         /* Premium Blue */
--primary-light: #6B98B6;        /* Light Blue */
--primary-dark: #4F7C96;         /* Dark Blue */
--accent-blue: #007AFF;          /* iOS System Blue */
```

### Background Colors
```css
--bg-primary: #F2F2F7;           /* iOS System Gray 6 */
--bg-secondary: #FFFFFF;         /* Pure white */
--bg-tertiary: #E5E5EA;         /* iOS System Gray 5 */
--bg-grouped: #F2F2F7;          /* Grouped content background */
```

### Gradient Definitions
```css
/* Mood-based gradients */
--gradient-happy: linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%);
--gradient-calm: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
--gradient-sad: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%);
--gradient-excited: linear-gradient(135deg, #FA709A 0%, #FEE140 100%);
--gradient-anxious: linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%);

/* UI gradients */
--gradient-primary: linear-gradient(135deg, #5856D6 0%, #AF52DE 100%);
--gradient-success: linear-gradient(135deg, #11998E 0%, #38EF7D 100%);
```

### Semantic Colors
```css
--color-success: #34C759;         /* iOS Green */
--color-warning: #FF9500;         /* iOS Orange */
--color-error: #FF3B30;          /* iOS Red */
--color-info: #007AFF;           /* iOS Blue */
```

## Typography

### Font Family
- **Primary**: SF Pro Display (Headers)
- **Secondary**: SF Pro Text (Body)
- **Fallback**: System default

### Type Scale
```css
--text-xxl: 34px;    /* Page title */
--text-xl: 28px;     /* Section headers */
--text-lg: 22px;     /* Card titles */
--text-md: 17px;     /* Body text */
--text-sm: 15px;     /* Secondary text */
--text-xs: 13px;     /* Captions */
```

### Font Weights
- **Bold**: 700 (Headers, emphasis)
- **Semibold**: 600 (Subheaders, buttons)
- **Regular**: 400 (Body text)
- **Light**: 300 (Subtle text)

## Layout Structure

### Screen Composition
```
┌─────────────────────────────────┐
│         Status Bar              │ System Status Bar
├─────────────────────────────────┤
│   Enhanced Header (120px)       │ Fixed Position
│   - Good morning greeting      │
│   - Live time & date           │
│   - Weather info               │
│   - Notifications & Avatar     │
├─────────────────────────────────┤
│   AI Insight Card (100px)       │ Scrollable
│   - Live badge                  │
│   - Personalized insight       │
│   - Confidence percentage      │
├─────────────────────────────────┤
│   Stats Grid (200px)           │ Scrollable
│   - Current Streak             │
│   - Mood Score                 │
│   - Growth Rate                │
│   - Total Entries              │
├─────────────────────────────────┤
│   Quick Entry Section (250px)   │ Scrollable
│   - "How are you feeling?"     │
│   - 10 mood emojis (5x2)       │
│   - Quick Entry + Voice/Camera │
├─────────────────────────────────┤
│   Peaceful Sounds (80px)        │ Scrollable
│   - Music player widget        │
├─────────────────────────────────┤
│   Mood Gallery (Dynamic)        │ Scrollable
│   - 6 recent entries           │
│   - Pinterest layout           │
├─────────────────────────────────┤
│   Dr. Maya Card (180px)         │ Scrollable
│   - AI therapist booking       │
├─────────────────────────────────┤
│    Bottom Tab Bar (88px)        │ Fixed Position
└─────────────────────────────────┘
```

### Grid System
- **Columns**: 2
- **Gap**: 12px
- **Padding**: 16px horizontal
- **Item widths**: (Screen Width - 44px) / 2

## Component Specifications

### 1. Enhanced Header Section
```typescript
interface EnhancedHeaderProps {
  userName: string;
  userAvatar?: string;
  currentTime: Date;
  weatherTemp: number;
  weatherCondition: string;
  notificationCount: number;
}
```

**Styling:**
- Background: Glass morphism with backdrop blur
- Height: 120px
- Padding: 24px horizontal
- Live time updates every second
- Weather info with icon

### 2. AI Insight Card
```typescript
interface AIInsightCardProps {
  insight: string;
  confidence: number; // 0-100
  isLive: boolean;
}
```

**Visual Properties:**
- Glass morphism background
- Brain icon with glow effect
- Live badge animation
- Gradient border
- Confidence indicator

### 3. Stats Grid
```typescript
interface StatsGridProps {
  currentStreak: number;
  streakTrend: number; // positive/negative change
  moodScore: number; // 1-10
  growthRate: number; // percentage
  totalEntries: number;
  completionRate: number; // percentage
}
```

**Visual Properties:**
- 2x2 grid layout
- Glass morphism cards
- Icon + value + label format
- Trend indicators
- Hover scale effects

### 3. Quick Stats Card
```typescript
interface QuickStatsProps {
  streak: number;
  positivityPercentage: number;
}
```

**Layout:**
- 2 columns
- Icon + Value + Label
- Subtle background: #F2F2F7
- Border radius: 12px

### 4. Recent Mood Pills
```typescript
interface MoodPillProps {
  emoji: string;
  label: string;
  timestamp: string;
  onPress: () => void;
}
```

**Styling:**
- Horizontal scroll
- Pill shape (border-radius: 20px)
- Height: 40px
- Padding: 8px 16px
- Background: White with border

### 4. Enhanced Mood Selector
```typescript
interface EnhancedMoodSelectorProps {
  moods: Array<{
    emoji: string;
    label: string;
    level: number; // 1-10
  }>;
  selectedMood: number | null;
  onMoodSelect: (mood: MoodItem) => void;
}
```

**Visual Properties:**
- 5x2 grid layout (10 moods)
- Glass morphism buttons
- Selected state with primary color
- Hover scale animation
- Quick Entry, Voice, Camera buttons

### 5. Peaceful Sounds Widget
```typescript
interface PeacefulSoundsProps {
  trackName: string;
  category: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkip: () => void;
}
```

**Visual Properties:**
- Dark glass morphism background
- Music icon with gradient
- Play/pause controls
- Track info display

### 6. Dr. Maya Card
```typescript
interface DrMayaCardProps {
  message: string;
  isAvailable: boolean;
  isPremium: boolean;
  onStartSession: () => void;
}
```

**Visual Properties:**
- Dark gradient background
- Bot icon with online indicator
- Crown icon for premium
- Glass morphism message box
- CTA button with gradient

**B. Text Box**
```typescript
interface TextBoxProps {
  id: string;
  note: string;
  mood_score: number;
  timestamp: string;
}
```
- Height: 120-180px
- Max lines: 5
- Gradient background
- Padding: 16px

**C. Emoji Box**
```typescript
interface EmojiBoxProps {
  id: string;
  emoji: string;
  mood_score: number;
  timestamp: string;
}
```
- Height: 100-120px
- Centered emoji (48px)
- Gradient background

**D. Mixed Box**
```typescript
interface MixedBoxProps {
  id: string;
  emoji: string;
  note: string;
  mood_score: number;
  timestamp: string;
}
```
- Height: 140-160px
- Emoji + short text
- Gradient background

### Common Box Properties
- **Border Radius**: 20px
- **Shadow**: 0px 4px 12px rgba(0, 0, 0, 0.08)
- **Margin**: Handled by grid
- **Animation**: Scale on press (0.98)
- **Gradient**: Based on mood_score

## Updated Component Layout

### Home Page Sections (Top to Bottom)
1. **Enhanced Header** - Live time, weather, notifications
2. **AI Insight Card** - Personalized insights with confidence
3. **Stats Grid** - 4 key metrics in 2x2 layout
4. **Enhanced Quick Entry** - 10 moods + voice/camera
5. **Peaceful Sounds** - Ambient music player
6. **Mood Gallery** - 6 recent entries
7. **Dr. Maya Card** - AI therapist booking

### Mood Gallery Layout
- **Items**: 6 recent mood entries
- **Columns**: 2 (Pinterest style)
- **Heights**: Variable based on content
- **Integration**: Seamless with sections above/below

### Mock Data Generation
```typescript
const boxTypes = ['image', 'text', 'emoji', 'mixed'];
const distribution = {
  image: 30%,
  text: 35%,
  emoji: 20%,
  mixed: 15%
};
```

## Interactions

### Touch Interactions
1. **Tap**: Navigate to full mood view
2. **Long Press**: Show options (Edit, Delete, Share)
3. **Pull to Refresh**: Reload mood data
4. **Swipe**: No action (reserved for future)

### Animations
1. **Entry Animation**:
   - Fade in + Scale (0.9 → 1)
   - Duration: 300ms
   - Easing: Spring

2. **Press Animation**:
   - Scale: 0.98
   - Duration: 100ms
   - Haptic: Light impact

3. **Score Ring Animation**:
   - Circular progress fill
   - Duration: 1000ms
   - Easing: Ease-out

## Floating Action Button
- **Position**: Bottom right (24px, 24px + tab bar height)
- **Size**: 56px
- **Icon**: Plus
- **Background**: Primary gradient
- **Shadow**: Strong elevation
- **Animation**: Rotate on press

## Performance Considerations
1. **Image Optimization**:
   - Lazy loading
   - Thumbnail generation
   - Cache management

2. **List Optimization**:
   - Virtualization for large lists
   - Recycling views
   - Memoization

3. **Animation Performance**:
   - Use native driver
   - Avoid layout animations
   - Batch updates

## Accessibility
1. **VoiceOver Labels**:
   - Mood boxes: "Mood entry, [score] out of 10, [time]"
   - Buttons: Clear action labels
   - Images: Alt text from notes

2. **Touch Targets**:
   - Minimum: 44x44px
   - Mood boxes: Full box is tappable
   - Clear visual feedback

## Future Enhancements
1. **Filters**: By mood type, date range
2. **Search**: Full-text search in notes
3. **Themes**: Dark mode support
4. **Sharing**: Social media integration
5. **Widgets**: Home screen widgets

## Implementation Notes
1. Use `expo-linear-gradient` for gradients
2. Use `react-native-super-grid` for masonry
3. Mock data from `/src/utils/mockMoodData.ts`
4. Assets from `/assets/images/` for demos
5. Maintain 60fps scrolling performance