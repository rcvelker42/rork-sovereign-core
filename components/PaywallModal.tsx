import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { X, Crown, Shield, Zap, Lock } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { usePurchases } from '@/contexts/PurchasesContext';
import { GoldButton } from '@/components/GoldButton';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PaywallModal({ visible, onClose, onSuccess }: PaywallModalProps) {
  const { 
    currentOffering, 
    purchasePackage, 
    restorePurchases,
    isPurchasing, 
    isRestoring,
    isLoading,
  } = usePurchases();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [visible]);

  const handlePurchase = async () => {
    const monthlyPackage = currentOffering?.availablePackages.find(
      pkg => pkg.identifier === '$rc_monthly'
    );
    
    if (!monthlyPackage) {
      console.log('Monthly package not found');
      return;
    }

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await purchasePackage(monthlyPackage);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onSuccess?.();
      onClose();
    } catch (error: any) {
      if (!error.userCancelled) {
        console.log('Purchase error:', error);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const handleRestore = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const info = await restorePurchases();
      if (info.entitlements.active['premium']) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onSuccess?.();
        onClose();
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    } catch (error) {
      console.log('Restore error:', error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const monthlyPackage = currentOffering?.availablePackages.find(
    pkg => pkg.identifier === '$rc_monthly'
  );

  const priceString = monthlyPackage?.product.priceString || '$2.99';

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={24} color={Colors.text.muted} />
          </TouchableOpacity>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.header}>
              <View style={styles.crownContainer}>
                <Crown size={48} color={Colors.accent.gold} />
              </View>
              <Text style={styles.title}>Unlock Mastery</Text>
              <Text style={styles.subtitle}>
                Ascend to the highest levels of sovereignty
              </Text>
            </View>

            <View style={styles.featuresContainer}>
              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Shield size={20} color={Colors.accent.gold} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>The Mastery Tier</Text>
                  <Text style={styles.featureDescription}>
                    Access the final 5 principles of sovereignty
                  </Text>
                </View>
              </View>

              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Zap size={20} color={Colors.accent.gold} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Advanced Gym Missions</Text>
                  <Text style={styles.featureDescription}>
                    Unlock The Bridge & Mastery training
                  </Text>
                </View>
              </View>

              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Lock size={20} color={Colors.accent.gold} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Full Transformation</Text>
                  <Text style={styles.featureDescription}>
                    Complete your journey to true sovereignty
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Monthly Subscription</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{priceString}</Text>
                <Text style={styles.priceUnit}>/month</Text>
              </View>
            </View>

            {isLoading ? (
              <ActivityIndicator color={Colors.accent.gold} size="large" />
            ) : (
              <View style={styles.actions}>
                <GoldButton
                  title={isPurchasing ? "Processing..." : "Begin Mastery"}
                  onPress={handlePurchase}
                  disabled={isPurchasing || isRestoring || !monthlyPackage}
                  style={styles.purchaseButton}
                />
                
                <TouchableOpacity 
                  style={styles.restoreButton}
                  onPress={handleRestore}
                  disabled={isRestoring || isPurchasing}
                >
                  <Text style={styles.restoreText}>
                    {isRestoring ? "Restoring..." : "Restore Purchases"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.disclaimer}>
              Cancel anytime. Subscription auto-renews monthly.
            </Text>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
    backgroundColor: Colors.background.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 8,
  },
  crownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.accent.gold,
  },
  title: {
    fontSize: 28,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: 28,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  priceContainer: {
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.text.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: Colors.accent.gold,
  },
  priceUnit: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  actions: {
    marginBottom: 16,
  },
  purchaseButton: {
    marginBottom: 12,
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  restoreText: {
    fontSize: 14,
    color: Colors.text.muted,
    textDecorationLine: 'underline',
  },
  disclaimer: {
    fontSize: 11,
    color: Colors.text.muted,
    textAlign: 'center',
    lineHeight: 16,
  },
});
