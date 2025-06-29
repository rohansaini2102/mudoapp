import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from './ChartWrapper';
import * as shape from 'd3-shape';
import Svg, { Circle, G, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors, Typography, Spacing, BorderRadius, Shadow, GlassMorphism } from '../../constants/theme';
import { BlurView } from 'expo-blur';
import { MoodTrend, getMoodGradient } from '../../utils/moodAnalytics';

interface MoodTrendsChartProps {
  data: MoodTrend[];
  height?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export function MoodTrendsChart({ data, height = 220 }: MoodTrendsChartProps) {
  if (data.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.emptyText}>No mood data available</Text>
      </View>
    );
  }

  const scores = data.map(d => d.score);
  const dates = data.map(d => {
    const date = new Date(d.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  // Custom decorator to show points on the line
  const Decorator = ({ x, y, data }: any) => {
    return data.map((value: number, index: number) => (
      <G key={index}>
        <Circle
          cx={x(index)}
          cy={y(value)}
          r={4}
          fill={Colors.primary}
          stroke="#FFFFFF"
          strokeWidth={2}
        />
      </G>
    ));
  };

  // Custom gradient
  const Gradient = () => (
    <Defs>
      <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor={Colors.primary} stopOpacity={0.8} />
        <Stop offset="100%" stopColor={Colors.primary} stopOpacity={0.1} />
      </LinearGradient>
    </Defs>
  );

  const axesSvg = { fontSize: 10, fill: Colors.secondaryLabel };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  return (
    <View style={styles.wrapper}>
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={GlassMorphism.blur.light}
          tint="light"
          style={styles.container}
        >
      <Text style={styles.title}>Mood Trends</Text>
      <View style={styles.chartContainer}>
        <View style={styles.yAxisContainer}>
          <YAxis
            data={scores}
            contentInset={verticalContentInset}
            svg={axesSvg}
            numberOfTicks={5}
            min={0}
            max={10}
            formatLabel={(value: number) => value.toFixed(0)}
          />
        </View>
        <View style={styles.chartWrapper}>
          <LineChart
            style={{ height: height - xAxisHeight }}
            data={scores}
            svg={{
              strokeWidth: 2,
              stroke: Colors.primary,
            }}
            contentInset={verticalContentInset}
            curve={shape.curveMonotoneX}
            yMin={0}
            yMax={10}
          >
            <Grid svg={{ stroke: Colors.systemGray5 }} />
            <Gradient />
            <Decorator />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={data}
            formatLabel={(value: any, index: number) => dates[index]}
            contentInset={{ left: 20, right: 20 }}
            svg={axesSvg}
          />
        </View>
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF3B30' }]} />
          <Text style={styles.legendText}>Low (1-3)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFD93D' }]} />
          <Text style={styles.legendText}>Medium (4-7)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#34C759' }]} />
          <Text style={styles.legendText}>High (8-10)</Text>
        </View>
      </View>
        </BlurView>
      ) : (
        <View style={styles.androidContainer}>
          <Text style={styles.title}>Mood Trends</Text>
          <View style={styles.chartContainer}>
            <View style={styles.yAxisContainer}>
              <YAxis
                data={scores}
                contentInset={verticalContentInset}
                svg={axesSvg}
                numberOfTicks={5}
                min={0}
                max={10}
                formatLabel={(value: number) => value.toFixed(0)}
              />
            </View>
            <View style={styles.chartWrapper}>
              <LineChart
                style={{ height: height - xAxisHeight }}
                data={scores}
                svg={{
                  strokeWidth: 2,
                  stroke: Colors.primary,
                }}
                contentInset={verticalContentInset}
                curve={shape.curveMonotoneX}
                yMin={0}
                yMax={10}
              >
                <Grid svg={{ stroke: Colors.systemGray5 }} />
                <Gradient />
                <Decorator />
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={data}
                formatLabel={(value: any, index: number) => dates[index]}
                contentInset={{ left: 20, right: 20 }}
                svg={axesSvg}
              />
            </View>
          </View>
          
          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF3B30' }]} />
              <Text style={styles.legendText}>Low (1-3)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFD93D' }]} />
              <Text style={styles.legendText}>Medium (4-7)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#34C759' }]} />
              <Text style={styles.legendText}>High (8-10)</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    borderRadius: BorderRadius.xlarge,
    overflow: 'hidden',
    ...GlassMorphism.shadow.glassSubtle,
  },
  container: {
    padding: Spacing.xl,
    backgroundColor: GlassMorphism.backgroundColor.card,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.default,
  },
  androidContainer: {
    backgroundColor: GlassMorphism.backgroundColor.cardAndroid,
    borderRadius: BorderRadius.xlarge,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.subtle,
  },
  title: {
    ...Typography.headline,
    color: Colors.label,
    marginBottom: Spacing.md,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 250,
  },
  yAxisContainer: {
    marginRight: 10,
  },
  chartWrapper: {
    flex: 1,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.secondaryLabel,
    textAlign: 'center',
    marginVertical: Spacing.xxl,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.md,
    gap: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    ...Typography.caption1,
    color: Colors.secondaryLabel,
  },
});