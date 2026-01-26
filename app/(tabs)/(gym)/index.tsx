import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, ChevronRight } from 'lucide-react-native';
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
import { GymMissionModal } from '@/components/GymMissionModal';

export default function GymScreen() {
  const { isPrincipleUnlocked, isPrincipleCompleted } = useSovereign();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const orderedPrinciples = getPrinciplesInOrder();
  const [selectedMission, setSelectedMission] = useState<GymMission | null>(null);
  const [missionModalVisible, setMissionModalVisible] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const getPrinciplesByTier = (tier: PrincipleTier) => {
    return orderedPrinciples.filter(p => p.tier === tier);
  };

  const handleMissionPress = (mission: GymMission) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMission(mission);
    setMissionModalVisible(true);
  };

  const handleCloseModal = () => {
    setMissionModalVisible(false);
    setSelectedMission(null);
  };

  const renderGymMission = (mission: GymMission, principle: any) => {
    const isUnlocked = isPrincipleUnlocked(principle.id);
    const isCompleted = isPrincipleCompleted(principle.id);

    return (
      <TouchableOpacity
        key={mission.id}
        onPress={() => handleMissionPress(mission)}
        disabled={!isUnlocked}
        style={[
          styles.missionCard,
          !isUnlocked && styles.missionCardLocked,
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.missionCardHeader}>
          <View style={styles.missionNumberBadge}>
            <Text style={styles.missionNumberText}>{mission.missionNumber}</Text>
          </View>
          <View style={styles.missionCardContent}>
            <Text style={[styles.missionCardTitle, !isUnlocked && styles.missionCardTitleLocked]}>
              {principle.name} Mission {mission.missionNumber}
            </Text>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Principle Completed</Text>
              </View>
            )}
          </View>
          <ChevronRight 
            size={20} 
            color={isUnlocked ? Colors.text.muted : Colors.tier.locked} 
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

  const renderTier = (tier: PrincipleTier) => {
    const tierPrinciples = getPrinciplesByTier(tier);
    const hasUnlocked = tierPrinciples.some(p => isPrincipleUnlocked(p.id));

    return (
      <View key={tier} style={styles.tierSection}>
        <View style={styles.tierHeader}>
          <Dumbbell size={16} color={hasUnlocked ? Colors.accent.gold : Colors.text.muted} />
          <Text style={[styles.tierTitle, !hasUnlocked && styles.tierTitleLocked]}>
            {TIER_NAMES[tier]}
          </Text>
        </View>
        <View style={styles.principlesContainer}>
          {tierPrinciples.map(renderPrinciple)}
        </View>
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
          />
        )}
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
  missionNumberText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.accent.gold,
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
});
