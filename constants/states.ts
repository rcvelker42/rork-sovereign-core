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
  { level: 6, name: 'The Grounded', description: 'Stable in core confidence' },
  { level: 7, name: 'The Natural', description: 'Effortless in social flow' },
  { level: 8, name: 'The Magnetic', description: 'Drawing others through presence' },
  { level: 9, name: 'The Unshakeable', description: 'Non-reactive to all tests' },
  { level: 10, name: 'The Source', description: 'The origin of the vibe' },
  { level: 11, name: 'The Integrated', description: 'Principles becoming automatic' },
  { level: 12, name: 'The Master', description: 'Social intuition refined' },
  { level: 13, name: 'The Sovereign', description: 'Complete internal mastery' },
  { level: 14, name: 'The Transcendent', description: 'Beyond the social game' },
  { level: 15, name: 'The Absolute', description: 'Perfect presence in all moments' },
];

export const getStateByLevel = (level: number): SocialState => {
  const clampedLevel = Math.min(Math.max(level, 1), 15);
  return SOCIAL_STATES[clampedLevel - 1];
};

export const getStateByXP = (xp: number): SocialState => {
  if (xp < 60) return SOCIAL_STATES[0];
  if (xp < 144) return SOCIAL_STATES[1];
  if (xp < 240) return SOCIAL_STATES[2];
  if (xp < 360) return SOCIAL_STATES[3];
  if (xp < 504) return SOCIAL_STATES[4];
  if (xp < 672) return SOCIAL_STATES[5];
  if (xp < 864) return SOCIAL_STATES[6];
  if (xp < 1080) return SOCIAL_STATES[7];
  if (xp < 1320) return SOCIAL_STATES[8];
  if (xp < 1584) return SOCIAL_STATES[9];
  if (xp < 1872) return SOCIAL_STATES[10];
  if (xp < 2184) return SOCIAL_STATES[11];
  if (xp < 2520) return SOCIAL_STATES[12];
  if (xp < 2880) return SOCIAL_STATES[13];
  return SOCIAL_STATES[14];
};
