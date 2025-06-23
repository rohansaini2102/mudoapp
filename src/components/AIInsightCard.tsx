import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from './Icon';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface AIInsightCardProps {
  insight: string;
  confidence: number; // 0-100
  isLive?: boolean;
  onPress?: () => void;
}

export function AIInsightCard({
  insight,
  confidence,
  isLive = true,
  onPress,
}: AIInsightCardProps) {
  const pulseAnim = useSharedValue(1);

  React.useEffect(() => {
    if (isLive) {
      pulseAnim.value = withRepeat(
        withTiming(1.2, { duration: 1500 }),
        -1,
        true
      );
    }
  }, [isLive]);

  const liveBadgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={[Colors.primary + 'E6', Colors.primaryLight + 'E6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <View style={styles.iconContainer}>
              <Icon name="brain" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.textContent}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>AI Insight</Text>
                {isLive && (
                  <Animated.View style={[styles.liveBadge, liveBadgeStyle]}>
                    <Text style={styles.liveText}>LIVE</Text>
                  </Animated.View>
                )}
              </View>
              <Text style={styles.insight}>{insight}</Text>
              <View style={styles.confidenceRow}>
                <View style={styles.confidenceDot} />
                <Text style={styles.confidenceText}>
                  {confidence}% confidence
                </Text>
              </View>
            </View>
          </View>
          <Icon
            name="chevronRight"
            size={20}
            color="rgba(255, 255, 255, 0.8)"
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.xlarge,
    overflow: 'hidden',
  },
  gradientContainer: {
    borderRadius: BorderRadius.xlarge,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.large,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    // Glow effect
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  textContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  liveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BorderRadius.round,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  insight: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 8,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  confidenceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  confidenceText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});