export type PrincipleTier = 1 | 2 | 3;

export interface Principle {
  id: string;
  name: string;
  tier: PrincipleTier;
  icon: string;
  doctrine: string;
  mission: {
    title: string;
    description: string;
    xpReward: number;
  };
}

export const TIER_NAMES: Record<PrincipleTier, string> = {
  1: 'The Foundation',
  2: 'The Bridge',
  3: 'The Mastery',
};

export const TIER_UNLOCK_REQUIREMENTS: Record<PrincipleTier, number> = {
  1: 0,
  2: 5,
  3: 10,
};

export const principles: Principle[] = [
  {
    id: 'outcome-independence',
    name: 'Outcome Independence',
    tier: 1,
    icon: 'Scale',
    doctrine: 'The sovereign does not cling to results. Action is taken for its own sake—because it is aligned with principle, not because it promises reward. When you act without attachment to outcomes, you become immune to disappointment and manipulation. Your power lies in the process, not the prize.',
    mission: {
      title: 'The Detached Action',
      description: 'Initiate one conversation today with zero investment in how it turns out. Observe your internal state before, during, and after. Note the absence of anxiety when outcome becomes irrelevant.',
      xpReward: 25,
    },
  },
  {
    id: 'frame-control',
    name: 'Frame Control',
    tier: 1,
    icon: 'Frame',
    doctrine: 'Reality is negotiated. Every interaction is a subtle contest of perspectives. The one who sets the frame—defines the meaning, the rules, the emotional tone—controls the interaction. Never accept another\'s frame unconsciously. Learn to impose your own.',
    mission: {
      title: 'The Reframe',
      description: 'When someone makes a negative comment or tests you today, do not react within their frame. Instead, redefine the interaction on your terms. A complaint becomes an opportunity. An insult becomes irrelevant.',
      xpReward: 30,
    },
  },
  {
    id: 'presence',
    name: 'Unwavering Presence',
    tier: 1,
    icon: 'Eye',
    doctrine: 'Most exist in a perpetual state of mental noise—rehearsing the past, anxious about the future. The sovereign occupies this moment fully. Presence is not passive stillness; it is active, alert awareness. It commands attention because it is rare.',
    mission: {
      title: 'The Anchor',
      description: 'Spend 10 minutes in complete stillness. No phone. No music. Just you and your breath. Then carry that stillness into your next interaction. Notice how people respond to someone who is truly here.',
      xpReward: 20,
    },
  },
  {
    id: 'emotional-regulation',
    name: 'Emotional Regulation',
    tier: 1,
    icon: 'Waves',
    doctrine: 'Emotions are data, not directives. The reactive individual is ruled by every feeling that arises. The sovereign observes emotions, extracts their information, and chooses response deliberately. This is not suppression—it is mastery.',
    mission: {
      title: 'The Observer',
      description: 'The next time you feel a strong emotion (anger, anxiety, desire), pause. Name it. Locate it in your body. Watch it without acting for 60 seconds. Then decide what action, if any, serves you.',
      xpReward: 25,
    },
  },
  {
    id: 'strategic-silence',
    name: 'Strategic Silence',
    tier: 2,
    icon: 'VolumeX',
    doctrine: 'Words are expenditure. Each one diminishes mystery and commits you to a position. Silence, wielded correctly, creates space for others to reveal themselves, builds intrigue, and demonstrates security. The one who speaks least often controls most.',
    mission: {
      title: 'The Vacuum',
      description: 'In your next meaningful conversation, speak 50% less than usual. Use pauses. Let silences hang. Observe how others rush to fill the void and what they reveal in doing so.',
      xpReward: 35,
    },
  },
  {
    id: 'social-calibration',
    name: 'Social Calibration',
    tier: 2,
    icon: 'Radar',
    doctrine: 'Every room has a temperature, every group a hidden hierarchy, every individual a unique language. The calibrated sovereign reads these subtleties instantly and adapts without losing core identity. This is not people-pleasing—it is strategic awareness.',
    mission: {
      title: 'The Read',
      description: 'Enter a social situation and spend the first 5 minutes observing only. Who holds status? What are the group dynamics? Who seeks approval? Then calibrate your entry point based on your observations.',
      xpReward: 35,
    },
  },
  {
    id: 'abundance-mentality',
    name: 'Abundance Mentality',
    tier: 2,
    icon: 'Infinity',
    doctrine: 'Scarcity creates desperation. When you believe there is only one opportunity, one person, one path—you grasp, you over-invest, you repel. Abundance is a mindset that attracts because it does not need. There is always more.',
    mission: {
      title: 'The Expansion',
      description: 'Identify one area where you feel scarcity (career, relationships, resources). List 10 alternatives you have never considered. The act of listing expands perceived options and dissolves desperation.',
      xpReward: 30,
    },
  },
  {
    id: 'polarity',
    name: 'Polarity & Edge',
    tier: 2,
    icon: 'Zap',
    doctrine: 'Neutrality is forgettable. The sovereign understands that strong presence requires contrast—the ability to be gentle and fierce, playful and serious, warm and challenging. This range creates magnetic unpredictability.',
    mission: {
      title: 'The Contrast',
      description: 'In one interaction today, deliberately shift between two opposite energies. Be warm, then withdraw slightly. Be serious, then unexpectedly playful. Observe the effect of range on engagement.',
      xpReward: 40,
    },
  },
  {
    id: 'non-reactivity',
    name: 'Non-Reactivity',
    tier: 3,
    icon: 'Shield',
    doctrine: 'The reactive individual is a puppet—their strings pulled by every provocation, every slight, every emotional trigger. The sovereign has cut these strings. Nothing external can compel an internal response without permission. This is ultimate freedom.',
    mission: {
      title: 'The Unshakeable',
      description: 'Seek out or wait for a situation designed to provoke you. It will come. When it does, feel the internal surge and let it pass through without external expression. Your face remains still. Your voice unchanged. You have won.',
      xpReward: 50,
    },
  },
  {
    id: 'value-embodiment',
    name: 'Value Embodiment',
    tier: 3,
    icon: 'Crown',
    doctrine: 'You do not demonstrate value—you are value. This is not arrogance; it is alignment. When your actions, words, and presence all flow from genuine self-worth, persuasion becomes unnecessary. People sense authenticity and are drawn to it.',
    mission: {
      title: 'The Embodiment',
      description: 'Move through your day as if you have nothing to prove to anyone. Not from apathy, but from deep security. Notice how removing the need for validation changes your posture, your tone, your choices.',
      xpReward: 50,
    },
  },
  {
    id: 'reality-creation',
    name: 'Reality Creation',
    tier: 3,
    icon: 'Sparkles',
    doctrine: 'The ultimate sovereign does not merely navigate reality—they shape it. Through consistent action aligned with vision, through the gravity of presence, through the accumulation of small victories, a new world emerges. This is not magic—it is applied will.',
    mission: {
      title: 'The Architect',
      description: 'Define one aspect of your life you wish to transform. Write a single sentence describing it as already true. Carry this sentence with you. Act today as if it were already reality. Begin the construction.',
      xpReward: 60,
    },
  },
  {
    id: 'sovereign-identity',
    name: 'Sovereign Identity',
    tier: 3,
    icon: 'Compass',
    doctrine: 'At the apex, there are no more techniques—only being. The sovereign has internalized every principle until they are no longer strategies but identity. You do not practice presence; you are presence. You do not control frame; you are the frame.',
    mission: {
      title: 'The Integration',
      description: 'Reflect on your journey. Which principles have become automatic? Which still require effort? Identify the gap between who you perform and who you are becoming. Close it.',
      xpReward: 75,
    },
  },
];

export const getPrinciplesByTier = (tier: PrincipleTier): Principle[] => {
  return principles.filter((p) => p.tier === tier);
};

export const getPrincipleById = (id: string): Principle | undefined => {
  return principles.find((p) => p.id === id);
};
