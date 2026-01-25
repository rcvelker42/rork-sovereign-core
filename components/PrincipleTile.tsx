import React, { useRef } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Animated,
  View,
} from 'react-native';
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
  Lock,
  Anchor,
  Skull,
  Radio,
  Dumbbell,
  Sun,
  Feather,
  Link,
  Magnet,
  Repeat,
  Focus,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Principle } from '@/constants/principles';

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
  Anchor,
  Skull,
  Radio,
  Dumbbell,
  Sun,
  Feather,
  Link,
  Magnet,
  Repeat,
  Focus,
};

interface PrincipleTileProps {
  principle: Principle;
  isLocked: boolean;
  onPress: () => void;
}

export function PrincipleTile({ principle, isLocked, onPress }: PrincipleTileProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const IconComponent = iconMap[principle.icon] || Scale;

  const handlePressIn = () => {
    if (isLocked) return;
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (isLocked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={isLocked ? 1 : 0.8}
        style={[styles.container, isLocked && styles.containerLocked]}
      >
        <View style={[styles.iconContainer, isLocked && styles.iconContainerLocked]}>
          {isLocked ? (
            <Lock size={24} color={Colors.text.muted} />
          ) : (
            <IconComponent size={24} color={Colors.accent.gold} />
          )}
        </View>
        <Text 
          style={[styles.title, isLocked && styles.titleLocked]} 
          numberOfLines={2}
        >
          {principle.name}
        </Text>
        <Text style={[styles.xp, isLocked && styles.xpLocked]}>
          +{principle.mission.xpReward} XP
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 6,
  },
  container: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  containerLocked: {
    backgroundColor: Colors.background.secondary,
    borderColor: Colors.tier.locked,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconContainerLocked: {
    backgroundColor: 'rgba(61, 61, 53, 0.3)',
  },
  title: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    lineHeight: 20,
  },
  titleLocked: {
    color: Colors.text.muted,
  },
  xp: {
    fontSize: 11,
    color: Colors.accent.gold,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  xpLocked: {
    color: Colors.text.muted,
  },
});
