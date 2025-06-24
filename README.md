# MoodVibe - Premium Mood Tracking App

<div align="center">
  <img src="assets/images/logo.png" alt="MoodVibe Logo" width="120" />
  
  ### Track your emotions, understand your patterns, grow your wellbeing
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.76-blue.svg)](https://reactnative.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
  [![Expo](https://img.shields.io/badge/Expo-SDK%2053-black.svg)](https://expo.dev/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.0-green.svg)](https://supabase.com/)
</div>

## Overview

MoodVibe is a premium mood tracking application that helps users monitor their emotional wellbeing through an intuitive and beautiful interface. With AI-powered insights, iPhone-style modal interactions, and a Pinterest-style mood gallery, MoodVibe makes emotional self-awareness accessible and engaging.

## ✨ Latest Updates (December 2024)

- **Clean White Design**: Pure white background for modern, minimal aesthetic
- **iPhone-Style Modal**: Beautiful mood entry with blur effect backdrop
- **Modern Tab Bar**: Blur effect with floating plus button
- **Simplified Quick Entry**: Streamlined interface without emoji grid
- **10-Point Mood Scale**: Expanded emotional granularity

## Features

### Core Functionality
- **10-Point Mood Scale**: Express emotions from devastated (1) to euphoric (10)
- **Modal Mood Entry**: iPhone-style popup with blur backdrop
- **Multiple Input Methods**: Text notes (ready), photos & voice (UI ready)
- **Pinterest-Style Gallery**: Visual mood history in beautiful masonry layout
- **AI-Powered Insights**: Personalized recommendations with confidence meter
- **Real-Time Sync**: Cloud-based storage with Supabase

### Premium Design
- **Glass Morphism UI**: Modern, translucent interface elements
- **Smooth Animations**: Spring physics with React Native Reanimated 2
- **Live Components**: Real-time clock, weather display, dynamic content
- **Modern Tab Bar**: iPhone-style with blur effect and floating plus
- **Haptic Feedback**: Subtle vibrations for better UX

### Analytics & Insights
- **Mood Statistics**: Track streaks, averages, and growth
- **2x2 Stats Grid**: Current streak, mood score, growth rate, total entries
- **5-Dot Progress**: Visual mood score representation
- **AI Insights**: Live recommendations with confidence percentage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Expo Go app on your phone (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moodvibe.git
cd mudoapp
```

2. Install dependencies:
```bash
npm install
# or with legacy peer deps if needed
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. Start the development server:
```bash
npm start
```

5. Run the app:
- Press `w` for web browser
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app

## Project Structure

```
mudoapp/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── LiveTimeHeader.tsx
│   │   ├── AIInsightCard.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── EnhancedMoodSelector.tsx
│   │   ├── MoodGallery.tsx
│   │   ├── ModernTabBar.tsx
│   │   └── ...
│   ├── screens/          # App screens
│   │   ├── HomeScreenV2.tsx
│   │   ├── MoodEntryScreen.tsx (Modal)
│   │   ├── HistoryScreenV2.tsx
│   │   └── ...
│   ├── contexts/         # React Context providers
│   ├── constants/        # Theme and configuration
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript definitions
│   └── lib/             # External service configs
├── assets/              # Images and static files
├── docs/               # Documentation
├── database/           # Database schemas
└── App.tsx            # Entry point
```

## Technology Stack

### Frontend
- **React Native**: Cross-platform mobile framework
- **Expo SDK 53**: Latest development platform
- **TypeScript**: Type-safe JavaScript
- **React Navigation v7**: Routing with modal support
- **React Native Reanimated 2**: Smooth animations
- **Expo Blur**: iOS-style blur effects

### Backend
- **Supabase**: PostgreSQL database with real-time sync
- **Authentication**: Secure email/password auth
- **Storage**: Cloud storage for media files (ready)
- **Row Level Security**: User data isolation

### Design System
- **Pure White Background**: Clean, modern aesthetic
- **Glass Morphism**: Subtle translucent effects
- **Premium Blue (#5D8AA8)**: Primary color scheme
- **Custom Icons**: SVG-based icon system

## Key Components

### Screens
- **HomeScreenV2**: White background with reorganized layout
- **MoodEntryScreen**: Full-screen modal with blur backdrop
- **HistoryScreenV2**: Full mood gallery with filters
- **InsightsScreen**: Analytics and patterns
- **ProfileScreen**: User settings and preferences

### Core Components (v4.0)
- **LiveTimeHeader**: Real-time clock, weather, notifications
- **AIInsightCard**: Live AI insights with pulse animation
- **StatsGrid**: 2x2 metrics grid with progress dots
- **EnhancedMoodSelector**: Simplified quick entry buttons
- **MoodGallery**: Pinterest-style masonry layout
- **PeacefulSoundsWidget**: Dark glass music player
- **DrMayaCard**: AI therapist booking interface
- **ModernTabBar**: iPhone-style with blur and floating plus

## Navigation Architecture

```
AppStack
├── MainTabs (Tab Navigator)
│   ├── Home (HomeScreenV2)
│   ├── Insights
│   ├── History (HistoryScreenV2)
│   └── Profile
└── MoodEntry (Transparent Modal)
```

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
# iOS
eas build --platform ios

# Android  
eas build --platform android

# Web
expo build:web
```

### Code Style
- TypeScript strict mode enabled
- Component-based architecture
- Hooks-only (no class components)
- Consistent file naming

## Configuration

### Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Future APIs
WEATHER_API_KEY=your_weather_api_key
AI_SERVICE_KEY=your_ai_service_key
```

### Theme Customization
Edit `src/constants/theme.ts` to customize:
- Color palette (now using premium blue)
- Typography scale
- Spacing system
- Shadow definitions (updated for RN)

## Performance

- **Bundle Size**: ~2.8MB (web)
- **Startup Time**: < 2 seconds
- **Frame Rate**: 60fps animations
- **Memory Usage**: Optimized renders

## Current Status

### ✅ Completed (90%)
- Email authentication system
- Premium UI design (v4.0)
- Modal mood entry with 10 emotions
- Modern bottom navigation
- Pinterest-style mood gallery
- AI insights UI (mock data)
- Stats tracking
- Haptic feedback

### 🚧 In Progress
- Camera integration
- Voice recording
- Weather API
- Real AI service

### ⏳ Planned
- Dark mode
- Data export
- Offline sync
- Push notifications
- Social features

## Documentation

- [UI Specification](docs/COMPREHENSIVE_UI_SPECIFICATION.md) - Complete UI/UX documentation
- [Progress Report](docs/PROGRESS_REPORT.md) - Detailed development progress
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) - System design
- [Running Instructions](RUN_INSTRUCTIONS.md) - Detailed setup guide

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code patterns
- Maintain TypeScript types
- Test on both iOS and Android
- Update documentation

## Troubleshooting

### Common Issues
1. **Dependency conflicts**: Use `npm install --legacy-peer-deps`
2. **Metro bundler**: Clear cache with `expo start -c`
3. **iOS Simulator**: Ensure XCode is updated
4. **Shadow warnings**: Already fixed in latest version

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern iOS applications
- iPhone modal patterns for better UX
- Glass morphism trend in UI design
- React Native community for excellent libraries

---

<div align="center">
  Made with ❤️ by the MoodVibe Team
  
  [Website](https://moodvibe.app) • [Documentation](docs/) • [Support](mailto:support@moodvibe.app)
</div>