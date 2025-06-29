import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { Colors, Spacing, GlassMorphism } from '../constants/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('MoodEntry');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {Platform.OS === 'ios' ? (
        <BlurView 
          intensity={GlassMorphism.blur.intense} 
          tint={GlassMorphism.tint.light} 
          style={styles.blurContainer}
        >
          <View style={styles.glassBorder} />
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
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
      ) : (
        <View style={styles.androidContainer}>
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
        </View>
      )}
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
    backgroundColor: GlassMorphism.backgroundColor.navigation,
    paddingTop: 12,
    paddingBottom: 0,
  },
  androidContainer: {
    flexDirection: 'row',
    backgroundColor: GlassMorphism.backgroundColor.cardAndroid,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: GlassMorphism.borderColor.subtle,
    paddingTop: 12,
    paddingBottom: 16,
    ...GlassMorphism.shadow.glassSubtle,
  },
  glassBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: GlassMorphism.borderColor.subtle,
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    // Glass effect overlay
    overflow: 'hidden',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 2,
  },
});