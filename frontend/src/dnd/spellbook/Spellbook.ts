export type SpellLevel = "Cantrip" | "1st" | "2nd" | "3rd" | "4th" | "5th" | "6th" | "7th" | "8th" | "9th"

export type SpellSchool = "Abjuration" | "Conjuration" | "Divination" | "Enchantment" | "Evocation" | "Illusion" | "Necromancy" | "Transmutation"

export type Spell = {
    name: string
    level: SpellLevel
    school: SpellSchool
    castTime: string
    range: string
    areaOfEffect?: string
    components: string
    materials?: string
    duration: string
    description: string[]
    higherLevel?: string
    concentration?: boolean
    ritual?: boolean
    alwaysPrepared?: boolean
}

export const MAX_PREPARED = 23;

export const spells: Spell[] = [
    {
        name: "Guidance",
        level: "Cantrip",
        school: "Divination",
        castTime: "1 Action",
        range: "Touch",
        components: "V, S",
        duration: "1 Minute",
        concentration: true,
        description: [
            "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends."
        ],
    }, {
        name: "Minor Illusion",
        level: "Cantrip",
        school: "Illusion",
        castTime: "1 Action",
        range: "30 ft (*2)",
        components: "S, M",
        materials: "A bit of fleece",
        duration: "1 Minute",
        description: [
            "You create a sound or an image of an object within range that lasts for the duration.The illusion also ends if you dismiss it as an action or cast this spell again.",
            "If you create a sound, its volume can range from a whisper to a scream.It can be your voice, someone else 's voice, a lion's roar, a beating of drums, or any other sound you choose.The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.",
            "If you create an image of an object--such as a chair, muddy footprints, or a small chest--it must be no larger than a 5 - foot cube.The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.",
            "If a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence(Investigation) check against your spell save DC.If a creature discerns the illusion for what it is, the illusion becomes faint to the creature."
        ],
    }, {
        name: "Prestidigitation",
        level: "Cantrip",
        school: "Transmutation",
        castTime: "1 Action",
        range: "10 ft (*2)",
        components: "V, S",
        duration: "Up to 1 hour",
        description: [
            "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:",
            "You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.",
            "You instantaneously light or snuff out a candle, a torch, or a small campfire.",
            "You instantaneously clean or soil an object no larger than 1 cubic foot.",
            "You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.",
            "You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.",
            "You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.",
            "If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action."
        ],
    }, {
        name: "Ray of Frost",
        level: "Cantrip",
        school: "Evocation",
        castTime: "1 Action",
        range: "60 ft (*2)",
        components: "V, S",
        duration: "Instant",
        description: [
            "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn."
        ],
        higherLevel: "The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
    }, {
        name: "Shillelagh",
        level: "Cantrip",
        school: "Transmutation",
        castTime: "1 Bonus Action",
        range: "Touch",
        components: "V, S, M",
        materials: "Mistletoe, a shamrock leaf, and a club or quarterstaff",
        duration: "1 minute",
        description: [
            "The wood of a club or quarterstaff you are holding is imbued with nature’s power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon’s damage die becomes a d8. The weapon also becomes magical, if it isn’t already. The spell ends if you cast it again or if you let go of the weapon."
        ],
    }, {
        name: "Toll the Dead",
        level: "Cantrip",
        school: "Evocation",
        castTime: "1 Action",
        range: "60 ft (*2)",
        components: "V, S",
        duration: "Instant",
        description: [
            "You point at one creature you can see within range, and the sound of a dolorous bell fills the air around it for a moment. The target must succeed on a Wisdom saving throw or take 1d8 necrotic damage. If the target is missing any of its hit points, it instead takes 1d12 necrotic damage."
        ],
        higherLevel: "The spell’s damage increases by one die when you reach 5th level (2d8 or 2d12), 11th level (3d8 or 3d12), and 17th level (4d8 or 4d12)."
        // }, {
        //     name: "Mage Hand",
        //     level: "Cantrip",
        //     school: "Conjuration",
        //     castTime: "1 Action",
        //     range: "30 ft (*2)",
        //     components: "V, S",
        //     duration: "1 Minute",
        //     description: [
        //         "A spectral, floating hand appears at a point you choose within range.The hand lasts for the duration or until you dismiss it as an action.The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.",
        //         "You can use your action to control the hand.You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial.You can move the hand up to 30 feet each time you use it.",
        //         "The hand can't attack, activate magic items, or carry more than 10 pounds.",
        //     ]
    }, {
        name: "Light",
        level: "Cantrip",
        school: "Evocation",
        castTime: "1 Action",
        range: "Touch",
        components: "V, M",
        materials: "A firefly or phosphorescent moss",
        duration: "1 Hour",
        description: [
            "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.",
            "If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.",
        ]
    }, {
        name: "Comprehend Languages",
        level: "1st",
        school: "Divination",
        ritual: true,
        castTime: "1 Action",
        range: "Self",
        components: "V, S, M",
        materials: "A pinch of soot and salt",
        duration: "1 hour",
        description: [
            "For the duration, you understand the literal meaning of any spoken language that you hear.You also understand any written language that you see, but you must be touching the surface on which the words are written.It takes about 1 minute to read one page of text.",
            "This spell doesn’t decode secret messages in a text or a glyph, such as an arcane sigil, that isn’t part of a written language."
        ],
    }, {
        name: "Detect Magic",
        level: "1st",
        school: "Divination",
        ritual: true,
        castTime: "1 Action",
        range: "Self",
        components: "V, S",
        duration: "Up to 10 minutes",
        concentration: true,
        description: [
            "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.",
            "The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
        ],
    }, {
        name: "Create or Destroy Water",
        level: "1st",
        school: "Transmutation",
        castTime: "1 Action",
        range: "30 ft",
        components: "V, S, M",
        materials: "A drop of water if creating water or a few grains of sand if destroying it",
        duration: "Instantaneous",
        description: [
            "You either create or destroy water. Create Water. You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot cube within range, extinguishing exposed flames in the area. Destroy Water. You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot cube within range.",
        ],
        alwaysPrepared: true,
        higherLevel: "When you cast this spell using a spell slot of 2nd level or higher, you create or destroy 10 additional gallons of water, or the size of the cube increases by 5 feet, for each slot level above 1st.",
    }, {
        name: "Find Familiar",
        level: "1st",
        school: "Conjuration",
        ritual: true,
        castTime: "1 hour",
        range: "10 ft",
        components: "V, S, M",
        materials: "10 gp worth of charcoal, incense, and herbs that must be consumed by fire in a brass brazier",
        duration: "Instant",
        description: [
            "You gain the service of a familiar, a spirit that takes an animal form you choose: bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of a beast.",
            "Your familiar acts independently of you, but it always obeys your commands.In combat, it rolls its own initiative and acts on its own turn.A familiar can’t attack, but it can take other actions as normal.",
            "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form.It reappears after you cast this spell again",
            "While your familiar is within 100 feet of you, you can communicate with it telepathically.Additionally, as an action, you can see through your familiar’s eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has.During this time, you are deaf and blind with regard to your own senses.",
            "As an action, you can temporarily dismiss your familiar.It disappears into a pocket dimension where it awaits your summons.Alternatively, you can dismiss it forever.As an action while it is temporarily dismissed, you can cause it to reappear in any unoccupied space within 30 feet of you.",
            "You can’t have more than one familiar at a time.If you cast this spell while you already have a familiar, you instead cause it to adopt a new form.Choose one of the forms from the above list.Your familiar transforms into the chosen creature.",
            "Finally, when you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell.Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it.If the spell requires an attack roll, you use your attack modifier for the roll."
        ],
    }, {
        name: "Sleep",
        level: "1st",
        school: "Enchantment",
        castTime: "1 action",
        range: "90 ft",
        areaOfEffect: "20 ft radius",
        components: "V, S, M",
        materials: "A pinch of fine sand, rose petals, or a cricket",
        duration: "1 minute",
        description: [
            "This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures). Starting with the creature that has the lowest current hit points, each creature affected by this spell falls unconscious until the spell ends, the sleeper takes damage, or someone uses an action to shake or slap the sleeper awake. Subtract each creature’s hit points from the total before moving on to the creature with the next lowest hit points. A creature’s hit points must be equal to or less than the remaining total for that creature to be affected. Undead and creatures immune to being charmed aren’t affected by this spell."
        ],
        higherLevel: "When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d8 for each slot level above 1st."
    }, {
        name: "Thunderwave",
        level: "1st",
        school: "Evocation",
        castTime: "1 action",
        range: "Self",
        areaOfEffect: "15 ft cube",
        components: "V, S",
        duration: "Instant",
        description: [
            "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed. In addition, unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell’s effect, and the spell emits a thunderous boom audible out to 300 feet."
        ],
        higherLevel: "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st."
    }, {
        name: "Magic Missile",
        level: "1st",
        school: "Evocation",
        castTime: "1 action",
        range: "120 ft",
        components: "V, S",
        duration: "Instant",
        description: [
            "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several."
        ],
        higherLevel: "When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot above 1st."
    }, {
        name: "Shield",
        level: "1st",
        school: "Abjuration",
        castTime: "1 reaction",
        range: "Self",
        components: "V, S",
        duration: "1 round",
        description: [
            "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile."
        ],
    }, {
        name: "Mage Armor",
        level: "1st",
        school: "Abjuration",
        castTime: "1 action",
        range: "Touch",
        components: "V, S, M",
        materials: "A piece of cured leather",
        duration: "8 hours",
        description: [
            "You touch a willing creature who isn’t wearing armor, and a protective magical force surrounds it until the spell ends. The target’s base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action."
        ],
    }, {
        name: "Unseen Servant",
        level: "1st",
        school: "Conjuration",
        ritual: true,
        castTime: "1 action",
        range: "60 ft",
        components: "V, S, M",
        materials: "A piece of string and a bit of wood",
        duration: "1 hour",
        description: [
            "This spell creates an invisible, mindless, shapeless force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 hit point, and a Strength of 2, and it can’t attack. If it drops to 0 hit points, the spell ends.",
            "Once on each of your turns as a bonus action, you can mentally command the servant to move up to 15 feet and interact with an object.The servant can perform simple tasks that a human servant could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring wine.Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command.",
            "If you command the servant to perform a task that would move it more than 60 feet away from you, the spell ends."
        ],
    }, {
        name: "Identify",
        level: "1st",
        school: "Divination",
        ritual: true,
        castTime: "1 minute",
        range: "Touch",
        components: "V, S, M",
        materials: "A pearl worth at least 100gp and an owl feather",
        duration: "Instantaneous",
        description: [
            "You choose one object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them, whether it requires Attunement to use, and how many Charges it has, if any. You learn whether any Spells are affecting the item and what they are. If the item was created by a spell, you learn which spell created it.",
            "If you instead touch a creature throughout the casting, you learn what Spells, if any, are currently affecting it."
        ],
    }, {
        name: "Alarm",
        level: "1st",
        school: "Abjuration",
        ritual: true,
        castTime: "1 minute",
        range: "30 ft",
        components: "V, S, M",
        materials: "A tiny bell and a piece of fine silver wire.",
        duration: "8 hours",
        description: [
            "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible.",
            "A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area.This ping awakens you if you are sleeping.",
            "An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet."
        ],
    }, {
        name: "Flaming Sphere",
        level: "2nd",
        school: "Conjuration",
        castTime: "1 action",
        range: "60 ft",
        components: "V, S, M",
        materials: "A bit of tallow, a pinch of brimstone, and a dusting of powdered iron",
        duration: "Up to 1 minute",
        concentration: true,
        description: [
            "A 5-foot-diameter sphere of fire appears in an unoccupied space of your choice within range and lasts for the duration. Any creature that ends its turn within 5 feet of the sphere must make a Dexterity saving throw. The creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one. As a bonus action, you can move the sphere up to 30 feet. If you ram the sphere into a creature, that creature must make the saving throw against the sphere’s damage, and the sphere stops moving this turn. When you move the sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. The sphere ignites flammable objects not being worn or carried, and it sheds bright light in a 20-foot radius and dim light for an additional 20 feet."
        ],
        higherLevel: "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd."
    }, {
        name: "Misty Step",
        level: "2nd",
        school: "Conjuration",
        castTime: "1 bonus action",
        range: "Self",
        components: "V",
        duration: "Instant",
        description: [
            "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see."
        ],
    }, {
        name: "Web",
        level: "2nd",
        school: "Conjuration",
        castTime: "1 action",
        range: "60 ft",
        components: "V, S, M",
        materials: "A bit of spiderweb",
        duration: "Up to 1 hour",
        concentration: true,
        description: [
            "You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration. The webs are difficult terrain and lightly obscure their area.",
            "If the webs aren’t anchored between two solid masses(such as walls or trees) or layered across a floor, wall, or ceiling, the conjured web collapses on itself, and the spell ends at the start of your next turn.Webs layered over a flat surface have a depth of 5 feet.",
            "Each creature that starts its turn in the webs or that enters them during its turn must make a Dexterity saving throw.On a failed save, the creature is restrained as long as it remains in the webs or until it breaks free.",
            "A creature restrained by the webs can use its action to make a Strength check against your spell save DC.If it succeeds, it is no longer restrained.",
            "The webs are flammable.Any 5-foot cube of webs exposed to fire burns away in 1 round, dealing 2d4 fire damage to any creature that starts its turn in the fire."
        ],
    }, {
        name: "Suggestion",
        level: "2nd",
        school: "Enchantment",
        castTime: "1 action",
        range: "30 ft",
        components: "V, M",
        materials: "A snake's tongue and either a bit of honeycomb or a drop of sweet oil",
        duration: "Up to 8 hour",
        concentration: true,
        description: [
            "You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you. Creatures that can’t be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable. Asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act ends the spell.",
            "The target must make a Wisdom saving throw.On a failed save, it pursues the course of action you described to the best of its ability.The suggested course of action can continue for the entire duration.If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do.",
            "You can also specify conditions that will trigger a special activity during the duration.For example, you might suggest that a knight give her warhorse to the first beggar she meets.If the condition isn’t met before the spell expires, the activity isn’t performed.",
            "If you or any of your companions damage the target, the spell ends."
        ],
    }, {
        name: "See Invisibility",
        level: "2nd",
        school: "Divination",
        castTime: "1 action",
        range: "Self",
        components: "V, S, M",
        materials: "A pinch of talc and a small sprinkling of powdered silver",
        duration: "1 Hour",
        description: [
            "For the duration, you see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane. Ethereal creatures and objects appear ghostly and translucent."
        ],
    }, {
        name: "Detect Thoughts",
        level: "2nd",
        school: "Divination",
        castTime: "1 action",
        concentration: true,
        range: "Self",
        components: "V, S, M",
        materials: "A copper piece",
        duration: "1 Minute",
        description: [
            "For the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you. If the creature you choose has an Intelligence of 3 or lower or doesn’t speak any language, the creature is unaffected.",
            "You initially learn the surface thoughts of the creature—what is most on its mind in that moment. As an action, you can either shift your attention to another creature’s thoughts or attempt to probe deeper into the same creature’s mind. If you probe deeper, the target must make a Wisdom saving throw. If it fails, you gain insight into its reasoning (if any), its emotional state, and something that looms large in its mind (such as something it worries over, loves, or hates). If it succeeds, the spell ends. Either way, the target knows that you are probing into its mind, and unless you shift your attention to another creature’s thoughts, the creature can use its action on its turn to make an Intelligence check contested by your Intelligence check; if it succeeds, the spell ends.",
            "Questions verbally directed at the target creature naturally shape the course of its thoughts, so this spell is particularly effective as part of an interrogation.",
            "You can also use this spell to detect the presence of thinking creatures you can’t see. When you cast the spell or as your action during the duration, you can search for thoughts within 30 feet of you. The spell can penetrate barriers, but 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead blocks you. You can’t detect a creature with an Intelligence of 3 or lower or one that doesn’t speak any language.",
            "Once you detect the presence of a creature in this way, you can read its thoughts for the rest of the duration as described above, even if you can’t see it, but it must still be within range.",
        ],
    }, {
        name: "Invisibility",
        level: "2nd",
        school: "Illusion",
        castTime: "1 action",
        concentration: true,
        range: "Touch",
        components: "V, S, M",
        materials: "An eyelash encased in gum arabic",
        duration: "1 Hour",
        description: [
            "A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell ends for a target that attacks or casts a spell.",
        ],
        higherLevel: "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd."
    }, {
        name: "Magic Mouth",
        level: "2nd",
        school: "Illusion",
        castTime: "1 minute",
        ritual: true,
        range: "30 ft",
        components: "V, S, M",
        materials: "a small bit of honeycomb and jade dust worth at least 10 gp",
        duration: "Until Dispelled",
        description: [
            "You implant a message within an object in range, a message that is uttered when a trigger condition is met. Choose an object that you can see and that isn't being worn or carried by another creature. Then speak the message, which must be 25 words or less, though it can be delivered over as long as 10 minutes. Finally, determine the circumstance that will trigger the spell to deliver your message.",
            "When that circumstance occurs, a magical mouth appears on the object and recites the message in your voice and at the same volume you spoke. If the object you chose has a mouth or something that looks like a mouth (for example, the mouth of a statue), the magical mouth appears there so that the words appear to come from the object's mouth. When you cast this spell, you can have the spell end after it delivers its message, or it can remain and repeat its message whenever the trigger occurs.",
            "The triggering circumstance can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur within 30 feet of the object. For example, you could instruct the mouth to speak when any creature moves within 30 feet of the object or when a silver bell rings within 30 feet of it.",
        ],
    }, {
        name: "Mirror Image",
        level: "2nd",
        school: "Illusion",
        castTime: "1 action",
        range: "Self",
        components: "V, S",
        duration: "1 Minute",
        description: [
            "Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it's impossible to track which image is real. You can use your action to dismiss the illusory duplicates.",
            "Each time a creature targets you with an attack during the spell's duration, roll a d20 to determine whether the attack instead targets one of your duplicates.",
            "If you have three duplicates, you must roll a 6 or higher to change the attack's target to a duplicate. With two duplicates, you must roll an 8 or higher. With one duplicate, you must roll an 11 or higher.",
            "A duplicate's AC equals 10 + your Dexterity modifier. If an attack hits a duplicate, the duplicate is destroyed. A duplicate can be destroyed only by an attack that hits it. It ignores all other damage and effects. The spell ends when all three duplicates are destroyed.",
            "A creature is unaffected by this spell if it can't see, if it relies on senses other than sight, such as blindsight, or if it can perceive illusions as false, as with truesight.",
        ],
    }, {
        name: "Counterspell",
        level: "3rd",
        school: "Abjuration",
        castTime: "1 reaction",
        range: "60 ft",
        components: "S",
        duration: "Instant",
        description: [
            "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell’s level. On a success, the creature’s spell fails and has no effect.",
            "At Higher Levels.When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used."
        ],
    }, {
        name: "Tiny Hut",
        level: "3rd",
        school: "Evocation",
        ritual: true,
        castTime: "1 minute",
        range: "Self",
        areaOfEffect: "10 ft radius hemisphere",
        components: "V, S, M",
        materials: "A small crystal bead",
        duration: "8 hours",
        description: [
            "A 10-foot-radius immobile dome of force springs into existence around and above you and remains stationary for the duration. The spell ends if you leave its area.",
            "Nine creatures of Medium size or smaller can fit inside the dome with you.The spell fails if its area includes a larger creature or more than nine creatures.Creatures and objects within the dome when you cast this spell can move through it freely.All other creatures and objects are barred from passing through it.Spells and other magical effects can’t extend through the dome or be cast through it.The atmosphere inside the space is comfortable and dry, regardless of the weather outside.",
            "Until the spell ends, you can command the interior to become dimly lit or dark.The dome is opaque from the outside, of any color you choose, but it is transparent from the inside."
        ],
    }, {
        name: "Remove Curse",
        level: "3rd",
        school: "Abjuration",
        castTime: "1 action",
        range: "Touch",
        components: "V, S",
        duration: "Instant",
        description: [
            "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner’s attunement to the object so it can be removed or discarded."
        ],
    }, {
        name: "Slow",
        level: "3rd",
        school: "Transmutation",
        castTime: "1 action",
        range: "120 ft",
        components: "V, S, M",
        materials: "A drop of molasses",
        duration: "Up to 1 minute",
        concentration: true,
        description: [
            "You alter time around up to six creatures of your choice in a 40-foot cube within range. Each target must succeed on a Wisdom saving throw or be affected by this spell for the duration.",
            "An affected target’s speed is halved, it takes a −2 penalty to AC and Dexterity saving throws, and it can’t use reactions.On its turn, it can use either an action or a bonus action, not both.Regardless of the creature’s abilities or magic items, it can’t make more than one melee or ranged attack during its turn.",
            "If the creature attempts to cast a spell with a casting time of 1 action, roll a d20.On an 11 or higher, the spell doesn’t take effect until the creature’s next turn, and the creature must use its action on that turn to complete the spell.If it can’t, the spell is wasted.",
            "A creature affected by this spell makes another Wisdom saving throw at the end of its turn.On a successful save, the effect ends for it."
        ],
    }, {
        name: "Sending",
        level: "3rd",
        school: "Evocation",
        castTime: "1 action",
        range: "Unlimited",
        components: "V, S, M",
        materials: "A short piece of fine copper wire",
        duration: "1 round",
        description: [
            "You send a short message of twenty-five words or less to a creature with which you are familiar. The creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables creatures with Intelligence scores of at least 1 to understand the meaning of your message.",
            "You can send the message across any distance and even to other planes of existence, but if the target is on a different plane than you, there is a 5 percent chance that the message doesn’t arrive."
        ],
    }, {
        name: "Dispel Magic",
        level: "3rd",
        school: "Abjuration",
        castTime: "1 action",
        range: "120 ft",
        components: "V, S",
        duration: "Instant",
        description: [
            "Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a successful check, the spell ends.",
        ],
        higherLevel: "When you cast this spell using a spell slot of 4th level or higher, you automatically end the effects of a spell on the target if the spell's level is equal to or less than the level of the spell slot you used.",
    }, {
        name: "Water Breathing",
        level: "3rd",
        school: "Transmutation",
        castTime: "1 action",
        range: "30 ft",
        components: "V, S, M",
        materials: "A short reed or piece of straw",
        duration: "24 hours",
        ritual: true,
        description: [
            "This spell grants up to ten willing creatures you can see within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration.",
        ],
    }, {
        name: "Fly",
        level: "3rd",
        school: "Transmutation",
        castTime: "1 action",
        concentration: true,
        range: "touch",
        components: "V, S, M",
        materials: "A wing feather from any bird",
        duration: "10 Minutes",
        description: [
            "You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall.",
        ],
        higherLevel: "When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd."
    }, {
        name: "Tongues",
        level: "3rd",
        school: "Transmutation",
        castTime: "1 action",
        range: "touch",
        components: "V, M",
        materials: "A small clay model of a ziggurat",
        duration: "1 Hour",
        description: [
            "This spell grants the creature you touch the ability to understand any spoken language it hears. Moreover, when the target speaks, any creature that knows at least one language and can hear the target understands what it says.",
        ],
    }, {
        name: "Magic Circle",
        level: "3rd",
        school: "Abjuration",
        castTime: "1 minute",
        range: "10ft",
        areaOfEffect: "10ft radius, 20ft tall cylinder",
        components: "V, S, M",
        materials: "holy water or powdered silver and iron worth at least 100 gp, which the spell consumes",
        duration: "1 Hour",
        description: [
            "You create a 10-foot-radius, 20-foot-tall cylinder of magical energy centered on a point on the ground that you can see within range. Glowing runes appear wherever the cylinder intersects with the floor or other surface.",
            "Choose one or more of the following types of creatures: celestials, elementals, fey, fiends, or undead. The circle affects a creature of the chosen type in the following ways:",
            "The creature can't willingly enter the cylinder by nonmagical means. If the creature tries to use teleportation or interplanar travel to do so, it must first succeed on a Charisma saving throw.",
            "- The creature has disadvantage on attack rolls against targets within the cylinder.",
            "- Targets within the cylinder can't be charmed, frightened, or possessed by the creature.",
            "- When you cast this spell, you can elect to cause its magic to operate in the reverse direction, preventing a creature of the specified type from leaving the cylinder and protecting targets outside it.",
        ],
        higherLevel: "When you cast this spell using a spell slot of 4th level or higher, the duration increases by 1 hour for each slot level above 3rd.",
    }, {
        name: "Polymorph",
        level: "4th",
        school: "Transmutation",
        castTime: "1 action",
        concentration: true,
        range: "60 ft",
        components: "V, S, M",
        materials: "a caterpiller cocoon",
        duration: "1 hour",
        description: [
            "This spell transforms a creature that you can see within range into a new form. An unwilling creature must make a Wisdom saving throw to avoid the effect. A shapechanger automatically succeeds on this saving throw.",
            "The transformation lasts for the duration, or until the target drops to 0 hit points or dies.The new form can be any beast whose challenge rating is equal to or less than the target's (or the target's level, if it doesn't have a challenge rating). The target's game statistics, including mental ability scores, are replaced by the statistics of the chosen beast.It retains its alignment and personality.",
            "The target assumes the hit points of its new form.When it reverts to its normal form, the creature returns to the number of hit points it had before it transformed.If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form.As long as the excess damage doesn't reduce the creature's normal form to 0 hit points, it isn't knocked unconscious.",
            "The creature is limited in the actions it can perform by the nature of its new form, and it can't speak, cast spells, or take any other action that requires hands or speech.",
            "The target's gear melds into the new form. The creature can't activate, use, wield, or otherwise benefit from any of its equipment."
        ],
    }, {
        name: "Otiluke's Resilient Sphere",
        level: "4th",
        school: "Evocation",
        castTime: "1 action",
        concentration: true,
        range: "30 ft",
        components: "V, S, M",
        materials: "A hemispherical piece of clear crystal and matching hemispherical piece of gum arabic",
        duration: "1 minute",
        description: [
            "A sphere of shimmering force encloses a creature or object of Large size or smaller within range. An unwilling creature must make a Dexterity saving throw. On a failed save, the creature is enclosed for the duration.",
            "Nothing - not physical objects, energy, or other spell effects - can pass through the barrier, in or out, though a creature in the sphere can breathe there.The sphere is immune to all damage, and a creature or object inside can't be damaged by attacks or effects originating from outside, nor can a creature inside the sphere damage anything outside it.",
            "The sphere is weightless and just large enough to contain the creature or object inside.An enclosed creature can use its action to push against the sphere's walls and thus roll the sphere at up to half the creature's speed.Similarly, the globe can be picked up and moved by other creatures.",
            "A disintegrate spell targeting the globe destroys it without harming anything inside it."
        ],
    }, {
        name: "Banishment",
        level: "4th",
        school: "Abjuration",
        castTime: "1 action",
        concentration: true,
        range: "60 ft",
        components: "V, S, M",
        materials: "An item distasteful to the target",
        duration: "1 minute",
        description: [
            "You attempt to send one creature that you can see within range to another plane of existence. The target must succeed on a Charisma saving throw or be banished.",
            "If the target is native to the plane of existence you’re on, you banish the target to a harmless demiplane.While there, the target is incapacitated.The target remains there until the spell ends, at which point the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.",
            "If the target is native to a different plane of existence than the one you’re on, the target is banished with a faint popping noise, returning to its home plane.If the spell ends before 1 minute has passed, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.Otherwise, the target doesn’t return."
        ],
    }, {
        name: "Dimension Door",
        level: "4th",
        school: "Conjuration",
        castTime: "1 action",
        range: "500 ft",
        components: "V",
        duration: "Instantaneous",
        description: [
            "You teleport yourself from your current location to any other spot within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as “200 feet straight downward” or “upward to the northwest at a 45-degree angle, 300 feet.”",
            "You can bring along objects as long as their weight doesn’t exceed what you can carry.You can also bring one willing creature of your size or smaller who is carrying gear up to its carrying capacity.The creature must be within 5 feet of you when you cast this spell.",
            "If you would arrive in a place already occupied by an object or a creature, you and any creature traveling with you each take 4d6 force damage, and the spell fails to teleport you."
        ],
    }, {
        name: "Private Sanctum",
        level: "4th",
        school: "Abjuration",
        castTime: "10 minutes",
        range: "120 ft",
        areaOfEffect: "Variable",
        components: "V, S, M",
        materials: "A thin sheet of lead, a piece of opaque glass, a wad of cotton or cloth, and powdered chrysolite",
        duration: "24 Hours",
        description: [
            "You make an area within range magically secure. The area is a cube that can be as small as 5 feet to as large as 100 feet on each side. The spell lasts for the duration or until you use an action to dismiss it.",
            "When you cast the spell, you decide what sort of security the spell provides, choosing any or all of the following properties:",
            "- Sound can't pass through the barrier at the edge of the warded area.",
            "- The barrier of the warded area appears dark and foggy, preventing vision (including darkvision) through it.",
            "- Sensors created by divination spells can't appear inside the protected area or pass through the barrier at its perimeter.",
            "- Creatures in the area can't be targeted by divination spells.",
            "- Nothing can teleport into or out of the warded area.",
            "- Planar travel is blocked within the warded area.",
            "Casting this spell on the same spot every day for a year makes this effect permanent."
        ],
        higherLevel: "When you cast this spell using a spell slot of 5th level or higher, you can increase the size of the cube by 100 feet for each slot level beyond 4th. Thus you could protect a cube that can be up to 200 feet on one side by using a spell slot of 5th level."
    }, {
        name: "Secret Chest",
        level: "4th",
        school: "Conjuration",
        castTime: "1 Action",
        range: "Touch",
        components: "V, S, M",
        materials: "an exquisite chest, 3 feet by 2 feet by 2 feet, constructed from rare materials worth at least 5,000 gp, and a Tiny replica made from the same materials worth at least 50 gp",
        duration: "Instant",
        description: [
            "You hide a chest, and all its contents, on the Ethereal Plane. You must touch the chest and the miniature replica that serves as a material component for the spell. The chest can contain up to 12 cubic feet of nonliving material (3 feet by 2 feet by 2 feet).",
            "While the chest remains on the Ethereal Plane, you can use an action and touch the replica to recall the chest. It appears in an unoccupied space on the ground within 5 feet of you. You can send the chest back to the Ethereal Plane by using an action and touching both the chest and the replica.",
            "After 60 days, there is a cumulative 5 percent chance per day that the spell's effect ends. This effect ends if you cast this spell again, if the smaller replica chest is destroyed, or if you choose to end the spell as an action. If the spell ends and the larger chest is on the Ethereal Plane, it is irretrievably lost.",
        ],
        higherLevel: "When you cast this spell using a spell slot of 5th level or higher, you can increase the size of the cube by 100 feet for each slot level beyond 4th. Thus you could protect a cube that can be up to 200 feet on one side by using a spell slot of 5th level."
    }, {
        name: "Telepathic Bond",
        level: "5th",
        school: "Divination",
        castTime: "1 action",
        ritual: true,
        range: "30 ft",
        components: "V, S, M",
        materials: "pieces of eggshell from two different kinds of creatures",
        duration: "1 Hour",
        description: [
            "You forge a telepathic link among up to eight willing creatures of your choice within range, psychically linking each creature to all the others for the duration. Creatures with Intelligence scores of 2 or less aren't affected by this spell.",
            "Until the spell ends, the targets can communicate telepathically through the bond whether or not they have a common language.The communication is possible over any distance, though it can't extend to other planes of existence."
        ],
    }, {
        name: "Arcane Hand",
        level: "5th",
        school: "Evocation",
        castTime: "1 action",
        range: "120 ft",
        components: "V, S, M",
        materials: "an eggshell and a snakeskin glove",
        duration: "1 minute",
        concentration: true,
        description: [
            "You create a Large hand of shimmering, translucent force in an unoccupied space that you can see within range. The hand lasts for the spell's duration, and it moves at your command, mimicking the movements of your own hand.",
            "The hand is an object that has AC 20 and hit points equal to your hit point maximum. If it drops to 0 hit points, the spell ends.It has a Strength of 26(+ 8) and a Dexterity of 10(+0). The hand doesn't fill its space.",
            "When you cast the spell and as a bonus action on your subsequent turns, you can move the hand up to 60 feet and then cause one of the following effects with it.",
            "Clenched Fist. The hand strikes one creature or object within 5 feet of it. Make a melee spell attack for the hand using your game statistics. On a hit, the target takes 4d8 force damage.",
            "Forceful Hand. The hand attempts to push a creature within 5 feet of it in a direction you choose. Make a check with the hand's Strength contested by the Strength (Athletics) check of the target. If the target is Medium or smaller, you have advantage on the check. If you succeed, the hand pushes the target up to 5 feet plus a number of feet equal to five times your spellcasting ability modifier. The hand moves with the target to remain within 5 feet of it.",
            "Grasping Hand. The hand attempts to grapple a Huge or smaller creature within 5 feet of it. You use the hand's Strength score to resolve the grapple. If the target is Medium or smaller, you have advantage on the check. While the hand is grappling the target, you can use a bonus action to have the hand crush it. When you do so, the target takes bludgeoning damage equal to 2d6 + your spellcasting ability modifier.",
            "Interposing Hand. The hand interposes itself between you and a creature you choose until you give the hand a different command. The hand moves to stay between you and the target, providing you with half cover against the target.The target can't move through the hand's space if its Strength score is less than or equal to the hand's Strength score. If its Strength score is higher than the hand's Strength score, the target can move toward you through the hand's space, but that space is difficult terrain for the target."
        ],
        higherLevel: "When you cast this spell using a spell slot of 6th level or higher, the damage from the clenched fist option increases by 2d8 and the damage from the grasping hand increases by 2d6 for each slot level above 5th."
    }, {
        name: "Scrying",
        level: "5th",
        school: "Divination",
        castTime: "10 minutes",
        range: "Self",
        components: "V, S, M",
        materials: "A focus worth at least 1,000 gp, such as a crystal ball, a silver mirror, or a font filled with holy water",
        duration: "10 minutes",
        concentration: true,
        description: [
            "You can see and hear a particular creature you choose that is on the same plane of existence as you. The target must make a Wisdom saving throw, which is modified by how well you know the target and the sort of physical connection you have to it. If a target knows you’re casting this spell, it can fail the saving throw voluntarily if it wants to be observed.",
            "Knowledge Save Modifier",
            "Secondhand(you have heard of the target) + 5",
            "Firsthand(you have met the target) + 0",
            "Familiar(you know the target well) −5",
            "Connection Save Modifier",
            "Likeness or picture −2",
            "Possession or garment −4",
            "Body part, lock of hair, bit of nail, or the like −10",
            "On a successful save, the target isn’t affected, and you can’t use this spell against it again for 24 hours.",
            "On a failed save, the spell creates an invisible sensor within 10 feet of the target.You can see and hear through the sensor as if you were there.The sensor moves with the target, remaining within 10 feet of it for the duration.A creature that can see invisible objects sees the sensor as a luminous orb about the size of your fist.",
            "Instead of targeting a creature, you can choose a location you have seen before as the target of this spell.When you do, the sensor appears at that location and doesn’t move.",
        ]
    }, {
        name: "Teleportation Circle",
        level: "5th",
        school: "Conjuration",
        castTime: "1 minute",
        range: "10 ft",
        areaOfEffect: "10 ft",
        components: "V, M",
        materials: "rare chalks and inks infused with precious gems worth 50 gp, which the spell consumes",
        duration: "1 round",
        description: [
            "As you cast the spell, you draw a 10-foot-diameter circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice whose sigil sequence you know and that is on the same plane of existence as you. A shimmering portal opens within the circle you drew and remains open until the end of your next turn. Any creature that enters the portal instantly appears within 5 feet of the destination circle or in the nearest unoccupied space if that space is occupied.",
            "Many major temples, guilds, and other important places have permanent teleportation circles inscribed somewhere within their confines. Each such circle includes a unique sigil sequence--a string of magical runes arranged in a particular pattern. When you first gain the ability to cast this spell, you learn the sigil sequences for two destinations on the Material Plane, determined by the GM. You can learn additional sigil sequences during your adventures. You can commit a new sigil sequence to memory after studying it for 1 minute.",
            "You can create a permanent teleportation circle by casting this spell in the same location every day for one year. You need not use the circle to teleport when you cast the spell in this way."
        ]
    }, {
        name: "Wall of Force",
        level: "5th",
        school: "Evocation",
        castTime: "1 action",
        range: "120 ft",
        components: "V, S, M",
        materials: "A pinch of powder made by crushing a clear gemstone",
        duration: "10 minutes",
        concentration: true,
        description: [
            "An invisible wall of force springs into existence at a point you choose within range. The wall appears in any orientation you choose, as a horizontal or vertical barrier or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a sphere with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. In any form, the wall is 1/4 inch thick. It lasts for the duration. If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (your choice which side).",
            "Nothing can physically pass through the wall. It is immune to all damage and can't be dispelled by dispel magic. A disintegrate spell destroys the wall instantly, however. The wall also extends into the Ethereal Plane, blocking ethereal travel through the wall.",
        ]
    }, {
        name: "Animate Objects",
        level: "5th",
        school: "Transmutation",
        castTime: "1 action",
        range: "120 ft",
        components: "V, S",
        duration: "1 Minute",
        concentration: true,
        description: [
            "Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. Medium targets count as two objects, Large targets count as four objects, Huge targets count as eight objects. You can't animate any object larger than Huge. Each target animates and becomes a creature under your control until the spell ends or until reduced to 0 hit points.",
            "As a bonus action, you can mentally command any creature you made with this spell if the creature is within 500 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete.",
            "An animated object is a construct with AC, hit points, attacks, Strength, and Dexterity determined by its size. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its speed is 30 feet; if the object lacks legs or other appendages it can use for locomotion, it instead has a flying speed of 30 feet and can hover. If the object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its speed is 0. It has blindsight with a radius of 30 feet and is blind beyond that distance. When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form.",
            "If you command an object to attack, it can make a single melee attack against a creature within 5 feet of it. It makes a slam attack with an attack bonus and bludgeoning damage determined by its size. The GM might rule that a specific object inflicts slashing or piercing damage based on its form."
        ],
        higherLevel: "If you cast this spell using a spell slot of 6th level or higher, you can animate two additional objects for each slot level above 5th."
    }, {
        name: "Planar Binding",
        level: "5th",
        school: "Abjuration",
        castTime: "1 Hour",
        range: "60 ft",
        components: "V, S, M",
        materials: "A jewel worth at least 1,000 gp, which the spell consumes",
        duration: "24 Hours",
        description: [
            "With this spell, you attempt to bind a celestial, an elemental, a fey, or a fiend to your service. The creature must be within range for the entire casting of the spell. (Typically, the creature is first summoned into the center of an inverted magic circle in order to keep it trapped while this spell is cast.) At the completion of the casting, the target must make a Charisma saving throw. On a failed save, it is bound to serve you for the duration. If the creature was summoned or created by another spell, that spell's duration is extended to match the duration of this spell.",
            "A bound creature must follow your instructions to the best of its ability. You might command the creature to accompany you on an adventure, to guard a location, or to deliver a message. The creature obeys the letter of your instructions, but if the creature is hostile to you, it strives to twist your words to achieve its own objectives. If the creature carries out your instructions completely before the spell ends, it travels to you to report this fact if you are on the same plane of existence. If you are on a different plane of existence, it returns to the place where you bound it and remains there until the spell ends.",
        ],
        higherLevel: "When you cast this spell using a spell slot of a higher level, the duration increases to 10 days with a 6th-level slot, to 30 days with a 7th- level slot, to 180 days with an 8th-level slot, and to a year and a day with a 9th-level spell slot."
    }, {
        name: "Scatter",
        level: "6th",
        school: "Conjuration",
        castTime: "1 action",
        range: "30 ft",
        components: "V",
        duration: "Instant",
        description: [
            "The air quivers around up to five creatures of your choice that you can see within range. An unwilling creature must succeed on a Wisdom saving throw to resist this spell. You teleport each affected target to an unoccupied space that you can see within 120 feet of you. That space must be on the ground or on a floor.",
        ],
    }, {
        name: "Mental Prison",
        level: "6th",
        school: "Illusion",
        castTime: "1 action",
        range: "60 ft",
        components: "S",
        duration: "1 Minute",
        concentration: true,
        description: [
            "You attempt to bind a creature within an illusory cell that only it perceives. One creature you can see within range must make an Intelligence saving throw. The target succeeds automatically if it is immune to being charmed. On a successful save, the target takes 5d10 psychic damage, and the spell ends. On a failed save, the target takes 5d10 psychic damage, and you make the area immediately around the target’s space appear dangerous to it in some way. You might cause the target to perceive itself as being surrounded by fire, floating razors, or hideous maws filled with dripping teeth. Whatever form the illusion takes, the target can’t see or hear anything beyond it and is restrained for the spell’s duration. If the target is moved out of the illusion, makes a melee attack through it, or reaches any part of its body through it, the target takes 10d10 psychic damage, and the spell ends.",
        ],
    }, {
        name: "Contingency",
        level: "6th",
        school: "Evocation",
        castTime: "10 minutes",
        range: "Self",
        components: "V, S, M",
        materials: "a statuette of yourself carved from ivory and decorated with gems worth at least 1,500 gp",
        duration: "10 days",
        description: [
            "Choose a spell of 5th level or lower that you can cast, that has a casting time of 1 action, and that can target you. You cast that spell--called the contingent spell--as part of casting contingency, expending spell slots for both, but the contingent spell doesn't come into effect. Instead, it takes effect when a certain circumstance occurs. You describe that circumstance when you cast the two spells. For example, a contingency cast with water breathing might stipulate that water breathing comes into effect when you are engulfed in water or a similar liquid.",
            "The contingent spell takes effect immediately after the circumstance is met for the first time, whether or not you want it to, and then contingency ends.",
            "The contingent spell takes effect only on you, even if it can normally target others. You can use only one contingency spell at a time.",
            "If you cast this spell again, the effect of another contingency spell on you ends. Also, contingency ends on you if its material component is ever not on your person."
        ],
    }, {
        name: "Programmed Illusion",
        level: "6th",
        school: "Illusion",
        castTime: "1 action",
        range: "120 ft",
        areaOfEffect: "30ft cube",
        components: "V, S, M",
        materials: "a bit of fleece and jade dust worth at least 25 gp",
        duration: "Until Dispelled",
        description: [
            "You create an illusion of an object, a creature, or some other visible phenomenon within range that activates when a specific condition occurs. The illusion is imperceptible until then. It must be no larger than a 30-foot cube, and you decide when you cast the spell how the illusion behaves and what sounds it makes. This scripted performance can last up to 5 minutes.",
            "When the condition you specify occurs, the illusion springs into existence and performs in the manner you described. Once the illusion finishes performing, it disappears and remains dormant for 10 minutes. After this time, the illusion can be activated again.",
            "The triggering condition can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur within 30 feet of the area. For example, you could create an illusion of yourself to appear and warn off others who attempt to open a trapped door, or you could set the illusion to trigger only when a creature says the correct word or phrase.",
            "Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature.",
        ],
    }, {
        name: "Globe of Invulnerability",
        level: "6th",
        school: "Abjuration",
        castTime: "1 action",
        range: "Self",
        areaOfEffect: "10ft radius sphere",
        components: "V, S, M",
        materials: "a glass or crystal bead that shatters when the spell ends",
        duration: "1 Minute",
        concentration: true,
        description: [
            "An immobile, faintly shimmering barrier springs into existence in a 10-foot radius around you and remains for the duration.",
            "Any spell of 5th level or lower cast from outside the barrier can't affect creatures or objects within it, even if the spell is cast using a higher level spell slot. Such a spell can target creatures and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded from the areas affected by such spells.",
            "NOTE: THIS IS IN THE FLESH GRIMOIRE, so bonus action, no spell slot needed (also in main spellbook)"
        ],
        higherLevel: "When you cast this spell using a spell slot of 7th level or higher, the barrier blocks spells of one level higher for each slot level above 6th.",
    }, {
        name: "Forcecage",
        level: "7th",
        school: "Evocation",
        castTime: "1 action",
        range: "100 ft",
        components: "V, S, M",
        materials: "ruby dust worth 1,500 gp",
        duration: "1 Hour",
        description: [
            "An immobile, invisible, cube-shaped prison composed of magical force springs into existence around an area you choose within range. The prison can be a cage or a solid box, as you choose.",
            "A prison in the shape of a cage can be up to 20 feet on a side and is made from 1/2-inch diameter bars spaced 1/2 inch apart.",
            `A prison in the shape of a box can be up to 10 feet on a side, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out from the area.`,
            `When you cast the spell, any creature that is completely inside the cage's area is trapped. Creatures only partially within the area, or those too large to fit inside the area, are pushed away from the center of the area until they are completely outside the area.`,
            `A creature inside the cage can't leave it by nonmagical means. If the creature tries to use teleportation or interplanar travel to leave the cage, it must first make a Charisma saving throw. On a success, the creature can use that magic to exit the cage. On a failure, the creature can't exit the cage and wastes the use of the spell or effect. The cage also extends into the Ethereal Plane, blocking ethereal travel.`,
            `This spell can't be dispelled by dispel magic.`,
        ],
    }, {
        name: "Magnificent Mansion ",
        level: "7th",
        school: "Conjuration",
        castTime: "1 minute",
        range: "300 ft",
        areaOfEffect: "5ft wide 10ft high",
        components: "V, S, M",
        materials: "a miniature portal carved from ivory, a small piece of polished marble, and a tiny silver spoon, each item worth at least 5 gp",
        duration: "24 Hour",
        description: [
            "You conjure an extradimensional dwelling in range that lasts for the duration. You choose where its one entrance is located. The entrance shimmers faintly and is 5 feet wide and 10 feet tall. You and any creature you designate when you cast the spell can enter the extradimensional dwelling as long as the portal remains open. You can open or close the portal if you are within 30 feet of it. While closed, the portal is invisible.",
            "Beyond the portal is a magnificent foyer with numerous chambers beyond. The atmosphere is clean, fresh, and warm.",
            `You can create any floor plan you like, but the space can't exceed 50 cubes, each cube being 10 feet on each side. The place is furnished and decorated as you choose. It contains sufficient food to serve a nine-course banquet for up to 100 people. A staff of 100 near-transparent servants attends all who enter. You decide the visual appearance of these servants and their attire. They are completely obedient to your orders. Each servant can perform any task a normal human servant could perform, but they can't attack or take any action that would directly harm another creature. Thus the servants can fetch things, clean, mend, fold clothes, light fires, serve food, pour wine, and so on. The servants can go anywhere in the mansion but can't leave it. Furnishings and other objects created by this spell dissipate into smoke if removed from the mansion. When the spell ends, any creatures inside the extradimensional space are expelled into the open spaces nearest to the entrance.`,
        ],
    }, {
        name: "Teleport",
        level: "7th",
        school: "Conjuration",
        castTime: "1 action",
        range: "10 ft",
        components: "V",
        duration: "Instant",
        description: [
            "This spell instantly transports you and up to eight willing creatures of your choice that you can see within range, or a single object that you can see within range, to a destination you select. If you target an object, it must be able to fit entirely inside a 10-foot cube, and it can't be held or carried by an unwilling creature.",
            "The destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully. The GM rolls d100 and consults the table.",
            `Familiarity. "Permanent circle" means a permanent teleportation circle whose sigil sequence you know. "Associated object" means that you possess an object taken from the desired destination within the last six months, such as a book from a wizard's library, bed linen from a royal suite, or a chunk of marble from a lich's secret tomb.`,
            `"Very familiar" is a place you have been very often, a place you have carefully studied, or a place you can see when you cast the spell. "Seen casually" is someplace you have seen more than once but with which you aren't very familiar. "Viewed once" is a place you have seen once, possibly using magic. "Description" is a place whose location and appearance you know through someone else's description, perhaps from a map.`,
            `"False destination" is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a familiar location that no longer exists.`,
            `On Target. You and your group (or the target object) appear where you want to.`,
            `Off Target. You and your group (or the target object) appear a random distance away from the destination in a random direction. Distance off target is 1d10 × 1d10 percent of the distance that was to be traveled. For example, if you tried to travel 120 miles, landed off target, and rolled a 5 and 3 on the two d10s, then you would be off target by 15 percent, or 18 miles. The GM determines the direction off target randomly by rolling a d8 and designating 1 as north, 2 as northeast, 3 as east, and so on around the points of the compass. If you were teleporting to a coastal city and wound up 18 miles out at sea, you could be in trouble.`,
            `Similar Area. You and your group (or the target object) wind up in a different area that's visually or thematically similar to the target area. If you are heading for your home laboratory, for example, you might wind up in another wizard's laboratory or in an alchemical supply shop that has many of the same tools and implements as your laboratory. Generally, you appear in the closest similar place, but since the spell has no range limit, you could conceivably wind up anywhere on the plane.`,
            `Mishap. The spell's unpredictable magic results in a difficult journey. Each teleporting creature (or the target object) takes 3d10 force damage, and the GM rerolls on the table to see where you wind up (multiple mishaps can occur, dealing damage each time).`,
        ],
    }, {
        name: "Reverse Gravity",
        level: "7th",
        school: "Transmutation",
        castTime: "1 action",
        range: "100ft",
        areaOfEffect: "100ft tall, 50ft radius",
        components: "V, S, M",
        materials: "a lodestone and iron filings",
        duration: "1 minute",
        concentration: true,
        description: [
            "This spell reverses gravity in a 50-foot-radius, 100- foot high cylinder centered on a point within range. All creatures and objects that aren't somehow anchored to the ground in the area fall upward and reach the top of the area when you cast this spell. A creature can make a Dexterity saving throw to grab onto a fixed object it can reach, thus avoiding the fall.",
            "If some solid object (such as a ceiling) is encountered in this fall, falling objects and creatures strike it just as they would during a normal downward fall. If an object or creature reaches the top of the area without striking anything, it remains there, oscillating slightly, for the duration.",
            "At the end of the duration, affected objects and creatures fall back down.",
        ],
    }, {
        name: "Etherealness",
        level: "7th",
        school: "Transmutation",
        castTime: "1 action",
        range: "self",
        components: "V, S",
        duration: "8 hours",
        description: [
            "You step into the border regions of the Ethereal Plane, in the area where it overlaps with your current plane. You remain in the Border Ethereal for the duration or until you use your action to dismiss the spell. During this time, you can move in any direction. If you move up or down, every foot of movement costs an extra foot. You can see and hear the plane you originated from, but everything there looks gray, and you can't see anything more than 60 feet away.",
            "While on the Ethereal Plane, you can only affect and be affected by other creatures on that plane. Creatures that aren't on the Ethereal Plane can't perceive you and can't interact with you, unless a special ability or magic has given them the ability to do so.",
            "You ignore all objects and effects that aren't on the Ethereal Plane, allowing you to move through objects you perceive on the plane you originated from.",
            "When the spell ends, you immediately return to the plane you originated from in the spot you currently occupy. If you occupy the same spot as a solid object or creature when this happens, you are immediately shunted to the nearest unoccupied space that you can occupy and take force damage equal to twice the number of feet you are moved.",
            "This spell has no effect if you cast it while you are on the Ethereal Plane or a plane that doesn't border it, such as one of the Outer Planes.",
        ],
        higherLevel: "When you cast this spell using a spell slot of 8th level or higher, you can target up to three willing creatures (including you) for each slot level above 7th. The creatures must be within 10 feet of you when you cast the spell.",
    }, {
        name: "Demiplane",
        level: "8th",
        school: "Conjuration",
        castTime: "1 action",
        range: "60ft",
        components: "S",
        duration: "1 hour",
        description: [
            "You create a shadowy door on a flat solid surface that you can see within range. The door is large enough to allow Medium creatures to pass through unhindered. When opened, the door leads to a demiplane that appears to be an empty room 30 feet in each dimension, made of wood or stone. When the spell ends, the door disappears, and any creatures or objects inside the demiplane remain trapped there, as the door also disappears from the other side.",
            "Each time you cast this spell, you can create a new demiplane, or have the shadowy door connect to a demiplane you created with a previous casting of this spell. Additionally, if you know the nature and contents of a demiplane created by a casting of this spell by another creature, you can have the shadowy door connect to its demiplane instead.",
        ],
    }, {
        name: "Antimagic Field",
        level: "8th",
        school: "Abjuration",
        castTime: "1 action",
        range: "Self",
        components: "V, S, M",
        materials: "A pinch of powdered iron or iron filings",
        duration: "1 hour",
        concentration: true,
        areaOfEffect: "10ft sphere",
        description: [
            "A 10-foot-radius invisible sphere of antimagic surrounds you. This area is divorced from the magical energy that suffuses the multiverse. Within the sphere, spells can't be cast, summoned creatures disappear, and even magic items become mundane. Until the spell ends, the sphere moves with you, centered on you.",
            "Spells and other magical effects, except those created by an artifact or a deity, are suppressed in the sphere and can't protrude into it. A slot expended to cast a suppressed spell is consumed. While an effect is suppressed, it doesn't function, but the time it spends suppressed counts against its duration.",
            "Targeted Effects. Spells and other magical effects, such as magic missile and charm person, that target a creature or an object in the sphere have no effect on that target.",
            "Areas of Magic. The area of another spell or magical effect, such as fireball, can't extend into the sphere. If the sphere overlaps an area of magic, the part of the area that is covered by the sphere is suppressed. For example, the flames created by a wall of fire are suppressed within the sphere, creating a gap in the wall if the overlap is large enough.",
            "Spells. Any active spell or other magical effect on a creature or an object in the sphere is suppressed while the creature or object is in it.",
            "Magic Items. The properties and powers of magic items are suppressed in the sphere. For example, a longsword, +1 in the sphere functions as a nonmagical longsword.",
            "A magic weapon's properties and powers are suppressed if it is used against a target in the sphere or wielded by an attacker in the sphere. If a magic weapon or a piece of magic ammunition fully leaves the sphere (for example, if you fire a magic arrow or throw a magic spear at a target outside the sphere), the magic of the item ceases to be suppressed as soon as it exits.",
            "Magical Travel. Teleportation and planar travel fail to work in the sphere, whether the sphere is the destination or the departure point for such magical travel. A portal to another location, world, or plane of existence, as well as an opening to an extradimensional space such as that created by the rope trick spell, temporarily closes while in the sphere.",
            "Creatures and Objects. A creature or object summoned or created by magic temporarily winks out of existence in the sphere. Such a creature instantly reappears once the space the creature occupied is no longer within the sphere.",
            "Dispel Magic. Spells and magical effects such as dispel magic have no effect on the sphere. Likewise, the spheres created by different antimagic field spells don't nullify each other.",
        ],
    }, {
        name: "Dominate Monster",
        level: "8th",
        school: "Enchantment",
        castTime: "1 action",
        range: "60ft",
        components: "V, S",
        duration: "1 hour",
        concentration: true,
        description: [
            "You attempt to beguile a creature that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.",
            `While the creature is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as "Attack that creature," "Run over there," or "Fetch that object." If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.`,
            "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well.",
            "Each time the target takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends.",
        ],
        higherLevel: "When you cast this spell with a 9th-level spell slot, the duration is concentration, up to 8 hours.",
    }, {
        name: "Illusory Dragon",
        level: "8th",
        school: "Illusion",
        castTime: "1 action",
        range: "120ft",
        components: "S",
        duration: "1 minute",
        concentration: true,
        description: [
            "By gathering threads of shadow material from the Shadowfell, you create a Huge shadowy dragon in an unoccupied space that you can see within range. The illusion lasts for the spell’s duration and occupies its space, as if it were a creature.",
            `When the illusion appears, any of your enemies that can see it must succeed on a Wisdom saving throw or become frightened of it for 1 minute. If a frightened creature ends its turn in a location where it doesn’t have line of sight to the illusion, it can repeat the saving throw, ending the effect on itself on a success.`,
            "As a bonus action on your turn, you can move the illusion up to 60 feet. At any point during its movement, you can cause it to exhale a blast of energy in a 60-foot cone originating from its space. When you create the dragon, choose a damage type: acid, cold, fire, lightning, necrotic, or poison. Each creature in the cone must make an Intelligence saving throw, taking 7d6 damage of the chosen damage type on a failed save, or half as much damage on a successful one.",
            "The illusion is tangible because of the shadow stuff used to create it, but attacks miss it automatically, it succeeds on all saving throws, and it is immune to all damage and conditions. A creature that uses an action to examine the dragon can determine that it is an illusion by succeeding on an Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through it and has advantage on saving throws against its breath.",
        ],
    }, {
        name: "Antipathy/Sympathy",
        level: "8th",
        school: "Enchantment",
        castTime: "1 hour",
        range: "60ft",
        components: "V, S, M",
        materials: "either a lump of alum soaked in vinegar for the antipathy effect or a drop of honey for the sympathy effect",
        duration: "10 days",
        description: [
            "This spell attracts or repels creatures of your choice. You target something within range, either a Huge or smaller object or creature or an area that is no larger than a 200-foot cube. Then specify a kind of intelligent creature, such as red dragons, goblins, or vampires. You invest the target with an aura that either attracts or repels the specified creatures for the duration. Choose antipathy or sympathy as the aura's effect.",
            `Antipathy. The enchantment causes creatures of the kind you designated to feel an intense urge to leave the area and avoid the target. When such a creature can see the target or comes within 60 feet of it, the creature must succeed on a Wisdom saving throw or become frightened. The creature remains frightened while it can see the target or is within 60 feet of it. While frightened by the target, the creature must use its movement to move to the nearest safe spot from which it can't see the target. If the creature moves more than 60 feet from the target and can't see it, the creature is no longer frightened, but the creature becomes frightened again if it regains sight of the target or moves within 60 feet of it.`,
            "Sympathy. The enchantment causes the specified creatures to feel an intense urge to approach the target while within 60 feet of it or able to see it. When such a creature can see the target or comes within 60 feet of it, the creature must succeed on a Wisdom saving throw or use its movement on each of its turns to enter the area or move within reach of the target. When the creature has done so, it can't willingly move away from the target.",
            "If the target damages or otherwise harms an affected creature, the affected creature can make a Wisdom saving throw to end the effect, as described below.",
            "Ending the Effect. If an affected creature ends its turn while not within 60 feet of the target or able to see it, the creature makes a Wisdom saving throw. On a successful save, the creature is no longer affected by the target and recognizes the feeling of repugnance or attraction as magical. In addition, a creature affected by the spell is allowed another Wisdom saving throw every 24 hours while the spell persists.",
            "A creature that successfully saves against this effect is immune to it for 1 minute, after which time it can be affected again.",
        ],
    }, {
        name: "Mind Blank",
        level: "8th",
        school: "Abjuration",
        castTime: "1 Action",
        range: "Touch",
        components: "V, S",
        duration: "24 Hours",
        description: [
            "Until the spell ends, one willing creature you touch is immune to psychic damage, any effect that would sense its emotions or read its thoughts, divination spells, and the charmed condition. The spell even foils wish spells and spells or effects of similar power used to affect the target's mind or to gain information about the target.",
        ],
    }, {
        name: "Telepathy",
        level: "8th",
        school: "Evocation",
        castTime: "1 Action",
        range: "Unlimited",
        components: "V, S, M",
        materials: "a pair of linked silver rings",
        duration: "24 Hours",
        description: [
            "You create a telepathic link between yourself and a willing creature with which you are familiar. The creature can be anywhere on the same plane of existence as you. The spell ends if you or the target are no longer on the same plane.",
            "Until the spell ends, you and the target can instantaneously share words, images, sounds, and other sensory messages with one another through the link, and the target recognizes you as the creature it is communicating with. The spell enables a creature with an Intelligence score of at least 1 to understand the meaning of your words and take in the scope of any sensory messages you send to it.",
        ],
    }, {
        name: "Wish",
        level: "9th",
        school: "Conjuration",
        castTime: "1 Action",
        range: "Self",
        components: "V",
        duration: "Instantaneous",
        description: [
            "Wish is the mightiest spell a mortal creature can cast. By simply speaking aloud, you can alter the very foundations of reality in accord with your desires.",
            "The basic use of this spell is to duplicate any other spell of 8th level or lower. You don't need to meet any requirements in that spell, including costly components. The spell simply takes effect.",
            "Alternatively, you can create one of the following effects of your choice:",
            "- You create one object of up to 25,000 gp in value that isn't a magic item. The object can be no more than 300 feet in any dimension, and it appears in an unoccupied space you can see on the ground.",
            "- You allow up to twenty creatures that you can see to regain all hit points, and you end all effects on them described in the greater restoration spell.",
            "- You grant up to ten creatures that you can see resistance to a damage type you choose.",
            "- You grant up to ten creatures you can see immunity to a single spell or other magical effect for 8 hours. For instance, you could make yourself and all your companions immune to a lich's life drain attack.",
            "- You undo a single recent event by forcing a reroll of any roll made within the last round (including your last turn). Reality reshapes itself to accommodate the new result. For example, a wish spell could undo an opponent's successful save, a foe's critical hit, or a friend's failed save. You can force the reroll to be made with advantage or disadvantage, and you can choose whether to use the reroll or the original roll.",
            "You might be able to achieve something beyond the scope of the above examples. State your wish to the DM as precisely as possible. The DM has great latitude in ruling what occurs in such an instance, the greater the wish, the greater the likelihood that something goes wrong. This spell might simply fail, the effect you desire might only be partly achieved, or you might suffer some unforeseen consequence as a result of how you worded the wish. For example, wishing that a villain were dead might propel you forward in time to a period when that villain is no longer alive, effectively removing you from the game. Similarly, wishing for a legendary magic item or artifact might instantly transport you to the presence of the item's current owner.",
            "The stress of casting this spell to produce any effect other than duplicating another spell weakens you. After enduring that stress, each time you cast a spell until you finish a long rest, you take 1d10 necrotic damage per level of that spell. This damage can't be reduced or prevented in any way. In addition, your Strength drops to 3, if it isn't 3 or lower already, for 2d4 days. For each of those days that you spend resting and doing nothing more than light activity, your remaining recovery time decreases by 2 days. Finally, there is a 33 percent chance that you are unable to cast wish ever again if you suffer this stress.",
        ],
    }, {
        name: "Prismatic Wall",
        level: "9th",
        school: "Abjuration",
        castTime: "1 Action",
        range: "60ft",
        components: "V, S",
        duration: "10 minutes",
        description: [
            "A shimmering, multicolored plane of light forms a vertical opaque wall—up to 90 feet long, 30 feet high, and 1 inch thick—centered on a point you can see within range. Alternatively, you can shape the wall into a sphere up to 30 feet in diameter centered on a point you choose within range. The wall remains in place for the duration. If you position the wall so that it passes through a space occupied by a creature, the spell fails, and your action and the spell slot are wasted.",
            "The wall sheds bright light out to a range of 100 feet and dim light for an additional 100 feet. You and creatures you designate at the time you cast the spell can pass through and remain near the wall without harm. If another creature that can see the wall moves to within 20 feet of it or starts its turn there, the creature must succeed on a Constitution saving throw or become blinded for 1 minute.",
            "The wall consists of seven layers, each with a different color. When a creature attempts to reach into or pass through the wall, it does so one layer at a time through all the wall’s layers. As it passes or reaches through each layer, the creature must make a Dexterity saving throw or be affected by that layer’s properties as described below.",
            "The wall can be destroyed, also one layer at a time, in order from red to violet, by means specific to each layer. Once a layer is destroyed, it remains so for the duration of the spell. A rod of cancellation destroys a prismatic wall, but an antimagic field has no effect on it.",
            "1. Red. The creature takes 10d6 fire damage on a failed save, or half as much damage on a successful one. While this layer is in place, nonmagical ranged attacks can’t pass through the wall. The layer can be destroyed by dealing at least 25 cold damage to it.",
            "2. Orange. The creature takes 10d6 acid damage on a failed save, or half as much damage on a successful one. While this layer is in place, magical ranged attacks can’t pass through the wall. The layer is destroyed by a strong wind.",
            "3. Yellow. The creature takes 10d6 lightning damage on a failed save, or half as much damage on a successful one. This layer can be destroyed by dealing at least 60 force damage to it.",
            "4. Green. The creature takes 10d6 poison damage on a failed save, or half as much damage on a successful one. A passwall spell, or another spell of equal or greater level that can open a portal on a solid surface, destroys this layer.",
            "5. Blue. The creature takes 10d6 cold damage on a failed save, or half as much damage on a successful one. This layer can be destroyed by dealing at least 25 fire damage to it.",
            "6. Indigo. On a failed save, the creature is restrained. It must then make a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the spell ends. If it fails its save three times, it permanently turns to stone and is subjected to the petrified condition. The successes and failures don’t need to be consecutive; keep track of both until the creature collects three of a kind.",
            "   While this layer is in place, spells can’t be cast through the wall. The layer is destroyed by bright light shed by a daylight spell or a similar spell of equal or higher level.",
            "7. Violet. On a failed save, the creature is blinded. It must then make a Wisdom saving throw at the start of your next turn. A successful save ends the blindness. If it fails that save, the creature is transported to another plane of the GM’s choosing and is no longer blinded. (Typically, a creature that is on a plane that isn’t its home plane is banished home, while other creatures are usually cast into the Astral or Ethereal planes.) This layer is destroyed by a dispel magic spell or a similar spell of equal or higher level that can end spells and magical effects.",
        ],
    }, {
        name: "Gate",
        level: "9th",
        school: "Conjuration",
        castTime: "1 Action",
        concentration: true,
        range: "60ft",
        components: "V, S, M",
        materials: "Diamond worth at least 5000gp",
        duration: "1 Minute",
        description: [
            "You conjure a portal linking an unoccupied space you can see within range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter. You can orient the portal in any direction you choose. The portal lasts for the duration.",
            "The portal has a front and a back on each plane where it appears. Travel through the portal is possible only by moving through its front. Anything that does so is instantly transported to the other plane, appearing in the unoccupied space nearest to the portal.",
            "Deities and other planar rulers can prevent portals created by this spell from opening in their presence or anywhere within their domains.",
            "When you cast this spell, you can speak the name of a specific creature (a pseudonym, title, or nickname doesn't work). If that creature is on a plane other than the one you are on, the portal opens in the named creature's immediate vicinity and draws the creature through it to the nearest unoccupied space on your side of the portal. You gain no special power over the creature, and it is free to act as the GM deems appropriate. It might leave, attack you, or help you.",
        ],
    }, 
];
