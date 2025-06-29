import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, Animated, TouchableWithoutFeedback, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: 'slide' | 'fade';
  position?: 'bottom' | 'center';
}

export function GlassModal({ 
  visible, 
  onClose, 
  children,
  animationType = 'slide',
  position = 'bottom'
}: GlassModalProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        animationType === 'slide' && Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          useNativeDriver: true,
        }),
      ].filter(Boolean)).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        animationType === 'slide' && Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
      ].filter(Boolean)).start();
    }
  }, [visible]);

  const contentStyle = position === 'bottom' 
    ? [styles.bottomContent, animationType === 'slide' && { transform: [{ translateY: slideAnim }] }]
    : [styles.centerContent, { opacity: fadeAnim }];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim }]}>
            {Platform.OS === 'ios' ? (
              <BlurView 
                intensity={80} 
                tint="dark"
                style={StyleSheet.absoluteFillObject}
              />
            ) : (
              <View style={styles.androidBackdrop} />
            )}
          </Animated.View>
          <TouchableWithoutFeedback>
            <Animated.View style={contentStyle}>
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  androidBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});