import { Principle, getPrincipleById } from './principles';

export interface GymMission {
  id: string;
  principleId: string;
  missionNumber: number; // 2, 3, 4, etc.
  title: string;
  description: string;
  xpReward: number;
}

// Placeholder gym missions - content will be added later
// For now, we'll generate missions for each principle
export const getGymMissionsForPrinciple = (principleId: string): GymMission[] => {
  const principle = getPrincipleById(principleId);
  const principleName = principle?.name || 'Principle';
  
  return [
    {
      id: `${principleId}-gym-2`,
      principleId,
      missionNumber: 2,
      title: `${principleName} Mission 2`,
      description: '',
      xpReward: 0,
    },
    {
      id: `${principleId}-gym-3`,
      principleId,
      missionNumber: 3,
      title: `${principleName} Mission 3`,
      description: '',
      xpReward: 0,
    },
    {
      id: `${principleId}-gym-4`,
      principleId,
      missionNumber: 4,
      title: `${principleName} Mission 4`,
      description: '',
      xpReward: 0,
    },
  ];
};

export const getAllGymMissions = (principles: Principle[]): GymMission[] => {
  const allMissions: GymMission[] = [];
  principles.forEach(principle => {
    allMissions.push(...getGymMissionsForPrinciple(principle.id));
  });
  return allMissions;
};
