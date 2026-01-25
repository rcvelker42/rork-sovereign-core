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
    id: 'core-confidence',
    name: 'Core Confidence',
    tier: 1,
    icon: 'Heart',
    doctrine: 'Most people have "Situational Confidence." You feel good because you have money in the bank, your hair looks good, or people are laughing at your jokes. But what happens when the money is gone or you\'re the most awkward person in the room? Your confidence evaporates.\n\nCore Confidence is the "Source." It is the irrational belief that you are enough, simply because you exist. It is not based on what you do, but on who you are. It is the realization that your value is a constant, not a variable.',
    mission: {
      title: 'The Mirror Affirmation',
      description: 'Stand in front of a mirror for 3 minutes. Look yourself in the eyes—no music, no phone. Repeat: "My value is not up for debate." Notice the voices in your head that try to argue. Do not fight them; just observe them and return to the statement.',
      xpReward: 25,
    },
  },
  {
    id: 'death-of-ego',
    name: 'The Death of the Ego',
    tier: 1,
    icon: 'Skull',
    doctrine: 'Your "Ego" is the mental bodyguard that is actually a prison guard. It tries to protect you from "looking stupid" or "getting rejected." But in the social world, the man who is willing to look stupid is the only one who is truly free.\n\nTo find your power, you must "kill" the version of you that cares about its own image. When you stop protecting your ego, you become "outcome independent" by default.',
    mission: {
      title: 'The Public Humiliation Drill',
      description: 'Go to a crowded area (a mall or a busy street). Lie down on the ground for exactly 30 seconds. Do nothing. Don\'t check your phone. Just feel the "Social Pressure" and the judgment of others. Realize that after 30 seconds, you are still alive, the world hasn\'t ended, and your ego\'s "protection" was a lie.',
      xpReward: 35,
    },
  },
  {
    id: 'outcome-independence',
    name: 'Outcome Independence',
    tier: 1,
    icon: 'Scale',
    doctrine: 'The "vibe" of a man who needs something is repulsive. If you need a girl to like you, a crowd to cheer for you, or a stranger to be nice to you, you have given them all the power.\n\nOutcome Independence is the ability to walk into any situation and be "OK" regardless of what happens. You aren\'t "trying" to get a result; you are simply "offering" your presence. If they take it, great. If they don\'t, it doesn\'t change your internal state.',
    mission: {
      title: 'The Intentional Rejection',
      description: 'Go out and ask 3 people for something you know they will say "no" to (e.g., "Can I have five dollars?" or "Can I have a bite of your sandwich?"). Your goal is to get the "No" and keep a smile on your face. The goal isn\'t the sandwich; the goal is to remain unphased by the "No."',
      xpReward: 30,
    },
  },
  {
    id: 'non-reactivity-foundation',
    name: 'Non-Reactivity',
    tier: 1,
    icon: 'Shield',
    doctrine: 'The world will constantly "test" your reality. Someone might insult you, a girl might give you a cold look, or a situation might go wrong. A "Reactive" man snaps, gets angry, or tries to explain himself. He is a leaf in the wind.\n\nA Non-Reactive man is the "Unshakable Rock." You acknowledge the external stimulus, but you do not let it penetrate your internal world. You choose your response rather than having a knee-jerk reaction.',
    mission: {
      title: 'The Silent Response',
      description: 'The next time someone says something slightly "edgy" or challenging to you, or if you feel a surge of social anxiety, wait 3 full seconds before responding. Do not fidget. Just hold eye contact and breathe. Experience the gap between the stimulus and your response.',
      xpReward: 25,
    },
  },
  {
    id: 'state-transfer',
    name: 'State Transfer',
    tier: 1,
    icon: 'Flame',
    doctrine: 'Humans are biological mirrors. If you are nervous, the person you are talking to will feel nervous. If you are having the time of your life, they will want to join your party. This is State Transfer.\n\nYou don\'t "wait" for the room to get fun to start having fun. You bring the fun. You are the thermostat, not the thermometer. You set the temperature; the room adjusts to you.',
    mission: {
      title: 'The 10% Lift',
      description: 'Enter your next three social interactions (even just a cashier at a grocery store) with 10% more energy and enthusiasm than is "normal." Smile bigger, speak louder, and genuinely ask how they are doing. Watch how their "state" shifts to match yours.',
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
