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
    id: 'social-pressure',
    name: 'Social Pressure is a Tool',
    tier: 2,
    icon: 'Gauge',
    doctrine: 'Most men run from social pressure. They feel a "stifling" sensation in their chest when the room goes quiet or when they stand out. The Master does the opposite: he leans into it.\n\nSocial pressure is like a physical weight in a gym. If you hide from it, you stay weak. If you embrace it, you develop a "heavy" presence that commands respect. When you can sit comfortably in high-pressure moments (like a long pause in conversation), you prove that your reality is stronger than the collective anxiety of the room.',
    mission: {
      title: 'The Intentional Pause',
      description: 'In your next conversation, after the other person finishes a sentence, wait 3-5 seconds before responding. Do not look away. Maintain a relaxed, slight smile. Feel the "pressure" build in the silence. Do not break it until the other person either speaks again or the time is up. Own the silence.',
      xpReward: 35,
    },
  },
  {
    id: 'value-projection',
    name: 'Value Projection',
    tier: 2,
    icon: 'Sun',
    doctrine: 'Social dynamics is an exchange of "Value." Value isn\'t just money or looks; it\'s Energy, Emotion, and Reality. Most men approach others as "Value Seekers"—they want a laugh, a phone number, or approval.\n\nA "Value Provider" walks into a room and gives. He gives good vibes, he gives presence, he gives a "release" from the boredom of everyday life. When you project value without needing anything back, people are naturally drawn to you like a moth to a flame.',
    mission: {
      title: 'The Compliment Machine',
      description: 'Give three genuine compliments to three different strangers today. The catch: you must keep walking immediately after delivering the compliment. Do not wait for a "thank you" or a conversation. Give the value, and keep your "outcome independence" by moving on.',
      xpReward: 35,
    },
  },
  {
    id: 'law-of-least-effort',
    name: 'The Law of Least Effort',
    tier: 2,
    icon: 'Feather',
    doctrine: 'In any interaction, the person who is the most "invested"—moving the most, talking the fastest, trying the hardest—has the least amount of power. This isn\'t about being lazy; it\'s about being Calibrated.\n\nThe "Master" projects maximum impact with minimum "trying." Think of the coolest person you know; they don\'t fidget, they don\'t over-explain, and they don\'t "perform." They are simply there. When you stop over-exerting, you signal that you are comfortable in your own skin.',
    mission: {
      title: 'The Stillness Challenge',
      description: 'For one entire hour in a social setting (a coffee shop, a party, or a meeting), consciously eliminate all "low-value" movements. No leg bouncing, no face touching, no rapid blinking, and no "filler" words (um, uh, like). Move like you are underwater—slow, deliberate, and powerful.',
      xpReward: 40,
    },
  },
  {
    id: 'assumed-familiarity',
    name: 'Assumed Familiarity',
    tier: 2,
    icon: 'Users',
    doctrine: 'Most men treat strangers with a "formal" barrier. They use polite, stiff language that screams "I don\'t know you." This creates distance and awkwardness.\n\nAssumed Familiarity is the "vibe" that you\'ve known this person for ten years. You skip the "interview" questions (What\'s your name? What do you do?) and jump straight into the middle of a "brother/sister" or "old friend" dynamic. This breaks through social masks instantly and creates an immediate bond.',
    mission: {
      title: 'The Mid-Conversation Jump',
      description: 'Approach someone and start a conversation as if you are continuing a joke you started five minutes ago. Skip the "Hi, how are you?" and go straight to: "You wouldn\'t believe what just happened..." or "I was just thinking about [Topic] and you look like someone who would have an opinion on this."',
      xpReward: 40,
    },
  },
  {
    id: 'polarization',
    name: 'Polarization',
    tier: 2,
    icon: 'Zap',
    doctrine: '"Nice guys" try to be liked by everyone, and as a result, they are loved by no one. They are "lukewarm." The goal of the RSD system is to be Polarizing.\n\nWhen you are unapologetically yourself, some people will hate you, but the people who like you will love you. Polarization is the filter that weeds out the people who don\'t vibe with your reality and attracts your "tribe." If you aren\'t occasionally offending the "wrong" people, you aren\'t being real enough.',
    mission: {
      title: 'The Unpopular Opinion',
      description: 'In a group setting, share a genuine opinion you have that you know might be slightly controversial or "edgy" (keep it playful, not political/hateful). Do not apologize for it or back down if someone disagrees. State it, own it, and see who "leans in" to the conversation because of your honesty.',
      xpReward: 45,
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
