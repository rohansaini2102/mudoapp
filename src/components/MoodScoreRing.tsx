import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Colors, Typography } from '../constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface MoodScoreRingProps {
  score: number; // 1-10
  size?: number;
  strokeWidth?: number;
}

export function MoodScoreRing({ 
  score, 
  size = 120, 
  strokeWidth = 12 
}: MoodScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(score / 10, { duration: 1000 });
  }, [score]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, 0]
    );
    return {
      strokeDashoffset,
    };
  });

  // Get gradient colors based on score
  const getGradientColors = () => {
    if (score >= 8) return ['#FFD93D', '#FF6B6B'];
    if (score >= 6) return ['#667EEA', '#764BA2'];
    if (score >= 4) return ['#A8EDEA', '#FED6E3'];
    return ['#4FACFE', '#00F2FE'];
  };

  const [startColor, endColor] = getGradientColors();

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <SvgGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={startColor} />
            <Stop offset="100%" stopColor={endColor} />
          </SvgGradient>
        </Defs>
        
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.systemGray5}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
          strokeLinecap="round"
        />
      </Svg>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{score.toFixed(1)}</Text>
        <Text style={styles.scoreLabel}>Mood score</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.label,
  },
  scoreLabel: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    marginTop: -4,
  },
});