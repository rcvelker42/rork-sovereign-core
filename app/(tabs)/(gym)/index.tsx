import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, ChevronRight, Crown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { useSovereign } from '@/contexts/SovereignContext';
import { 
  getPrinciplesInOrder,
  TIER_NAMES,
  PrincipleTier,
  getPrincipleById,
} from '@/constants/principles';
import { getGymMissionsForPrinciple, GymMission } from '@/constants/gymMissions';
import { Lock } from 'lucide-react-native';
import { GymMissionModal } from '@/components/GymMissionModal';
import { usePurchases } from '@/contexts/PurchasesContext';
import { PaywallModal } from '@/components/PaywallModal';

export default function GymScreen() {
  const { 
    isPrincipleUnlocked, 
    isPrincipleCompleted, 
    isGymMissionUnlocked,
    isGymMissionCompleted,
    setGymMissionFocus 
  } = useSovereign();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const orderedPrinciples = getPrinciplesInOrder();
  const [selectedMission, setSelectedMission] = useState<GymMission | null>(null);
  const [missionModalVisible, setMissionModalVisible] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const { isPremium } = usePurchases();

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

  const getPrinciplesByTier = (tier: PrincipleTier) => {
    return orderedPrinciples.filter(p => p.tier === tier);
  };

  const handleMissionPress = (mission: GymMission) => {
    const isUnlocked = isGymMissionUnlocked(mission.id, mission.principleId);
    if (!isUnlocked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedMission(mission);
    setMissionModalVisible(true);
  };

  const handleCloseModal = () => {
    setMissionModalVisible(false);
    setSelectedMission(null);
  };

  const handleAcceptMission = (mission: GymMission) => {
    setGymMissionFocus(mission.id, mission.principleId);
    router.push('/(tabs)/(dashboard)');
  };

  const selectedMissionLockReason = useMemo(() => {
    if (!selectedMission) return undefined;
    
    if (selectedMission.missionNumber === 2 && !isPrincipleCompleted(selectedMission.principleId)) {
      return 'Complete the principle in Archive first';
    }
    
    if (selectedMission.missionNumber === 3) {
      const gymMissions = getGymMissionsForPrinciple(selectedMission.principleId);
      const mission2 = gymMissions.find(m => m.missionNumber === 2);
      return mission2 && !isGymMissionCompleted(mission2.id) ? 'Complete Mission 2 first' : undefined;
    }
    
    if (selectedMission.missionNumber === 4) {
      const gymMissions = getGymMissionsForPrinciple(selectedMission.principleId);
      const mission3 = gymMissions.find(m => m.missionNumber === 3);
      return mission3 && !isGymMissionCompleted(mission3.id) ? 'Complete Mission 3 first' : undefined;
    }
    
    return undefined;
  }, [selectedMission, isPrincipleCompleted, isGymMissionCompleted]);

  const renderGymMission = (mission: GymMission, principle: any) => {
    const isMissionUnlocked = isGymMissionUnlocked(mission.id, principle.id);
    const isMissionCompleted = isGymMissionCompleted(mission.id);
    const isPrincipleDone = isPrincipleCompleted(principle.id);

    // Determine lock reason for display
    let lockReason = '';
    if (mission.missionNumber === 2 && !isPrincipleDone) {
      lockReason = 'Complete principle in Archive first';
    } else if (mission.missionNumber === 3) {
      const gymMissions = getGymMissionsForPrinciple(principle.id);
      const mission2 = gymMissions.find(m => m.missionNumber === 2);
      if (mission2 && !isGymMissionCompleted(mission2.id)) {
        lockReason = 'Complete Mission 2 first';
      }
    } else if (mission.missionNumber === 4) {
      const gymMissions = getGymMissionsForPrinciple(principle.id);
      const mission3 = gymMissions.find(m => m.missionNumber === 3);
      if (mission3 && !isGymMissionCompleted(mission3.id)) {
        lockReason = 'Complete Mission 3 first';
      }
    }

    return (
      <TouchableOpacity
        key={mission.id}
        onPress={() => handleMissionPress(mission)}
        disabled={!isMissionUnlocked}
        style={[
          styles.missionCard,
          !isMissionUnlocked && styles.missionCardLocked,
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.missionCardHeader}>
          <View style={[
            styles.missionNumberBadge,
            !isMissionUnlocked && styles.missionNumberBadgeLocked,
            isMissionCompleted && styles.missionNumberBadgeCompleted,
          ]}>
            <Text style={[
              styles.missionNumberText,
              !isMissionUnlocked && styles.missionNumberTextLocked,
              isMissionCompleted && styles.missionNumberTextCompleted,
            ]}>
              {mission.missionNumber}
            </Text>
          </View>
          <View style={styles.missionCardContent}>
            <Text style={[styles.missionCardTitle, !isMissionUnlocked && styles.missionCardTitleLocked]}>
              {mission.title}
            </Text>
            {isMissionCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            )}
            {!isMissionUnlocked && lockReason && (
              <Text style={styles.lockReason}>{lockReason}</Text>
            )}
          </View>
          <ChevronRight 
            size={20} 
            color={isMissionUnlocked ? Colors.text.muted : Colors.tier.locked} 
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderPrinciple = (principle: any) => {
    const isUnlocked = isPrincipleUnlocked(principle.id);
    const gymMissions = getGymMissionsForPrinciple(principle.id);

    return (
      <View key={principle.id} style={styles.principleSection}>
        <View style={styles.principleHeader}>
          <Text style={[styles.principleName, !isUnlocked && styles.principleNameLocked]}>
            {principle.name}
          </Text>
          {!isUnlocked && (
            <Text style={styles.lockedHint}>
              Complete the principle in Archive to unlock
            </Text>
          )}
        </View>
        <View style={styles.missionsContainer}>
          {gymMissions.map(mission => renderGymMission(mission, principle))}
        </View>
      </View>
    );
  };

  const isTierPaywalled = (tier: PrincipleTier): boolean => {
    return (tier === 2 || tier === 3) && !isPremium;
  };

  const renderTier = (tier: PrincipleTier) => {
    const tierPrinciples = getPrinciplesByTier(tier);
    const hasUnlocked = tierPrinciples.some(p => isPrincipleUnlocked(p.id));
    const isPaywalled = isTierPaywalled(tier);

    return (
      <View key={tier} style={styles.tierSection}>
        <View style={styles.tierHeader}>
          {isPaywalled ? (
            <Crown size={16} color={Colors.accent.gold} />
          ) : (
            <Dumbbell size={16} color={hasUnlocked ? Colors.accent.gold : Colors.text.muted} />
          )}
          <Text style={[styles.tierTitle, !hasUnlocked && !isPaywalled && styles.tierTitleLocked]}>
            {TIER_NAMES[tier]}
          </Text>
          {isPaywalled && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PREMIUM</Text>
            </View>
          )}
        </View>
        {isPaywalled ? (
          <TouchableOpacity 
            style={styles.paywallOverlay}
            onPress={() => setPaywallVisible(true)}
            activeOpacity={0.8}
          >
            <Crown size={32} color={Colors.accent.gold} />
            <Text style={styles.paywallText}>Unlock Advanced Training</Text>
            <Text style={styles.paywallSubtext}>Premium subscription required</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.principlesContainer}>
            {tierPrinciples.map(renderPrinciple)}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>The Gym</Text>
          <Text style={styles.subtitle}>Additional Training Missions</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {([1, 2, 3] as PrincipleTier[]).map(renderTier)}
        </ScrollView>

        {selectedMission && (
          <GymMissionModal
            visible={missionModalVisible}
            mission={selectedMission}
            principle={getPrincipleById(selectedMission.principleId)}
            onClose={handleCloseModal}
            onAccept={handleAcceptMission}
            isUnlocked={isGymMissionUnlocked(selectedMission.id, selectedMission.principleId)}
            lockReason={selectedMissionLockReason}
          />
        )}

        <PaywallModal
          visible={paywallVisible}
          onClose={() => setPaywallVisible(false)}
        />
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
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 6,
    marginBottom: 16,
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
  principlesContainer: {
    gap: 16,
  },
  principleSection: {
    marginBottom: 8,
  },
  principleHeader: {
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  principleName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  principleNameLocked: {
    color: Colors.text.muted,
  },
  lockedHint: {
    fontSize: 11,
    color: Colors.text.muted,
    fontStyle: 'italic',
  },
  missionsContainer: {
    gap: 8,
  },
  missionCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  missionCardLocked: {
    backgroundColor: Colors.background.secondary,
    borderColor: Colors.tier.locked,
    opacity: 0.6,
  },
  missionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  missionNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accent.goldDim,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionNumberBadgeLocked: {
    backgroundColor: Colors.background.secondary,
    borderColor: Colors.tier.locked,
  },
  missionNumberBadgeCompleted: {
    backgroundColor: Colors.accent.gold,
    borderColor: Colors.accent.gold,
  },
  missionNumberText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.accent.gold,
  },
  missionNumberTextLocked: {
    color: Colors.tier.locked,
  },
  missionNumberTextCompleted: {
    color: Colors.background.primary,
  },
  missionCardContent: {
    flex: 1,
  },
  missionCardTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  missionCardTitleLocked: {
    color: Colors.text.muted,
  },
  completedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent.goldDim,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  completedText: {
    fontSize: 10,
    color: Colors.accent.gold,
    fontWeight: '600' as const,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lockReason: {
    fontSize: 10,
    color: Colors.text.muted,
    fontStyle: 'italic',
    marginTop: 4,
  },
  premiumBadge: {
    backgroundColor: Colors.accent.goldDim,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 8,
  },
  premiumBadgeText: {
    fontSize: 9,
    fontWeight: '700' as const,
    color: Colors.accent.gold,
    letterSpacing: 1,
  },
  paywallOverlay: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent.goldDim,
    marginBottom: 16,
  },
  paywallText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginTop: 12,
  },
  paywallSubtext: {
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 4,
  },
});
