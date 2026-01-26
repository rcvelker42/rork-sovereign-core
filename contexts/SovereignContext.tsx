import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { getPrincipleById, Principle, TIER_UNLOCK_REQUIREMENTS, PrincipleTier, getPreviousPrincipleId, PRINCIPLE_ORDER } from '@/constants/principles';
import { getGymMissionsForPrinciple } from '@/constants/gymMissions';
import { getStateByXP, SocialState } from '@/constants/states';

export interface JournalEntry {
  id: string;
  date: string;
  principleId: string;
  principleName: string;
  reflection: string;
  stateValue: number;
  xpEarned: number;
  gymMissionId?: string; // Optional field to track gym mission completions
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
  gymMissionId: string | null;
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
    gymMissionId: null,
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
        
        // Handle presence decay once per day (10 points per day)
        const ONE_DAY_MS = 24 * 60 * 60 * 1000;
        const lastDecay = parsed.lastPresenceDecay ? new Date(parsed.lastPresenceDecay) : new Date(parsed.stats.startDate);
        const timeSinceLastDecay = now.getTime() - lastDecay.getTime();
        
        // Check if a new day has started (compare dates, not just time elapsed)
        const lastDecayDate = new Date(lastDecay.getFullYear(), lastDecay.getMonth(), lastDecay.getDate());
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const daysSinceLastDecay = Math.floor((currentDate.getTime() - lastDecayDate.getTime()) / ONE_DAY_MS);
        
        if (daysSinceLastDecay > 0) {
          const newPresenceScore = Math.max(0, parsed.stats.presenceScore - (daysSinceLastDecay * 10));
          
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
        gymMissionId: null,
        acceptedAt: new Date().toISOString(),
      },
    });
  }, [updateState]);

  const setGymMissionFocus = useCallback((gymMissionId: string, principleId: string) => {
    updateState({
      dailyFocus: {
        principleId: null,
        gymMissionId,
        acceptedAt: new Date().toISOString(),
      },
    });
  }, [updateState]);

  const completeMission = useCallback((principleId: string, reflection: string, stateValue: number, gymMissionId?: string) => {
    const principle = getPrincipleById(principleId);
    if (!principle) return;

    // Get XP from gym mission if provided, otherwise use principle's mission XP
    let xpEarned = principle.mission.xpReward;
    if (gymMissionId) {
      const gymMissions = getGymMissionsForPrinciple(principleId);
      const gymMission = gymMissions.find(m => m.id === gymMissionId);
      if (gymMission && gymMission.xpReward > 0) {
        xpEarned = gymMission.xpReward;
      }
    }
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      principleId,
      principleName: principle.name,
      reflection,
      stateValue,
      xpEarned,
      gymMissionId: gymMissionId || undefined,
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
        gymMissionId: null,
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

  const completedPrincipleIds = useMemo(() => {
    return new Set(state.journalEntries
      .filter(entry => !entry.gymMissionId) // Only count non-gym missions
      .map(entry => entry.principleId));
  }, [state.journalEntries]);

  const completedGymMissionIds = useMemo(() => {
    return new Set(state.journalEntries
      .filter(entry => entry.gymMissionId)
      .map(entry => entry.gymMissionId!)
      .filter((id): id is string => id !== undefined));
  }, [state.journalEntries]);

  const isPrincipleCompleted = useCallback((principleId: string): boolean => {
    return completedPrincipleIds.has(principleId);
  }, [completedPrincipleIds]);

  const isGymMissionCompleted = useCallback((gymMissionId: string): boolean => {
    return completedGymMissionIds.has(gymMissionId);
  }, [completedGymMissionIds]);

  const isGymMissionUnlocked = useCallback((gymMissionId: string, principleId: string): boolean => {
    const gymMissions = getGymMissionsForPrinciple(principleId);
    const mission = gymMissions.find(m => m.id === gymMissionId);
    if (!mission) return false;

    // Mission 2 requires the principle to be completed (Mission 1)
    if (mission.missionNumber === 2) {
      return isPrincipleCompleted(principleId);
    }

    // Mission 3 requires Mission 2 to be completed
    if (mission.missionNumber === 3) {
      const mission2 = gymMissions.find(m => m.missionNumber === 2);
      if (!mission2) return false;
      return isGymMissionCompleted(mission2.id);
    }

    // Mission 4 requires Mission 3 to be completed
    if (mission.missionNumber === 4) {
      const mission3 = gymMissions.find(m => m.missionNumber === 3);
      if (!mission3) return false;
      return isGymMissionCompleted(mission3.id);
    }

    return false;
  }, [isPrincipleCompleted, isGymMissionCompleted]);

  const isPrincipleUnlocked = useCallback((principleId: string): boolean => {
    const previousId = getPreviousPrincipleId(principleId);
    if (previousId === null) {
      // First principle is always unlocked
      return true;
    }
    // Previous principle must be completed
    return isPrincipleCompleted(previousId);
  }, [isPrincipleCompleted]);

  const getNextUnlockedPrincipleId = useCallback((): string | null => {
    for (const principleId of PRINCIPLE_ORDER) {
      if (!isPrincipleCompleted(principleId)) {
        return principleId;
      }
    }
    return null; // All principles completed
  }, [isPrincipleCompleted]);

  const currentFocusPrinciple: Principle | null = useMemo(() => {
    if (state.dailyFocus.principleId) {
      return getPrincipleById(state.dailyFocus.principleId) ?? null;
    }
    if (state.dailyFocus.gymMissionId) {
      // Extract principleId from gymMissionId (format: principleId-gym-2)
      const principleId = state.dailyFocus.gymMissionId.split('-gym-')[0];
      return getPrincipleById(principleId) ?? null;
    }
    return null;
  }, [state.dailyFocus.principleId, state.dailyFocus.gymMissionId]);

  const currentFocusGymMission = useMemo(() => {
    if (!state.dailyFocus.gymMissionId) return null;
    const principleId = state.dailyFocus.gymMissionId.split('-gym-')[0];
    const missions = getGymMissionsForPrinciple(principleId);
    return missions.find(m => m.id === state.dailyFocus.gymMissionId) ?? null;
  }, [state.dailyFocus.gymMissionId]);

  return {
    ...state,
    isLoading: stateQuery.isLoading,
    socialState,
    currentFocusPrinciple,
    currentFocusGymMission,
    completeOnboarding,
    setDailyFocus,
    setGymMissionFocus,
    completeMission,
    isTierUnlocked,
    isPrincipleCompleted,
    isPrincipleUnlocked,
    getNextUnlockedPrincipleId,
    completedPrincipleIds: Array.from(completedPrincipleIds),
    isGymMissionCompleted,
    isGymMissionUnlocked,
    completedGymMissionIds: Array.from(completedGymMissionIds),
  };
});
