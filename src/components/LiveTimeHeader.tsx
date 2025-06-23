import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';
import { Colors, Typography, Spacing } from '../constants/theme';

interface LiveTimeHeaderProps {
  userName: string;
  weatherTemp?: number;
  weatherCondition?: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}

export function LiveTimeHeader({
  userName,
  weatherTemp = 72,
  weatherCondition = 'Partly Cloudy',
  notificationCount = 0,
  onNotificationPress,
  onAvatarPress,
}: LiveTimeHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getWeatherIcon = () => {
    // You can expand this based on weatherCondition
    return '☀️';
  };

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.glassContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.greeting}>
            {getGreeting()}, {userName}
          </Text>
          <Text style={styles.date}>{formatDate(currentTime)}</Text>
          <View style={styles.weatherRow}>
            <Text style={styles.weatherIcon}>{getWeatherIcon()}</Text>
            <Text style={styles.weatherTemp}>{weatherTemp}°F</Text>
            <View style={styles.dot} />
            <Text style={styles.weatherCondition}>{weatherCondition}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{formatTime(currentTime)}</Text>
          </View>
          
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={onNotificationPress}
            >
              <Icon name="bell" size={20} color={Colors.label} />
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.avatarButton}
              onPress={onAvatarPress}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{userInitial}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 24,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // Glass morphism effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },
  leftSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.label,
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.secondaryLabel,
    marginBottom: 8,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  weatherTemp: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.label,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.systemGray3,
    marginHorizontal: 8,
  },
  weatherCondition: {
    fontSize: 14,
    color: Colors.secondaryLabel,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  timeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.label,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avatarButton: {
    padding: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});