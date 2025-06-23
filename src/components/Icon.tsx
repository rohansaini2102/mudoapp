import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { Colors } from '../constants/theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 24, color = Colors.label }: IconProps) {
  const icons: Record<string, JSX.Element> = {
    home: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    insights: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    history: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    profile: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    plus: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 4v16m8-8H4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    zap: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    target: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2}/>
        <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth={2}/>
        <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth={2}/>
      </Svg>
    ),
    mood: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2}/>
        <Path d="M8 14s1.5 2 4 2 4-2 4-2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        <Circle cx="9" cy="9" r="1" fill={color}/>
        <Circle cx="15" cy="9" r="1" fill={color}/>
      </Svg>
    ),
    chevronRight: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M9 5l7 7-7 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    trending: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    calendar: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth={2}/>
        <Path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    delete: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    brain: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M9.5 2a4.5 4.5 0 00-4.5 4.5c0 1.166.443 2.226 1.168 3.026C6.06 10.012 6 10.5 6 11c0 1.124.306 2.175.839 3.08A4.5 4.5 0 009.5 22a4.5 4.5 0 004.5-4.5V17a4.5 4.5 0 004.5-4.5c0-1.886-1.161-3.5-2.806-4.167A4.5 4.5 0 0014.5 2a4.5 4.5 0 00-4.5 4.5v.75a.75.75 0 01-1.5 0V6.5A4.5 4.5 0 009.5 2z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    bell: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    mic: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    camera: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth={2}/>
      </Svg>
    ),
    music: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    play: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M5 3l14 9-14 9V3z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    pause: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="6" y="4" width="4" height="16" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        <Rect x="14" y="4" width="4" height="16" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    skipForward: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M5 4l10 8-10 8V4zM19 5v14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    bot: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke={color} strokeWidth={2}/>
        <Circle cx="12" cy="5" r="2" stroke={color} strokeWidth={2}/>
        <Path d="M12 7v4M8 16h0M16 16h0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
    crown: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M5 17l2-7 5 3 5-3 2 7H5z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        <Circle cx="12" cy="7" r="2" stroke={color} strokeWidth={2}/>
      </Svg>
    ),
    messageCircle: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M21 11.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z" stroke={color} strokeWidth={2}/>
        <Path d="M21 21l-4.5-4.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    ),
  };

  return <View>{icons[name] || null}</View>;
}