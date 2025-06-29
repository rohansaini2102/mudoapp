import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { MoodEntry } from '../../types/mood';

interface MoodHeatmapCalendarProps {
  entries: MoodEntry[];
  onDayPress?: (date: Date, entries: MoodEntry[]) => void;
}

interface DayData {
  date: Date;
  entries: MoodEntry[];
  averageMood: number;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function MoodHeatmapCalendar({ entries, onDayPress }: MoodHeatmapCalendarProps) {
  const calendarData = useMemo(() => {
    // Group entries by date
    const entriesByDate = new Map<string, MoodEntry[]>();
    
    entries.forEach(entry => {
      const date = new Date(entry.created_at);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      
      if (!entriesByDate.has(dateKey)) {
        entriesByDate.set(dateKey, []);
      }
      entriesByDate.get(dateKey)!.push(entry);
    });

    // Generate calendar grid for last 3 months
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 2);
    startDate.setDate(1);

    const months: { month: number; year: number; days: DayData[][] }[] = [];
    
    for (let m = 0; m < 3; m++) {
      const currentMonth = new Date(startDate);
      currentMonth.setMonth(startDate.getMonth() + m);
      
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      const weeks: DayData[][] = [];
      let week: DayData[] = [];
      
      // Add empty days at the beginning
      for (let i = 0; i < firstDay; i++) {
        week.push({ date: new Date(0), entries: [], averageMood: 0 });
      }
      
      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = `${year}-${month}-${day}`;
        const dayEntries = entriesByDate.get(dateKey) || [];
        const averageMood = dayEntries.length > 0
          ? dayEntries.reduce((sum, e) => sum + e.mood_score, 0) / dayEntries.length
          : 0;
        
        week.push({ date, entries: dayEntries, averageMood });
        
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      
      // Add remaining days to the last week
      if (week.length > 0) {
        while (week.length < 7) {
          week.push({ date: new Date(0), entries: [], averageMood: 0 });
        }
        weeks.push(week);
      }
      
      months.push({ month, year, days: weeks });
    }
    
    return months;
  }, [entries]);

  const getMoodColor = (averageMood: number): string => {
    if (averageMood === 0) return Colors.systemGray6;
    if (averageMood <= 2) return '#FFE5E5';
    if (averageMood <= 4) return '#FFEAA7';
    if (averageMood <= 6) return '#FFFACD';
    if (averageMood <= 8) return '#E8F5E9';
    return '#C8E6C9';
  };

  const getMoodEmoji = (averageMood: number): string => {
    if (averageMood === 0) return '';
    const moodIndex = Math.round(averageMood) - 1;
    const emojis = ['😭', '😢', '😞', '😟', '😐', '🙂', '😊', '😍', '🤩', '😇'];
    return emojis[moodIndex] || '😊';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Calendar</Text>
      <Text style={styles.subtitle}>Your emotional journey over time</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {calendarData.map((monthData, monthIndex) => (
          <View key={monthIndex} style={styles.monthContainer}>
            <Text style={styles.monthTitle}>
              {MONTHS[monthData.month]} {monthData.year}
            </Text>
            
            <View style={styles.weekdaysRow}>
              {WEEKDAYS.map((day, index) => (
                <Text key={index} style={styles.weekdayText}>{day}</Text>
              ))}
            </View>
            
            {monthData.days.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekRow}>
                {week.map((day, dayIndex) => {
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  const isEmpty = day.date.getTime() === 0;
                  
                  if (isEmpty) {
                    return <View key={dayIndex} style={styles.emptyDay} />;
                  }
                  
                  return (
                    <TouchableOpacity
                      key={dayIndex}
                      style={[
                        styles.dayCell,
                        { backgroundColor: getMoodColor(day.averageMood) },
                        isToday && styles.todayCell,
                      ]}
                      onPress={() => onDayPress?.(day.date, day.entries)}
                      disabled={day.entries.length === 0}
                    >
                      <Text style={styles.dayNumber}>{day.date.getDate()}</Text>
                      {day.averageMood > 0 && (
                        <Text style={styles.dayEmoji}>{getMoodEmoji(day.averageMood)}</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Mood Scale</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FFE5E5' }]} />
            <Text style={styles.legendText}>Low</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FFFACD' }]} />
            <Text style={styles.legendText}>Medium</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#C8E6C9' }]} />
            <Text style={styles.legendText}>High</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: Colors.systemGray6 }]} />
            <Text style={styles.legendText}>No data</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: BorderRadius.xlarge,
    padding: Spacing.xl,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.medium,
  },
  title: {
    ...Typography.headline,
    color: Colors.label,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    marginBottom: Spacing.lg,
  },
  scrollContent: {
    paddingRight: Spacing.lg,
  },
  monthContainer: {
    marginRight: Spacing.xl,
  },
  monthTitle: {
    ...Typography.headline,
    color: Colors.label,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  weekdaysRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  weekdayText: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
    width: 32,
    textAlign: 'center',
    fontWeight: '600',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayCell: {
    width: 32,
    height: 32,
    marginRight: 4,
    borderRadius: BorderRadius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDay: {
    width: 32,
    height: 32,
    marginRight: 4,
  },
  todayCell: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  dayNumber: {
    ...Typography.caption2,
    color: Colors.label,
    fontWeight: '600',
  },
  dayEmoji: {
    fontSize: 10,
    position: 'absolute',
    bottom: 1,
  },
  legend: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
  legendTitle: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    marginBottom: Spacing.sm,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: BorderRadius.small,
  },
  legendText: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
  },
});