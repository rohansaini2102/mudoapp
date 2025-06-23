# Phase 4: Mood Support Circles

## Overview
Phase 4 introduces anonymous mood sharing within trusted friend circles, creating a supportive community while maintaining privacy.

## Key Features

### 1. Circle Creation & Management

#### Creating a Circle
- Name your circle (e.g., "College Squad", "Work Friends")
- Generate unique invite code
- Set circle size (3-7 members)
- Choose circle theme/color
- Privacy settings configuration

#### Joining a Circle
- Enter invite code
- Scan QR code
- Accept invite link
- Approval process (if enabled)
- Welcome onboarding

### 2. Anonymous Mood Sharing

#### Identity Protection
- Randomly assigned anonymous names (e.g., "Blue Butterfly", "Happy Penguin")
- Names shuffle weekly
- No profile pictures in circle view
- Voice/video messages anonymized
- Location data stripped

#### Mood Status Display
- Current mood emoji for each member
- Mood trend indicator (↑ ↓ →)
- Last update timestamp
- Support needed flag
- Online/offline status

### 3. Support System

#### Support Requests
- "I need support" button
- Anonymous support messages
- Predefined comfort messages
- Custom encouraging notes
- Resource sharing

#### Support Actions
- Send virtual hug 🤗
- Share coping technique
- Suggest activity together
- Share inspirational quote
- Emergency escalation

### 4. Circle Features

#### Circle Dashboard
- **Mood Health Score**
  - Overall circle mood average
  - Trend visualization
  - Alert for concerning patterns
  - Weekly summary

- **Activity Feed**
  - Anonymous mood updates
  - Support messages sent/received
  - Milestones celebrated
  - Challenge completions

#### Group Challenges
- Daily gratitude sharing
- Mood improvement challenges
- Group meditation sessions
- Exercise together (virtually)
- Creative expression prompts

#### Circle Analytics
- Group mood patterns
- Support effectiveness
- Most supportive member awards
- Participation rates
- Connection strength metrics

### 5. Privacy & Safety

#### Privacy Controls
- Leave circle anytime
- Block specific members
- Report concerning behavior
- Mute notifications
- Data retention settings

#### Safety Features
- Crisis detection across circle
- Group intervention prompts
- Professional help resources
- Emergency contact system
- Community guidelines

### 6. Communication Features

#### Circle Chat
- Group chat (optional)
- Emoji reactions
- Scheduled check-ins
- Voice note circles
- Disappearing messages

#### Mood Rituals
- Morning check-in prompts
- Evening reflection circle
- Weekend mood reviews
- Celebration moments
- Support huddles

## Technical Implementation

### Database Schema
```sql
-- Circles table
CREATE TABLE circles (
    id UUID PRIMARY KEY,
    name VARCHAR(100),
    invite_code VARCHAR(10) UNIQUE,
    created_by UUID REFERENCES users(id),
    max_members INTEGER DEFAULT 7,
    theme_color VARCHAR(7),
    created_at TIMESTAMP
);

-- Circle members table
CREATE TABLE circle_members (
    id UUID PRIMARY KEY,
    circle_id UUID REFERENCES circles(id),
    user_id UUID REFERENCES users(id),
    anonymous_name VARCHAR(50),
    joined_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(circle_id, user_id)
);

-- Circle moods table
CREATE TABLE circle_moods (
    id UUID PRIMARY KEY,
    circle_id UUID REFERENCES circles(id),
    member_id UUID REFERENCES circle_members(id),
    mood_score INTEGER,
    needs_support BOOLEAN DEFAULT false,
    created_at TIMESTAMP
);

-- Support messages table
CREATE TABLE support_messages (
    id UUID PRIMARY KEY,
    circle_id UUID REFERENCES circles(id),
    from_member_id UUID REFERENCES circle_members(id),
    to_member_id UUID REFERENCES circle_members(id),
    message_type VARCHAR(50),
    content TEXT,
    created_at TIMESTAMP
);
```

### Real-time Features
- WebSocket connections for live updates
- Presence detection
- Instant mood updates
- Support notification push
- Typing indicators

### Anonymization System
```javascript
// Anonymous name generation
const adjectives = ['Happy', 'Calm', 'Bright', 'Gentle', 'Wise'];
const animals = ['Butterfly', 'Dolphin', 'Panda', 'Koala', 'Phoenix'];

function generateAnonymousName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj} ${animal}`;
}

// Weekly shuffle
function shuffleCircleNames(circleId) {
  // Reassign all anonymous names weekly
  // Maintain mapping privately for safety
}
```

### Privacy Implementation
- End-to-end encryption for messages
- Zero-knowledge architecture for anonymity
- Local anonymization before sending
- Secure invite code generation
- Data isolation between circles

## UI/UX Design

### Circle View
- Grid layout of member mood cards
- Anonymous avatar icons
- Mood emoji prominent display
- Support needed indicator
- Last seen status

### Interaction Patterns
- Long press for support options
- Swipe for quick reactions
- Pull to refresh moods
- Tap for member detail
- Shake for emergency support

### Visual Design
- Soft, calming colors
- Smooth mood transitions
- Particle effects for support
- Celebration animations
- Night mode support

## Success Metrics
- 80% of users join at least one circle
- Daily active circle participation > 60%
- Support messages increase mood by 25%
- Circle retention rate > 70%
- Average circle size: 5 members

## Community Guidelines
- Be kind and supportive
- Respect anonymity
- No medical advice
- Report concerning content
- Celebrate small wins

## Timeline
- Week 1-2: Circle creation and joining flow
- Week 3-4: Anonymous system implementation
- Week 5-6: Real-time mood sharing
- Week 7-8: Support features
- Week 9-10: Circle analytics and insights
- Week 11-12: Testing and community building