import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Scale, 
  Frame, 
  Eye, 
  Waves, 
  VolumeX, 
  Radar, 
  Infinity, 
  Zap, 
  Shield, 
  Crown, 
  Sparkles, 
  Compass,
  ArrowLeft,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { getPrincipleById, TIER_NAMES } from '@/constants/principles';
import { useSovereign } from '@/contexts/SovereignContext';
import { GoldButton } from '@/components/GoldButton';

const iconMap: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Scale,
  Frame,
  Eye,
  Waves,
  VolumeX,
  Radar,
  Infinity,
  Zap,
  Shield,
  Crown,
  Sparkles,
  Compass,
};

export default function PrincipleDetailScreen() {
  const { principleId } = useLocalSearchParams<{ principleId: string }>();
  const router = useRouter();
  const { setDailyFocus, currentFocusPrinciple, isTierUnlocked } = useSovereign();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const principle = getPrincipleById(principleId || '');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!principle) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Principle not found</Text>
      </SafeAreaView>
    );
  }

  const IconComponent = iconMap[principle.icon] || Scale;
  const isLocked = !isTierUnlocked(principle.tier);
  const isCurrentFocus = currentFocusPrinciple?.id === principle.id;

  const handleAcceptMission = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setDailyFocus(principle.id);
    router.push('/(tabs)/(dashboard)');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: { backgroundColor: Colors.background.primary },
          headerShadowVisible: false,
          headerTintColor: Colors.text.primary,
          headerLeft: () => (
            <ArrowLeft 
              size={24} 
              color={Colors.text.primary} 
              onPress={() => router.back()}
              style={{ marginLeft: 4 }}
            />
          ),
        }}
      />
      <ScrollView 
        style={styles.container}
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
            <View style={styles.iconContainer}>
              <IconComponent size={32} color={Colors.accent.gold} />
            </View>
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>{TIER_NAMES[principle.tier]}</Text>
            </View>
            <Text style={styles.title}>{principle.name}</Text>
          </View>

          <View style={styles.doctrineSection}>
            <Text style={styles.sectionLabel}>THE DOCTRINE</Text>
            <View style={styles.doctrineCard}>
              <Text style={styles.doctrineText}>{principle.doctrine}</Text>
            </View>
          </View>

          <View style={styles.missionSection}>
            <Text style={styles.sectionLabel}>THE MISSION</Text>
            <View style={styles.missionCard}>
              <View style={styles.missionHeader}>
                <Text style={styles.missionTitle}>{principle.mission.title}</Text>
                <View style={styles.xpBadge}>
                  <Text style={styles.xpText}>+{principle.mission.xpReward} XP</Text>
                </View>
              </View>
              <Text style={styles.missionDescription}>
                {principle.mission.description}
              </Text>
            </View>
          </View>

          <View style={styles.actionSection}>
            {isLocked ? (
              <View style={styles.lockedMessage}>
                <Text style={styles.lockedText}>
                  Complete more missions to unlock this tier
                </Text>
              </View>
            ) : isCurrentFocus ? (
              <View style={styles.activeMessage}>
                <Text style={styles.activeText}>
                  This is your current focus
                </Text>
              </View>
            ) : (
              <GoldButton
                title="Accept the Weight"
                onPress={handleAcceptMission}
              />
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
  },
  tierBadge: {
    backgroundColor: Colors.background.card,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tierText: {
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '300' as const,
    color: Colors.text.primary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  doctrineSection: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    letterSpacing: 2,
    marginBottom: 12,
  },
  doctrineCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.gold,
  },
  doctrineText: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  missionSection: {
    marginBottom: 32,
  },
  missionCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  xpBadge: {
    backgroundColor: Colors.accent.goldDim,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
  },
  missionDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  actionSection: {
    paddingTop: 8,
  },
  lockedMessage: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  lockedText: {
    fontSize: 14,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  activeMessage: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  activeText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  errorText: {
    color: Colors.text.muted,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});
