// Gradient definitions and utilities for MoodVibe

export interface GradientColors {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

// Mood-based gradients
export const moodGradients = {
  veryHappy: {
    colors: ['#FFD93D', '#FF6B6B'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  happy: {
    colors: ['#FFE5B4', '#FFB6C1'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  calm: {
    colors: ['#667EEA', '#764BA2'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  neutral: {
    colors: ['#A8EDEA', '#FED6E3'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  anxious: {
    colors: ['#F093FB', '#F5576C'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  sad: {
    colors: ['#4FACFE', '#00F2FE'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  verySad: {
    colors: ['#E6E6FA', '#DDA0DD'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};

// UI gradients
export const uiGradients = {
  primary: {
    colors: ['#5856D6', '#AF52DE'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  success: {
    colors: ['#11998E', '#38EF7D'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  warning: {
    colors: ['#F2994A', '#F2C94C'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  error: {
    colors: ['#EB5757', '#FF6B6B'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  info: {
    colors: ['#2D9CDB', '#56CCF2'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};

// Subtle background gradients
export const backgroundGradients = {
  light: {
    colors: ['#FFFFFF', '#F2F2F7'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  card: {
    colors: ['#FFFFFF', '#FAFAFA'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  overlay: {
    colors: ['transparent', 'rgba(0, 0, 0, 0.7)'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
};

// Pastel gradients for variety
export const pastelGradients = [
  { colors: ['#FFE5EC', '#FFB3C6'] }, // Rose
  { colors: ['#E5E5FF', '#C6C6FF'] }, // Periwinkle
  { colors: ['#FFE5B4', '#FFDAB9'] }, // Peach
  { colors: ['#E6F3FF', '#B3D9FF'] }, // Sky
  { colors: ['#F0E6FF', '#DCC6FF'] }, // Lilac
  { colors: ['#FFE6F0', '#FFB3D9'] }, // Pink
  { colors: ['#E6FFE6', '#B3FFB3'] }, // Mint
  { colors: ['#FFF0E6', '#FFD9B3'] }, // Cream
];

// Get gradient based on mood score (1-10)
export function getGradientForMoodScore(score: number): GradientColors {
  if (score >= 9) return moodGradients.veryHappy;
  if (score >= 8) return moodGradients.happy;
  if (score >= 6) return moodGradients.calm;
  if (score >= 5) return moodGradients.neutral;
  if (score >= 3) return moodGradients.sad;
  return moodGradients.verySad;
}

// Get gradient colors array for mood score (simplified)
export function getMoodGradientColors(score: number): string[] {
  const gradient = getGradientForMoodScore(score);
  return gradient.colors;
}

// Get a random pastel gradient
export function getRandomPastelGradient(): GradientColors {
  const randomIndex = Math.floor(Math.random() * pastelGradients.length);
  return {
    ...pastelGradients[randomIndex],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  };
}

// Create a custom gradient
export function createGradient(
  colors: string[],
  direction: 'horizontal' | 'vertical' | 'diagonal' = 'diagonal'
): GradientColors {
  const directions = {
    horizontal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
    vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  };

  return {
    colors,
    ...directions[direction],
  };
}

// Darken a gradient (for pressed states)
export function darkenGradient(gradient: GradientColors, amount: number = 0.1): GradientColors {
  return {
    ...gradient,
    colors: gradient.colors.map(color => darkenColor(color, amount)),
  };
}

// Helper function to darken a hex color
function darkenColor(color: string, amount: number): string {
  // Remove # if present
  const hex = color.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Darken
  const newR = Math.max(0, Math.floor(r * (1 - amount)));
  const newG = Math.max(0, Math.floor(g * (1 - amount)));
  const newB = Math.max(0, Math.floor(b * (1 - amount)));
  
  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

// Get gradient style object for LinearGradient component
export function getGradientStyle(gradient: GradientColors) {
  return {
    colors: gradient.colors,
    start: gradient.start || { x: 0, y: 0 },
    end: gradient.end || { x: 1, y: 1 },
  };
}