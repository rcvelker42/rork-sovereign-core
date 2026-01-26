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
    icon: 'Anchor',
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
    icon: 'Infinity',
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
    icon: 'Radio',
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
    icon: 'Dumbbell',
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
    icon: 'Link',
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
    icon: 'Magnet',
    doctrine: '"Nice guys" try to be liked by everyone, and as a result, they are loved by no one. They are "lukewarm." The goal of the RSD system is to be Polarizing.\n\nWhen you are unapologetically yourself, some people will hate you, but the people who like you will love you. Polarization is the filter that weeds out the people who don\'t vibe with your reality and attracts your "tribe." If you aren\'t occasionally offending the "wrong" people, you aren\'t being real enough.',
    mission: {
      title: 'The Unpopular Opinion',
      description: 'In a group setting, share a genuine opinion you have that you know might be slightly controversial or "edgy" (keep it playful, not political/hateful). Do not apologize for it or back down if someone disagrees. State it, own it, and see who "leans in" to the conversation because of your honesty.',
      xpReward: 45,
    },
  },
  {
    id: 'social-intuition',
    name: 'Social Intuition',
    tier: 3,
    icon: 'Eye',
    doctrine: 'Early on, you learn "technical" skills (eye contact, posture, voice projection). But Mastery is about Social Intuition. This is the ability to read the "sub-text" of a room. You stop listening to what people say and start feeling what they mean.\n\nYou become sensitive to the "ebb and flow" of social energy. You know exactly when to push, when to pull back, and when to let a moment breathe. It\'s like jazz; you know the notes so well that you can finally improvise.',
    mission: {
      title: 'The People-Watching Symphony',
      description: 'Go to a busy park or lounge for 20 minutes without your phone. Watch groups of people. Don\'t listen to their words—watch their body language. Who is the leader? Who is seeking approval? Who is uncomfortable? Try to predict what will happen next (e.g., "That person is about to leave"). Developing this "eye" makes you a master of calibration.',
      xpReward: 50,
    },
  },
  {
    id: 'vibe-vs-words',
    name: 'The Vibe vs. The Words',
    tier: 3,
    icon: 'Waves',
    doctrine: 'A beginner asks, "What do I say next?" A Master knows it doesn\'t matter. 90% of communication is the "Vibe." The Vibe is the sub-perceptual energy you project—your comfort, your humor, and your presence.\n\nIf your vibe is "I am a high-value man having a great time," you can literally talk about the ingredients of a cereal box and people will be mesmerized. When the "Internal State" is perfect, the "External Words" are just background noise to the feeling you\'re giving people.',
    mission: {
      title: 'The Nonsense Conversation',
      description: 'Have a 2-minute conversation with someone where you talk about something completely mundane or even nonsensical (like the history of your socks). Focus 100% on your State Transfer and Eye Contact. If they stay engaged and smile, you\'ve proven that your "Vibe" is doing the heavy lifting, not your "Lines."',
      xpReward: 55,
    },
  },
  {
    id: 'relentless-persistence',
    name: 'Relentless Persistence',
    tier: 3,
    icon: 'Repeat',
    doctrine: 'Mastery isn\'t about never failing; it\'s about being Relentless. In the RSD system, a "rejection" isn\'t a wall—it\'s a data point. The master understands the law of large numbers.\n\nIf you are "Outcome Independent" (Phase 1), then "failing" doesn\'t hurt. It actually becomes fun. You become a scientist of your own life, constantly testing the boundaries of what\'s possible. You don\'t stop until you get what you want, and because you aren\'t "reactive," the world eventually gives in to your persistence.',
    mission: {
      title: 'The 10-Fail Sprint',
      description: 'Go out with the specific goal of getting 10 "No\'s" or rejections in a single day. The catch? You must remain in a "High-Value State" through all 10. By the 5th one, you\'ll realize that the "sting" is gone. By the 10th, you\'ll feel invincible because you realize that "No" has no power over you.',
      xpReward: 60,
    },
  },
  {
    id: 'identity-shifting',
    name: 'Identity Shifting',
    tier: 3,
    icon: 'Crown',
    doctrine: 'Most men are trying to "act" confident. Mastery is about Identity Shifting. You stop being "a guy trying to be cool" and you become "The Man."\n\nThis is the "Self-Transformational" part of the system. You rewrite your internal narrative. You don\'t go to the party; you are the party. You don\'t seek success; success is an inevitable byproduct of who you have become. Your identity is now grounded in your "Core Confidence."',
    mission: {
      title: 'The Alter Ego Night',
      description: 'Go to a place where nobody knows you. For that night, embody the "Future Version" of yourself—the man who has already achieved all his goals. Walk like him, talk like him, and assume everyone already likes him. Notice how much easier it is to "be" that man when you stop carrying your old history with you.',
      xpReward: 65,
    },
  },
  {
    id: 'presence-mastery',
    name: 'Presence: The Ultimate High Value',
    tier: 3,
    icon: 'Focus',
    doctrine: 'The highest-level trait a human can possess is Total Presence. Most people are trapped in the past (regret) or the future (anxiety). A Master is 100% in the Now.\n\nWhen you are fully present, you are magnetic. You aren\'t "in your head" thinking of the next line; you are "in the body" experiencing the moment. Presence is the ultimate form of "Non-Reactivity" and "Outcome Independence." It is the peak of the pyramid.',
    mission: {
      title: 'The 5-Minute Presence Anchor',
      description: 'Before entering any social situation, stop and close your eyes. Feel the weight of your feet on the ground. Listen to the furthest sound you can hear. Feel the air on your skin. Anchor yourself in the now. Open your eyes and walk in with that same level of awareness. Stay in that "Now" throughout the interaction.',
      xpReward: 75,
    },
  },
];

// Sequential order of principles (must complete in this order)
export const PRINCIPLE_ORDER: string[] = [
  'core-confidence',
  'death-of-ego',
  'outcome-independence',
  'non-reactivity-foundation',
  'state-transfer',
  'social-pressure',
  'value-projection',
  'law-of-least-effort',
  'assumed-familiarity',
  'polarization',
  'social-intuition',
  'vibe-vs-words',
  'relentless-persistence',
  'identity-shifting',
  'presence-mastery',
];

export const getPrinciplesByTier = (tier: PrincipleTier): Principle[] => {
  return principles.filter((p) => p.tier === tier);
};

export const getPrincipleById = (id: string): Principle | undefined => {
  return principles.find((p) => p.id === id);
};

export const getPrinciplesInOrder = (): Principle[] => {
  return PRINCIPLE_ORDER.map(id => getPrincipleById(id)).filter((p): p is Principle => p !== undefined);
};

export const getPrincipleOrderIndex = (principleId: string): number => {
  return PRINCIPLE_ORDER.indexOf(principleId);
};

export const getPreviousPrincipleId = (principleId: string): string | null => {
  const index = PRINCIPLE_ORDER.indexOf(principleId);
  if (index <= 0) return null;
  return PRINCIPLE_ORDER[index - 1];
};
