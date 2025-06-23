import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { Colors, Spacing } from '../constants/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TAB_ICONS: Record<string, string> = {
  'Home': 'home',
  'Insights': 'insights',
  'History': 'history',
  'Profile': 'profile',
};

export function ModernTabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const indicatorPosition = useSharedValue(0);

  React.useEffect(() => {
    const activeIndex = state.index;
    indicatorPosition.value = withSpring(activeIndex * 20, {
      damping: 15,
      stiffness: 150,
    });
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          indicatorPosition.value,
          [0, 3 * 20],
          [0, 3 * 73] // Approximate tab width
        ),
      },
    ],
  }));

  const handlePlusPress = () => {
    // Navigate to MoodEntry modal
    navigation.navigate('MoodEntry');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <View style={styles.tabContainer}>
          {/* Active Tab Indicator */}
          <Animated.View style={[styles.activeIndicator, indicatorStyle]} />
          
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const animatedIconStyle = useAnimatedStyle(() => ({
              transform: [
                {
                  scale: withSpring(isFocused ? 1.1 : 1, {
                    damping: 15,
                    stiffness: 150,
                  }),
                },
              ],
            }));

            // Add plus button in the middle
            if (index === 2) {
              return (
                <React.Fragment key={`${route.key}-fragment`}>
                  <TouchableOpacity
                    key={route.key}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    style={styles.tab}
                  >
                    <Animated.View style={animatedIconStyle}>
                      <Icon
                        name={TAB_ICONS[route.name] || 'home'}
                        size={24}
                        color={isFocused ? Colors.primary : Colors.secondaryLabel}
                      />
                    </Animated.View>
                    {isFocused && (
                      <Text style={styles.label}>{label}</Text>
                    )}
                  </TouchableOpacity>
                  
                  {/* Plus button */}
                  <TouchableOpacity
                    key="mood-entry-button"
                    onPress={handlePlusPress}
                    style={styles.middleTab}
                  >
                    <View style={styles.plusButton}>
                      <Icon name="plus" size={24} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
              );
            }

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tab}
              >
                <Animated.View style={animatedIconStyle}>
                  <Icon
                    name={TAB_ICONS[route.name] || 'home'}
                    size={24}
                    color={isFocused ? Colors.primary : Colors.secondaryLabel}
                  />
                </Animated.View>
                {isFocused && (
                  <Text style={styles.label}>{label}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  blurContainer: {
    flexDirection: 'row',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.md,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    left: 36, // Initial position
    width: 32,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  middleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 2,
  },
});