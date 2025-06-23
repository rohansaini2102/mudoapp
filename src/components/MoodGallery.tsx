import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { MoodBox } from './MoodBox';
import { MockMoodEntry, getBoxHeight } from '../utils/mockMoodData';
import { Spacing } from '../constants/theme';

const { width: screenWidth } = Dimensions.get('window');
const COLUMN_GAP = 12;
const HORIZONTAL_PADDING = 56; // 28 * 2 (Spacing.xl)
const COLUMN_WIDTH = (screenWidth - HORIZONTAL_PADDING - COLUMN_GAP) / 2;

interface MoodGalleryProps {
  entries: MockMoodEntry[];
  onItemPress?: (entry: MockMoodEntry) => void;
}

interface ColumnData {
  entries: MockMoodEntry[];
  heights: number[];
  totalHeight: number;
}

export function MoodGallery({ entries, onItemPress }: MoodGalleryProps) {
  // Calculate masonry layout
  const { leftColumn, rightColumn } = useMemo(() => {
    const left: ColumnData = { entries: [], heights: [], totalHeight: 0 };
    const right: ColumnData = { entries: [], heights: [], totalHeight: 0 };

    entries.forEach((entry, index) => {
      const height = getBoxHeight(entry.type, entry.note);
      
      // Add to shorter column
      if (left.totalHeight <= right.totalHeight) {
        left.entries.push(entry);
        left.heights.push(height);
        left.totalHeight += height + COLUMN_GAP;
      } else {
        right.entries.push(entry);
        right.heights.push(height);
        right.totalHeight += height + COLUMN_GAP;
      }
    });

    return { leftColumn: left, rightColumn: right };
  }, [entries]);

  const renderColumn = (columnData: ColumnData, isLeft: boolean) => {
    return (
      <View style={[styles.column, isLeft ? styles.leftColumn : styles.rightColumn]}>
        {columnData.entries.map((entry, index) => (
          <MoodBox
            key={entry.id}
            {...entry}
            height={columnData.heights[index]}
            onPress={() => onItemPress?.(entry)}
            index={index}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.galleryContainer}>
        {renderColumn(leftColumn, true)}
        {renderColumn(rightColumn, false)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // No flex: 1 needed for limited items
  },
  galleryContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  column: {
    width: COLUMN_WIDTH,
  },
  leftColumn: {
    marginRight: COLUMN_GAP / 2,
  },
  rightColumn: {
    marginLeft: COLUMN_GAP / 2,
  },
});