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
import { Lock, Unlock, ChevronDown } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useSovereign } from '@/contexts/SovereignContext';
import { 
  getPrinciplesInOrder,
  TIER_NAMES,
  PrincipleTier,
} from '@/constants/principles';
import { PrincipleTile } from '@/components/PrincipleTile';

export default function ArchiveScreen() {
  const router = useRouter();
  const { isPrincipleUnlocked, isPrincipleCompleted, getNextUnlockedPrincipleId } = useSovereign();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const orderedPrinciples = getPrinciplesInOrder();
  const nextPrincipleId = getNextUnlockedPrincipleId();

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

  const handlePrinciplePress = (principleId: string) => {
    router.push(`/(tabs)/(archive)/${principleId}`);
  };

  const getPrinciplesByTier = (tier: PrincipleTier) => {
    return orderedPrinciples.filter(p => p.tier === tier);
  };

  const renderPrinciple = (principle: any, index: number, tierPrinciples: any[]) => {
    const isUnlocked = isPrincipleUnlocked(principle.id);
    const isCompleted = isPrincipleCompleted(principle.id);
    const isNext = principle.id === nextPrincipleId;
    const isLast = index === tierPrinciples.length - 1;

    return (
      <View key={principle.id} style={styles.principleRow}>
        <View style={styles.principleContainer}>
          <View style={styles.tileWrapper}>
            <PrincipleTile
              principle={principle}
              isLocked={!isUnlocked}
              onPress={() => handlePrinciplePress(principle.id)}
              isNext={isNext}
            />
          </View>
          {isNext && (
            <View style={styles.nextIndicator}>
              <Text style={styles.nextText}>NEXT</Text>
            </View>
          )}
        </View>
        {!isLast && (
          <View style={styles.connectorContainer}>
            <View style={[
              styles.connectorLine,
              isCompleted && styles.connectorLineCompleted,
              isUnlocked && !isCompleted && styles.connectorLineUnlocked,
            ]} />
            <ChevronDown 
              size={16} 
              color={
                isCompleted 
                  ? Colors.accent.gold 
                  : isUnlocked 
                    ? Colors.text.muted 
                    : Colors.tier.locked
              } 
            />
          </View>
        )}
      </View>
    );
  };

  const renderTier = (tier: PrincipleTier) => {
    const tierPrinciples = getPrinciplesByTier(tier);
    const hasUnlocked = tierPrinciples.some(p => isPrincipleUnlocked(p.id));

    return (
      <View key={tier} style={styles.tierSection}>
        <View style={styles.tierHeader}>
          <View style={styles.tierTitleRow}>
            {hasUnlocked ? (
              <Unlock size={16} color={Colors.accent.gold} />
            ) : (
              <Lock size={16} color={Colors.text.muted} />
            )}
            <Text style={[styles.tierTitle, !hasUnlocked && styles.tierTitleLocked]}>
              {TIER_NAMES[tier]}
            </Text>
          </View>
        </View>

        <View style={styles.tierContent}>
          {tierPrinciples.map((principle, index) => 
            renderPrinciple(principle, index, tierPrinciples)
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
  tierContent: {
    alignItems: 'center',
  },
  principleRow: {
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  principleContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  tileWrapper: {
    width: '50%',
    maxWidth: 200,
  },
  nextIndicator: {
    position: 'absolute',
    top: -8,
    right: '25%',
    backgroundColor: Colors.accent.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nextText: {
    fontSize: 10,
    fontWeight: '700' as const,
    color: Colors.background.primary,
    letterSpacing: 1,
  },
  connectorContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  connectorLine: {
    width: 2,
    height: 24,
    backgroundColor: Colors.tier.locked,
    marginBottom: 4,
  },
  connectorLineCompleted: {
    backgroundColor: Colors.accent.gold,
  },
  connectorLineUnlocked: {
    backgroundColor: Colors.text.muted,
  },
});
