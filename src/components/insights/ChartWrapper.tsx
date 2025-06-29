import React from 'react';
import { 
  LineChart as OriginalLineChart,
  Grid as OriginalGrid,
  XAxis as OriginalXAxis,
  YAxis as OriginalYAxis
} from 'react-native-svg-charts';

// Filter out props that cause React warnings
const filterChartProps = (props: any) => {
  const { animate, animationDuration, renderPlaceholder, ...filteredProps } = props;
  return filteredProps;
};

export const LineChart = React.forwardRef((props: any, ref: any) => {
  const filteredProps = filterChartProps(props);
  return <OriginalLineChart ref={ref} {...filteredProps} />;
});

export const Grid = React.forwardRef((props: any, ref: any) => {
  const filteredProps = filterChartProps(props);
  return <OriginalGrid ref={ref} {...filteredProps} />;
});

export const XAxis = React.forwardRef((props: any, ref: any) => {
  const filteredProps = filterChartProps(props);
  return <OriginalXAxis ref={ref} {...filteredProps} />;
});

export const YAxis = React.forwardRef((props: any, ref: any) => {
  const filteredProps = filterChartProps(props);
  return <OriginalYAxis ref={ref} {...filteredProps} />;
});

LineChart.displayName = 'LineChart';
Grid.displayName = 'Grid';
XAxis.displayName = 'XAxis';
YAxis.displayName = 'YAxis';