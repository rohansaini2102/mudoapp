import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { IOSCard } from '../components/IOSCard';

export function InsightsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>Your mood patterns</Text>
        </View>

        <IOSCard style={styles.card}>
          <Text style={styles.cardTitle}>Average Mood</Text>
          <Text style={styles.cardValue}>7.2</Text>
          <Text style={styles.cardLabel}>This week</Text>
        </IOSCard>

        <IOSCard style={styles.card}>
          <Text style={styles.cardTitle}>Mood Trend</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Chart coming soon</Text>
          </View>
        </IOSCard>

        <IOSCard style={styles.card}>
          <Text style={styles.cardTitle}>Best Day</Text>
          <Text style={styles.cardValue}>Wednesday</Text>
          <Text style={styles.cardLabel}>Usually your happiest</Text>
        </IOSCard>
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
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.secondaryLabel,
  },
  card: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    ...Typography.headline,
    color: Colors.label,
    marginBottom: Spacing.sm,
  },
  cardValue: {
    ...Typography.largeTitle,
    color: Colors.primary,
    marginBottom: 4,
  },
  cardLabel: {
    ...Typography.footnote,
    color: Colors.secondaryLabel,
  },
  placeholder: {
    height: 200,
    backgroundColor: Colors.systemGray6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...Typography.body,
    color: Colors.tertiaryLabel,
  },
});