import React, { useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { Colors, Typography } from '../constants/theme';
import { Icon } from './Icon';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25;

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete?: () => void;
  onPress?: () => void;
}

export function SwipeableRow({ children, onDelete, onPress }: SwipeableRowProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const deleteButtonScale = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 5;
    },
    onPanResponderGrant: () => {
      Vibration.vibrate(5);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < 0) {
        translateX.setValue(gestureState.dx);
        
        const scale = Math.min(1, Math.abs(gestureState.dx) / SWIPE_THRESHOLD);
        deleteButtonScale.setValue(scale);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD && gestureState.dx < 0) {
        // Swipe to delete
        Vibration.vibrate(10);
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: -screenWidth,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(deleteButtonScale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          onDelete?.();
        });
      } else {
        // Snap back
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            tension: 100,
            friction: 10,
            useNativeDriver: false,
          }),
          Animated.spring(deleteButtonScale, {
            toValue: 0,
            tension: 100,
            friction: 10,
            useNativeDriver: false,
          }),
        ]).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.deleteButton,
          {
            transform: [{ scale: deleteButtonScale }],
          },
        ]}
      >
        <Icon name="delete" size={24} color={Colors.secondaryBackground} />
        <Text style={styles.deleteText}>Delete</Text>
      </Animated.View>
      
      <Animated.View
        style={[
          styles.rowContainer,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={onPress}
          style={styles.rowContent}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    position: 'relative',
  },
  rowContainer: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 12,
    overflow: 'hidden',
  },
  rowContent: {
    width: '100%',
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: Colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  deleteText: {
    ...Typography.footnote,
    color: Colors.secondaryBackground,
    fontWeight: '600',
    marginTop: 4,
  },
});