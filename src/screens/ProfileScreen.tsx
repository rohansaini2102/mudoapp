import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import { seedDummyMoodData } from '../utils/seedDummyData';
import { supabase } from '../lib/supabase';

interface ListItemProps {
  title: string;
  icon: string;
  onPress?: () => void;
  showChevron?: boolean;
  value?: string;
}

function ListItem({ title, icon, onPress, showChevron = true, value }: ListItemProps) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.listItemLeft}>
        <Text style={styles.listItemIcon}>{icon}</Text>
        <Text style={styles.listItemTitle}>{title}</Text>
      </View>
      <View style={styles.listItemRight}>
        {value && <Text style={styles.listItemValue}>{value}</Text>}
        {showChevron && <Text style={styles.chevron}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}

export function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { fetchMoodStats } = useMood();
  
  const handleSeedData = async () => {
    if (!user) return;
    
    Alert.alert(
      'Seed Dummy Data',
      'This will add sample mood entries for the past week. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add Data',
          onPress: async () => {
            const result = await seedDummyMoodData(user.id);
            if (result.success) {
              Alert.alert('Success', `Added ${result.count} mood entries`);
              fetchMoodStats();
            } else {
              Alert.alert('Error', 'Failed to seed data');
            }
          },
        },
      ]
    );
  };
  
  const handleClearData = async () => {
    if (!user) return;
    
    Alert.alert(
      'Clear All Data',
      'This will delete all your mood entries. This cannot be undone. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase
              .from('mood_entries')
              .delete()
              .eq('user_id', user.id);
            
            if (!error) {
              Alert.alert('Success', 'All mood entries deleted');
              fetchMoodStats();
            } else {
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <ListItem
              title="Edit Profile"
              icon="👤"
              onPress={() => {}}
            />
            <ListItem
              title="Notifications"
              icon="🔔"
              onPress={() => {}}
            />
            <ListItem
              title="Privacy"
              icon="🔒"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <View style={styles.sectionContent}>
            <ListItem
              title="Export Data"
              icon="📊"
              onPress={() => {}}
            />
            <ListItem
              title="Help & Support"
              icon="❓"
              onPress={() => {}}
            />
            <ListItem
              title="About"
              icon="ℹ️"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer Options</Text>
          <View style={styles.sectionContent}>
            <ListItem
              title="Seed Dummy Data"
              icon="🌱"
              onPress={handleSeedData}
            />
            <ListItem
              title="Clear All Data"
              icon="🗑️"
              onPress={handleClearData}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.label,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 32,
    color: Colors.secondaryBackground,
    fontWeight: '600',
  },
  email: {
    ...Typography.body,
    color: Colors.secondaryLabel,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  sectionContent: {
    backgroundColor: Colors.secondaryBackground,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.medium,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opaqueSeparator,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  listItemTitle: {
    ...Typography.body,
    color: Colors.label,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  listItemValue: {
    ...Typography.body,
    color: Colors.secondaryLabel,
  },
  chevron: {
    fontSize: 24,
    color: Colors.tertiaryLabel,
  },
  signOutButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  signOutText: {
    ...Typography.body,
    color: Colors.danger,
    fontWeight: '600',
  },
});