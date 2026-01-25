export interface SocialState {
  level: number;
  name: string;
  description: string;
}

export const SOCIAL_STATES: SocialState[] = [
  { level: 1, name: 'The Reactive', description: 'Controlled by external stimuli' },
  { level: 2, name: 'The Awakening', description: 'Aware of patterns' },
  { level: 3, name: 'The Student', description: 'Actively learning principles' },
  { level: 4, name: 'The Practitioner', description: 'Applying knowledge consistently' },
  { level: 5, name: 'The Calibrated', description: 'Reading situations accurately' },
  { level: 6, name: 'The Integrated', description: 'Principles becoming automatic' },
  { level: 7, name: 'The Sovereign', description: 'Complete internal mastery' },
];

export const getStateByLevel = (level: number): SocialState => {
  const clampedLevel = Math.min(Math.max(level, 1), 7);
  return SOCIAL_STATES[clampedLevel - 1];
};

export const getStateByXP = (xp: number): SocialState => {
  if (xp < 50) return SOCIAL_STATES[0];
  if (xp < 150) return SOCIAL_STATES[1];
  if (xp < 300) return SOCIAL_STATES[2];
  if (xp < 500) return SOCIAL_STATES[3];
  if (xp < 750) return SOCIAL_STATES[4];
  if (xp < 1000) return SOCIAL_STATES[5];
  return SOCIAL_STATES[6];
};
