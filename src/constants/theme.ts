export const Colors = {
  // Primary colors - Premium blue palette
  primary: '#5D8AA8',  // Premium blue
  primaryLight: '#6B98B6',  // Light variant
  primaryDark: '#4F7C96',  // Dark variant
  secondary: '#007AFF',  // iOS Blue
  
  // Semantic colors
  danger: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#007AFF',
  
  // Accent colors
  purple: '#5856D6',
  purpleLight: '#AF52DE',
  pink: '#FF2D55',
  blue: '#007AFF',
  
  // Backgrounds
  background: '#F2F2F7',  // iOS System Gray 6
  secondaryBackground: '#FFFFFF',
  tertiaryBackground: '#EFEFF4',
  groupedBackground: '#F2F2F7',
  
  // Labels
  label: '#000000',
  secondaryLabel: 'rgba(60, 60, 67, 0.6)',  // #3C3C43 with 60% opacity
  tertiaryLabel: 'rgba(60, 60, 67, 0.3)',   // #3C3C43 with 30% opacity
  quaternaryLabel: 'rgba(60, 60, 67, 0.18)', // #3C3C43 with 18% opacity
  placeholderText: 'rgba(60, 60, 67, 0.3)',
  
  // Separators
  separator: '#C6C6C8',
  opaqueSeparator: '#E5E5EA',
  
  // System grays
  systemGray: '#8E8E93',
  systemGray2: '#AEAEB2',
  systemGray3: '#C7C7CC',
  systemGray4: '#D1D1D6',
  systemGray5: '#E5E5EA',
  systemGray6: '#F2F2F7',
  
  // Mood colors
  moodHappy: '#FFD93D',
  moodCalm: '#667EEA',
  moodSad: '#4FACFE',
  moodAnxious: '#F093FB',
};

export const Typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 41,
    letterSpacing: 0.374,
  },
  title1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
    letterSpacing: 0.364,
  },
  title2: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
    letterSpacing: 0.352,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  headline: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  callout: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  subhead: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: -0.078,
  },
  caption1: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 13,
    letterSpacing: 0.066,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  xxl: 40,
};

export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  round: 9999,
};

export const Shadow = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const Animation = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 400,
  },
  easing: {
    default: 'ease-in-out',
    spring: {
      tension: 100,
      friction: 10,
    },
  },
};

// Gradient definitions
export const Gradients = {
  // Mood gradients
  mood: {
    veryHappy: ['#FFD93D', '#FF6B6B'],
    happy: ['#FFE5B4', '#FFB6C1'],
    calm: ['#667EEA', '#764BA2'],
    neutral: ['#A8EDEA', '#FED6E3'],
    anxious: ['#F093FB', '#F5576C'],
    sad: ['#4FACFE', '#00F2FE'],
    verySad: ['#E6E6FA', '#DDA0DD'],
  },
  
  // UI gradients
  ui: {
    primary: ['#5856D6', '#AF52DE'],
    success: ['#11998E', '#38EF7D'],
    warning: ['#F2994A', '#F2C94C'],
    error: ['#EB5757', '#FF6B6B'],
    info: ['#2D9CDB', '#56CCF2'],
  },
  
  // Background gradients
  background: {
    light: ['#FFFFFF', '#F2F2F7'],
    card: ['#FFFFFF', '#FAFAFA'],
    overlay: ['transparent', 'rgba(0, 0, 0, 0.7)'],
    imageOverlay: ['transparent', 'rgba(0, 0, 0, 0.6)'],
  },
  
  // Pastel gradients for variety
  pastel: [
    ['#FFE5EC', '#FFB3C6'], // Rose
    ['#E5E5FF', '#C6C6FF'], // Periwinkle
    ['#FFE5B4', '#FFDAB9'], // Peach
    ['#E6F3FF', '#B3D9FF'], // Sky
    ['#F0E6FF', '#DCC6FF'], // Lilac
    ['#FFE6F0', '#FFB3D9'], // Pink
    ['#E6FFE6', '#B3FFB3'], // Mint
    ['#FFF0E6', '#FFD9B3'], // Cream
  ],
};