# MoodVibe Technical Architecture

## Overview

MoodVibe is built with a modern, scalable architecture using React Native for cross-platform mobile development and Supabase as the backend-as-a-service provider. The application follows a component-based architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Applications                      │
├─────────────────┬─────────────────┬────────────────────────┤
│   iOS (Expo)    │   Android (Expo) │    Web (Expo Web)     │
└────────┬────────┴────────┬────────┴───────┬────────────────┘
         │                 │                 │
         └─────────────────┴─────────────────┘
                           │
                    ┌──────┴──────┐
                    │  App Layer   │
                    │  (App.tsx)   │
                    └──────┬──────┘
                           │
        ┌──────────────────┴──────────────────┐
        │          Navigation Layer           │
        │      (React Navigation v6)          │
        └──────────────────┬──────────────────┘
                           │
     ┌─────────────────────┴─────────────────────┐
     │              Screen Layer                  │
     │  (HomeScreen, HistoryScreen, etc.)        │
     └─────────────────────┬─────────────────────┘
                           │
     ┌─────────────────────┴─────────────────────┐
     │            Component Layer                 │
     │   (Reusable UI Components)                │
     └─────────────────────┬─────────────────────┘
                           │
     ┌─────────────────────┴─────────────────────┐
     │            Context Layer                   │
     │    (AuthContext, MoodContext)             │
     └─────────────────────┬─────────────────────┘
                           │
     ┌─────────────────────┴─────────────────────┐
     │            Service Layer                   │
     │         (Supabase Client)                  │
     └─────────────────────┬─────────────────────┘
                           │
     ┌─────────────────────┴─────────────────────┐
     │          Backend (Supabase)                │
     ├─────────────┬───────────────┬─────────────┤
     │    Auth     │   Database    │   Storage   │
     │  Service    │  (PostgreSQL) │   (S3)      │
     └─────────────┴───────────────┴─────────────┘
```

## Tech Stack Details

### Frontend Framework
**React Native 0.71.8 with Expo SDK 48**
- Cross-platform development
- Hot reloading for rapid development
- Access to native APIs through Expo
- Web support through React Native Web

### Language
**TypeScript 4.9.4**
- Type safety and better IDE support
- Interface definitions for components
- Improved code maintainability
- Catch errors at compile time

### State Management
**React Context API**
- AuthContext: Authentication state
- MoodContext: Mood entries and statistics
- No external state management library needed
- Clean, simple state sharing

### Navigation
**React Navigation v6**
- Stack Navigator for auth flow
- Bottom Tab Navigator for main app
- Modal presentations for mood entry
- Type-safe navigation with TypeScript

### UI Components

#### Core Libraries
- **React Native Reanimated 2**: Smooth 60fps animations
- **React Native Gesture Handler**: Touch interactions
- **Expo Linear Gradient**: Gradient backgrounds
- **React Native Safe Area Context**: Device safe areas

#### Component Architecture
```
components/
├── Layout Components
│   ├── GradientBackground.tsx
│   ├── AnimatedCard.tsx
│   └── SwipeableRow.tsx
├── Navigation
│   └── ModernTabBar.tsx
├── Display Components
│   ├── LiveTimeHeader.tsx
│   ├── AIInsightCard.tsx
│   ├── StatsGrid.tsx
│   ├── MoodGallery.tsx
│   └── MoodBox.tsx
├── Input Components
│   ├── EnhancedMoodSelector.tsx
│   ├── IOSInput.tsx
│   └── IOSButton.tsx
└── Feature Components
    ├── PeacefulSoundsWidget.tsx
    └── DrMayaCard.tsx
```

### Backend Services

#### Supabase Components
1. **Authentication**
   - Email/password authentication
   - Session management
   - Secure token storage
   - Row Level Security (RLS)

2. **Database (PostgreSQL)**
   - Profiles table
   - Mood entries table
   - Real-time subscriptions ready
   - Automatic timestamps

3. **Storage** (Planned)
   - Image uploads
   - Video storage
   - Audio recordings
   - Automatic optimization

### Data Flow

#### Authentication Flow
```
1. User enters credentials
2. AuthContext calls Supabase Auth
3. Session stored in SecureStore
4. Auth state propagated via Context
5. Navigation updates based on auth
```

#### Mood Entry Flow
```
1. User selects mood + optional note
2. MoodContext creates entry
3. Supabase inserts to database
4. Local state updates optimistically
5. Real-time sync to other devices
```

#### Data Fetching Strategy
- **Initial Load**: Fetch recent entries on mount
- **Real-time**: Subscribe to changes (planned)
- **Caching**: In-memory cache for performance
- **Offline**: Queue changes for later sync

## Component Hierarchy

### App Structure
```
App.tsx
├── NavigationContainer
├── AuthProvider
├── MoodProvider
└── RootNavigator
    ├── AuthStack (unauthenticated)
    │   ├── SignInScreen
    │   └── SignUpScreen
    └── AppStack (authenticated)
        ├── TabNavigator
        │   ├── HomeScreenV2
        │   ├── InsightsScreen
        │   ├── HistoryScreenV2
        │   └── ProfileScreen
        └── MoodEntryScreen (modal)
```

### Screen Composition Example (HomeScreenV2)
```
HomeScreenV2
├── SafeAreaView
├── LiveTimeHeader
├── ScrollView
│   ├── AIInsightCard
│   ├── StatsGrid
│   ├── EnhancedMoodSelector
│   ├── PeacefulSoundsWidget
│   ├── MoodGallery
│   └── DrMayaCard
└── ModernTabBar (via Navigator)
```

## Design Patterns

### Component Patterns
1. **Compound Components**: StatsGrid with child stat cards
2. **Render Props**: Custom rendering in lists
3. **HOCs**: Animation wrappers
4. **Custom Hooks**: useAuth, useMood

### Code Organization
```typescript
// Component Structure
interface ComponentProps {
  // Props definition
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Hooks
  const { user } = useAuth();
  
  // State
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Handlers
  const handleAction = () => {
    // Logic
  };
  
  // Render
  return (
    <View>
      {/* JSX */}
    </View>
  );
}
```

### Styling Approach
1. **StyleSheet**: Performance optimized styles
2. **Theme Constants**: Centralized design tokens
3. **Platform Styles**: iOS/Android specific
4. **Responsive**: Percentage-based layouts

## Performance Optimizations

### Current Optimizations
1. **React.memo**: Prevent unnecessary re-renders
2. **useMemo/useCallback**: Expensive computations
3. **Native Driver**: All animations use native thread
4. **Lazy Loading**: Screens loaded on demand

### Planned Optimizations
1. **Image Caching**: FastImage implementation
2. **List Virtualization**: Large dataset handling
3. **Bundle Splitting**: Reduce initial load
4. **Background Tasks**: Sync and notifications

## Security Architecture

### Authentication Security
- Supabase handles authentication
- Tokens stored securely
- Auto-refresh on expiry
- Logout clears all data

### Data Security
- Row Level Security in PostgreSQL
- User can only access own data
- HTTPS for all communications
- No sensitive data in AsyncStorage

### API Security
- Environment variables for keys
- API keys not exposed to client
- Rate limiting on Supabase
- Input validation on all forms

## Testing Strategy

### Current Testing
- Manual testing on iOS/Android/Web
- Component isolation testing
- User flow testing
- Performance monitoring

### Planned Testing
```typescript
// Unit Tests (Jest)
describe('MoodSelector', () => {
  it('should select mood on press', () => {
    // Test implementation
  });
});

// Integration Tests
describe('Mood Entry Flow', () => {
  it('should save mood to database', async () => {
    // Test implementation
  });
});

// E2E Tests (Detox)
describe('User Journey', () => {
  it('should complete mood entry', async () => {
    // Test implementation
  });
});
```

## Deployment Architecture

### Development
```bash
npm start
# Expo DevTools
# Hot reloading enabled
# Debug mode active
```

### Staging
```bash
expo publish --release-channel staging
# OTA updates enabled
# Staging API endpoints
# Test data
```

### Production
```bash
# iOS
expo build:ios --release-channel production

# Android
expo build:android --release-channel production

# Web
expo build:web
```

## Monitoring & Analytics

### Current Monitoring
- Console logging for debugging
- Error boundaries for crash prevention
- Network request monitoring

### Planned Monitoring
1. **Sentry**: Error tracking
2. **Analytics**: User behavior
3. **Performance**: Core Web Vitals
4. **Crashlytics**: Crash reporting

## Scalability Considerations

### Database Scalability
- Indexed queries for performance
- Pagination for large datasets
- Efficient query patterns
- Connection pooling

### Application Scalability
- Modular architecture
- Lazy loading of features
- Code splitting ready
- Microservices ready

### Infrastructure Scalability
- Supabase auto-scaling
- CDN for static assets
- Regional deployments
- Load balancing

## Future Architecture Enhancements

### Short Term
1. Implement proper error boundaries
2. Add comprehensive logging
3. Set up CI/CD pipeline
4. Add automated testing

### Medium Term
1. Implement offline-first architecture
2. Add real-time collaboration
3. Integrate AI services
4. Add WebSocket connections

### Long Term
1. Microservices architecture
2. GraphQL implementation
3. Native modules for performance
4. Multi-tenant architecture

## Development Workflow

### Git Flow
```
main
├── develop
│   ├── feature/mood-gallery
│   ├── feature/ai-insights
│   └── feature/voice-recording
├── release/v1.0
└── hotfix/auth-bug
```

### Code Review Process
1. Feature branch created
2. Implementation completed
3. PR created with description
4. Code review by team
5. Tests pass
6. Merge to develop

### Release Process
1. Feature freeze on develop
2. Release branch created
3. QA testing
4. Bug fixes only
5. Merge to main
6. Tag release
7. Deploy to stores

## Conclusion

MoodVibe's architecture is designed for scalability, maintainability, and performance. The modular structure allows for easy feature additions while maintaining code quality. The use of modern tools and best practices ensures a robust application that can grow with user needs.