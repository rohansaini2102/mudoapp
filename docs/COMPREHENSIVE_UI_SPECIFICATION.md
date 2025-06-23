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

### Version 3: Premium Design (Current Implementation)
- Enhanced components with glass morphism
- Premium blue color scheme (#5D8AA8)
- AI-powered insights and recommendations
- Rich interactions and animations

## Current Design System

### Color Palette

#### Primary Colors
```css
--primary-blue: #5D8AA8;         /* Premium Blue */
--primary-light: #6B98B6;        /* Light Blue */
--primary-dark: #4F7C96;         /* Dark Blue */
--accent-blue: #007AFF;          /* iOS System Blue */
```

#### Background Colors
```css
--bg-primary: #F2F2F7;           /* iOS System Gray 6 */
--bg-secondary: #FFFFFF;         /* Pure white */
--bg-tertiary: #E5E5EA;         /* iOS System Gray 5 */
```

#### Mood Gradients
```javascript
const moodGradients = {
  happy: ['#FFD93D', '#FF6B6B'],      // Yellow to Pink
  calm: ['#667EEA', '#764BA2'],       // Blue to Purple  
  neutral: ['#A8EDEA', '#FED6E3'],    // Light Blue to Pink
  sad: ['#4FACFE', '#00F2FE'],        // Blue gradient
  excited: ['#FA709A', '#FEE140'],    // Pink to Yellow
  anxious: ['#A8EDEA', '#FED6E3']     // Soft gradient
};
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
- **Light**: 300 (Subtle text)

### Spacing System
```javascript
const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40
};
```

### Effects

#### Glass Morphism
```css
/* Light Glass */
background: rgba(255, 255, 255, 0.25);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

/* Dark Glass */
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

## Component Library

### 1. LiveTimeHeader
**Purpose**: Dynamic header showing time, weather, and user info

**Props**:
```typescript
interface LiveTimeHeaderProps {
  userName: string;
  userAvatar?: string;
  notificationCount?: number;
}
```

**Features**:
- Real-time clock updates every second
- Weather API integration
- Notification badge
- Glass morphism background

### 2. AIInsightCard
**Purpose**: Display personalized AI-generated insights

**Props**:
```typescript
interface AIInsightCardProps {
  insight: string;
  confidence: number;
  isLive?: boolean;
}
```

**Features**:
- Live badge animation
- Confidence percentage display
- Brain icon with glow effect
- Glass morphism styling

### 3. StatsGrid
**Purpose**: 2x2 grid showing key mood metrics

**Components**:
- Current Streak
- Mood Score
- Growth Rate  
- Total Entries

**Visual Style**:
- Individual glass morphism cards
- Icon + value + label format
- Hover/press animations
- Trend indicators

### 4. EnhancedMoodSelector
**Purpose**: 10 mood options for detailed emotional tracking

**Mood Scale**:
1. 😭 Devastated
2. 😢 Very Sad
3. 😞 Sad
4. 😟 Down
5. 😐 Neutral
6. 🙂 Good
7. 😊 Happy
8. 😍 Great
9. 🤩 Amazing
10. 😇 Euphoric

**Features**:
- 5x2 grid layout
- Glass morphism buttons
- Quick Entry, Voice, Camera actions
- Haptic feedback

### 5. MoodGallery
**Purpose**: Pinterest-style display of mood entries

**Layout**:
- 2-column masonry grid
- Variable heights based on content
- 12px gap between items
- 16px horizontal padding

**Entry Types**:
1. **Image Box**: Photo with gradient overlay
2. **Text Box**: Note with mood gradient background
3. **Emoji Box**: Large centered emoji
4. **Mixed Box**: Emoji + short text

### 6. PeacefulSoundsWidget
**Purpose**: Ambient music player for mood enhancement

**Features**:
- Dark glass morphism design
- Play/pause controls
- Track information display
- Skip functionality

### 7. DrMayaCard
**Purpose**: AI therapist booking and interaction

**Features**:
- Premium badge with crown icon
- 24/7 availability indicator
- Sample message display
- CTA button with gradient

### 8. ModernTabBar
**Purpose**: Custom bottom navigation

**Design**:
- Floating tab bar with blur effect
- Selected state with primary color
- Icon + label display
- Smooth transitions

## Screen Layouts

### HomeScreenV2 (Current Implementation)

#### Structure (Top to Bottom):
1. **LiveTimeHeader** (120px)
   - Time, weather, notifications
   - Fixed position

2. **ScrollView Content**:
   - **AIInsightCard** (100px)
   - **StatsGrid** (200px)
   - **EnhancedMoodSelector** (250px)
   - **PeacefulSoundsWidget** (80px)
   - **MoodGallery** (Dynamic)
   - **DrMayaCard** (180px)

3. **ModernTabBar** (88px)
   - Fixed position

### HistoryScreenV2

#### Features:
- Full Pinterest-style mood gallery
- Filter chips (All/Week/Month)
- Pull to refresh
- 30+ entries displayed
- Search functionality (planned)

### MoodEntryScreen

#### Modal Design:
- Full screen modal with animation
- Multiple input methods:
  - Text entry (500 char limit)
  - Photo capture/selection
  - Video recording (30s)
  - Voice message (60s)
- Mood emoji selector
- Save/Cancel actions

## Interaction Patterns

### Touch Interactions
1. **Tap**: Primary action/navigation
2. **Long Press**: Show context menu
3. **Swipe**: Dismiss/navigate (where applicable)
4. **Pull to Refresh**: Reload data

### Animations
```javascript
// Entry animations
const fadeInUp = {
  from: { opacity: 0, translateY: 20 },
  to: { opacity: 1, translateY: 0 },
  duration: 300,
  easing: 'ease-out'
};

// Press animations
const pressScale = {
  pressed: { scale: 0.95 },
  duration: 100
};

// Loading animations
const shimmer = {
  loop: true,
  duration: 1500
};
```

### Haptic Feedback
- Light impact on button press
- Success vibration on mood save
- Error vibration on failure

## Responsive Design

### Breakpoints
- Small: < 375px (iPhone SE)
- Medium: 375-414px (Standard phones)
- Large: > 414px (Plus/Max phones)

### Safe Areas
```javascript
const safeAreaPadding = {
  top: 'env(safe-area-inset-top)',
  bottom: 'env(safe-area-inset-bottom)',
  left: 'env(safe-area-inset-left)',
  right: 'env(safe-area-inset-right)'
};
```

## Performance Guidelines

### Image Optimization
- Lazy loading with placeholder
- Progressive image loading
- Maximum dimensions: 1200x1200
- Compression: 80% quality

### List Optimization
- Virtualization for lists > 50 items
- RecyclerListView for infinite scroll
- Memoization of expensive renders

### Animation Performance
- Use native driver where possible
- Avoid animating layout properties
- Batch state updates
- 60fps target

## Accessibility

### VoiceOver Support
- All interactive elements have labels
- Mood scores announced as "X out of 10"
- Images have descriptive alt text
- Proper heading hierarchy

### Visual Accessibility
- Minimum contrast ratio: 4.5:1
- Touch targets: minimum 44x44px
- Focus indicators on all inputs
- Reduced motion support

## Platform Considerations

### iOS
- Respect system appearance
- Use iOS-specific gestures
- Follow HIG guidelines
- Support Dynamic Type

### Android
- Material Design elements where appropriate
- Back button handling
- Status bar theming
- Adaptive icons

### Web
- Responsive layout
- Keyboard navigation
- Mouse hover states
- PWA capabilities

## Future Enhancements

### Planned Features
1. **Dark Mode**: Full theme support
2. **Widgets**: iOS/Android home screen
3. **Watch App**: Apple Watch companion
4. **iPad**: Optimized tablet layout
5. **Themes**: User-selectable color schemes

### Component Roadmap
1. **Mood Trends Chart**: Interactive visualizations
2. **Social Features**: Mood sharing
3. **AI Chat Interface**: Conversational UI
4. **Voice UI**: Voice-first interactions
5. **AR Features**: Mood visualization in AR

## Component Usage Examples

### Basic Mood Entry
```jsx
<EnhancedMoodSelector
  selectedMood={selectedMood}
  onMoodSelect={handleMoodSelect}
  onQuickEntry={() => navigation.navigate('MoodEntry')}
  onVoiceEntry={handleVoiceEntry}
  onCameraEntry={handleCameraEntry}
/>
```

### Stats Display
```jsx
<StatsGrid
  currentStreak={47}
  streakTrend={3}
  moodScore={8.7}
  growthRate={24}
  totalEntries={284}
  completionRate={98}
/>
```

### Mood Gallery
```jsx
<MoodGallery
  entries={moodEntries}
  onEntryPress={handleEntryPress}
  onRefresh={handleRefresh}
  columns={2}
/>
```

## Design Tokens

### Shadows
```javascript
const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8
  }
};
```

### Border Radius
```javascript
const borderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 9999
};
```

## Testing Guidelines

### Visual Testing
- Screenshot tests for key screens
- Cross-device visual validation
- Dark/light mode testing
- Accessibility audit

### Interaction Testing
- Touch target validation
- Animation performance
- Scroll performance
- Memory usage monitoring

## Documentation Status
- **Last Updated**: December 2024
- **Version**: 3.0 (Premium Design)
- **Implementation**: HomeScreenV2 + HistoryScreenV2
- **Next Review**: January 2025

This specification serves as the single source of truth for MoodVibe's UI design and should be updated as the design evolves.