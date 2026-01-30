import { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import Purchases, { 
  PurchasesOffering, 
  CustomerInfo,
  PurchasesPackage,
} from 'react-native-purchases';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';

function getRCToken() {
  // Skip RevenueCat on web (not supported)
  if (Platform.OS === 'web') {
    return null;
  }
  
  // Always use platform-specific keys for native apps (regardless of __DEV__)
  const platformKey = Platform.select({
    ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY,
    android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY,
    default: null,
  });
  
  // Fallback to test key if platform key is missing
  return platformKey || process.env.EXPO_PUBLIC_REVENUECAT_TEST_API_KEY || null;
}

const rcToken = getRCToken();
if (rcToken) {
  Purchases.configure({ apiKey: rcToken });
}

export const [PurchasesProvider, usePurchases] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [isPremium, setIsPremium] = useState(false);

  const customerInfoQuery = useQuery({
    queryKey: ['customerInfo'],
    queryFn: async () => {
      try {
        const info = await Purchases.getCustomerInfo();
        return info;
      } catch (error) {
        console.log('Error fetching customer info:', error);
        return null;
      }
    },
    enabled: !!rcToken,
  });

  const offeringsQuery = useQuery({
    queryKey: ['offerings'],
    queryFn: async () => {
      try {
        const offerings = await Purchases.getOfferings();
        return offerings.current;
      } catch (error) {
        console.log('Error fetching offerings:', error);
        return null;
      }
    },
    enabled: !!rcToken,
  });

  useEffect(() => {
    if (customerInfoQuery.data) {
      const hasPremium = customerInfoQuery.data.entitlements.active['premium'] !== undefined;
      setIsPremium(hasPremium);
      console.log('Premium status:', hasPremium);
    }
  }, [customerInfoQuery.data]);

  const purchaseMutation = useMutation({
    mutationFn: async (pkg: PurchasesPackage) => {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      return customerInfo;
    },
    onSuccess: (customerInfo) => {
      queryClient.setQueryData(['customerInfo'], customerInfo);
      const hasPremium = customerInfo.entitlements.active['premium'] !== undefined;
      setIsPremium(hasPremium);
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async () => {
      const customerInfo = await Purchases.restorePurchases();
      return customerInfo;
    },
    onSuccess: (customerInfo) => {
      queryClient.setQueryData(['customerInfo'], customerInfo);
      const hasPremium = customerInfo.entitlements.active['premium'] !== undefined;
      setIsPremium(hasPremium);
    },
  });

  const purchasePackage = useCallback(async (pkg: PurchasesPackage) => {
    return purchaseMutation.mutateAsync(pkg);
  }, [purchaseMutation]);

  const restorePurchases = useCallback(async () => {
    return restoreMutation.mutateAsync();
  }, [restoreMutation]);

  return {
    isPremium,
    currentOffering: offeringsQuery.data ?? null,
    isLoading: customerInfoQuery.isLoading || offeringsQuery.isLoading,
    isPurchasing: purchaseMutation.isPending,
    isRestoring: restoreMutation.isPending,
    purchasePackage,
    restorePurchases,
    purchaseError: purchaseMutation.error,
    restoreError: restoreMutation.error,
  };
});
