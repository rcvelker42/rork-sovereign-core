import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useSovereign } from '@/contexts/SovereignContext';
import { GoldButton } from '@/components/GoldButton';
import { Colors } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

export default function AwakeningScreen() {
  const router = useRouter();
  const { hasOnboarded, completeOnboarding, isLoading } = useSovereign();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isLoading && hasOnboarded) {
      router.replace('/(tabs)');
      return;
    }

    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
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
      ]),
      Animated.delay(400),
      Animated.timing(buttonFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isLoading, hasOnboarded]);

  const handleEnter = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(buttonFade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      completeOnboarding();
      router.replace('/(tabs)');
    });
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background.primary, '#151912', '#0D0F0A']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.textureOverlay} />
      
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.emblemContainer}>
            <View style={styles.emblem}>
              <View style={styles.emblemInner}>
                <Text style={styles.emblemText}>S</Text>
              </View>
            </View>
            <View style={styles.emblemGlow} />
          </View>
          
          <Text style={styles.title}>SOVEREIGN</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>The script ends here.</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.quoteSection,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.quote}>
            "He who conquers himself is mightier than he who conquers a thousand men in battle."
          </Text>
          <Text style={styles.quoteAuthor}>— The Dhammapada</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.buttonContainer,
            { opacity: buttonFade }
          ]}
        >
          <GoldButton 
            title="Enter the Arena" 
            onPress={handleEnter}
          />
          
          <Text style={styles.disclaimer}>
            A journey of mastery begins with a single step
          </Text>
        </Animated.View>
      </View>
      
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
    backgroundColor: 'rgba(245, 245, 220, 0.02)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: height * 0.15,
    paddingBottom: 60,
  },
  heroSection: {
    alignItems: 'center',
  },
  emblemContainer: {
    marginBottom: 32,
    position: 'relative',
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
  emblemGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 60,
    backgroundColor: Colors.accent.goldDim,
    opacity: 0.3,
    zIndex: -1,
  },
  title: {
    fontSize: 32,
    fontWeight: '300' as const,
    color: Colors.text.primary,
    letterSpacing: 12,
    textTransform: 'uppercase',
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: Colors.accent.gold,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.text.secondary,
    letterSpacing: 1,
  },
  quoteSection: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  quote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.text.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 12,
    color: Colors.accent.goldMuted,
    marginTop: 12,
    letterSpacing: 1,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  disclaimer: {
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: 20,
    letterSpacing: 0.5,
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
