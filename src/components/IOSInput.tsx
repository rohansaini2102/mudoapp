import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '../constants/theme';

interface IOSInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
}

export function IOSInput({
  label,
  error,
  icon,
  onClear,
  value = '',
  onFocus,
  onBlur,
  ...props
}: IOSInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;
  const animatedColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedLabel, {
        toValue: isFocused || value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animatedColor, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    left: icon ? 40 : 16,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 8],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 13],
    }),
    color: animatedColor.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.tertiaryLabel, Colors.primary],
    }),
  };

  const borderColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.opaqueSeparator, Colors.primary],
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <Animated.View style={[styles.inputContainer, { borderColor }, error && styles.errorBorder]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor={Colors.quaternaryLabel}
          {...props}
        />
        {value !== '' && onClear && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <View style={styles.clearIcon}>
              <Text style={styles.clearText}>×</Text>
            </View>
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBackground,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    minHeight: 56,
    paddingTop: 20,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.label,
    paddingHorizontal: Spacing.md,
    paddingBottom: 8,
  },
  inputWithIcon: {
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 12,
    bottom: 14,
  },
  clearButton: {
    padding: 8,
    marginRight: 8,
  },
  clearIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.systemGray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: Colors.secondaryBackground,
    fontSize: 16,
    fontWeight: '600',
    marginTop: -2,
  },
  errorBorder: {
    borderColor: Colors.danger,
  },
  error: {
    ...Typography.caption1,
    color: Colors.danger,
    marginTop: 4,
    marginLeft: 16,
  },
});