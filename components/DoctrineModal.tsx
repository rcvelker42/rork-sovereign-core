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

  // Split doctrine into paragraphs for better readability
  const doctrineParagraphs = isCoreConfidence 
    ? coreConfidenceText.split('\n\n')
    : isDeathOfEgo
    ? deathOfEgoText.split('\n\n')
    : isOutcomeIndependence
    ? outcomeIndependenceText.split('\n\n')
    : isNonReactivity
    ? nonReactivityText.split('\n\n')
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

            {!isCoreConfidence && !isDeathOfEgo && !isOutcomeIndependence && !isNonReactivity && (
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
