import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
}

export function StatCard({ label, value, subValue }: StatCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {subValue && <Text style={styles.subValue}>{subValue}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: 10,
    color: Colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  subValue: {
    fontSize: 12,
    color: Colors.accent.gold,
    marginTop: 4,
  },
});
