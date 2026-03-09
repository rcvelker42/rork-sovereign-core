import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Principle } from '@/constants/principles';
import { GymMission } from '@/constants/gymMissions';
import { GoldButton } from './GoldButton';

const { height } = Dimensions.get('window');

interface GymMissionModalProps {
  visible: boolean;
  mission: GymMission | null;
  principle: Principle | undefined;
  onClose: () => void;
  onAccept?: (mission: GymMission) => void;
  isUnlocked?: boolean;
  lockReason?: string;
}

export function GymMissionModal({ visible, mission, principle, onClose, onAccept, isUnlocked = true, lockReason }: GymMissionModalProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;

    if (visible) {
      animation = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]);
      animation.start();
    } else {
      animation = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);
      animation.start();
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [visible]);

  const handleAccept = () => {
    if (!isUnlocked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    if (mission && onAccept) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onAccept(mission);
      onClose();
    }
  };

  if (!mission || !principle) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Animated.View 
            style={[
              styles.container,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Gym Mission</Text>
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <X size={24} color={Colors.text.secondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.missionInfo}>
                <Text style={styles.missionLabel}>PRINCIPLE</Text>
                <Text style={styles.principleName}>{principle.name}</Text>
                <View style={styles.missionNumberBadge}>
                  <Text style={styles.missionNumberText}>Mission {mission.missionNumber}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>MISSION DETAILS</Text>
                <View style={styles.missionCard}>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <Text style={styles.missionDescription}>
                    {mission.description || 'Mission details coming soon...'}
                  </Text>
                  {mission.xpReward > 0 && (
                    <View style={styles.xpBadge}>
                      <Text style={styles.xpText}>+{mission.xpReward} XP</Text>
                    </View>
                  )}
                </View>
              </View>

              {!isUnlocked && lockReason && (
                <View style={styles.lockedSection}>
                  <Text style={styles.lockedTitle}>Mission Locked</Text>
                  <Text style={styles.lockedReason}>{lockReason}</Text>
                </View>
              )}

              {isUnlocked && (
                <View style={styles.noteSection}>
                  <Text style={styles.noteText}>
                    Complete this mission and log your execution in the Command center to earn XP and track your progress.
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.footer}>
              {isUnlocked ? (
                <GoldButton
                  title="Accept Mission"
                  onPress={handleAccept}
                />
              ) : (
                <View style={styles.lockedButton}>
                  <Text style={styles.lockedButtonText}>Mission Locked</Text>
                </View>
              )}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.background.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 10,
  },
  content: {
    padding: 24,
  },
  missionInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  missionLabel: {
    fontSize: 10,
    color: Colors.accent.gold,
    letterSpacing: 2,
    marginBottom: 8,
  },
  principleName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  missionNumberBadge: {
    backgroundColor: Colors.accent.goldDim,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
  },
  missionNumberText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  missionCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  missionDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  xpBadge: {
    backgroundColor: Colors.accent.goldDim,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
    alignSelf: 'flex-start',
  },
  xpText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
  },
  noteSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 8,
  },
  noteText: {
    fontSize: 12,
    color: Colors.text.muted,
    lineHeight: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  lockedSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.tier.locked,
    marginTop: 8,
  },
  lockedTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  lockedReason: {
    fontSize: 12,
    color: Colors.text.muted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  lockedButton: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.tier.locked,
  },
  lockedButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.tier.locked,
  },
});
