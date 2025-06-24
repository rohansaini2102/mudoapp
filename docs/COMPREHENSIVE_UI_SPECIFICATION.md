# MoodVibe Comprehensive UI Specification

## Overview
This document consolidates all UI specifications for the MoodVibe app, providing a single source of truth for the current design system and component implementations.

## Design Evolution

### Version 1: Initial iOS-Inspired Design
- Focus on Pinterest-style mood gallery
- iOS purple color scheme (#5856D6)
- Basic mood tracking with visual elements

### Version 2: Minimal "Focus on Now" Design
- Simplified interface with single primary action
- Removed clutter, emphasized white space
- Quick emoji-based mood entry
- Gallery moved to History screen

### Version 3: Premium Design
- Enhanced components with glass morphism
- Premium blue color scheme (#5D8AA8)
- AI-powered insights and recommendations
- Rich interactions and animations

### Version 4: Clean Modern Design (Current Implementation - December 2024)
- Pure white background (#FFFFFF)
- Removed emoji grid from quick entry section
- iPhone-style modal for mood entry with blur effect
- Modern bottom navigation with blur and floating plus button
- Mood gallery positioned directly after quick entry
- Simplified, cleaner interface

## Current Design System

### Color Palette

#### Primary Colors
```css
--primary-blue: #5D8AA8;         /* Premium Blue */
--primary-light: #6B98B6;        /* Light Blue */
--primary-dark: #4F7C96;         /* Dark Blue */
--accent-blue: #007AFF;          /* iOS System Blue */
--white: #FFFFFF;                /* Pure White */
```

#### Background Colors
```css
--bg-primary: #FFFFFF;           /* Pure white (Updated) */
--bg-secondary: #FFFFFF;         /* Pure white */
--bg-tertiary: #F2F2F7;         /* iOS System Gray 6 */
--bg-system-gray6: #F2F2F7;     /* Light gray for cards */
```

#### System Colors
```css
--label: #000000;                /* Primary text */
--secondary-label: rgba(60, 60, 67, 0.6);
--tertiary-label: rgba(60, 60, 67, 0.3);
--placeholder: rgba(60, 60, 67, 0.3);
--separator: #C6C6C8;
--system-gray: #8E8E93;
--system-gray2: #AEAEB2;
--system-gray3: #C7C7CC;
--system-gray4: #D1D1D6;
--system-gray5: #E5E5EA;
--system-gray6: #F2F2F7;
```

### Typography

#### Font System
- **Primary**: SF Pro Display (Headers)
- **Secondary**: SF Pro Text (Body)
- **Fallback**: System default

#### Type Scale
```css
--text-xxl: 34px;    /* Page title */
--text-xl: 28px;     /* Section headers */
--text-lg: 22px;     /* Card titles */
--text-md: 17px;     /* Body text */
--text-sm: 15px;     /* Secondary text */
--text-xs: 13px;     /* Captions */
```

#### Font Weights
- **Bold**: 700 (Headers, emphasis)
- **Semibold**: 600 (Subheaders, buttons)
- **Regular**: 400 (Body text)

### Spacing System
```javascript
const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  xxl: 40
};
```

### Effects

#### Glass Morphism (Updated)
```css
/* Light Glass - Used for cards on white background */
background: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(20px);
border: 1px solid rgba(0, 0, 0, 0.05);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

/* Dark Glass - Used for overlays */
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

## Component Library

### 1. LiveTimeHeader
**Purpose**: Dynamic header showing time, weather, and user info

**Features**:
- Real-time clock updates every second
- Weather display (temp + condition)
- Notification badge
- User avatar with initial
- Glass morphism background on white

### 2. AIInsightCard
**Purpose**: Display personalized AI-generated insights

**Features**:
- Live badge with pulse animation
- Confidence percentage display
- Brain icon with glow effect
- Premium blue gradient background

### 3. StatsGrid
**Purpose**: 2x2 grid showing key mood metrics

**Components**:
- Current Streak (with trend indicator)
- Mood Score (with 5-dot progress)
- Growth Rate (percentage)
- Total Entries (with completion rate)

**Visual Style**:
- Light glass morphism cards
- Icon + value + subtitle format
- Subtle shadows on white background

### 4. EnhancedMoodSelector (Updated)
**Purpose**: Simplified quick entry interface

**New Design (v4)**:
- Removed emoji grid completely
- Clean card with "Quick Entry" title
- "Track your daily mood" subtitle
- Three action buttons:
  - Add Entry (primary, gradient)
  - Voice (secondary)
  - Camera (secondary)
- Minimal glass morphism effect

### 5. MoodGallery
**Purpose**: Pinterest-style display of mood entries

**Position Update**:
- Now appears directly after EnhancedMoodSelector
- Before PeacefulSoundsWidget and DrMayaCard

**Layout**:
- 2-column masonry grid
- Variable heights based on content
- 12px gap between items
- White background

### 6. PeacefulSoundsWidget
**Purpose**: Ambient music player for mood enhancement

**Features**:
- Dark glass morphism design (stands out on white)
- Play/pause controls
- Track information display
- Skip functionality

### 7. DrMayaCard
**Purpose**: AI therapist booking and interaction

**Features**:
- White card with subtle border
- Premium badge with crown icon
- Session stats and rating
- "Book AI Session" gradient button

### 8. ModernTabBar (Updated)
**Purpose**: iPhone-style bottom navigation

**New Design**:
- Blur effect background (expo-blur)
- 4 tabs: Home, Insights, History, Profile
- Floating plus button in center
- Active tab indicator (top line)
- Tab labels only show for active tab
- Fixed position at bottom

### 9. MoodEntryScreen (New Modal Design)
**Purpose**: iPhone-style modal for mood entry

**Features**:
- Full-screen modal with transparent background
- Blur effect backdrop (expo-blur)
- Slide-up animation with spring physics
- Dismissible by:
  - Tapping outside
  - Cancel button
  - Swipe down (planned)
- Handle bar at top
- 10 mood options in 5x2 grid
- Selected mood display (large emoji + label)
- Note input with character counter
- Future options: Photo, Voice (disabled)

**Modal Specifications**:
```javascript
// Animation
translateY: withSpring(0, {
  damping: 25,
  stiffness: 150
})

// Backdrop
BlurView: {
  intensity: 20,
  tint: 'dark'
}
```

## Screen Layouts

### HomeScreenV2 (Current Implementation - December 2024)

#### Key Changes:
- Pure white background (#FFFFFF)
- No gradient overlays
- Reorganized component order

#### Structure (Top to Bottom):
1. **LiveTimeHeader** (Fixed)
   - Glass morphism on white
   
2. **ScrollView Content**:
   - **AIInsightCard** 
   - **StatsGrid**
   - **EnhancedMoodSelector** (simplified)
   - **MoodGallery** (moved up)
   - **PeacefulSoundsWidget**
   - **DrMayaCard**

3. **ModernTabBar** (Fixed)
   - Blur effect
   - Floating plus button

### MoodEntry Modal Flow

#### Navigation:
1. Plus button in tab bar → Opens modal
2. Quick Entry button → Opens modal
3. Modal appears with blur backdrop
4. User selects mood and adds note
5. Save → Close modal and save entry
6. Cancel/Outside tap → Close modal

## Interaction Patterns

### Touch Interactions
1. **Tap**: Primary action/navigation
2. **Long Press**: Haptic feedback (future: context menu)
3. **Swipe Down**: Dismiss modal (planned)
4. **Pull to Refresh**: Reload data

### Animations
```javascript
// Modal entrance
const modalIn = {
  translateY: withSpring(0, {
    damping: 25,
    stiffness: 150
  }),
  opacity: withTiming(1, { duration: 300 })
};

// Tab selection
const tabScale = withSpring(isFocused ? 1.1 : 1, {
  damping: 15,
  stiffness: 150
});

// Button press
const buttonScale = withSpring(0.95, {
  damping: 15,
  stiffness: 150
});
```

### Haptic Feedback
- Light impact on mood selection
- Success vibration on mood save
- Subtle feedback on tab switches

## Navigation Architecture

### Stack Structure:
```
AppStack
├── MainTabs (Tab Navigator)
│   ├── Home (HomeScreenV2)
│   ├── Insights
│   ├── History (HistoryScreenV2)
│   └── Profile
└── MoodEntry (Modal)
```

### Modal Presentation:
- Transparent modal overlay
- Custom animations (no default navigation animation)
- Handles navigation edge cases

## Performance Optimizations

### Current Implementations:
1. **Removed complex gradients** for better performance
2. **Simplified mood selector** reduces render complexity
3. **Lazy loading** for mood gallery images
4. **Memoized components** where applicable
5. **Native driver** for animations

## Accessibility Updates

### VoiceOver Support:
- All buttons have proper labels
- Modal announced when opened
- Mood selections read as "X mood, Y out of 10"
- Save/Cancel actions clearly labeled

### Touch Targets:
- Minimum 44x44px for all interactive elements
- 52x52px for secondary buttons
- 56x56px for plus button

## Recent Updates (December 2024)

### What Changed:
1. **Background**: Gradient → Pure white
2. **Quick Entry**: Removed emoji grid, simplified to buttons
3. **Navigation**: Added iPhone-style modal for mood entry
4. **Tab Bar**: Modern design with blur effect
5. **Layout**: Mood gallery moved up after quick entry
6. **Colors**: Refined to work better on white background

### Technical Updates:
1. Fixed color references (no more undefined colors)
2. Removed deprecated shadow properties
3. Updated navigation flow for modal
4. Added proper TypeScript interfaces
5. Implemented smooth animations with Reanimated 2

## Future Enhancements

### Planned Features:
1. **Swipe to dismiss** for modal
2. **Voice recording** integration
3. **Photo mood capture**
4. **Dark mode** support
5. **Landscape orientation** handling

### Component Roadmap:
1. **Mood Trends Chart**: Interactive visualizations
2. **Weekly/Monthly views**: Calendar integration
3. **Export functionality**: PDF/CSV reports
4. **Sharing capabilities**: Social features
5. **Widget support**: iOS/Android home screen

## Testing Checklist

### Visual Testing:
- [x] White background consistency
- [x] Glass morphism effects
- [x] Modal blur backdrop
- [x] Tab bar appearance
- [ ] Dark mode (future)

### Interaction Testing:
- [x] Modal open/close animations
- [x] Haptic feedback
- [x] Tab switching
- [x] Mood selection
- [ ] Swipe gestures (future)

## Documentation Status
- **Last Updated**: December 2024
- **Version**: 4.0 (Clean Modern Design)
- **Implementation**: Complete
- **Key Files**:
  - HomeScreenV2.tsx
  - MoodEntryScreen.tsx (modal)
  - ModernTabBar.tsx
  - EnhancedMoodSelector.tsx (simplified)

This specification serves as the single source of truth for MoodVibe's UI design and should be updated as the design evolves.