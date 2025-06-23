# MoodVibe Project Context for Claude

## Project Overview
Building MoodVibe - A Gen Z mood tracking app with AI therapist, analytics, and social support circles.

## Current Development Status
- **Current Phase**: Phase 1 (MVP) - Authentication Complete
- **Tech Stack**: React Native Expo + Supabase + OpenAI
- **Project Structure**: Implemented and organized
- **See**: `.claude/project-progress.md` for detailed progress

## Key Technical Decisions
1. **Frontend**: React Native Expo with TypeScript
2. **Backend**: Supabase (Auth, PostgreSQL, Storage, Realtime)
3. **AI**: OpenAI GPT-4 for Dr. Maya therapist
4. **Database**: PostgreSQL via Supabase
5. **Local Storage**: SQLite for offline-first approach

## Development Phases
1. **Phase 1 (MVP)**: Basic mood tracking with multi-modal input (text, image, video, voice)
2. **Phase 2**: Analytics dashboard with calendar view and AI insights
3. **Phase 3**: AI Dr. Maya therapist with full data access
4. **Phase 4**: Anonymous mood support circles

## Important Files
- `spec/features.md` - Complete feature list
- `spec/technical.md` - Technical architecture
- `spec/phase1-mvp.md` - Current phase details
- `spec/phase2-analytics.md` - Analytics implementation
- `spec/phase3-ai-therapist.md` - AI therapist specs
- `spec/phase4-social-circles.md` - Social features

## Commands to Remember
```bash
# Development
npm start
npm run ios
npm run android
npm run web

# Code Quality
npm run lint
npm run typecheck
npm test

# Build
eas build --platform ios
eas build --platform android
```

## Current Tasks
- [x] Set up Expo React Native project with TypeScript ✅
- [x] Configure Supabase backend ✅
- [x] Create database schema ✅
- [x] Implement authentication ✅
- [ ] Build mood entry UI with emoji scale
- [ ] Implement multi-modal input (text, image, video, voice)
- [ ] Set up local SQLite storage
- [ ] Create home dashboard

## Design Patterns
- Offline-first architecture
- Component-based UI structure
- Context for global state
- Custom hooks for data fetching
- Error boundaries for stability

## API Structure
```
/api/auth/* - Authentication endpoints
/api/mood/* - Mood entry endpoints
/api/analytics/* - Analytics data
/api/ai/* - AI therapist endpoints
/api/circles/* - Social circles
```

## Database Tables (Core)
- users
- mood_entries
- ai_sessions
- circles
- circle_members

## Notes & Decisions
- Privacy first - anonymous mood sharing in circles
- End-to-end encryption for sensitive data
- Progressive disclosure in UI
- Mobile-first responsive design
- Accessibility from the start

## Next Steps
1. ~~Initialize Expo project~~ ✅
2. ~~Set up Supabase~~ ✅
3. ~~Create authentication flow~~ ✅
4. Build mood entry screen with emoji scale
5. Implement multi-modal input options
6. Set up local SQLite storage
7. Create home dashboard with stats