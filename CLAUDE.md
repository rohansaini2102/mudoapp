# MoodVibe Development Context

This file provides context for AI assistants working on the MoodVibe project.

## Project Overview

MoodVibe is a premium mood tracking app built with React Native, Expo, and TypeScript. It features a sophisticated UI with iPhone-style interactions and AI-powered insights.

## Current State (December 2024)

### Project Completion Status: ~95% Complete
- **Core Features**: ✅ Fully Implemented
- **Analytics Dashboard**: ✅ Advanced insights with multiple visualizations
- **UI/UX**: ✅ Premium design with modern patterns
- **Data Integration**: ✅ Real-time sync with Supabase
- **Authentication**: ✅ Complete auth flow
- **State Management**: ✅ Context API implementation

### Design Version: 4.0 (Clean Modern Design)
- Pure white background (#FFFFFF)
- Simplified quick entry without emoji grid
- iPhone-style modal for mood entry
- Modern bottom navigation with blur effects
- Mood gallery positioned after quick entry

### Key Technical Details

#### Navigation Structure
```
AppStack
├── MainTabs (Tab Navigator)
│   ├── Home (HomeScreenV2)
│   ├── Insights
│   ├── History (HistoryScreenV2)
│   └── Profile
└── MoodEntry (Transparent Modal)
```

#### Color System
- Primary: #5D8AA8 (Premium Blue)
- Background: #FFFFFF (Pure White)
- Text: Uses iOS system colors (label, secondaryLabel, etc.)
- No undefined colors like Colors.gray[xxx] or Colors.black/white

#### Key Components

#### Core Screens
1. **HomeScreenV2**: Main dashboard with real-time stats and mood gallery
2. **MoodEntryScreen**: iPhone-style modal with blur backdrop
3. **InsightsScreen**: Comprehensive analytics dashboard
4. **HistoryScreenV2**: Pinterest-style mood history gallery
5. **ProfileScreen**: User settings and account management

#### Analytics Components (NEW)
1. **MoodHeatmapCalendar**: 3-month visual mood calendar
2. **MoodTriggers**: AI-powered pattern analysis
3. **WeeklyDigest**: Comprehensive weekly summary
4. **MoodTrendsChart**: Interactive line chart with mood trends
5. **MoodDistributionChart**: Bar chart showing mood frequency
6. **PatternAnalysis**: Weekday and time-of-day patterns
7. **StatsSummaryCards**: Scrollable metric cards

#### UI Components
1. **ModernTabBar**: Custom tab bar with floating plus button
2. **EnhancedMoodSelector**: Quick mood entry with animations
3. **AIInsightCard**: Dynamic insights with confidence meter
4. **StatsGrid**: 2x2 grid showing key metrics
5. **LiveTimeHeader**: Real-time clock and weather
6. **MoodGallery**: Masonry layout for mood entries
7. **DrMayaCard**: AI therapist booking interface

### Important Implementation Notes

#### Modal Navigation
- MoodEntry is NOT in the Tab Navigator
- It's a Stack screen with transparentModal presentation
- Plus button navigates to it directly
- Handle navigation.goBack() carefully

#### Styling
- Use individual shadow properties, not spread
- Colors come from theme.ts constants
- Glass morphism effects are subtle on white
- Blur effects use expo-blur

#### Performance
- Images use lazy loading
- Animations use native driver where possible
- Lists are optimized for smooth scrolling

### Common Issues & Solutions

1. **Color References**
   - ❌ Don't use: Colors.gray[600], Colors.black, Colors.white
   - ✅ Use: Colors.secondaryLabel, Colors.label, '#FFFFFF'

2. **Shadow Props**
   - ❌ Don't use: ...Shadow.medium
   - ✅ Use: Individual shadow properties

3. **Navigation**
   - Check if navigation.canGoBack() before calling goBack()
   - For modal, fallback to MainTabs navigation

### Testing Commands
```bash
# Start development
npm start

# Clear cache if issues
expo start -c

# Install with peer deps issues
npm install --legacy-peer-deps
```

### Implemented Features (December 2024)

#### ✅ Completed Features
1. **User Authentication**: Full auth flow with Supabase
2. **Mood Tracking**: 1-10 scale with emoji selection
3. **Text Notes**: 500 character limit with character counter
4. **Real-time Data Sync**: Automatic updates across screens
5. **Advanced Analytics Dashboard**:
   - Mood trends visualization
   - Pattern analysis (weekday/time-of-day)
   - Mood distribution charts
   - Streak tracking
   - Statistical analysis
6. **Weekly Digest**: Comprehensive 7-day summary
7. **Mood Heatmap**: Visual calendar showing mood patterns
8. **Mood Triggers**: AI-powered pattern detection
9. **Pull-to-Refresh**: All main screens
10. **Haptic Feedback**: Touch interactions
11. **Responsive Design**: Works on all screen sizes

#### 🔗 Data Flow
- **Mood Entry** → Saves to Supabase → Updates all screens
- **Home Screen**: Shows real-time stats from database
- **Insights**: Analyzes all mood entries with time filtering
- **History**: Displays all entries in masonry layout

### Future Development

#### Pending Features
- Camera/Photo integration
- Voice recording
- Weather API integration
- Real AI service (currently using pattern-based insights)
- Dark mode
- Data export (CSV/PDF)
- Push notifications
- Social features (Circles)
- Apple Watch app
- Offline mode

#### Code Style
- TypeScript strict mode
- Functional components only
- Hooks for state management
- Consistent file naming (*Screen.tsx, *Component.tsx)
- Memoization for performance
- Error boundaries for stability

### Database Schema (Supabase)

#### Tables
```sql
-- User profiles (extends auth.users)
profiles: 
  - id (UUID, references auth.users)
  - username (TEXT, unique)
  - full_name (TEXT)
  - avatar_url (TEXT)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)

-- Mood entries
mood_entries:
  - id (UUID, primary key)
  - user_id (UUID, references auth.users)
  - mood_score (INTEGER, 1-10)
  - entry_type (TEXT: 'text', 'image', 'video', 'voice')
  - text_content (TEXT, optional)
  - media_url (TEXT, optional)
  - created_at (TIMESTAMP)
  - synced (BOOLEAN)
  - metadata (JSONB)

-- Future tables (schema exists but not used yet)
circles: Group mood tracking
circle_members: Group membership
ai_sessions: AI therapy sessions
ai_messages: Chat history
```

#### Row Level Security
- All tables have RLS enabled
- Users can only access their own data
- Automatic profile creation on signup

### Environment Variables
```
EXPO_PUBLIC_SUPABASE_URL=https://yibcftcczrsquovihmry.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

## Quick Reference

### To Add New Features
1. Check existing patterns in similar components
2. Use TypeScript interfaces
3. Follow the established color system
4. Test on both iOS and Android
5. Update relevant documentation

### Component Creation Template
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

interface ComponentNameProps {
  // props
}

export function ComponentName({ }: ComponentNameProps) {
  return (
    <View style={styles.container}>
      {/* content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // styles
  },
});
```

### Analytics Features Details

#### Mood Trends Chart
- Line chart showing daily average moods
- Interactive data points
- Color-coded mood zones
- Supports 7, 30, 90 days, and all-time views

#### Mood Heatmap Calendar
- 3-month visual calendar
- Color intensity represents mood level
- Shows multiple entries per day
- Interactive day selection

#### Mood Triggers Analysis
- Analyzes text notes for patterns
- Identifies positive "Mood Boosters"
- Identifies negative "Mood Dampeners"
- Shows frequency and impact

#### Weekly Digest
- 7-day summary with key metrics
- Improvement percentage
- Best/worst day identification
- Mood consistency tracking
- Shareable format (future)

#### Pattern Analysis
- Weekday mood averages
- Time-of-day patterns (morning/afternoon/evening/night)
- Visual comparison charts
- Actionable insights

### Known Issues to Fix

1. **TypeScript Errors** (12 total)
   - Missing type definitions
   - Gradient array type issues
   - Navigation type problems

2. **UI Polish Needed**
   - Some components still use mock data
   - Loading states missing in places
   - Empty states need improvement

3. **Performance Optimizations**
   - Large data sets may slow down charts
   - Consider pagination for history

### Testing & Development Tips

1. **Test with Real Data**
   - Create multiple mood entries
   - Add notes for trigger analysis
   - Test across different time periods

2. **Check Responsiveness**
   - Test on different screen sizes
   - Verify chart readability
   - Check text truncation

3. **Monitor Performance**
   - Watch for animation jank
   - Check memory usage with charts
   - Test with 100+ entries

This context should help maintain consistency and avoid common pitfalls when developing MoodVibe.