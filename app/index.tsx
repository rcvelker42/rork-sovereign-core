import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useSovereign } from '@/contexts/SovereignContext';
import { GoldButton } from '@/components/GoldButton';
import { Colors } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

type OnboardingStep = 
  | 'intro'
  | 'prompt1' | 'prompt2' | 'prompt3'
  | 'stakes'
  | 'prompt4' | 'prompt5'
  | 'solution'
  | 'pact'
  | 'complete';

export default function AwakeningScreen() {
  const router = useRouter();
  const { hasOnboarded, completeOnboarding, isLoading } = useSovereign();
  
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('intro');
  const [responses, setResponses] = useState<Record<string, string>>({});
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const textureAnim = useRef(new Animated.Value(0)).current; // 0 = paper, 1 = leather

  useEffect(() => {
    if (!isLoading && hasOnboarded) {
      router.replace('/(tabs)');
      return;
    }

    let animation: Animated.CompositeAnimation | null = null;

    if (currentStep === 'intro') {
      animation = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]);
      animation.start();
    } else {
      // Fade in new content
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
      animation = Animated.parallel([
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
      ]);
      animation.start();
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [currentStep, isLoading, hasOnboarded]);

  // Animate texture as user progresses
  useEffect(() => {
    const stepValue = getStepValue(currentStep);
    const animation = Animated.timing(textureAnim, {
      toValue: stepValue,
      duration: 1000,
      useNativeDriver: true, // opacity can use native driver
    });
    animation.start();

    return () => {
      animation.stop();
    };
  }, [currentStep]);

  const getStepValue = (step: OnboardingStep): number => {
    const stepOrder: OnboardingStep[] = [
      'intro', 'prompt1', 'prompt2', 'prompt3', 'stakes', 
      'prompt4', 'prompt5', 'solution', 'pact', 'complete'
    ];
    return stepOrder.indexOf(step) / (stepOrder.length - 1);
  };

  const handleResponse = (promptKey: string, response: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setResponses({ ...responses, [promptKey]: response });
    
    // Move to next step
    const nextStep = getNextStep(currentStep);
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const getNextStep = (step: OnboardingStep): OnboardingStep | null => {
    const flow: Record<OnboardingStep, OnboardingStep> = {
      'intro': 'prompt1',
      'prompt1': 'prompt2',
      'prompt2': 'prompt3',
      'prompt3': 'stakes',
      'stakes': 'prompt4',
      'prompt4': 'prompt5',
      'prompt5': 'solution',
      'solution': 'pact',
      'pact': 'complete',
      'complete': 'complete',
    };
    return flow[step] || null;
  };

  const handleAcceptWeight = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(textureAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true, // Changed to true - textureAnim is used for opacity which supports native driver
      }),
    ]);
    animation.start(() => {
      completeOnboarding();
      router.replace('/(tabs)');
    });
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <View style={styles.contentContainer}>
            <View style={styles.emblemContainer}>
              <View style={styles.emblem}>
                <View style={styles.emblemInner}>
                  <Text style={styles.emblemText}>S</Text>
                </View>
              </View>
            </View>
            <Text style={styles.title}>SOVEREIGN</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>The Awakening: A Cross-Examination</Text>
            <Text style={styles.introText}>
              {"\"The first step to sovereignty is admitting you are currently a subject.\""}
            </Text>
            <View style={styles.buttonContainer}>
              <GoldButton 
                title="Begin the Cross-Examination" 
                onPress={() => setCurrentStep('prompt1')}
              />
            </View>
          </View>
        );

      case 'prompt1':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>I. The Diagnosis</Text>
            <Text style={styles.promptText}>
              When you enter a room of strangers, do you feel like the Architect of the energy, or are you a Chameleon desperately trying to blend in?
            </Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt1', 'architect')}
              >
                <Text style={styles.optionText}>I am the Architect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt1', 'chameleon')}
              >
                <Text style={styles.optionText}>I am the Chameleon</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'prompt2':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>I. The Diagnosis</Text>
            <Text style={styles.promptText}>
              {"Be honest with yourself: If you lost your job, your current social status, and your favorite \"props\" tomorrow, would your confidence remain a Constant, or would it evaporate into Nothing?"}
            </Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt2', 'constant')}
              >
                <Text style={styles.optionText}>It is a Constant</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt2', 'disappear')}
              >
                <Text style={styles.optionText}>It would disappear</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'prompt3':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>I. The Diagnosis</Text>
            <Text style={styles.promptText}>
              {"How many times this week have you \"filtered\" your true thoughts or suppressed an impulse because you were afraid of looking stupid?"}
            </Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt3', 'never')}
              >
                <Text style={styles.optionText}>Never</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt3', 'occasionally')}
              >
                <Text style={styles.optionText}>Occasionally</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt3', 'constantly')}
              >
                <Text style={styles.optionText}>Constantly</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'stakes':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>II. The Stakes</Text>
            <Text style={styles.quoteText}>
              {"\"One who fears the 'No' has already rejected themselves.\""}
            </Text>
            <View style={styles.buttonContainer}>
              <GoldButton 
                title="Continue" 
                onPress={() => setCurrentStep('prompt4')}
              />
            </View>
          </View>
        );

      case 'prompt4':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>II. The Stakes</Text>
            <Text style={styles.promptText}>
              {"Imagine yourself five years from now if you change nothing. If you continue to seek permission, wait for the \"right time,\" and hide in your comfort zone... does that person's life look like a Masterpiece or a Tragedy?"}
            </Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt4', 'masterpiece')}
              >
                <Text style={styles.optionText}>A Masterpiece</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt4', 'tragedy')}
              >
                <Text style={styles.optionText}>A Tragedy</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'prompt5':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>II. The Stakes</Text>
            <Text style={styles.promptText}>
              {"Are you ready to kill the Ego that is currently \"protecting\" you from growth, even if it means feeling the weight of social pressure, judgment, and rejection?"}
            </Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt5', 'not-ready')}
              >
                <Text style={styles.optionText}>{"No, I'm not ready"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleResponse('prompt5', 'incinerate')}
              >
                <Text style={styles.optionText}>Yes, incinerate it</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'solution':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>III. The Sovereign Solution</Text>
            <Text style={[styles.quoteText, styles.solutionQuote]}>
              {"\"This is not an app. This is a forge.\""}
            </Text>
            <View style={styles.solutionContent}>
              <Text style={styles.solutionText}>
                <Text style={styles.boldText}>The Revelation:</Text>{" \"You have spent your life following a script written by others. Sovereign is the tool to help you tear up that script. We do not provide 'lines' or 'hacks.' We provide a 15-Principle Architecture designed to dismantle your social conditioning and rebuild you from the core upward.\""}
              </Text>
              <Text style={styles.solutionSubtitle}>How to Use This Engine:</Text>
              <View style={styles.listContainer}>
                <Text style={styles.listItem}>• <Text style={styles.boldText}>Study the Doctrine:</Text> Each principle contains the raw logic of social power.</Text>
                <Text style={styles.listItem}>• <Text style={styles.boldText}>Accept the Weight:</Text> You will be assigned Missions. These are not digital tasks; they are real-world confrontations with your own fear.</Text>
                <Text style={styles.listItem}>• <Text style={styles.boldText}>Log the Proof:</Text> Growth only happens when it is witnessed. You will log your execution and rate your Sovereignty Scale.</Text>
                <Text style={styles.listItem}>• <Text style={styles.boldText}>Ascend the Tiers:</Text> Complete three levels of missions for each principle to unlock the next stage of your evolution.</Text>
              </View>
            </View>
            <View style={styles.solutionButtonContainer}>
              <GoldButton 
                title="Continue" 
                onPress={() => setCurrentStep('pact')}
              />
            </View>
          </View>
        );

      case 'pact':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>IV. The Pact</Text>
            <Text style={styles.quoteText}>
              {"\"Words are cheap. Presence is everything.\""}
            </Text>
            <Text style={styles.pactText}>
              {"Do you commit to prioritizing Action over Theory, and will you vow to never \"lie\" to your Ledger, knowing that the only person you truly cheat is the person you are meant to become?"}
            </Text>
            <View style={styles.acceptButtonContainer}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={handleAcceptWeight}
              >
                <Text style={styles.acceptButtonText}>I ACCEPT THE WEIGHT</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={[Colors.background.primary, '#151912']}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  // Interpolate texture from paper (light) to leather (dark/embossed)
  const paperOpacity = textureAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const leatherOpacity = textureAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background.primary, '#151912', '#0D0F0A']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Paper texture overlay */}
      <Animated.View 
        style={[
          styles.textureOverlay,
          styles.paperTexture,
          { opacity: paperOpacity }
        ]} 
      />
      
      {/* Leather texture overlay */}
      <Animated.View 
        style={[
          styles.textureOverlay,
          styles.leatherTexture,
          { opacity: leatherOpacity }
        ]} 
      />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {renderContent()}
      </Animated.View>
      
      <View style={styles.cornerDecor} />
      <View style={[styles.cornerDecor, styles.cornerDecorBottomRight]} />
    </View>
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
  },
  textureOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  paperTexture: {
    backgroundColor: 'rgba(245, 245, 220, 0.02)',
  },
  leatherTexture: {
    backgroundColor: 'rgba(101, 67, 33, 0.15)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: height * 0.12,
    paddingBottom: 60,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emblemContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emblem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  emblemInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: Colors.accent.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemText: {
    fontSize: 36,
    fontWeight: '300' as const,
    color: Colors.accent.gold,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 32,
    fontWeight: '300' as const,
    color: Colors.text.primary,
    letterSpacing: 12,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: Colors.accent.gold,
    alignSelf: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    textAlign: 'center',
    marginBottom: 16,
  },
  introText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 26,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
  },
  promptText: {
    fontSize: 17,
    color: Colors.text.primary,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 40,
  },
  quoteText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 26,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 40,
  },
  solutionQuote: {
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 16,
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '500' as const,
  },
  solutionContent: {
    marginBottom: 20,
  },
  solutionText: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  solutionSubtitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    marginBottom: 12,
    marginTop: 4,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  boldText: {
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  pactText: {
    fontSize: 17,
    color: Colors.text.primary,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  solutionButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  acceptButtonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  acceptButton: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: Colors.accent.gold,
    alignItems: 'center',
    minWidth: 280,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.accent.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cornerDecor: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 30,
    height: 30,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  cornerDecorBottomRight: {
    top: undefined,
    left: undefined,
    bottom: 40,
    right: 20,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
});
