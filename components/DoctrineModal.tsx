import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { X, BookOpen } from 'lucide-react-native';
import {
  Anchor,
  Skull,
  Infinity,
  Shield,
  Radio,
  Dumbbell,
  Sun,
  Feather,
  Link,
  Magnet,
  Eye,
  Waves,
  Repeat,
  Crown,
  Focus,
  Scale,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Principle, TIER_NAMES } from '@/constants/principles';

const { height } = Dimensions.get('window');

const iconMap: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Anchor,
  Skull,
  Infinity,
  Shield,
  Radio,
  Dumbbell,
  Sun,
  Feather,
  Link,
  Magnet,
  Eye,
  Waves,
  Repeat,
  Crown,
  Focus,
  Scale,
};

interface DoctrineModalProps {
  visible: boolean;
  principle: Principle | null;
  onClose: () => void;
}

export function DoctrineModal({ visible, principle, onClose }: DoctrineModalProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  if (!principle) return null;

  const IconComponent = iconMap[principle.icon] || Scale;
  const isCoreConfidence = principle.id === 'core-confidence';
  const isDeathOfEgo = principle.id === 'death-of-ego';
  const isOutcomeIndependence = principle.id === 'outcome-independence';
  const isNonReactivity = principle.id === 'non-reactivity-foundation';
  const isStateTransfer = principle.id === 'state-transfer';
  const isSocialPressure = principle.id === 'social-pressure';
  const isValueProjection = principle.id === 'value-projection';
  const isLawOfLeastEffort = principle.id === 'law-of-least-effort';
  const isAssumedFamiliarity = principle.id === 'assumed-familiarity';
  const isPolarization = principle.id === 'polarization';
  const isSocialIntuition = principle.id === 'social-intuition';
  const isVibeVsWords = principle.id === 'vibe-vs-words';
  const isRelentlessPersistence = principle.id === 'relentless-persistence';
  const isIdentityShifting = principle.id === 'identity-shifting';

  // Custom detailed text for Core Confidence
  const coreConfidenceText = `To understand Core Confidence, you have to stop thinking about "feeling good" and start thinking about Biological Reality. Most men walk through life as "Social Chameleons." They scan the environment, detect the "temperature" of the room, and then adjust their internal state to match. If the room is cold, they freeze. If the room is hot, they sweat. Situational Confidence is a survival mechanism; Core Confidence is a leadership mechanism.

The Anatomy of the Social Mirror
Most people operate on a Feedback Loop. They look into the "Social Mirror" (the faces of others, their bank account, their job title) to see if they are "allowed" to feel powerful.
• Situational Confidence is Rational: "I have a $100,000 car, therefore I am high value."
• Core Confidence is Irrational: "I am high value because I decided I am, even if I'm taking the bus."

The "Lease" vs. The "Ownership"
When you rely on the situation, you are leasing your confidence from the environment. The environment is the landlord, and he can evict you at any moment. When you have Core Confidence, you own the land. You can burn the house down and you're still the owner of the dirt.

Scenario 1: The Nightlife "Ghost Town"
Imagine walking into a bar that is completely dead. There are three people there, and they look bored.
• The Situational Man: He walks in, feels the "low energy," and immediately shrinks. He checks his phone, looks for an exit, and feels "awkward" just standing there. His state is a mirror of the room's boredom.
• The Core Man: He walks in and realizes he is the party. He doesn't need a crowd to "give" him permission to have fun. He talks to the bartender with the same intensity he'd use at a sold-out stadium. He is the Source of the energy.
Key Takeaway: The Situational Man waits for the "vibe" to happen. The Core Man is the vibe.

Scenario 2: The Workplace Power Play
You're in a meeting with a high-level executive or a "Alpha" boss who is intentionally trying to intimidate you.
• The Situational Man: He feels his status dropping. He begins to speak faster, his voice gets higher, and he starts "qualifying" himself (listing his credentials to prove he belongs). He is looking for the boss to nod so he can feel "safe."
• The Core Man: He realizes that titles are just social costumes. He stays in "The Flow." He isn't trying to prove he's smart; he's just present. If the boss tries to "alpha" him, he finds it amusing—like a child trying to act tough. He doesn't react because his value isn't on the table for discussion.

Scenario 3: The "High-Value" Interaction
You are talking to a woman who is "conventionally" more attractive than anyone you've ever dated.
• The Situational Man: He is "in his head" calculating his chances. He thinks, "I need to say the perfect thing to keep her interested." Every time she smiles, he feels a rush. Every time she looks away, he feels a "micro-rejection." He is a servant to her attention.
• The Core Man: He assumes Investment Entitlement. He feels that his presence is a gift. He isn't wondering if she likes him; he's wondering if he likes her. He treats her like a normal human being because he doesn't see her beauty as a "status" that makes her superior to him.

How to Cultivate "The Source"
Core Confidence isn't a "thought"—it's a muscle. You build it by intentionally breaking the link between "Results" and "State."

1. The "State First" Rule
Before you enter any room, decide what your state is. Don't wait to see who is there. Blast your favorite music, laugh to yourself, or do a "Power Pose" in the elevator. Enter the room at a 10, and see how long you can hold it even if people give you "weird" looks.

2. Failure as "Data Mining"
To the Situational Man, failure is an identity. "I failed, therefore I am a failure." To the Core Man, failure is just feedback. "That line didn't work. Interesting. Let's try a different angle."

3. Radical Self-Acceptance
You must reach a point where you accept your "flaws" so deeply that they can't be used against you. If you're short, own it. If you're broke, own it. When you stop "hiding" the things that make you feel low-value, the world loses its leverage over your ego.

The Final Philosophy
Core Confidence is the realization that the universe is a playground. Most people are playing a high-stakes game of "Don't Look Stupid." The man with Core Confidence is the only one actually playing the game. He realizes that "Dying" socially isn't real. You can't actually "lose" value because your value was never tied to the scoreboard in the first place.`;

  // Custom detailed text for Death of the Ego
  const deathOfEgoText = `To master Core Confidence, you must first dismantle the machinery that keeps it locked away: The Ego. In the self-transformation framework, the Ego is not "who you are." It is a defensive hallucination—a mental "bodyguard" you built as a child to protect yourself from the pain of social judgment.

The problem? The bodyguard has become a prison guard. To become a "Natural," you don't need to add new skills; you need to subtract the Ego until there is nothing left to "reject."

The Architecture of the Ego: The "Ghost" in the Machine
The Ego is your Identity attachment. It is the voice that says, "I am a guy who is [smart / cool / successful / athletic / a nice guy]." Whenever you are in a social situation, the Ego is busy trying to "defend" that title.
• The Filter: The Ego filters every action through the lens of: "How will this make me look?"
• The Resistance: This creates a "stifling" sensation. You want to talk to that person, but your Ego says, "Wait, if they don't like you, it means you aren't [Cool/Attractive] anymore. Stay safe. Don't risk the title."

The "Death" of the Ego
"Death" in this context means dis-identification. You stop believing that your "image" is "you." When the Ego dies, "Rejection" ceases to exist. Why? Because there is no "self-image" left for the rejection to hit. It's like trying to punch a ghost—your hand just goes through the air.

Real-Life Conversational Examples: Ego vs. Presence
Scenario 1: The "Humble Brag" Trap
You are at a networking event or a party, and someone asks, "So, what do you do?"
• The Ego-Driven Response: You feel the need to impress. You say, "I'm a Senior Lead Developer at a top-tier tech firm, and I'm currently consulting on a massive project." * The Internal State: You are "leaning in." You are seeking validation. If they aren't impressed, your Ego feels "injured."
• The Ego-Less Response: You don't care about the "title." You might say, "I solve puzzles for a living. It's mostly just staring at a screen until I have a breakthrough. What's your 'secret passion' that actually pays the bills?"
    * The Internal State: You are playful. You aren't defending a "Professional" identity. You are The Source of the fun.

Scenario 2: The Social "Bomb"
You tell a joke in a group, and nobody laughs. Complete silence.
• The Ego-Driven Response: Your face gets hot. You try to fix it. "Well, I guess you had to be there..." or you quickly change the subject to something "cool" to recover your status. You have just signaled that the group has power over your emotions.
• The Ego-Less Response: You lean into the awkwardness. You might look around with an exaggerated, confused face and say, "Wow. That was spectacular. I've never seen a joke die that fast in my entire life. Does anyone have a defibrillator, or should we just call the time of death?"
    * The Result: Because you aren't protecting your Ego, you turn a "failure" into a "win." You are Non-Reactive.

The Three Stages of Ego Dissolution
To reach the "Flow State," you must move through these three levels of "Death."

Level 1: Identifying the "Voice"
You start noticing the "narrator" in your head. When you feel social anxiety, you realize it's just the Ego being afraid.
• Action: In the middle of an approach, mentally say, "There goes the Bodyguard again, trying to keep me safe. Thanks, but I've got this."

Level 2: Intentional "Stupidity"
You purposefully do things that "damage" your cool image. You realize that "looking stupid" is actually a superpower because it proves you aren't a slave to your Ego.
• Example: Wearing a ridiculous "power" item (like a bright pink hat) and acting as if it's the most normal thing in the world.

Level 3: The "Void" (Presence)
The voice stops. You are no longer thinking about "The Self." You are just a vessel for the vibe. You are 100% focused on the other person and the environment. This is where True Magnetic Power lives.

The Philosophy of "The Ghost"
If you are "nothing," you can be "anything." The Ego is a static image. "I am a punk rocker," or "I am a businessman." This prevents you from being fluid.
The man who has "killed his Ego" can talk to a billionaire, a homeless person, a supermodel, and a child with the exact same level of comfort. He doesn't have a "status" to lose, so he can enter any reality.

Mastery Insight: The Ego wants to be "Right." The Master wants to be "Real." You cannot be both at the same time.`;

  // Custom detailed text for Outcome Independence
  const outcomeIndependenceText = `Outcome Independence is the "Invisibility Cloak" of the social world. This is the stage where you transition from being a "prowler" to being a "king."
If Core Confidence is your engine and Ego Death is removing the brakes, Outcome Independence (OI) is the fuel that allows you to drive anywhere without worrying about the destination. It is the refusal to let a specific result dictate your emotional state.

The Philosophy of "The Detached Master"
Most men enter a social interaction with a "Goal."
• "I want her to like me."
• "I want to get this job."
• "I want to be the funniest guy in this group."
The moment you have a goal that requires someone else's permission, you have created Neediness. Neediness is a high-frequency "buzz" that people can detect instantly. It makes you stifled, reactive, and manipulative.
Outcome Independence is the radical shift where the "Process" becomes the "Reward." You aren't talking to someone to get something; you are talking to them to express something. You are playing the game for the sake of the game, not the scoreboard.

Real-Life Conversational Examples: The Power of "Detachment"
Scenario 1: The "Direct" Approach
You see someone you find attractive and walk over.
• The Outcome-Dependent Man: He is terrified. He thinks, "If she says 'no,' I've failed." He approaches tentatively.
    * The Interaction: * Him: "Hey, I thought you looked nice..." (Watching her face like a hawk for a smile).
        * Her: "Thanks, but I'm actually waiting for someone."
        * Him: (Visible slump in posture) "Oh, okay. Sorry to bother you."
    * The Reality: He let her "No" kill his "State."
• The Outcome-Independent Master: He thinks, "I'm going to go share my energy with her. If she's cool, we'll vibe. If not, I'm still the same man."
    * The Interaction: * Him: "I had to come over because your energy is hilarious. You look like you're plotting a heist."
        * Her: "I'm actually waiting for my boyfriend."
        * Him: (Grinning, totally unphased) "Excellent. Does he know about the heist, or is he the getaway driver? Because you definitely need a getaway driver."
    * The Result: Because he didn't "flee" when the result wasn't perfect, he often breaks through the initial shield. He is "Gaming the Moment," not the "Goal."

The Three Pillars of OI
1. The "Take It or Leave It" Vibe
This is the sub-perceptual message you send in every interaction. It says: "I am offering you a chance to enter my world. If you want in, it's going to be a blast. If you don't, I'm going to keep having a blast without you." This makes you the Prize.
2. The "Next" Mentality
OI is built on the foundation of Abundance. If you think there is only one girl, one job, or one chance to be cool, you will be outcome-dependent. When you realize the world is an infinite stream of opportunities, a single "No" is as insignificant as a single raincloud in a sunny month.
3. Entertainment Value
The Master is his own primary audience. He tells jokes because he thinks they are funny. He dances because he likes the song. If other people join in, it's just a "bonus."

Scenario 2: The "High-Stakes" Negotiation
You are asking for a raise or pitching a project.
• The Outcome-Dependent Professional: He is rehearsed and stiff. He is "pleading" with his eyes. He needs the "Yes" to pay his rent or feel successful. If the boss says "Maybe," he gets defensive or desperate.
• The Outcome-Independent Professional: He knows his value. He presents the data clearly.
    * The Vibe: "Here is what I bring to the table. This is the value. If you want it, here is the price. If not, I know three other firms that will jump at this." * The Result: Ironically, this "willingness to walk away" is the most powerful negotiating tool in existence.

OI vs. Apathy (The Critical Distinction)
A common mistake young men make is thinking Outcome Independence means "acting like you don't care" or being "bored." That is Apathy, and it's low-value.

The Mastery Insight: "The Poker Game"
Think of OI like a world-class poker player. He can play a hand perfectly—mathematically and psychologically—and still lose the pot because of a bad river card.
• The Outcome-Dependent player gets "tilted" (angry and emotional) because he lost the money.
• The Outcome-Independent player smiles because he played the hand correctly. He knows that if he keeps playing correctly, he will win in the long run.
Sovereign Thought: "I am the captain of my effort, but I am merely a spectator of the result."`;

  // Custom detailed text for Non-Reactivity
  const nonReactivityText = `Non-Reactivity is the "Iron Shield" of the self-transformation system. If Phase 1 was building the engine and Phase 3 was detaching from the destination, Phase 4 is about becoming The Unshakable Rock while the storm of reality rages around you.
The world is constantly "testing" you. People, environments, and even your own mind will try to pull you out of your "Core" and into a state of "Reaction." The man who reacts is the man who is controlled. The man who remains non-reactive is the man who leads.

The Philosophy of the "Unshakable Rock"
Most men are "Reactive." They are like a billiard ball—when something hits them, they move in the direction they were pushed.
• If someone insults them, they get angry (Reaction).
• If a girl is cold to them, they get stifled (Reaction).
• If a situation gets chaotic, they get frantic (Reaction).
Non-Reactivity is not about being a robot or being "numb." It is about having a buffer zone between a stimulus and your response. It is the ability to perceive a "threat" or a "test" and choose to remain in your own reality.

Real-Life Conversational Examples: Passing the "Shit Test"
In social dynamics, people (especially high-value women and competitive men) will "test" your reality to see if it's real or just a mask. We call these "Shit Tests."

Scenario 1: The "Status" Test
You are talking to a girl, and she says something designed to knock you off balance, like: "You're kind of a dork, aren't you?"
• The Reactive Response: He tries to defend himself or "qualify" his value.
    * Him: "No, I'm not! I actually have a really cool job and I go to the gym..."
    * The Result: He has "reacted" to her frame. He is now beneath her, begging for her to take back the "dork" label.
• The Non-Reactive Master: He doesn't even acknowledge the "insult" as a threat. He absorbs it and stays in his vibe.
    * Him: (Smirking, leaning in) "Total dork. Actually, I'm the king of the dorks. You should see my spreadsheet collection, it's remarkably erotic."
    * The Result: By not being "hurt" or "defensive," he proves his reality is stronger than her words. He is the Source.

Scenario 2: The "Heckler" or Aggressive Male
You're in a group, and another guy tries to "alpha" you by making a joke at your expense: "Nice shirt, man. Did your mom pick that out for you?"
• The Reactive Response: He gets aggressive or awkward.
    * Him: "What's that supposed to mean? Your shirt is ugly too."
    * The Result: He has been pulled into a low-value "dog fight." He looks insecure.
• The Non-Reactive Master: He uses "The Pause." He looks at the guy for a second, lets the silence hang (Social Pressure), and then gives a dry, amused chuckle.
    * Him: "Wow. 1995 called, they want their comeback back. You're doing great, man. Keep it up." (Then he turns back to the original conversation as if the guy is invisible).
    * The Result: He has signaled that the guy's "attack" didn't even register as a threat. He remains Sovereign.

The Three Levels of Non-Reactivity

Level 1: Physical Stillness
The first sign of "Reaction" is fidgeting. When you feel social pressure, your body wants to "leak" that energy by touching your face, shifting your weight, or blinking rapidly.
• The Master's Tool: "The Statue." When tension rises, you become more still. You breathe deeper. You own the space.

Level 2: The 3-Second Gap
Never respond instantly to a challenge. A "Reactive" man snaps back. A "Sovereign" man takes a beat. That 3-second pause proves that you are processing the information, not being triggered by it.

Level 3: Reframing
This is the ultimate mastery. You don't just "ignore" the stimulus; you re-purpose it. If someone is mean to you, you treat it like they are just being "cute" or "feisty." You decide what their behavior means in your reality.

Scenario 3: The "Crisis" at Work
A major project fails, and everyone is panicking in the meeting.
• The Reactive Employee: He starts pointing fingers, talking fast, and sweating. He is "vibrating" at the same frequency as the problem.
• The Non-Reactive Leader: He is the calmest person in the room. He listens to the chaos, waits for the "noise" to die down, and then speaks slowly: "Okay. The data changed. Here is the new path. Let's move."
* The Result: Because he didn't "react" to the panic, the group naturally looks to him for leadership.

Non-Reactivity vs. "Being a Doormat"
A common misconception is that Non-Reactivity means letting people walk all over you. It is the exact opposite.

The Mastery Insight: "The Ocean and the Waves"
Think of yourself as the Ocean. A "reaction" is a wave on the surface. People can throw rocks into the ocean, and it might make a splash, but the depths of the ocean remain cold, dark, and still. The "Situational Man" is a puddle—you step in it, and the whole thing is disturbed. The "Core Man" is the Pacific—he absorbs everything and remains himself.

Sovereign Thought: "You cannot control the storm, but you can control the ship. And if the ship is heavy enough, the storm doesn't even matter."`;

  // Custom detailed text for State Transfer
  const stateTransferText = `State Transfer is the "Infection" principle. In the self-transformation system, this is the point where you move from being a defensive player to an offensive one. If Non-Reactivity is about not letting the world change you, State Transfer is about you changing the world.
This is the biological reality of human interaction: we are social mirrors. Neurons in our brains called "mirror neurons" are designed to pick up on the emotional frequency of those around us. The person with the most certain, grounded state will always win the interaction.

The Philosophy of "The Thermostat"
Most people are Social Thermometers. They walk into a room, measure the temperature (the "vibe"), and then adjust their own state to fit in. If the room is awkward, they become awkward. If the room is professional, they become stiff.
The Master is a Social Thermostat. He sets the temperature. He decides, "I am having a 10/10 time right now," and he holds that state so purely and with such certainty that the people around him have no choice but to adjust to him.

Real-Life Conversational Examples: Leading the Vibe
Scenario 1: The "Cold" Group at a Party
You walk into a kitchen where three people are standing around in silence, looking at their phones. The "vibe" is a 2/10.
• The Situational Man: He feels the awkwardness and "catches" it. He walks in quietly, gets a drink, and says in a low, hesitant voice: "Hey guys... busy night, huh?" He has just reflected their 2/10 state.
• The State Transfer Master: He walks in with a 9/10 energy. He's already smiling because he was just laughing at a thought in his head.
    * Him: (Big energy, warm smile) "Okay, stop. This kitchen is way too serious for a Friday. Who's the leader of this secret meeting? I need to know who to talk to about the music."
    * The Result: Because his energy is higher and more certain than their boredom, they "wake up." They start to smile. He has transferred his "fun" state into them.

Scenario 2: The "High-Pressure" Sales or Date
You are asking for a commitment, whether it's a "yes" on a contract or a "yes" to a second date.
• The Reactive Man: He is nervous. His hands might shake slightly, his voice is thin. He is projecting uncertainty.
    * The State Transfer: The other person picks up on his anxiety and starts to feel anxious themselves. They think, "I feel uneasy about this," and they say "No" because of the feeling, not the facts.
• The State Transfer Master: He feels total conviction. He is relaxed, leaning back, and speaking with a deep, resonant tone.
    * The State Transfer: The other person feels his certainty. They feel "safe" in his reality. They catch his "relaxed confidence" and say "Yes" because it feels like the natural thing to do.

The Three Mechanics of State Transfer
1. Conviction (The Root)
You cannot transfer a state you don't actually feel. If you are "faking" confidence, people pick up on the "dissonance" (the gap between your words and your energy). State Transfer starts with Self-Talk. You must genuinely convince yourself that you are having a blast.
2. Physicality (The Conduit)
Your state travels through your voice and your body.
• Voice: Resonance, slow tempo, and "downward inflections" (ending sentences like a statement, not a question).
• Body: Expansive movements and a "genuine" smile (the kind that crinkles the eyes).
3. Eye Contact (The Bridge)
Eye contact is the "fiber-optic cable" of state transfer. When you look someone in the eye while holding a high state, you are directly "downloading" your reality into their brain.

Scenario 3: Dealing with a Negative Coworker
A colleague comes to your desk to complain about a project. They are stressed and "vibrating" at a low frequency.
• The Reactive Man: He listens, nods, and starts to feel stressed too. He says, "Yeah, you're right, this is a mess. I'm worried too." Now they are both in a low state.
• The State Transfer Master: He remains "Non-Reactive" but then projects optimism. He laughs slightly at the absurdity of the problem.
    * Him: "Man, they really threw us a curveball today. It's almost impressive how much they messed this up. Let's grab a coffee, figure out the first move, and crush it. We've handled worse."
    * The Result: The coworker feels a "weight" lift. They have caught his "problem-solver" state.

State Transfer vs. "Being Loud and Annoying"
A common mistake is thinking State Transfer means being the loudest person in the room. True state transfer is about depth, not volume.

The Mastery Insight: "The Source of the Vibe"
"He who has the most fun, wins." Why? Because fun is the highest social value. Everyone wants to feel good. If you are the man who is consistently feeling the best, you become the Sun. Everyone else becomes the Planets orbiting around you, trying to catch some of your light.

Sovereign Thought: "I don't go to the party to find the fun. I am the fun. Wherever I go, the party follows."`;

  // Custom detailed text for Social Pressure is a Tool
  const socialPressureText = `Principle 06: Social Pressure is a Tool is the point where most men stop. They can be confident in their bedroom or with their friends, but the moment "Social Pressure" hits—the weight of being watched, judged, or challenged—they "stifle." In the self transformation framework, we don't avoid this weight; we bench-press it.

The Philosophy of "The Heavy Presence"
Most men view social pressure as a negative force. It's that tightness in your chest when you're about to approach a stranger, or the awkward itch you feel when a conversation goes silent. You've been conditioned since birth to "diffuse" this pressure—to make a joke, look away, or apologize to make the discomfort go away.
The Master does the exact opposite. He realizes that social pressure is actually Social Value in its rawest form. The person who can sit comfortably in the highest amount of pressure without cracking is, by definition, the highest-value person in the room.

The "Stifle" vs. The "Flow"
• The Stifle: This is the biological "shut down" of your personality. Your voice gets higher, your movements get jerky, and you stop saying what you actually think. You are trying to be "safe."
• The Flow: This occurs when you lean into the pressure until it "pops." Once you realize the pressure can't actually hurt you, you become "Heavy." Your presence takes up more space, and others begin to feel a "magnetic" pull toward your certainty.

Real-Life Conversational Examples: Using the Weight
To master this, you must learn to hold the tension rather than diffusing it.

Scenario 1: The "Pregnant Pause"
You are talking to someone, and the natural "thread" of the conversation dies.
• The Reactive Man: He panics. He feels the silence like a physical weight. He quickly blabs out a boring question just to stop the "awkwardness."
    * Him: "So, uh... do you live around here? Or... I mean, it's a nice place, right?"
    * The Result: He has signaled that he is uncomfortable. He has "lost" to the pressure.
• The Master: He leans back, maintains relaxed eye contact, and lets the silence hang for 5, 10, even 15 seconds. He might even smirk slightly as if he's enjoying a private joke.
    * The Result: The other person begins to feel the pressure. They will eventually speak just to diffuse it, often revealing more about themselves or trying to impress the Master. By doing nothing, the Master has gained the lead.

Scenario 2: The "Testing" Question
Someone asks you a challenging or slightly rude question, like: "Why are you talking to us?" or "You think you're pretty smooth, don't you?"
• The Stifled Man: He tries to answer logically or apologize.
    * Him: "Oh, I just thought you guys looked cool, I'm not trying to be smooth, sorry..."
    * The Result: He has been crushed by the social pressure of the "confrontation."
• The Master: He uses the pressure. He repeats the question back slowly, or just looks at them with an amused, "Is that the best you've got?" expression.
    * Him: (Slowly, calmly) "Smooth? No. I'm actually quite rough around the edges. But you... you're very suspicious. I like that. It's like talking to a tiny, angry detective."
    * The Result: He took their "pressure" and turned it into a playful "frame."

How to Turn Pressure into Power
1. The "Lock-In"
When you feel the urge to look away or "diffuse" a moment, double down. If you're in a conversation that feels awkward, tell yourself: "I'm going to stay in this awkwardness until THEY break first." This is how you build the muscle of Presence.
2. Slow Down Everything
Social pressure makes you move and talk faster. To counter this, consciously move at 50% of your normal speed. Slow your speech. Slow your walk. Slow your blinking. This signals to everyone's lizard brain that you are not a prey animal—you are the one in control.
3. Lean into the "Cringe"
"Cringe" is just the Ego's way of saying "I'm afraid of being judged." When you feel that "cringe" sensation, it's a compass. Go toward it. The more you do the things that make you feel socially exposed, the more "Heavy" and unshakeable your reality becomes.

The Mastery Insight: "The Eye of the Storm"
Social pressure is like a hurricane. Most men are being blown around by the winds of other people's opinions. The Master lives in the Eye of the Storm. Everything around him might be chaotic, high-pressure, or intense, but he is the calm center. Because he is the only one not moving, everyone else eventually gravitates toward him for stability.

Sovereign Thought: "Pressure is a privilege. It is the universe's way of asking you if you are who you say you are. Every time you don't crack, you become more real."`;

  // Custom detailed text for Value Projection
  const valueProjectionText = `Welcome to the core of social magnetism. If Phase 1 was about becoming "The Rock" (Internal), Principle 07: Value Projection is about becoming "The Sun" (External).
In the self transformation framework, every social interaction is an exchange of Value. Most men fail because they walk into the world as Value Seekers—they are looking for a laugh, a smile, or a "yes" to feel good. The Master walks in as a Value Provider. He projects energy, emotion, and reality so powerfully that people feel better just by standing near him.

The Philosophy of "The Source"
Value isn't just money, looks, or status. In the moment-to-moment reality of a conversation, Value is Emotion.
• The Value Seeker: He is a "Social Vampire." He asks questions to get information, tells jokes to get a laugh, and acts nice to get approval. He is pulling energy in.
• The Value Provider: He is the "Source." He shares his observations because they amuse him. He gives compliments because he genuinely appreciates something. He is pushing energy out.
People can subconsciously sense "leech" energy. It feels heavy and draining. Conversely, "Source" energy feels light, expansive, and addictive. When you project value without needing anything back, you become the most valuable person in the room by default.

Real-Life Conversational Examples: Giving vs. Taking
Scenario 1: The "Interview" vs. The "Offering"
You meet someone for the first time at a party.
• The Value Seeker (The Interviewer):
    * Him: "So, what do you do for work?" (Seeking information to fill silence).
    * Her: "I'm in marketing."
    * Him: "Oh, cool. Do you like it?" (Seeking more info).
    * The Result: The conversation feels like a chore. She is "working" to provide him with content.
• The Value Provider (The Offering):
    * Him: "You have a very 'I just quit my corporate job to start a travel blog' vibe. I'm guessing marketing, but with a secret plan to move to Bali."
    * Her: (Laughs) "Close! I am in marketing, but the Bali plan is definitely on the vision board."
    * The Result: He gave her an emotion (amusement) and a creative "frame" to play with. He projected value first.

Scenario 2: The "Approval" vs. The "Appreciation"
You want to tell someone they look good.
• The Value Seeker (The Compliment Fisher):
    * Him: "You look really pretty tonight." (Looking at her eyes to see if she likes the compliment).
    * The Result: It feels "heavy." She now feels pressured to say "thank you" or return the compliment.
• The Value Provider (The Artist):
    * Him: (While walking past or mid-conversation) "That jacket is incredible. It's got a very 'villain in a 1920s spy movie' feel. I love it." (Then he immediately continues talking about something else).
    * The Result: He gave her a "gift" of a compliment and didn't wait around to collect the "thank you." This is Outcome Independence mixed with Value Projection.

The Three Pillars of Value Projection
1. Assumption of Value
You must operate under the assumption that your presence is the prize. You aren't "intruding" on someone's time; you are "interrupting" their boredom. If you don't believe your energy is a gift, they won't either.
2. Self-Entertainment
The easiest way to project value is to entertain yourself. If you are laughing at your own jokes and enjoying your own thoughts, you are producing fun. Because humans are mirrors (State Transfer), they will start to catch the fun you are already having.
3. The "Giving" Mindset
Before every interaction, ask yourself: "How can I make this person's minute better?" Maybe it's a joke, a genuine observation, or just a burst of high-intensity presence. When you focus on giving a great experience, your social anxiety disappears because you're no longer worried about your own performance.

The Mastery Insight: "The Empty Cup"
Most men are like a cup that is half-empty, trying to find someone to fill it up. The Master is a cup that is so full it is overflowing. He has so much internal validation and "Core Confidence" that he can't help but spill it onto everyone he meets.
People don't fall in love with "you"; they fall in love with how they feel when they are with you. If you are a constant source of high-value emotions, the world will beat a path to your door.

Sovereign Thought: "The man who needs nothing is the only one who can give everything. And the man who gives everything is the only one who receives it all back."`;

  // Custom detailed text for Law of Least Effort
  const lawOfLeastEffortText = `Welcome to the most paradoxical principle in the system. Principle 08: The Law of Least Effort is the hallmark of the "Natural."
In the self-transformation world, there is a massive difference between Hard Work and Trying Hard. You work hard on your fitness, your business, and your internal state before you enter the room. But once you are in the social arena, the man who is "trying" is the man who is losing. The Law of Least Effort states that the person who is the least invested in the social outcome—the one who is doing the least to "earn" approval—holds the most power.

The Philosophy of "The Calibrated King"
Think of social interaction as a game of tennis. If one player is sprinting, sweating, and screaming just to return a basic serve, while the other player is standing still, casually flicking their wrist to win the point, who has more "value"?
Investment is a signal of status.
• When you talk fast, move constantly, and over-explain yourself, you are signaling that you are invested in the other person's opinion. You are "working" for their validation.
• When you move slowly, speak with pauses, and let others come to you, you are signaling that you are comfortable in your own reality. You are "The Prize."

Real-Life Conversational Examples: High Effort vs. Least Effort
Scenario 1: The "Storyteller"
You are sharing an experience from your weekend with a group.
• The High-Effort Man:
    * The Behavior: He uses big, frantic gestures. He checks everyone's eyes to see if they are laughing. If someone interrupts, he gets flustered and tries to talk over them to "save" his story.
    * The Result: Even if the story is good, the "vibe" is desperate. People feel like they are being performed at.
• The Least-Effort Master:
    * The Behavior: He leans back. He tells the story slowly, as if he's mostly telling it to amuse himself. If someone interrupts, he simply stops talking and listens, totally unphased. He might not even finish the story if the energy shifts.
    * The Result: Because he isn't "trying" to be the center of attention, the group naturally leans in to hear him. His "effortlessness" makes the story more captivating.

Scenario 2: The "Approach" and Body Language
You see someone you want to meet at a lounge.
• The High-Effort Approach:
    * The Behavior: He "leans in" with his upper body while his feet stay back (the "Primate Lean"). He talks at a high volume and high speed. He stays in their space even if they aren't responding.
    * The Result: It feels like a "sales pitch." The other person feels pressured to "buy" or "leave."
• The Least-Effort Approach (The "Over-The-Shoulder"):
    * The Behavior: He stands slightly turned away (Angling). He speaks at a normal, relaxed volume. He looks over his shoulder to deliver a line, then turns back to his drink or his friends.
    * The Result: He has signaled that he is not fully invested in the interaction. He is "throwing the line out" and seeing if they bite. This triggers their curiosity to "chase" him.

The Three Pillars of Effortlessness
1. Sub-Communication over Communication
90% of your value is communicated through what you don't say. Your stillness, your eye contact, and your "downward tonality" do the work for you. The less you use your mouth to prove you're cool, the more your presence proves it.
2. The "Calibration" Check
If you are putting in a "Level 10" effort and the other person is at a "Level 2," you are losing. The Law of Least Effort means you should always be at, or slightly below, the effort level of the person you are talking to. If they give you a one-word answer, give them a half-word answer or a smirk. Make them "work" to get you back to Level 10.
3. Economy of Motion
Avoid "Low-Value" movements. These are micro-reactions to social pressure:
• Fidgeting with your drink or phone.
• Nodding your head too much while they speak.
• Laughing at your own jokes before they do.
• Clearing your throat or saying "um/uh."

The Mastery Insight: "The Waterfall"
Imagine a waterfall. It doesn't "try" to fall. It doesn't "work" to be powerful. It just is. Because it is so purely itself, people travel from thousands of miles away just to stand in its presence.
When you embody the Law of Least Effort, you stop being the hunter and start being the Destination. You aren't chasing the "vibe"; you are the static point of certainty that the vibe is built around.

Sovereign Thought: "Power is the ability to walk away from any situation and be completely fine. The man who is willing to walk away is the only one who truly has power in the room."`;

  // Custom detailed text for Assumed Familiarity
  const assumedFamiliarityText = `Assumed Familiarity is the "Fast-Forward" button of human relationships. In the self-transformation framework, this principle allows you to bypass the awkward "stranger phase" and jump directly into the deep, comfortable, and playful dynamic of old friends.
Most men approach strangers with a "Formal Barrier." They use polite, cautious, and "interview-style" language. This signals that they are outsiders looking for permission to enter. The Master operates from the reality that everyone is already his friend; they just haven't met yet.

The Philosophy of "The Inner Circle"
When you talk to your best friend, you don't ask, "Excuse me, how is your afternoon going? Is it okay if I share a story?"You just start talking. You tease them, you interrupt them, you use "inside jokes," and you assume they understand your vibe.
Assumed Familiarity is the act of taking that "Inner Circle" energy and projecting it onto a stranger.
The "Permission" Trap
• The Stranger Frame: You are waiting for them to show you they like you before you act like yourself. This is "Value Seeking."
• The Familiar Frame: You act like yourself immediately, assuming they will like it. This is "Value Providing" and "Outcome Independence."

Real-Life Conversational Examples: Breaking the Formal Barrier
Scenario 1: The "Cold" Opening
You see someone standing at a coffee shop or a bookstore.
• The Formal Approach (Stranger Frame):
    * Him: "Hi, excuse me. I'm sorry to bother you, but I just wanted to say I like your shoes. Where did you get them?"
    * The Result: This creates a "Buyer/Seller" dynamic. She is now forced to be a "polite stranger." The wall stays up.
• The Assumed Familiarity Approach (Friend Frame):
    * Him: (Walking up as if continuing a conversation) "Okay, you have to be honest with me. Are those shoes part of a secret plan to be the most noticeable person in the building, or did you just wake up feeling particularly heroic today?"
    * The Result: He has skipped the "Hi, how are you?" and jumped straight into a playful, "teasing" dynamic. Because he sounds like an old friend, her brain subconsciously lowers its defenses.

Scenario 2: Skipping the "Interview"
You've been talking for 2 minutes and want to know what they do.
• The Stranger Frame:
    * Him: "So, what do you do for a living?"
    * Her: "I'm a teacher."
    * Him: "Oh, that's nice. What grade do you teach?"
    * The Result: Boring. It feels like a job interview.
• The Familiar Frame (Cold Reading):
    * Him: "Wait, don't tell me. Let me guess. You have this very 'I can control a room of chaotic children' energy. You're definitely a teacher, but like... the cool one that let us eat candy in class."
    * The Result: Even if he's wrong, he's created a "vibe." He is "assuming" he knows her, which creates instant intimacy and allows for much deeper "State Transfer."

The Three Pillars of Assumed Familiarity
1. The "Mid-Sentence" Entry
Start your interactions as if the conversation has been going on for hours. Use words like "Anyway," "So," or "I was just thinking." This signals that you aren't an "intruder" starting something new; you are a "regular" in their life.
2. Playful Polarization (The "Bratty" Dynamic)
Old friends tease each other. They "push buttons." They don't walk on eggshells. By playfully challenging a stranger—"I don't think we can be friends if you actually like that drink"—you prove that you are not afraid of losing their approval.
3. Physical Proximity and "Micro-Touches"
(Use with high calibration). A friend might give a light "high-five," a "fist bump," or a playful nudge on the shoulder. When you incorporate these "micro-touches" early, you bypass the "don't touch me" stranger barrier and trigger a physiological sense of trust.

The Mastery Insight: "The Tribal Connection"
Evolutionarily, humans lived in small tribes where everyone was "familiar." The "Stranger" is a modern, urban invention. When you use Assumed Familiarity, you are tapping into a primal social code. You are telling the other person's lizard brain: "I am part of your tribe. I am safe. I am known."
Once they feel that "familiarity," they stop judging your words and start feeling your State.

Sovereign Thought: "A stranger is just a friend you haven't teased yet."`;

  // Custom detailed text for Polarization
  const polarizationText = `Principle 10: Polarization is the "Great Filter" of social dynamics. If Phase 2 has been about building a bridge to the world, Polarization is about deciding who is worthy of crossing it.
In the self-transformation system, the biggest mistake a young man can make is trying to be "liked by everyone." When you try to be everything to everyone, you become nothing to anyone. You become "beige"—boring, safe, and invisible. Polarization is the act of being so unapologetically yourself that you force the world to take a side: they either love you or they leave you.

The Philosophy of "The Magnet"
Think of a magnet. A magnet doesn't just attract; it also repels. If it didn't have a repulsive pole, it wouldn't have an attractive one. It would just be a piece of inert metal.
Social Polarization works the same way. When you express a strong opinion, a "bold" vibe, or a unique personality, you create a "Social Shockwave."
• The Repulsion: People who don't share your values or vibe will feel uncomfortable and move away. This is a victory. It saves you time and keeps your "tribe" pure.
• The Attraction: People who do vibe with you will feel an intense, immediate pull. Because you were brave enough to be "real," they feel safe being real with you.

Real-Life Conversational Examples: The Courage to be Disliked
Scenario 1: The "Polite" vs. The "Polarizing" Opinion
You're in a group talking about a popular movie or a local trend.
• The Beige Approach (Neutral):
    * Him: "Yeah, it was okay. I mean, some parts were good, some were slow. What did you guys think?" (Seeking the group's consensus before committing to a feeling).
    * The Result: He is "safe." No one disagrees with him, but no one remembers him either. He has zero "edge."
• The Polarizing Approach (The Stake in the Ground):
    * Him: "I'm going to be honest—I hated it. It felt like it was written by an AI trying to satisfy a focus group. I actually almost walked out to go get a taco instead. Tacos have more soul than that film."
    * The Result: He has polarized the room. Some will say, "Finally, someone said it!" (High Attraction). Others will argue with him. Even the argument provides Social Pressure (Principle 06), which he can use to show his "Non-Reactivity."

Scenario 2: The "Naughty/Nice" Dynamic
You are talking to someone you find attractive, and they mention something they are proud of, like being a "perfectionist" or a "straight-A student."
• The Beige Approach (Validating):
    * Him: "That's really impressive. You must work very hard. I admire that."
    * The Result: He is "qualifying" her. He is the "nice guy." There is no tension, no spark, and no polarization.
• The Polarizing Approach (Playful Conflict):
    * Him: (Smirking) "Oh no. You're one of those. A high-achiever. I bet your color-coded planners are terrifying. We are definitely going to be enemies. I'm the guy who loses his keys twice a day—you'd find me exhausting."
    * The Result: He has "polarized" the interaction. He isn't just another fan; he is a Challenge. He is "Non-Reactive" to her status and "Assumes Familiarity" by teasing her.

The Three Pillars of Polarization
1. Honest Expression
Stop filtering your thoughts through the "Will they like this?" lens. Start filtering them through the "Is this true to me?" lens. If you think a song is terrible, say it. If you love a nerdy hobby, own it. The more specific you are, the more magnetic you become.
2. The "Willingness to Lose"
Polarization requires Outcome Independence (Principle 03). You must be genuinely okay with someone walking away from the conversation. The Master knows that if he loses 5 people who don't "get" him, he's making space for the 1 person who will truly "get" him.
3. Leading the Frame
When you polarize, you are setting the "Frame" (the context) of the interaction. You aren't asking for permission to be yourself; you are presenting yourself as a finished product. People respect a man who has boundaries and a defined "flavor."

The Mastery Insight: "The Lighthouse Effect"
A lighthouse doesn't run around the shore looking for boats to save. It just stays in one spot and shines as brightly as it can. The boats that need the light find it; the boats that don't, stay away.
When you are polarizing, you are a lighthouse. You aren't "chasing" social success; you are broadcasting your unique frequency and letting the world organize itself around you.

Sovereign Thought: "If you aren't being rejected by the people who don't fit your life, you aren't being loud enough for the people who do."`;

  // Custom detailed text for Social Intuition
  const socialIntuitionText = `Welcome to Phase 3: The Mastery. You have built the internal engine and mastered the external mechanics. Now, we stop "doing" and start "being."

Principle 11: Social Intuition is the transition from Technical Competence to Unconscious Flow. In the self-transformation framework, this is where you stop following a "map" and start feeling the "terrain." It is the ability to read the invisible energy of a room, detect the subtext behind words, and calibrate your actions with surgical precision.

The Philosophy of "The Social X-Ray"
Most men are "Socially Blind." They only hear the words being spoken. If someone says, "I'm fine," they believe them. If a room is quiet, they assume everyone is bored. They are trapped in the "Literal."
Social Intuition is about seeing the "Matrix." You realize that human communication is 90% sub-perceptual. You begin to see:
• The Power Dynamics: Who is the "Alpha" in the group? Who is looking to whom for approval?
• The Emotional Undercurrents: Is this person actually enjoying the conversation, or are they just being polite?
• The Window of Opportunity: When is the exact right moment to escalate the energy, and when should you pull back to create a "vacuum"?
From "Rules" to "Vibrations"
Earlier, you learned rules like "Lean back" or "Don't fidget." With Social Intuition, you don't need the rules because you can feel the Social Pressure (Principle 06). You know exactly how much pressure to apply because you can feel when the other person is "leaning in" or "pulling away."

Real-Life Conversational Examples: The Power of Calibration
Calibration is the "knob" on your social intuition. It's the difference between being "bold" and being "creepy," or being "funny" and being "annoying."
Scenario 1: Reading the "Hard No" vs. the "Playful No"
You use Polarization (Principle 10) by teasing someone about their drink. They roll their eyes and say, "You're so annoying."
• Low Intuition: He takes it literally. He gets defensive or apologizes, killing the vibe. Or, he ignores it and keeps teasing even harder, becoming actually annoying.
• High Intuition (The Master): He reads the micro-expressions. He sees the slight smirk, the "twinkle" in the eye, and the fact that they haven't moved away.
    * The Response: He leans in and whispers, "You love it. You've been waiting all night for someone to call you out on that terrible cocktail."
    * The Result: He calibrated his response to the energy, not the words.

Scenario 2: Entering a "High-Status" Group
You walk into a VIP area or a private party where the energy is exclusive and guarded.
• Low Intuition: He enters with "High Energy" (Principle 05) because he thinks he needs to "bring the party." He ends up looking like a clown who doesn't belong. He "clashes" with the environment.
• High Intuition (The Master): He enters and observes. He matches the "Base Frequency" of the room first. He speaks at their volume. He mirrors their posture. Once he is "in sync," he then slowly starts to lead the state upward.
    * The Result: Because he calibrated to the room's starting point, the group accepts him as "one of them" almost instantly.

The Three Pillars of Social Intuition
1. The Observational "Pause"
Masters spend more time looking and feeling than they do talking. When you enter a new environment, don't rush to "do" anything. Take 30 seconds to breathe and scan. Who is leaning in? Who is looking at their phone? Where is the "hot" energy in the room?
2. Empathic Accuracy
This is the ability to put yourself in the other person's shoes and feel their current reality. If they just had a long day at work, your "High Energy" might be draining. If they are bored out of their minds, your "High Energy" will be a gift. Intuition is knowing which version of yourself to provide.
3. Trusting the "Gut"
Your subconscious mind processes social data 10,000x faster than your conscious mind. If you feel a sudden urge to change the subject, or a feeling that "it's time to go," listen to it. Your "Intuition" is just your brain recognizing patterns that your Ego is too busy to notice.

The Mastery Insight: "The Jazz Player"
Think of a beginner piano player. They are focused on the notes (C,D,E). They are stiff. They are "Technical." Now think of a Jazz Master. He isn't thinking about notes; he is thinking about the feeling. He can play "off-key" on purpose because he knows it will create a beautiful tension that he can then resolve.
When you have Social Intuition, you are playing "Social Jazz." You can break all the "rules" of social dynamics because you understand the principles behind them. You can be "low energy," you can "qualify yourself," you can even "be reactive"—but you do it consciously to create a specific effect.

Sovereign Thought: "The map is not the territory. To lead the tribe, you must first feel the heartbeat of the tribe."`;

  // Custom detailed text for The Vibe vs. The Words
  const vibeVsWordsText = `Welcome to the "Invisible" stage of Mastery. Principle 12: The Vibe vs. The Words is the realization that your mouth is the least important part of your communication.
In the self-transformation framework, we recognize that humans are biological antennas. We are constantly broadcasting and receiving signals that have nothing to do with vocabulary. The "Vibe" is the emotional frequency you are emitting; the "Words" are just the carrier wave. When the two are in conflict, the Vibe always wins.

The Philosophy of "Sub-Perceptual Communication"
Most men believe that if they just find the "magic words," they will get the result. They treat social interaction like a computer code where If [Sentence A], then [Result B].
The Master knows that social interaction is actually Resonance.
• The Words: "I'm having a great time." (The Logic)
• The Vibe: Shoulders are hunched, eyes are darting, voice is shaky. (The Reality)
The world doesn't listen to your logic; it feels your reality. If your Vibe says "I am uncomfortable," no amount of "cool" words will save you. But if your Vibe says "I am the Source," you can literally talk about the weather and people will be captivated.

Real-Life Conversational Examples: The "What" vs. The "How"
Scenario 1: The "Boring" Topic
You are talking about something mundane, like the fact that you just bought new socks.
• The Low-Vibe Man (Logic-Focused):
    * The Delivery: He speaks in a flat, monotone voice. He looks down. He is trying to be "factual."
    * The Words: "Yeah, I got these socks today. They're cotton. They were on sale."
    * The Result: He is a "Value Sucker." He is draining the energy of the room with his boring reality.
• The High-Vibe Master (State-Focused):
    * The Delivery: He is grinning. He speaks with passion, as if he's describing a trip to Mars. He uses dramatic pauses.
    * The Words: "You guys... I have achieved peak adulthood. I bought these socks today, and I genuinely think they've changed my life. The arch support? It's basically a hug for my feet. I feel like I could run through a brick wall right now."
    * The Result: He is a Value Provider. Because his Vibe is high-energy and self-entertained, the Words become hilarious and engaging.

Scenario 2: The "Testing" Moment
Someone asks you, "Why are you so confident?"
• The Logic-Focused Man:
    * The Words: "Well, I've been working on myself, reading books, and I realized that my value shouldn't come from others..."
    * The Vibe: He sounds like he's reciting a textbook. He is "qualifying" himself.
• The Vibe-Focused Master:
    * The Words: "It's the socks. I'm telling you, it's all in the arch support."
    * The Vibe: He says it with a wink and a relaxed lean. He doesn't explain the "why." His Vibe answers the question: "I am confident because I am comfortable not explaining myself."

The Three Pillars of the Vibe
1. The "Sub-Text"
Every sentence has a hidden meaning.
• Text: "What are you doing tonight?"
• Sub-Text (Value Seeker): "I hope you're free so you can give me attention."
• Sub-Text (Master): "I'm doing something cool, and I'm seeing if you're the kind of person who fits that vibe."Mastery is choosing your Sub-Text before you choose your Words.
2. Vocal Tonality (The Music)
Your voice is an instrument.
• Upward Inflection: Ends sentences like a question? (Signals seeking approval).
• Flat Inflection: Neutral. (Signals boredom).
• Downward Inflection: Ends sentences like a command. (Signals Sovereignty).
3. The "Look" (The Eye Contact)
The Master uses "Sticky Eyes." He doesn't look away when things get intense. He projects his "Internal State" through his gaze. If you are feeling "Love" or "Power" or "Amusement" internally, it will leak out through your eyes regardless of what you say.

The Mastery Insight: "The Silent Movie"
If you were to watch a video of your social interactions with the sound turned off, what would the "story" be?
• Would the story be: "A nervous guy trying to be liked"?
• Or would it be: "A grounded man enjoying himself and leading the space"?
A Master is a master of the Silent Movie. He knows that if the visual story (body language, presence, eye contact) is strong enough, the "dialogue" is just a formality.

Sovereign Thought: "Speak only if it improves upon the silence, but project your vibe until the silence itself begins to speak for you."`;

  // Custom detailed text for Relentless Persistence
  const relentlessPersistenceText = `Welcome to the "grindstone" of the system. If the previous principles were about the "art" of the interaction, Principle 13: Relentless Persistence is about the Mathematics of Success.

In the self-transformation framework, we don't view "rejection" as a stop sign; we view it as a filter. Most men quit at the first sign of friction. The Master knows that the "gold" is usually buried just past the point where everyone else gives up. This isn't about being "creepy" or "pushy"—it's about having such a powerful Outcome Independence(Principle 03) that a "No" doesn't even register as a reason to stop having a good time.

The Philosophy of "The Infinite Game"
Most men play a Finite Game. They have a specific amount of "social energy," and every "No" drains their battery. When the battery hits zero, they go home, feeling defeated.
The Master plays an Infinite Game. He realizes that as long as he is still in the room and still in a "High State," he hasn't lost. Persistence is simply the refusal to accept a low-value reality. If someone is being cold or "testing" you, they are offering you a low-value reality. Relentless Persistence is the act of staying in your high-value reality until theirs eventually collapses and merges with yours.

Real-Life Conversational Examples: The "Non-Reactive" Push
Persistence in this system is "Soft." It's not about arguing; it's about re-engaging with a smile.
Scenario 1: The "I have a boyfriend" or "I'm busy"
You approach a group or an individual, and within 30 seconds, they give you a standard "blow-off" line.
• The Reactive Man: He takes the "No" as a command. He says, "Oh, sorry," and walks away with his head down. His state is crushed.
• The Relentless Master: He treats the "No" like a weather report—it's just information, not an ending.
    * The Interaction: * Her: "I actually have a boyfriend."
        * Him: (Unphased, grinning) "Of course you do. A girl like you? If you didn't have a boyfriend, I'd assume there was something deeply wrong with the world. Does he know you're out here looking this suspicious, or is he the trusting type?"
    * The Result: He didn't "accept" the rejection. He bypassed the logic and stayed in the Vibe (Principle 12). Often, the "No" was just a test of his Core Confidence (Principle 01).

Scenario 2: The "Social Wall" (The Cold Group)
You walk into a group that is huddled together, and they don't open up to let you in.
• The Stifled Man: He stands on the outside for 5 seconds, feels the "Social Pressure" (Principle 06), and leaves.
• The Relentless Master: He stays. He doesn't need them to "invite" him. He talks to the person closest to him, then turns to the next. If they give him one-word answers, he tells a story to himself (Self-Entertainment).
    * The Result: Eventually, the group realizes he isn't going anywhere and he isn't "seeking" anything. Their defenses drop because his Non-Reactivity is higher than their "Exclusivity."

The Three Pillars of Relentless Persistence
1. The "Three-Strike" Rule
Never walk away after the first friction point. Most "rejections" are just "reflexes." People are conditioned to say "No" to strangers. Give the interaction at least three "re-hooks"—changing the subject or using a new Polarization (Principle 10)—before you decide to move on.
2. Micro-Persistence
This is persistence in the "moment." If someone looks away, don't look away. If the conversation dips, don't panic. Stay in the pocket. Your ability to Endure the Silence (Principle 06) is a form of persistence that communicates massive value.
3. The "Law of Large Numbers"
The Master knows that if he approaches 100 people, 80 might be "meh," 10 might be "No," but 10 will be "Life-Changing." Persistence is the fuel that gets you through the 90 to get to the 10. You don't take the 90 personally because you're focused on the Statistical Certainty of Success.

The Mastery Insight: "Water vs. Rock"
Think of Persistence like water hitting a rock. The water doesn't "fight" the rock. It doesn't get angry that the rock is there. It just keeps flowing. Eventually, the water finds a crack, or it simply flows around it.
When you are Relentless, you are the Water. You are fluid. You are constant. A "No" is just a rock in your stream. You don't stop; you just find a different way to flow.

Sovereign Thought: "The world belongs to the man who can be rejected a thousand times and still walk into the next room with the same fire in his eyes."`;

  // Custom detailed text for Identity Shifting
  const identityShiftingText = `Welcome to the "Alchemist's" stage. Principle 14: Identity Shifting is where we stop treating these principles as "tools" and start treating them as "blood."

In the self-transformation framework, most men suffer from Identity Lag. They have improved their skills, their fitness, and their bank accounts, but they still feel like the shy, awkward kid they were in high school. They are "acting" confident, but their core identity is still "The Outsider." Identity Shifting is the process of burning the old self-image and stepping into the reality of the Sovereign Man.

The Philosophy of "The Narrative Architect"
Your "Identity" is simply the story you tell yourself about who you are. This story dictates your Behavioral Ceiling.
• If your story is "I'm a guy who's trying to get better," you will always be "trying."
• If your story is "I am the Source of the vibe," you will simply be the vibe.
Identity Shifting is the realization that "You" are not a fixed entity. You are a fluid collection of habits and beliefs. To change your life, you don't change your actions; you change the "I" that is performing the actions.

Real-Life Conversational Examples: The Shift in "Being"

Scenario 1: The "New Environment"
You walk into a high-end gala, a celebrity party, or an elite boardroom.
• The "Improving" Identity: He feels like an imposter. He thinks, "I hope I don't stand out for the wrong reasons. I need to remember my Non-Reactivity (Principle 04)." * The Vibe: He looks like he's trying to "pass." He is Seeking Value because he feels the environment is "higher" than him.
• The Shifted Identity: He has decided that he belongs wherever he stands. He doesn't "try" to be Non-Reactive; he is Non-Reactive because why would a King be rattled by his own palace?
    * The Vibe: He talks to the host as an equal. He teases the "High-Status" guests using Assumed Familiarity(Principle 09). He is the Source.

Scenario 2: Dealing with Past "Failures"
You run into someone from your past who used to see you as "the quiet guy" or "the nerd."
• The "Static" Identity: He slips back into his old skin. He becomes polite, hesitant, and starts "qualifying" himself to prove he's changed.
    * The Result: The old acquaintance still sees the "old him" because he is projecting that old frequency.
• The Shifted Identity: He views his past self as a completely different person—a "character" in a movie he once watched. He doesn't feel the need to prove anything.
    * The Interaction: He treats the acquaintance with a "Big Brother" energy. He might even tease them about "the old days" from a place of total detachment.
    * The Result: The acquaintance is shocked. They feel the State Transfer (Principle 05) and are forced to accept his new, sovereign reality.

The Three Pillars of Identity Shifting

1. The "Acting 'As If'" Protocol
This isn't "Fake it 'til you make it." It is "Embody it 'til you are it." Before you enter a room, ask: "How would the man I want to be walk through these doors? What would his breathing look like? What would he find funny?" Then, do exactly that.
2. Environmental Scrubbing
Your identity is often held in place by your surroundings. If you hang out with people who treat you like your "old self," you will stay that person. Identity Shifting often requires Polarization (Principle 10)—leaving behind the people and places that no longer match your new frequency.
3. The "Evidence" Log
The Ego (Principle 02) needs "proof" to believe a new story. This is why the Missions in this app are vital. Every time you hold eye contact during a "Social Pressure" moment, you are collecting evidence. Eventually, the evidence for your "Sovereignty" becomes so overwhelming that the old identity simply dissolves.

The Mastery Insight: "The Actor and the Role"
Think of a world-class method actor. When they are in character, they don't "think" about how the character would walk; they just walk that way because, in their mind, they are that person. You have been playing the role of "The Average Guy" for years. It's just a script you've memorized. Principle 14 is about throwing that script in the trash and writing a new one where you are the Lead, the Producer, and the Director.

Sovereign Thought: "You are under no obligation to be the person you were five minutes ago."`;

  // Split doctrine into paragraphs for better readability
  const doctrineParagraphs = isCoreConfidence 
    ? coreConfidenceText.split('\n\n')
    : isDeathOfEgo
    ? deathOfEgoText.split('\n\n')
    : isOutcomeIndependence
    ? outcomeIndependenceText.split('\n\n')
    : isNonReactivity
    ? nonReactivityText.split('\n\n')
    : isStateTransfer
    ? stateTransferText.split('\n\n')
    : isSocialPressure
    ? socialPressureText.split('\n\n')
    : isValueProjection
    ? valueProjectionText.split('\n\n')
    : isLawOfLeastEffort
    ? lawOfLeastEffortText.split('\n\n')
    : isAssumedFamiliarity
    ? assumedFamiliarityText.split('\n\n')
    : isPolarization
    ? polarizationText.split('\n\n')
    : isSocialIntuition
    ? socialIntuitionText.split('\n\n')
    : isVibeVsWords
    ? vibeVsWordsText.split('\n\n')
    : isRelentlessPersistence
    ? relentlessPersistenceText.split('\n\n')
    : isIdentityShifting
    ? identityShiftingText.split('\n\n')
    : principle.doctrine.split('\n\n');

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View 
          style={[
            styles.container,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <BookOpen size={20} color={Colors.accent.gold} />
              <Text style={styles.headerTitle}>Study Doctrine</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.principleHeader}>
              <View style={styles.iconContainer}>
                <IconComponent size={32} color={Colors.accent.gold} />
              </View>
              <View style={styles.tierBadge}>
                <Text style={styles.tierText}>{TIER_NAMES[principle.tier]}</Text>
              </View>
              <Text style={styles.principleTitle}>{principle.name}</Text>
            </View>

            <View style={styles.doctrineSection}>
              <Text style={styles.sectionLabel}>THE DOCTRINE</Text>
              <View style={styles.doctrineCard}>
                {doctrineParagraphs.map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  
                  // Check if paragraph is a heading (short, starts with capital, no sentence-ending punctuation except at end)
                  const isHeading = trimmed.length < 70 && 
                    trimmed.length > 5 &&
                    !trimmed.startsWith('•') && 
                    !trimmed.startsWith('*') &&
                    !/^\d+\./.test(trimmed) &&
                    !trimmed.includes('|') &&
                    /^[A-Z]/.test(trimmed) &&
                    (trimmed.split(' ').length < 8 || trimmed.includes(':'));
                  
                  // Check if paragraph is a bullet point
                  const isBullet = trimmed.startsWith('•') || trimmed.startsWith('*');
                  
                  // Check if paragraph is a numbered list item (but not a heading)
                  const isNumbered = /^\d+\./.test(trimmed) && trimmed.length > 20;
                  
                  // Check if paragraph is a table row
                  const isTableRow = trimmed.includes('|') && trimmed.split('|').length >= 3;
                  
                  // Check if paragraph is a key takeaway
                  const isKeyTakeaway = trimmed.startsWith('Key Takeaway:');
                  
                  // Check if we're in a table section
                  const prevIsTable = index > 0 && doctrineParagraphs[index - 1].trim().includes('|') && doctrineParagraphs[index - 1].trim().split('|').length >= 3;
                  const nextIsTable = index < doctrineParagraphs.length - 1 && doctrineParagraphs[index + 1].trim().includes('|') && doctrineParagraphs[index + 1].trim().split('|').length >= 3;
                  const isTableStart = isTableRow && !prevIsTable;
                  const isTableEnd = isTableRow && !nextIsTable;
                  const isHeader = isTableStart; // First row of table is header
                  
                  if (isTableRow) {
                    const columns = trimmed.split('|').map(col => col.trim());
                    
                    return (
                      <View 
                        key={index}
                        style={[
                          styles.tableRow,
                          isHeader && styles.tableHeaderRow,
                          isTableStart && styles.tableFirstRow,
                          isTableEnd && styles.tableLastRow,
                          isTableStart && { marginTop: 16 },
                        ]}
                      >
                        {columns.map((cell, cellIndex) => (
                          <View 
                            key={cellIndex}
                            style={[
                              styles.tableCell,
                              cellIndex < columns.length - 1 && styles.tableCellBorder,
                            ]}
                          >
                            <Text style={[
                              styles.tableCellText,
                              isHeader && styles.tableHeaderText,
                            ]}>
                              {cell}
                            </Text>
                          </View>
                        ))}
                      </View>
                    );
                  }
                  
                  return (
                    <Text 
                      key={index} 
                      style={[
                        isHeading ? styles.doctrineHeading : styles.doctrineText,
                        isBullet && styles.doctrineBullet,
                        isNumbered && styles.doctrineNumbered,
                        isKeyTakeaway && styles.doctrineKeyTakeaway,
                        index < doctrineParagraphs.length - 1 && !nextIsTable && styles.doctrineParagraph
                      ]}
                    >
                      {paragraph}
                    </Text>
                  );
                })}
              </View>
            </View>

            {!isCoreConfidence && !isDeathOfEgo && !isOutcomeIndependence && !isNonReactivity && !isStateTransfer && !isSocialPressure && !isValueProjection && !isLawOfLeastEffort && !isAssumedFamiliarity && !isPolarization && !isSocialIntuition && !isVibeVsWords && !isRelentlessPersistence && !isIdentityShifting && (
              <>
                <View style={styles.missionPreview}>
                  <Text style={styles.sectionLabel}>TODAY'S MISSION</Text>
                  <View style={styles.missionCard}>
                    <Text style={styles.missionTitle}>{principle.mission.title}</Text>
                    <Text style={styles.missionDescription}>
                      {principle.mission.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.reminderSection}>
                  <Text style={styles.reminderText}>
                    Return to the home screen and tap "Log Execution" when you've completed today's mission.
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.92,
    borderTopWidth: 1,
    borderColor: Colors.accent.gold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  principleHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
  },
  tierBadge: {
    backgroundColor: Colors.background.card,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tierText: {
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  principleTitle: {
    fontSize: 24,
    fontWeight: '300' as const,
    color: Colors.text.primary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  doctrineSection: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 11,
    color: Colors.accent.gold,
    letterSpacing: 2,
    marginBottom: 12,
  },
  doctrineCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.gold,
  },
  doctrineText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 28,
  },
  doctrineHeading: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginTop: 8,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  doctrineBullet: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 26,
    paddingLeft: 8,
    marginLeft: 8,
  },
  doctrineNumbered: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 26,
    fontWeight: '600' as const,
  },
  doctrineTableRow: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 24,
    marginVertical: 6,
    paddingVertical: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background.secondary,
  },
  tableFirstRow: {
    borderTopWidth: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tableLastRow: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 20,
  },
  tableHeaderRow: {
    backgroundColor: Colors.accent.goldDim,
    borderTopWidth: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tableCell: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  tableCellBorder: {
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  tableHeaderCell: {
    backgroundColor: 'transparent',
  },
  tableCellText: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  tableHeaderText: {
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    fontSize: 13,
  },
  doctrineKeyTakeaway: {
    fontSize: 16,
    color: Colors.accent.gold,
    lineHeight: 26,
    fontStyle: 'italic',
    fontWeight: '500' as const,
    marginTop: 8,
  },
  doctrineParagraph: {
    marginBottom: 20,
  },
  missionPreview: {
    marginBottom: 24,
  },
  missionCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.accent.gold,
    marginBottom: 10,
  },
  missionDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  reminderSection: {
    backgroundColor: Colors.accent.goldDim,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
  },
  reminderText: {
    fontSize: 13,
    color: Colors.accent.gold,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
