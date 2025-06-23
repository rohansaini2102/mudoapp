# Phase 2: Analytics & Insights Dashboard

## Overview
Phase 2 introduces comprehensive mood analytics with calendar visualization, multiple chart types, and AI-generated insights about mood patterns.

## Key Features

### 1. Calendar View
- **Monthly Calendar Heatmap**
  - Color-coded days based on average mood
  - Color scale: Red (low mood) to Green (high mood)
  - Tap on any day to see detailed entries
  - Swipe between months
  - Quick stats below calendar

- **Day Detail Modal**
  - All entries for selected day
  - Mood fluctuation graph
  - Media thumbnails
  - Entry timestamps

### 2. Analytics Charts

#### Mood Trend Line Chart
- X-axis: Time (7 days, 30 days, 90 days, 1 year)
- Y-axis: Mood score (1-10)
- Moving average line
- Mood range indicators
- Pinch to zoom functionality

#### Weekly Pattern Bar Chart
- Average mood by day of week
- Identifies best/worst days
- Comparison with previous weeks
- Tap for detailed breakdown

#### Time of Day Analysis
- 24-hour mood distribution
- Peak mood times highlighted
- Morning/afternoon/evening averages
- Circadian rhythm insights

#### Mood Distribution Pie Chart
- Percentage breakdown of mood ranges
- Low (1-3), Medium (4-6), High (7-10)
- Trend arrows for each category
- Monthly comparison

### 3. AI-Powered Insights Section

#### Pattern Recognition
- **Positive Patterns**
  - "Your mood improves 40% on days with morning entries"
  - "Exercise correlates with +2 mood boost"
  - "Social activities show 35% mood improvement"

- **Negative Patterns**
  - "Late night entries average 3 points lower"
  - "Mondays consistently show lower moods"
  - "Skipping entries often precedes mood dips"

#### Predictive Analysis
- Tomorrow's predicted mood range
- Weekly mood forecast
- Intervention suggestions
- Accuracy tracking

#### Personalized Recommendations
- "Try logging mood before 10 AM for better days"
- "Your best moods happen after creative activities"
- "Consider adding physical activity on low days"

### 4. Export & Sharing
- Generate mood report PDF
- Share monthly summary image
- Export data as CSV
- Therapist-ready reports

## Technical Implementation

### New Database Tables
```sql
-- Analytics cache table
CREATE TABLE analytics_cache (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    metric_type VARCHAR(50),
    date_range VARCHAR(20),
    data JSONB,
    calculated_at TIMESTAMP
);

-- AI insights table
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    insight_type VARCHAR(50),
    content TEXT,
    confidence_score FLOAT,
    created_at TIMESTAMP,
    dismissed BOOLEAN DEFAULT false
);
```

### Analytics Engine
- Background processing for heavy calculations
- Caching strategy for performance
- Real-time updates for new entries
- Efficient data aggregation queries

### Chart Libraries
- Victory Native for React Native charts
- Custom calendar component
- Smooth animations and transitions
- Touch interactions

### AI Integration
- Pattern detection algorithms
- Statistical analysis functions
- Machine learning model for predictions
- Natural language generation for insights

## UI/UX Design

### Navigation
- Tab navigation: Calendar | Charts | Insights
- Time period selector (prominent)
- Filter options
- Share button

### Visual Design
- Consistent color scheme for moods
- Smooth transitions between views
- Loading states for calculations
- Empty states with helpful prompts

## Success Metrics
- Users view analytics 3+ times per week
- 80% find insights "helpful" or "very helpful"
- Average session time > 3 minutes
- 60% share their mood reports
- Prediction accuracy > 70%

## Timeline
- Week 1-2: Calendar view implementation
- Week 3-4: Chart components and interactions
- Week 5-6: Analytics engine and caching
- Week 7-8: AI insights integration
- Week 9-10: Testing and optimization