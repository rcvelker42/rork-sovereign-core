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

  // Split doctrine into paragraphs for better readability
  const doctrineParagraphs = isCoreConfidence 
    ? coreConfidenceText.split('\n\n')
    : isDeathOfEgo
    ? deathOfEgoText.split('\n\n')
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

            {!isCoreConfidence && !isDeathOfEgo && (
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
