import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

export type Period = '7days' | '30days' | '90days' | 'all';

interface PeriodSelectorProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

interface PeriodOption {
  value: Period;
  label: string;
}

const periods: PeriodOption[] = [
  { value: '7days', label: 'Week' },
  { value: '30days', label: 'Month' },
  { value: '90days', label: '3 Months' },
  { value: 'all', label: 'All Time' },
];

export function PeriodSelector({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) {
  const selectedIndex = periods.findIndex(p => p.value === selectedPeriod);
  const animatedIndex = useSharedValue(selectedIndex);

  React.useEffect(() => {
    animatedIndex.value = withSpring(selectedIndex, {
      damping: 20,
      stiffness: 150,
    });
  }, [selectedIndex]);

  const indicatorStyle = useAnimatedStyle(() => {
    const itemWidth = (300 - Spacing.sm * 2) / periods.length;
    return {
      transform: [
        {
          translateX: interpolate(
            animatedIndex.value,
            [0, 1, 2, 3],
            [0, itemWidth, itemWidth * 2, itemWidth * 3]
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        
        {periods.map((period) => (
          <TouchableOpacity
            key={period.value}
            style={styles.option}
            onPress={() => onPeriodChange(period.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selectedPeriod === period.value && styles.optionTextSelected,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  selector: {
    height: 44,
    backgroundColor: Colors.systemGray6,
    borderRadius: BorderRadius.large,
    flexDirection: 'row',
    padding: Spacing.xs,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    width: (300 - Spacing.sm * 2) / 4,
    height: 36,
    backgroundColor: Colors.secondaryBackground,
    borderRadius: BorderRadius.medium,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
});