import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { getPrincipleById, Principle, TIER_UNLOCK_REQUIREMENTS, PrincipleTier } from '@/constants/principles';
import { getStateByXP, SocialState } from '@/constants/states';

export interface JournalEntry {
  id: string;
  date: string;
  principleId: string;
  principleName: string;
  reflection: string;
  stateValue: number;
  xpEarned: number;
}

export interface UserStats {
  dayCount: number;
  startDate: string;
  presenceScore: number;
  resilienceXP: number;
  completedMissions: number;
  currentPhase: PrincipleTier;
}

export interface DailyFocus {
  principleId: string | null;
  acceptedAt: string | null;
}

interface SovereignState {
  hasOnboarded: boolean;
  stats: UserStats;
  dailyFocus: DailyFocus;
  journalEntries: JournalEntry[];
  lastPresenceDecay: string | null;
}

const STORAGE_KEY = 'sovereign_state';

const defaultState: SovereignState = {
  hasOnboarded: false,
  stats: {
    dayCount: 1,
    startDate: new Date().toISOString(),
    presenceScore: 0,
    resilienceXP: 0,
    completedMissions: 0,
    currentPhase: 1,
  },
  dailyFocus: {
    principleId: null,
    acceptedAt: null,
  },
  journalEntries: [],
  lastPresenceDecay: null,
};

export const [SovereignProvider, useSovereign] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [state, setState] = useState<SovereignState>(defaultState);

  const stateQuery = useQuery({
    queryKey: ['sovereign_state'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const now = new Date();
      
      if (stored) {
        const parsed = JSON.parse(stored) as SovereignState;
        const startDate = new Date(parsed.stats.startDate);
        const diffTime = Math.abs(now.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        parsed.stats.dayCount = Math.max(1, diffDays);
        
        // Handle presence decay every 6 hours
        const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
        const lastDecay = parsed.lastPresenceDecay ? new Date(parsed.lastPresenceDecay) : new Date(parsed.stats.startDate);
        const timeSinceLastDecay = now.getTime() - lastDecay.getTime();
        
        if (timeSinceLastDecay >= SIX_HOURS_MS) {
          const decayCount = Math.floor(timeSinceLastDecay / SIX_HOURS_MS);
          const newPresenceScore = Math.max(0, parsed.stats.presenceScore - (decayCount * 20));
          
          parsed.stats.presenceScore = newPresenceScore;
          parsed.lastPresenceDecay = now.toISOString();
          
          // Save the updated state
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        } else if (!parsed.lastPresenceDecay) {
          // Initialize lastPresenceDecay if it doesn't exist
          parsed.lastPresenceDecay = now.toISOString();
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
        
        return parsed;
      }
      
      // For new state, initialize lastPresenceDecay
      const newState = { ...defaultState, lastPresenceDecay: now.toISOString() };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (newState: SovereignState) => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
    onSuccess: (newState) => {
      queryClient.setQueryData(['sovereign_state'], newState);
    },
  });

  useEffect(() => {
    if (stateQuery.data) {
      setState(stateQuery.data);
    }
  }, [stateQuery.data]);

  const updateState = useCallback((updates: Partial<SovereignState>) => {
    const newState = { ...state, ...updates };
    setState(newState);
    saveMutation.mutate(newState);
  }, [state, saveMutation]);

  const completeOnboarding = useCallback(() => {
    updateState({ hasOnboarded: true });
  }, [updateState]);

  const setDailyFocus = useCallback((principleId: string) => {
    updateState({
      dailyFocus: {
        principleId,
        acceptedAt: new Date().toISOString(),
      },
    });
  }, [updateState]);

  const completeMission = useCallback((principleId: string, reflection: string, stateValue: number) => {
    const principle = getPrincipleById(principleId);
    if (!principle) return;

    const xpEarned = principle.mission.xpReward;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      principleId,
      principleName: principle.name,
      reflection,
      stateValue,
      xpEarned,
    };

    const newCompletedMissions = state.stats.completedMissions + 1;
    let newPhase = state.stats.currentPhase;
    
    if (newCompletedMissions >= TIER_UNLOCK_REQUIREMENTS[2] && newPhase < 2) {
      newPhase = 2;
    }
    if (newCompletedMissions >= TIER_UNLOCK_REQUIREMENTS[3] && newPhase < 3) {
      newPhase = 3;
    }

    const presenceBonus = Math.round(stateValue * 2);
    
    updateState({
      stats: {
        ...state.stats,
        resilienceXP: state.stats.resilienceXP + xpEarned,
        presenceScore: Math.min(100, state.stats.presenceScore + presenceBonus),
        completedMissions: newCompletedMissions,
        currentPhase: newPhase as PrincipleTier,
      },
      dailyFocus: {
        principleId: null,
        acceptedAt: null,
      },
      journalEntries: [newEntry, ...state.journalEntries],
    });
  }, [state, updateState]);

  const socialState: SocialState = useMemo(() => {
    return getStateByXP(state.stats.resilienceXP);
  }, [state.stats.resilienceXP]);

  const isTierUnlocked = useCallback((tier: PrincipleTier): boolean => {
    return state.stats.completedMissions >= TIER_UNLOCK_REQUIREMENTS[tier];
  }, [state.stats.completedMissions]);

  const currentFocusPrinciple: Principle | null = useMemo(() => {
    if (!state.dailyFocus.principleId) return null;
    return getPrincipleById(state.dailyFocus.principleId) ?? null;
  }, [state.dailyFocus.principleId]);

  return {
    ...state,
    isLoading: stateQuery.isLoading,
    socialState,
    currentFocusPrinciple,
    completeOnboarding,
    setDailyFocus,
    completeMission,
    isTierUnlocked,
  };
});
