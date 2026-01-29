import { Principle, getPrincipleById } from './principles';

export interface GymMission {
  id: string;
  principleId: string;
  missionNumber: number; // 2, 3, 4, etc.
  title: string;
  description: string;
  xpReward: number;
}

// Gym mission content for Mission 2 of each principle
const gymMission2Content: Record<string, { title: string; description: string; xpReward: number }> = {
  'core-confidence': {
    title: 'The Naked Truth',
    description: 'Record a 2-minute video of yourself talking about your greatest "failure" or insecurity. Watch it back. Do not judge yourself or try to fix your appearance. Acknowledge that despite this "flaw," your value remains at a constant 10. Delete the video once you truly feel that your worth is independent of the content you shared.',
    xpReward: 30,
  },
  'death-of-ego': {
    title: 'The Village Idiot',
    description: 'Go to a store and ask a clerk a question that makes you look completely incompetent (e.g., "Which aisle has the \'milk water\'?" or "Do you sell left-handed batteries?"). When they look at you like you\'re crazy, hold their gaze and smile warmly. Do not explain the joke. Let your "cool" identity die in their eyes.',
    xpReward: 40,
  },
  'outcome-independence': {
    title: 'The Flip of the Coin',
    description: 'Before an interaction, decide that the result is already determined by a "coin flip" in the universe. Your only job is to provide the energy. If you get rejected, tell yourself, "The coin landed on tails," and move to the next person with zero change in your state.',
    xpReward: 35,
  },
  'non-reactivity-foundation': {
    title: 'The Heckler\'s Banquet',
    description: 'Ask a trusted, blunt friend to "roast" you for 60 seconds straight. Your only rule: You cannot speak, you cannot break eye contact, and you cannot defend yourself. Maintain a relaxed, slightly amused "Sovereign" smirk. Observe the insults bouncing off your shield.',
    xpReward: 30,
  },
  'state-transfer': {
    title: 'The Silent Cheerleader',
    description: 'Walk through a crowded area and mentally "send" every person you see a high-energy blessing (e.g., "I hope you have the best day of your life"). You aren\'t saying it out loud, but let the feeling of that genuine warmth radiate through your facial expressions and walk. Observe how strangers react to your "unspoken" vibe.',
    xpReward: 35,
  },
  'social-pressure': {
    title: 'The Center of the Universe',
    description: 'Go to a public square or a busy park, stand in the center, and slowly do a full 360-degree turn over the course of one minute. Move with the grace of royalty surveying their lands. Feel every eye on you. Do not check your phone or rush the movement. Own the space.',
    xpReward: 40,
  },
  'value-projection': {
    title: 'The Party Starter',
    description: 'Enter a social environment (a bar, a cafe, or a party) and be the first person to talk to someone. Do not wait for someone to look "open." Walk in and immediately "gift" a comment to the nearest person about the music, the decor, or the vibe. You are the one producing the social energy for the room.',
    xpReward: 35,
  },
  'law-of-least-effort': {
    title: 'The Statue of Liberty',
    description: 'Engage in a conversation while keeping your hands behind your back or at your sides perfectly still. You are forbidden from using hand gestures to emphasize points. You must use only your voice (tonality) and your eyes to hold their attention.',
    xpReward: 30,
  },
  'assumed-familiarity': {
    title: 'The Nickname Gambit',
    description: 'Give a stranger a playful, non-offensive nickname within the first 30 seconds of a conversation (e.g., calling a barista "Boss," a serious person "Professor," or a stylish person "The Secret Agent"). Use it as if you\'ve been calling them that for years.',
    xpReward: 35,
  },
  'polarization': {
    title: 'The Honest Filter',
    description: 'In a conversation today, purposefully disagree with someone\'s minor opinion (e.g., their taste in movies or music). Instead of saying "I see your point," say "I completely disagree, that movie was a disaster." See who respects your honesty and who gets defensive.',
    xpReward: 35,
  },
  'social-intuition': {
    title: 'The Mirroring Shadow',
    description: 'In your next conversation, subtly match the other person\'s breathing pattern and physical lean. If they speak fast, match their tempo for 30 seconds, then purposefully slow down your own speech and see if they follow your lead. This is the "Pulse" check of calibration.',
    xpReward: 40,
  },
  'vibe-vs-words': {
    title: 'The Foreigner',
    description: 'Go to a place where you are a total outsider (different neighborhood, different hobby group). Talk to people using only basic, simple language, but maintain a "world-class" high-value vibe. Prove that your energy makes you "belong" more than having the right "inside" knowledge.',
    xpReward: 40,
  },
  'relentless-persistence': {
    title: 'The Third Re-Hook',
    description: 'When someone gives you a "soft" dismissal (e.g., "I\'m just talking to my friends"), acknowledge it, change the subject to something completely unrelated and fun, and stay for 60 more seconds. Do this three times. Only leave once you have successfully "re-hooked" their interest at least once.',
    xpReward: 45,
  },
  'identity-shifting': {
    title: 'The Wardrobe Transition',
    description: 'Go to a high-end clothing store and try on the most expensive "Sovereign" outfit they have. Walk around the store for 15 minutes wearing it. Talk to the staff as if you already own the suit and are simply checking the fit. Feel the shift in how the world treats the "New Identity."',
    xpReward: 50,
  },
  'presence-mastery': {
    title: 'The Eye of the Storm',
    description: 'During a chaotic or loud social moment, consciously drop your "internal volume" to zero. Observe the lights, the sounds, and the movement as if it were a movie playing just for you. Realize that you are the only still point in a moving world.',
    xpReward: 55,
  },
};

// Gym mission content for Mission 3 of each principle
const gymMission3Content: Record<string, { title: string; description: string; xpReward: number }> = {
  'core-confidence': {
    title: 'The Sovereign Silhouette',
    description: 'Go to a public place and dress in the most "average" or even slightly "under-dressed" clothing you own (e.g., plain sweats or an old t-shirt). Your goal is to hold a Level 10 "Sovereign" state while looking like a Level 1. Realize that your power comes from your eyes and your presence, not your threads.',
    xpReward: 35,
  },
  'death-of-ego': {
    title: 'The Wrong Way Street',
    description: 'Walk through a crowded sidewalk or a mall. Instead of weaving through the crowd or looking at your phone, walk in a perfectly straight line at a deliberate, slow pace. When you reach someone, do not "flinch" or look away; simply stop, smile, and wait for the "Social Pressure" to move them around you.',
    xpReward: 45,
  },
  'outcome-independence': {
    title: 'The Ghost Exit',
    description: 'Enter a high-stakes conversation or a very fun group. Just as the interaction reaches its peak—when everyone is laughing and the energy is highest—simply turn and walk away without saying goodbye. Prove to your ego that you don\'t need to "consume" the ending of a win to feel like a winner.',
    xpReward: 40,
  },
  'non-reactivity-foundation': {
    title: 'The Interrupter\'s Zen',
    description: 'In your next conversation, wait for the other person to interrupt you or talk over you. Instead of fighting for the floor or getting annoyed, immediately stop talking, maintain a warm and relaxed gaze, and listen. Show zero physical "spike" in irritation. Own the fact that your words don\'t need to be heard to be valuable.',
    xpReward: 35,
  },
  'state-transfer': {
    title: 'The Emotional Anchor',
    description: 'Find a friend or coworker who is in a visibly "low" or "stressed" state. Without saying "cheer up" or mentioning their mood, sit near them and hold a massive, silent "Peaceful/Powerful" state. Do not let their "gravity" pull you down; instead, watch how their breathing and tone slowly begin to sync with yours over 5 minutes.',
    xpReward: 40,
  },
  'social-pressure': {
    title: 'The Public Orator',
    description: 'In a quiet but populated place (like a library, a quiet cafe, or an elevator), speak to a friend (or on your phone) at a volume that is 20% louder than "socially acceptable." Feel the "weight" of the room\'s judgment. Do not lower your voice. Become comfortable being the "loudest" reality in the space.',
    xpReward: 45,
  },
  'value-projection': {
    title: 'The Director\'s Cut',
    description: 'In a group setting, take the lead on a minor decision (e.g., "Let\'s move to that table over there" or "Everyone, let\'s take a photo"). Don\'t ask for permission; state it as a given. You are providing the "Value" of leadership and direction, relieving the group of the "work" of deciding.',
    xpReward: 40,
  },
  'law-of-least-effort': {
    title: 'The One-Word Power',
    description: 'For one entire conversation today, respond to questions using the absolute minimum amount of words possible while maintaining a high, playful vibe. Use your face, your smirks, and your energy to communicate the rest. Prove that you don\'t need to "work" with words to be the most engaging person there.',
    xpReward: 35,
  },
  'assumed-familiarity': {
    title: 'The \'Old Story\' Re-Hash',
    description: 'Approach a stranger and say, "I was just telling someone about that time we [Generic fun activity like \'went cliff jumping\' or \'almost burned down the kitchen\'], and it reminded me of you."When they say they weren\'t there, laugh and say, "I know, but you have exactly the energy of someone who would have been leading the charge."',
    xpReward: 40,
  },
  'polarization': {
    title: 'The Boundary Builder',
    description: 'The next time someone makes a joke at your expense that you genuinely don\'t find funny, or pushes a boundary, do not laugh politely. Look them in the eye with a neutral expression and say, "That\'s an interesting choice of joke. Why\'d you go with that one?" Let the polarization happen. Filter for those who respect your frame.',
    xpReward: 40,
  },
  'social-intuition': {
    title: 'The Subtext Echo',
    description: 'In a conversation, instead of responding to what the person said, respond to the emotion behind it. If they tell a story about work, say: "It sounds like you\'re actually really proud of how you handled that," or "You seem like you\'re ready for a total change of scenery." Watch their eyes light up when they realize you are "reading" them.',
    xpReward: 45,
  },
  'vibe-vs-words': {
    title: 'The Mirror Smirk',
    description: 'Engage in a 3-minute interaction where you purposefully use "boring" logic (e.g., talking about your commute), but your eyes and smirk are saying something completely different—something suggestive, mischievous, or intensely confident. Notice how they respond to your "vibe" while ignoring your boring words.',
    xpReward: 45,
  },
  'relentless-persistence': {
    title: 'The State Savior',
    description: 'Enter a "dead" or awkward social situation and stay until you have successfully turned the energy around. You are not allowed to leave while the vibe is low. Use every tool (State Transfer, Polarization, Assumed Familiarity) until the "Rock" of the room\'s boredom breaks against your "Water."',
    xpReward: 50,
  },
  'identity-shifting': {
    title: 'The Sovereign\'s Silence',
    description: 'Spend one hour in a social setting where you do not speak a single word. You must communicate your high value, your friendliness, and your "Sovereignty" using only your presence, your walk, and your eye contact. Realize that the "Identity" exists even in total silence.',
    xpReward: 55,
  },
  'presence-mastery': {
    title: 'The Micro-Detail Hunt',
    description: 'During a conversation, pick one tiny physical detail of the other person (e.g., the way their pupils dilate, the rhythm of their blinking, or a specific freckle). Focus on it so intensely that the rest of the world blurs out. This "Hyper-Presence" creates a hypnotic effect on the other person.',
    xpReward: 60,
  },
};

// Gym mission content for Mission 4 of each principle
const gymMission4Content: Record<string, { title: string; description: string; xpReward: number }> = {
  'core-confidence': {
    title: 'The Sovereign Pauper',
    description: 'Intentionally dress in your least impressive, most "outdated" clothes. Go to the most expensive, high-status hotel lobby or lounge in your city. Sit there for one hour. Do not buy a drink. Do not look at your phone. Just "be" there. If staff asks if you need help, smile and say, "I\'m just enjoying the architecture, thank you." Hold your value at a 10 while the environment suggests you are a 0.',
    xpReward: 40,
  },
  'death-of-ego': {
    title: 'The Public Failure',
    description: 'Go to a crowded area and try to "busk" or perform a skill you are admittedly terrible at (singing, juggling, telling bad jokes). Do this for 10 minutes. When people laugh at you or look away in secondhand embarrassment, lean into it. Smile. This is the final incineration of your "cool" identity.',
    xpReward: 50,
  },
  'outcome-independence': {
    title: 'The Golden Handshake',
    description: 'Engage in a conversation with someone you are incredibly attracted to or intimidated by. Build the vibe until it is perfect—until they are clearly waiting for you to ask for their number or a date. Then, simply wish them a great night and walk away. Prove to your nervous system that you have the power to walk away from a "win."',
    xpReward: 45,
  },
  'non-reactivity-foundation': {
    title: 'The Statue in the Storm',
    description: 'Enter a high-conflict environment (a heated protest, a rowdy sports bar, or a tense family gathering). Your goal is to be the only person not shouting, complaining, or reacting. If someone confronts you, maintain a "Monastic" level of calm. Observe the frantic energy of others as if it were a distant thunderstorm.',
    xpReward: 40,
  },
  'state-transfer': {
    title: 'The Funeral Director',
    description: 'Find a group or environment that is genuinely "depressed" or low-energy (a waiting room, a quiet bus, a dull office). Without being "loud" or "annoying," use your internal warmth and subtle humor to pull the entire space up to a 7/10. You are not just changing one person; you are changing the "Atmosphere."',
    xpReward: 45,
  },
  'social-pressure': {
    title: 'The Silent Spotlight',
    description: 'In a crowded elevator or a quiet train car, stand facing the back/corner while everyone else faces the door. Do not look at your phone. If someone asks what you\'re doing, look them in the eye and say, "The view is better from here." Sit in that excruciating social pressure until you feel your heart rate return to normal.',
    xpReward: 50,
  },
  'value-projection': {
    title: 'The King\'s Counsel',
    description: 'Approach a group of high-status individuals (people older, wealthier, or more "important" than you). Instead of seeking their approval, offer them a genuine, bold observation about their dynamic or the environment. Treat them as if you are the senior consultant of their reality. Give them the "Value" of your unfiltered perspective.',
    xpReward: 45,
  },
  'law-of-least-effort': {
    title: 'The Mute Charismatic',
    description: 'Go to a social gathering and do not speak for the first 30 minutes. You must interact using only nods, smirks, and eye contact. Your goal is to get someone to come to you and start a conversation. Prove that your "Presence" is louder than your "Pitch."',
    xpReward: 40,
  },
  'assumed-familiarity': {
    title: 'The Long-Lost Friend',
    description: 'Approach a total stranger as if they are your best friend from childhood. Use an "Inside Joke" that doesn\'t exist. "I can\'t believe you\'re still wearing that watch after the incident in 2018." See how long you can maintain the "Familiar" frame before they realize they\'ve never met you.',
    xpReward: 45,
  },
  'polarization': {
    title: 'The Great Divide',
    description: 'In a group discussion, take a stance that is the exact opposite of the group consensus. Do not do it to be a jerk; do it to be "Real." Be the "Villain" of the conversation for 5 minutes. Observe who tries to "fix" you (Low Value) and who is secretly intrigued by your courage to be hated.',
    xpReward: 45,
  },
  'social-intuition': {
    title: 'The Puppet Master',
    description: 'In a group setting, identify the "Power Center" (the person everyone is looking at for approval). Subtly "Transfer your State" to them. Once you have them in your reality, use them to move the entire group to a different location or a different topic. Influence the group through the leader.',
    xpReward: 50,
  },
  'vibe-vs-words': {
    title: 'The Foreign Language',
    description: 'Have a 5-minute conversation with someone who speaks a different language (or pretend to speak one). You must convey a complex emotion—like "mischief" or "deep respect"—using only your vibe, tonality, and presence. If they feel the emotion, you have mastered the carrier wave.',
    xpReward: 50,
  },
  'relentless-persistence': {
    title: 'The 5-Minute Wall',
    description: 'Approach a group that is actively ignoring you or being "cold." Stay in the pocket for 5 minutes. Do not leave. Do not get angry. Use "Self-Entertainment" and "Non-Reactivity" until they are forced to acknowledge your existence. You only win when they finally start asking you questions.',
    xpReward: 55,
  },
  'identity-shifting': {
    title: 'The Total Pivot',
    description: 'Spend a day in a neighboring city where you are a completely different "Character." Change your name, your backstory, and your profession. Live in that skin for 8 hours. If you slip back into "yourself," the mission fails. Realize that "You" are just a set of practiced behaviors.',
    xpReward: 60,
  },
  'presence-mastery': {
    title: 'The Void in the Chaos',
    description: 'Go to the loudest, most chaotic nightclub or festival you can find. Go to the center of the dance floor. Stand perfectly still for 10 minutes. Close your eyes (or keep them softly focused). Do not move. Become the "Empty Space" that the chaos flows around. This is the peak of Sovereignty.',
    xpReward: 65,
  },
};

// Placeholder gym missions for Mission 3 and 4 - content will be added later
// For now, we'll generate missions for each principle
export const getGymMissionsForPrinciple = (principleId: string): GymMission[] => {
  const principle = getPrincipleById(principleId);
  const principleName = principle?.name || 'Principle';
  const mission2Content = gymMission2Content[principleId] || {
    title: `${principleName} Mission 2`,
    description: '',
    xpReward: 0,
  };
  
  const mission3Content = gymMission3Content[principleId] || {
    title: `${principleName} Mission 3`,
    description: '',
    xpReward: 0,
  };
  const mission4Content = gymMission4Content[principleId] || {
    title: `${principleName} Mission 4`,
    description: '',
    xpReward: 0,
  };
  
  return [
    {
      id: `${principleId}-gym-2`,
      principleId,
      missionNumber: 2,
      title: mission2Content.title,
      description: mission2Content.description,
      xpReward: mission2Content.xpReward,
    },
    {
      id: `${principleId}-gym-3`,
      principleId,
      missionNumber: 3,
      title: mission3Content.title,
      description: mission3Content.description,
      xpReward: mission3Content.xpReward,
    },
    {
      id: `${principleId}-gym-4`,
      principleId,
      missionNumber: 4,
      title: mission4Content.title,
      description: mission4Content.description,
      xpReward: mission4Content.xpReward,
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
