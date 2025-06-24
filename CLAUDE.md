# MoodVibe Development Context

This file provides context for AI assistants working on the MoodVibe project.

## Project Overview

MoodVibe is a premium mood tracking app built with React Native, Expo, and TypeScript. It features a sophisticated UI with iPhone-style interactions and AI-powered insights.

## Current State (December 2024)

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
1. **HomeScreenV2**: Main screen with all premium components
2. **MoodEntryScreen**: Modal with blur backdrop (not a regular screen)
3. **ModernTabBar**: Custom tab bar with floating plus button
4. **EnhancedMoodSelector**: Simplified - just buttons, no emoji grid

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

### Future Development

#### Pending Features
- Camera/Photo integration
- Voice recording
- Weather API
- Real AI service
- Dark mode
- Data export

#### Code Style
- TypeScript strict mode
- Functional components only
- Hooks for state management
- Consistent file naming (*Screen.tsx, *Component.tsx)

### Database Schema (Supabase)
```sql
profiles: id, email, full_name, avatar_url, created_at
mood_entries: id, user_id, mood_score (1-10), mood_emoji, mood_label, note, entry_type, media_url, created_at
```

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

This context should help maintain consistency and avoid common pitfalls when developing MoodVibe.