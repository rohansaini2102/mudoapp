declare module 'react-native-svg-charts' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  export interface ChartProps {
    style?: ViewStyle;
    data: number[];
    svg?: any;
    contentInset?: { top?: number; bottom?: number; left?: number; right?: number };
    curve?: any;
    animate?: boolean;
    animationDuration?: number;
    yMin?: number;
    yMax?: number;
    numberOfTicks?: number;
    spacingInner?: number;
    children?: React.ReactNode;
  }

  export class LineChart extends Component<ChartProps> {}
  export class BarChart extends Component<ChartProps> {}
  
  export class Grid extends Component<{ svg?: any; direction?: any }> {
    static Direction: {
      HORIZONTAL: string;
      VERTICAL: string;
      BOTH: string;
    };
  }
  
  export class XAxis extends Component<{
    style?: ViewStyle;
    data: any[];
    formatLabel?: (value: any, index: number) => string;
    contentInset?: { left?: number; right?: number };
    svg?: any;
  }> {}
  
  export class YAxis extends Component<{
    data: number[];
    contentInset?: { top?: number; bottom?: number };
    svg?: any;
    numberOfTicks?: number;
    min?: number;
    max?: number;
    formatLabel?: (value: number) => string;
  }> {}
}