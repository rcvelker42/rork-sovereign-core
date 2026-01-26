import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/colors';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  value?: string | number;
  shouldGlow?: boolean;
}

export function ProgressRing({ 
  progress, 
  size = 100, 
  strokeWidth = 8,
  label,
  value,
  shouldGlow = false,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const glowAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  
  useEffect(() => {
    // Stop any existing animation
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    if (shouldGlow) {
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
      animationRef.current.start();
    } else {
      glowAnim.setValue(0);
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [shouldGlow]);
  
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });
  
  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {shouldGlow && (
        <Animated.View
          style={[
            styles.glowContainer,
            {
              width: size,
              height: size,
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        >
          <Svg width={size} height={size} style={styles.glowSvg}>
            <Circle
              stroke={Colors.accent.gold}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius + 2}
              strokeWidth={strokeWidth + 4}
              opacity={0.5}
            />
          </Svg>
        </Animated.View>
      )}
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          stroke={Colors.background.card}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={Colors.accent.gold}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.content}>
        {value !== undefined && (
          <Text style={styles.value}>{value}</Text>
        )}
        {label && (
          <Text style={styles.label}>{label}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowSvg: {
    position: 'absolute',
  },
  svg: {
    position: 'absolute',
  },
  content: {
    alignItems: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  label: {
    fontSize: 10,
    color: Colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
});
