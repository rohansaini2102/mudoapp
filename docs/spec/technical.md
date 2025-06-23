# MoodVibe Technical Specifications

## Technology Stack

### Frontend
- **React Native Expo** - Cross-platform mobile development
- **TypeScript** - Type safety and better development experience
- **Expo SDK** - Camera, audio recording, notifications, biometric auth
- **React Navigation** - Navigation between screens
- **React Native Reanimated** - Smooth animations for mood UI

### Backend
- **Supabase** - Backend as a Service
  - Authentication (email, social, biometric)
  - PostgreSQL database
  - Real-time subscriptions
  - Storage for media files
  - Row Level Security (RLS)

### AI Services
- **OpenAI API (GPT-4)** - AI therapist conversations
- **Custom ML Models** - Mood prediction and pattern recognition
  - Hosted on Supabase Edge Functions
  - TensorFlow.js for client-side predictions

### Database Schema (PostgreSQL via Supabase)
```sql
-- Core tables
users
mood_entries
mood_circles
circle_members
achievements
challenges
ai_sessions
notifications
```

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Mobile App (Expo)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Screens    │  │  Components │  │   Stores    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────┬───────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                  Supabase Backend                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │    Auth     │  │   Database  │  │   Storage   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Realtime   │  │Edge Functions│ │     RLS     │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────┬───────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                 External Services                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ OpenAI API  │  │ Weather API │  │Push Service │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Key Technical Requirements

### Performance
- App launch time < 2 seconds
- Mood entry save < 500ms
- Smooth 60fps animations
- Offline-first architecture with sync

### Security
- End-to-end encryption for sensitive data
- Biometric authentication
- Row Level Security on all database tables
- API rate limiting
- Secure storage for API keys

### Scalability
- Horizontal scaling via Supabase
- CDN for media content
- Database indexing for analytics queries
- Efficient real-time subscriptions

### Data Privacy
- GDPR compliance
- User data export functionality
- Right to deletion
- Anonymous mode implementation
- Local-first data storage option

## Development Phases

See detailed phase descriptions in:
- [Phase 1: MVP - Basic Mood Tracking](./phase1-mvp.md)
- [Phase 2: Analytics & Insights](./phase2-analytics.md)
- [Phase 3: AI Dr. Maya Therapist](./phase3-ai-therapist.md)
- [Phase 4: Mood Support Circles](./phase4-social-circles.md)

## Environment Setup

### Required Tools
- Node.js 18+
- Expo CLI
- Supabase CLI
- TypeScript
- Git

### Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
SENTRY_DSN=
```

## Deployment

### Mobile Apps
- **iOS**: App Store via Expo EAS Build
- **Android**: Google Play via Expo EAS Build
- **Web**: Vercel or Netlify

### Backend
- **Supabase**: Managed hosting
- **Edge Functions**: Supabase Edge Runtime
- **Database**: Supabase PostgreSQL

## Monitoring & Analytics
- **Sentry**: Error tracking
- **Expo Analytics**: App usage metrics
- **Supabase Analytics**: Database performance
- **Custom Dashboard**: Mood trends and insights