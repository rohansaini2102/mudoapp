import { Platform } from 'react-native';

export const getPlatformShadow = (shadow: any) => {
  if (Platform.OS === 'web') {
    // For web, only use boxShadow
    return {
      boxShadow: shadow.boxShadow,
    };
  } else {
    // For iOS/Android, use native shadow properties
    const { boxShadow, ...nativeShadow } = shadow;
    return nativeShadow;
  }
};