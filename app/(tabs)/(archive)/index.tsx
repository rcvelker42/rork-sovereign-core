import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, Unlock } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useSovereign } from '@/contexts/SovereignContext';
import { 
  principles, 
  getPrinciplesByTier, 
  TIER_NAMES, 
  TIER_UNLOCK_REQUIREMENTS,
  PrincipleTier,
} from '@/constants/principles';
import { PrincipleTile } from '@/components/PrincipleTile';

export default function ArchiveScreen() {
  const router = useRouter();
  const { isTierUnlocked, stats } = useSovereign();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePrinciplePress = (principleId: string) => {
    router.push(`/(tabs)/(archive)/${principleId}`);
  };

  const renderTier = (tier: PrincipleTier) => {
    const tierPrinciples = getPrinciplesByTier(tier);
    const isUnlocked = isTierUnlocked(tier);
    const missionsNeeded = TIER_UNLOCK_REQUIREMENTS[tier];
    const missionsRemaining = Math.max(0, missionsNeeded - stats.completedMissions);

    return (
      <View key={tier} style={styles.tierSection}>
        <View style={styles.tierHeader}>
          <View style={styles.tierTitleRow}>
            {isUnlocked ? (
              <Unlock size={16} color={Colors.accent.gold} />
            ) : (
              <Lock size={16} color={Colors.text.muted} />
            )}
            <Text style={[styles.tierTitle, !isUnlocked && styles.tierTitleLocked]}>
              {TIER_NAMES[tier]}
            </Text>
          </View>
          {!isUnlocked && (
            <Text style={styles.tierLockText}>
              {missionsRemaining} missions to unlock
            </Text>
          )}
        </View>

        <View style={styles.tilesGrid}>
          {tierPrinciples.map((principle, index) => (
            <View key={principle.id} style={styles.tileWrapper}>
              <PrincipleTile
                principle={principle}
                isLocked={!isUnlocked}
                onPress={() => handlePrinciplePress(principle.id)}
              />
            </View>
          ))}
          {tierPrinciples.length % 2 !== 0 && (
            <View style={styles.tileWrapper} />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>The Archive</Text>
          <Text style={styles.subtitle}>Principles of Sovereignty</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {([1, 2, 3] as PrincipleTier[]).map(renderTier)}
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 32,
  },
  tierSection: {
    marginTop: 24,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  tierTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tierTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  tierTitleLocked: {
    color: Colors.text.muted,
  },
  tierLockText: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tileWrapper: {
    width: '50%',
  },
});
