# MoodVibe - Premium Mood Tracking App

<div align="center">
  <img src="assets/images/logo.png" alt="MoodVibe Logo" width="120" />
  
  ### Track your emotions, understand your patterns, grow your wellbeing
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.71-blue.svg)](https://reactnative.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
  [![Expo](https://img.shields.io/badge/Expo-48-black.svg)](https://expo.dev/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.0-green.svg)](https://supabase.com/)
</div>

## Overview

MoodVibe is a premium mood tracking application that helps users monitor their emotional wellbeing through an intuitive and beautiful interface. With AI-powered insights, multiple input methods, and a Pinterest-style mood gallery, MoodVibe makes emotional self-awareness accessible and engaging.

## Features

### Core Functionality
- **10-Point Mood Scale**: Express emotions from devastated (1) to euphoric (10)
- **Multiple Input Methods**: Text notes, photos, voice messages, and video diaries
- **Pinterest-Style Gallery**: Visual mood history in a beautiful masonry layout
- **AI-Powered Insights**: Personalized recommendations based on mood patterns
- **Real-Time Sync**: Cloud-based storage with offline support

### Premium Design
- **Glass Morphism UI**: Modern, translucent interface elements
- **Smooth Animations**: Fluid interactions with haptic feedback
- **Live Components**: Real-time clock, weather, and dynamic content
- **Custom Tab Bar**: Floating navigation with blur effects

### Analytics & Insights
- **Mood Statistics**: Track streaks, averages, and growth
- **Pattern Recognition**: Identify mood trends and triggers
- **Weekly Progress**: Visual representation of emotional journey
- **Personalized Tips**: AI-generated wellness suggestions

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Expo Go app on your phone (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moodvibe.git
cd moodvibe
```

2. Install dependencies:
```bash
npm install
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
│   ├── screens/          # App screens
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
- **Expo**: Development platform and tooling
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Routing and navigation
- **React Native Reanimated**: Smooth animations

### Backend
- **Supabase**: PostgreSQL database with real-time sync
- **Authentication**: Secure email/password auth
- **Storage**: Cloud storage for media files
- **Row Level Security**: User data isolation

### Design
- **Glass Morphism**: Modern translucent effects
- **Linear Gradients**: Mood-based color schemes
- **Custom Components**: Platform-specific UI elements

## Key Components

### Screens
- **HomeScreenV2**: Premium dashboard with all features
- **HistoryScreenV2**: Full mood gallery with filters
- **MoodEntryScreen**: Multi-modal mood input
- **InsightsScreen**: Analytics and patterns
- **ProfileScreen**: User settings and preferences

### Core Components
- **LiveTimeHeader**: Dynamic header with time/weather
- **AIInsightCard**: Personalized recommendations
- **StatsGrid**: Key metrics dashboard
- **EnhancedMoodSelector**: 10-emotion picker
- **MoodGallery**: Pinterest-style layout
- **PeacefulSoundsWidget**: Ambient music player
- **DrMayaCard**: AI therapist interface

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
# iOS
expo build:ios

# Android  
expo build:android

# Web
expo build:web
```

### Code Style
- ESLint for linting (configuration pending)
- Prettier for formatting
- TypeScript strict mode
- Component-based architecture

## Configuration

### Environment Variables
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
WEATHER_API_KEY=your_weather_api_key
AI_SERVICE_KEY=your_ai_service_key
```

### Theme Customization
Edit `src/constants/theme.ts` to customize:
- Color palette
- Typography
- Spacing system
- Component styles

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Write clean, documented code
- Follow existing patterns and conventions
- Add tests for new features
- Update documentation as needed

## Roadmap

### Current Status
- ✅ Phase 1: MVP Complete (Basic mood tracking)
- 🚧 Phase 2: Analytics (In progress)
- ⏳ Phase 3: AI Therapist (Planned)
- ⏳ Phase 4: Social Features (Future)

### Upcoming Features
- [ ] Real camera/photo integration
- [ ] Voice recording implementation
- [ ] Weather API integration
- [ ] AI service connection
- [ ] Dark mode support
- [ ] Data export functionality
- [ ] Offline queue sync
- [ ] Push notifications

## Documentation

- [UI Specification](docs/COMPREHENSIVE_UI_SPECIFICATION.md)
- [Progress Report](docs/PROGRESS_REPORT.md)
- [Home UI Update Guide](docs/HOME_UI_UPDATE.md)
- [Phase 1 MVP Spec](docs/spec/phase1-mvp.md)
- [Running Instructions](RUN_INSTRUCTIONS.md)

## Performance

- **Bundle Size**: ~2.5MB (web)
- **Startup Time**: < 2 seconds
- **Frame Rate**: 60fps target
- **Memory Usage**: Optimized for mobile

## Security

- Secure authentication with Supabase
- Row-level security for user data
- Encrypted data transmission
- No sensitive data in local storage

## Support

For support, please:
1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/yourusername/moodvibe/issues)
3. Create a new issue with detailed information

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern iOS applications
- UI patterns from successful mood tracking apps
- Glass morphism trend in modern UI design
- React Native community for excellent libraries

---

<div align="center">
  Made with ❤️ by the MoodVibe Team
  
  [Website](https://moodvibe.app) • [Documentation](docs/) • [Support](mailto:support@moodvibe.app)
</div>