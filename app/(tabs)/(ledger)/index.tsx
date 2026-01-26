import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, TrendingUp, Calendar } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useSovereign } from '@/contexts/SovereignContext';

export default function LedgerScreen() {
  const { journalEntries, stats } = useSovereign();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStateLabel = (value: number) => {
    if (value <= 3) return 'Reactive';
    if (value <= 6) return 'Calibrating';
    return 'Sovereign';
  };

  const getStateColor = (value: number) => {
    if (value <= 3) return Colors.state.reactive;
    if (value <= 6) return Colors.state.neutral;
    return Colors.state.sovereign;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>The Ledger</Text>
          <Text style={styles.subtitle}>A record of your ascension</Text>
        </View>

        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <BookOpen size={16} color={Colors.accent.gold} />
            <Text style={styles.statValue}>{journalEntries.length}</Text>
            <Text style={styles.statLabel}>Entries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <TrendingUp size={16} color={Colors.accent.gold} />
            <Text style={styles.statValue}>{stats.resilienceXP}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Calendar size={16} color={Colors.accent.gold} />
            <Text style={styles.statValue}>{stats.dayCount}</Text>
            <Text style={styles.statLabel}>Days</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {journalEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <BookOpen size={40} color={Colors.text.muted} />
              </View>
              <Text style={styles.emptyTitle}>No entries yet</Text>
              <Text style={styles.emptySubtitle}>
                Complete missions to begin recording your journey
              </Text>
            </View>
          ) : (
            journalEntries.map((entry, index) => (
              <Animated.View 
                key={entry.id}
                style={[
                  styles.entryCard,
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20 * (index + 1), 0],
                      }),
                    }],
                  }
                ]}
              >
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                  <View style={styles.xpEarned}>
                    <Text style={styles.xpEarnedText}>+{entry.xpEarned} XP</Text>
                  </View>
                </View>
                
                <Text style={styles.entryPrinciple}>{entry.principleName}</Text>
                
                <Text style={styles.entryReflection} numberOfLines={4}>
                  {entry.reflection}
                </Text>
                
                <View style={styles.entryFooter}>
                  <View style={styles.stateIndicator}>
                    <View 
                      style={[
                        styles.stateDot, 
                        { backgroundColor: getStateColor(entry.stateValue) }
                      ]} 
                    />
                    <Text style={styles.stateText}>
                      {getStateLabel(entry.stateValue)} ({entry.stateValue}/10)
                    </Text>
                  </View>
                </View>
              </Animated.View>
            ))
          )}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '300' as const,
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.muted,
    marginTop: 4,
    fontStyle: 'italic',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: Colors.background.card,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginTop: 6,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '500' as const,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.text.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  entryCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 10,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  entryDate: {
    fontSize: 12,
    color: Colors.text.muted,
    letterSpacing: 0.5,
  },
  xpEarned: {
    backgroundColor: Colors.accent.goldDim,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  xpEarnedText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
  },
  entryPrinciple: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 10,
  },
  entryReflection: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  entryFooter: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stateIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  stateText: {
    fontSize: 12,
    color: Colors.text.muted,
  },
});
