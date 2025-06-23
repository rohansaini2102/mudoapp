import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from './Icon';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface DrMayaCardProps {
  nextAvailable: string;
  sessionsCompleted: number;
  rating: number;
  speciality?: string;
  onBookPress: () => void;
}

export function DrMayaCard({
  nextAvailable,
  sessionsCompleted,
  rating,
  speciality = 'Mood & Wellness Expert',
  onBookPress,
}: DrMayaCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <View style={styles.avatarSection}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarContainer}
            >
              <Icon name="bot" size={32} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.badgeContainer}>
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.premiumBadge}
              >
                <Icon name="crown" size={12} color="#FFFFFF" />
              </LinearGradient>
            </View>
          </View>
          
          <View style={styles.info}>
            <Text style={styles.name}>Dr. Maya AI</Text>
            <Text style={styles.speciality}>{speciality}</Text>
            
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Icon name="messageCircle" size={14} color={Colors.secondaryLabel} />
                <Text style={styles.statText}>{sessionsCompleted} sessions</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.availabilitySection}>
          <Text style={styles.availabilityLabel}>Next Available</Text>
          <Text style={styles.availabilityTime}>{nextAvailable}</Text>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={onBookPress}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bookButtonGradient}
          >
            <Text style={styles.bookButtonText}>Book AI Session</Text>
            <Icon name="chevronRight" size={18} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          24/7 AI-powered emotional support
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.xlarge,
    overflow: 'hidden',
  },
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xlarge,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  avatarSection: {
    position: 'relative',
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.xlarge,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  premiumBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.label,
    marginBottom: 2,
  },
  speciality: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.secondaryLabel,
    marginBottom: Spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: Colors.secondaryLabel,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.label,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.systemGray5,
    marginVertical: Spacing.lg,
  },
  availabilitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  availabilityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.secondaryLabel,
  },
  availabilityTime: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  bookButton: {
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.secondaryLabel,
    textAlign: 'center',
  },
});