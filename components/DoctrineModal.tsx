import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { X, BookOpen } from 'lucide-react-native';
import {
  Anchor,
  Skull,
  Infinity,
  Shield,
  Radio,
  Dumbbell,
  Sun,
  Feather,
  Link,
  Magnet,
  Eye,
  Waves,
  Repeat,
  Crown,
  Focus,
  Scale,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Principle, TIER_NAMES } from '@/constants/principles';

const { height } = Dimensions.get('window');

const iconMap: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Anchor,
  Skull,
  Infinity,
  Shield,
  Radio,
  Dumbbell,
  Sun,
  Feather,
  Link,
  Magnet,
  Eye,
  Waves,
  Repeat,
  Crown,
  Focus,
  Scale,
};

interface DoctrineModalProps {
  visible: boolean;
  principle: Principle | null;
  onClose: () => void;
}

export function DoctrineModal({ visible, principle, onClose }: DoctrineModalProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
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
      ]).start();
    } else {
      Animated.parallel([
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
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  if (!principle) return null;

  const IconComponent = iconMap[principle.icon] || Scale;

  // Split doctrine into paragraphs for better readability
  const doctrineParagraphs = principle.doctrine.split('\n\n');

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View 
          style={[
            styles.container,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <BookOpen size={20} color={Colors.accent.gold} />
              <Text style={styles.headerTitle}>Study Doctrine</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.principleHeader}>
              <View style={styles.iconContainer}>
                <IconComponent size={32} color={Colors.accent.gold} />
              </View>
              <View style={styles.tierBadge}>
                <Text style={styles.tierText}>{TIER_NAMES[principle.tier]}</Text>
              </View>
              <Text style={styles.principleTitle}>{principle.name}</Text>
            </View>

            <View style={styles.doctrineSection}>
              <Text style={styles.sectionLabel}>THE DOCTRINE</Text>
              <View style={styles.doctrineCard}>
                {doctrineParagraphs.map((paragraph, index) => (
                  <Text 
                    key={index} 
                    style={[
                      styles.doctrineText,
                      index < doctrineParagraphs.length - 1 && styles.doctrineParagraph
                    ]}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.missionPreview}>
              <Text style={styles.sectionLabel}>TODAY'S MISSION</Text>
              <View style={styles.missionCard}>
                <Text style={styles.missionTitle}>{principle.mission.title}</Text>
                <Text style={styles.missionDescription}>
                  {principle.mission.description}
                </Text>
              </View>
            </View>

            <View style={styles.reminderSection}>
              <Text style={styles.reminderText}>
                Return to the home screen and tap "Log Execution" when you've completed today's mission.
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.92,
    borderTopWidth: 1,
    borderColor: Colors.accent.gold,
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  principleHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  principleTitle: {
    fontSize: 24,
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
    color: Colors.accent.gold,
    letterSpacing: 2,
    marginBottom: 12,
  },
  doctrineCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.gold,
  },
  doctrineText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 28,
  },
  doctrineParagraph: {
    marginBottom: 20,
  },
  missionPreview: {
    marginBottom: 24,
  },
  missionCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    marginBottom: 10,
  },
  missionDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  reminderSection: {
    backgroundColor: Colors.accent.goldDim,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
  },
  reminderText: {
    fontSize: 13,
    color: Colors.accent.gold,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
