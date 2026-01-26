import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Principle } from '@/constants/principles';
import { GymMission } from '@/constants/gymMissions';
import { GoldButton } from './GoldButton';

const { width, height } = Dimensions.get('window');

interface MissionModalProps {
  visible: boolean;
  principle: Principle | null;
  gymMission?: GymMission;
  onClose: () => void;
  onComplete: (reflection: string, stateValue: number) => void;
}

export function MissionModal({ visible, principle, gymMission, onClose, onComplete }: MissionModalProps) {
  const [reflection, setReflection] = useState('');
  const [stateValue, setStateValue] = useState(5);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const validationFadeAnim = useRef(new Animated.Value(0)).current;

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
      setReflection('');
      setStateValue(5);
      setShowValidationModal(false);
      validationFadeAnim.setValue(0);
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [visible]);

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleComplete = () => {
    if (!reflection.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    
    const wordCount = countWords(reflection);
    if (wordCount < 20) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setShowValidationModal(true);
      const validationAnimation = Animated.timing(validationFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      });
      validationAnimation.start();
      return;
    }
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onComplete(reflection, stateValue);
  };

  const handleCloseValidation = () => {
    const validationAnimation = Animated.timing(validationFadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });
    validationAnimation.start(() => {
      setShowValidationModal(false);
    });
  };

  const handleSliderChange = (value: number) => {
    const clampedValue = Math.max(1, Math.min(10, value));
    setStateValue(clampedValue);
    Haptics.selectionAsync();
  };

  if (!principle) return null;
  
  const missionTitle = gymMission ? gymMission.title : principle.mission.title;
  const missionXp = gymMission?.xpReward || principle.mission.xpReward;

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
              <Text style={styles.title}>Log Execution</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color={Colors.text.secondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.missionInfo}>
                <Text style={styles.missionLabel}>MISSION COMPLETED</Text>
                <Text style={styles.missionTitle}>{missionTitle}</Text>
                {missionXp > 0 && (
                  <View style={styles.xpBadge}>
                    <Text style={styles.xpText}>+{missionXp} XP</Text>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>
                  What did you observe carrying out this mission today? What was the most striking thought that drifted in/out of your consciousness?
                </Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={4}
                  maxLength={1000}
                  placeholder="Record your observations..."
                  placeholderTextColor={Colors.text.muted}
                  value={reflection}
                  onChangeText={setReflection}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Internal State Assessment During Mission</Text>
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderLabels}>
                    <Text style={styles.sliderLabelLeft}>Reactive</Text>
                    <Text style={styles.sliderLabelRight}>Sovereign</Text>
                  </View>
                  <View style={styles.sliderTrack}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                      <TouchableOpacity
                        key={val}
                        onPress={() => handleSliderChange(val)}
                        style={[
                          styles.sliderDot,
                          val <= stateValue && styles.sliderDotActive,
                        ]}
                      >
                        {val === stateValue && (
                          <View style={styles.sliderDotSelected} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.stateValueText}>
                    {stateValue <= 2 ? 'Reactive' : stateValue <= 4 ? 'Seeking' : stateValue <= 6 ? 'Grounded' : stateValue <= 8 ? 'Magnetic' : 'Sovereign'}
                  </Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <GoldButton
                title="Save to Archive"
                onPress={handleComplete}
                disabled={!reflection.trim()}
              />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>

      {/* Validation Modal */}
      {showValidationModal && (
        <Modal transparent visible={showValidationModal} animationType="none">
          <Animated.View style={[styles.validationOverlay, { opacity: validationFadeAnim }]}>
            <Animated.View 
              style={[
                styles.validationModal,
                { opacity: validationFadeAnim }
              ]}
            >
              <View style={styles.validationHeader}>
                <Text style={styles.validationTitle}>Dig Deeper</Text>
              </View>
              
              <View style={styles.validationContent}>
                <Text style={styles.validationMessage}>
                  True transformation requires deep reflection. Take a moment to really explore your consciousness and the thoughts that surfaced during this mission.
                </Text>
                <Text style={styles.validationMessage}>
                  What patterns did you notice? What resistance came up? How did your internal state shift? These insights are the foundation of lasting change.
                </Text>
                <Text style={styles.validationHint}>
                  Aim for 30+ words to capture the depth of your experience
                </Text>
              </View>

              <View style={styles.validationFooter}>
                <GoldButton
                  title="Continue Reflection"
                  onPress={handleCloseValidation}
                />
              </View>
            </Animated.View>
          </Animated.View>
        </Modal>
      )}
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
    padding: 4,
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
  missionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  xpBadge: {
    backgroundColor: Colors.accent.goldDim,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
  },
  xpText: {
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
  },
  textInput: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    color: Colors.text.primary,
    fontSize: 15,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sliderContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sliderLabelLeft: {
    fontSize: 11,
    color: Colors.state.reactive,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sliderLabelRight: {
    fontSize: 11,
    color: Colors.accent.gold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sliderTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 32,
    marginBottom: 12,
  },
  sliderDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.background.secondary,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderDotActive: {
    borderColor: Colors.accent.gold,
    backgroundColor: Colors.accent.goldDim,
  },
  sliderDotSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent.gold,
  },
  stateValueText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '500' as const,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  validationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  validationModal: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  validationHeader: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  validationTitle: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  validationContent: {
    padding: 24,
  },
  validationMessage: {
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  validationHint: {
    fontSize: 11,
    color: Colors.text.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
  validationFooter: {
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
