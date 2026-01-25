import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, PenLine, ChevronRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { useSovereign } from '@/contexts/SovereignContext';
import { ProgressRing } from '@/components/ProgressRing';
import { StatCard } from '@/components/StatCard';
import { GoldButton } from '@/components/GoldButton';
import { MissionModal } from '@/components/MissionModal';

export default function DashboardScreen() {
  const router = useRouter();
  const { 
    stats, 
    socialState, 
    currentFocusPrinciple, 
    completeMission,
    isLoading 
  } = useSovereign();
  
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStudyDoctrine = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentFocusPrinciple) {
      router.push(`/(tabs)/(archive)/${currentFocusPrinciple.id}`);
    } else {
      router.push('/(tabs)/(archive)');
    }
  };

  const handleLogExecution = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  const handleMissionComplete = (reflection: string, stateValue: number) => {
    if (currentFocusPrinciple) {
      completeMission(currentFocusPrinciple.id, reflection, stateValue);
    }
    setModalVisible(false);
  };

  const getStatusName = () => {
    if (stats.completedMissions === 0) return 'The Awakening';
    if (stats.completedMissions < 5) return 'The Foundation';
    if (stats.completedMissions < 10) return 'The Bridge';
    return 'The Mastery';
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.greeting}>Day {stats.dayCount}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{getStatusName()}</Text>
            </View>
          </View>

          <View style={styles.focusCard}>
            <View style={styles.focusHeader}>
              <Text style={styles.focusLabel}>DAILY FOCUS</Text>
              {currentFocusPrinciple && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>ACTIVE</Text>
                </View>
              )}
            </View>
            
            {currentFocusPrinciple ? (
              <>
                <Text style={styles.focusTitle}>{currentFocusPrinciple.name}</Text>
                <Text style={styles.focusMission} numberOfLines={2}>
                  {currentFocusPrinciple.mission.title}
                </Text>
                
                <View style={styles.focusActions}>
                  <TouchableOpacity 
                    style={styles.focusButton}
                    onPress={handleStudyDoctrine}
                  >
                    <BookOpen size={18} color={Colors.accent.gold} />
                    <Text style={styles.focusButtonText}>Study Doctrine</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.focusButton, styles.focusButtonPrimary]}
                    onPress={handleLogExecution}
                  >
                    <PenLine size={18} color={Colors.background.primary} />
                    <Text style={styles.focusButtonTextPrimary}>Log Execution</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.noFocusText}>No mission selected</Text>
                <Text style={styles.noFocusSubtext}>
                  Visit The Archive to accept a principle
                </Text>
                <GoldButton
                  title="Browse Principles"
                  variant="secondary"
                  onPress={() => router.push('/(tabs)/(archive)')}
                  style={styles.browseButton}
                />
              </>
            )}
          </View>

          <View style={styles.vitalsSection}>
            <Text style={styles.sectionTitle}>VITALS</Text>
            
            <View style={styles.vitalsGrid}>
              <View style={styles.ringContainer}>
                <ProgressRing
                  progress={stats.presenceScore}
                  size={110}
                  strokeWidth={10}
                  value={stats.presenceScore}
                  label="Presence"
                />
              </View>
              
              <View style={styles.ringContainer}>
                <ProgressRing
                  progress={Math.min((stats.resilienceXP / 1000) * 100, 100)}
                  size={110}
                  strokeWidth={10}
                  value={stats.resilienceXP}
                  label="XP"
                />
              </View>
            </View>
            
            <View style={styles.statsRow}>
              <StatCard 
                label="Social State" 
                value={socialState.name}
                subValue={`Level ${socialState.level}`}
              />
            </View>
            
            <View style={styles.statsRow}>
              <StatCard 
                label="Missions Complete" 
                value={stats.completedMissions}
              />
              <View style={{ width: 12 }} />
              <StatCard 
                label="Current Phase" 
                value={`Tier ${stats.currentPhase}`}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.journalPrompt}
            onPress={() => router.push('/(tabs)/(ledger)')}
          >
            <View style={styles.journalPromptContent}>
              <Text style={styles.journalPromptTitle}>The Ledger</Text>
              <Text style={styles.journalPromptSubtitle}>
                Review your journey
              </Text>
            </View>
            <ChevronRight size={20} color={Colors.text.muted} />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <MissionModal
        visible={modalVisible}
        principle={currentFocusPrinciple}
        onClose={() => setModalVisible(false)}
        onComplete={handleMissionComplete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.text.muted,
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '300' as const,
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  statusBadge: {
    backgroundColor: Colors.accent.goldDim,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  focusCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  focusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  focusLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 2,
  },
  activeBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  activeBadgeText: {
    fontSize: 9,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  focusTitle: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 6,
  },
  focusMission: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  focusActions: {
    flexDirection: 'row',
    gap: 12,
  },
  focusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.accent.gold,
    borderRadius: 6,
    paddingVertical: 12,
    gap: 8,
  },
  focusButtonPrimary: {
    backgroundColor: Colors.accent.gold,
    borderColor: Colors.accent.gold,
  },
  focusButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
  },
  focusButtonTextPrimary: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.background.primary,
  },
  noFocusText: {
    fontSize: 18,
    fontWeight: '500' as const,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  noFocusSubtext: {
    fontSize: 14,
    color: Colors.text.muted,
    marginBottom: 16,
  },
  browseButton: {
    marginTop: 4,
  },
  vitalsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    color: Colors.text.muted,
    letterSpacing: 2,
    marginBottom: 16,
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  ringContainer: {
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  journalPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  journalPromptContent: {
    flex: 1,
  },
  journalPromptTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  journalPromptSubtitle: {
    fontSize: 13,
    color: Colors.text.muted,
  },
});
