export type SpellLevel = "Cantrip" | "1st" | "2nd" | "3rd" | "4th" | "5th" | "6th" | "7th" | "8th" | "9th"

export type SpellSchool = string //TODO: list schools of magic

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

export const MAX_PREPARED = 14;

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
        range: "30 ft",
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
        range: "10 ft",
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
        range: "60 ft",
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
        range: "60 ft",
        components: "V, S",
        duration: "Instant",
        description: [
            "You point at one creature you can see within range, and the sound of a dolorous bell fills the air around it for a moment. The target must succeed on a Wisdom saving throw or take 1d8 necrotic damage. If the target is missing any of its hit points, it instead takes 1d12 necrotic damage."
        ],
        higherLevel: "The spell’s damage increases by one die when you reach 5th level (2d8 or 2d12), 11th level (3d8 or 3d12), and 17th level (4d8 or 4d12)."
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
        duration: "Instantaneous",
        description: [
            "Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a successful check, the spell ends.",
        ],
        higherLevel: "When you cast this spell using a spell slot of 4th level or higher, you automatically end the effects of a spell on the target if the spell's level is equal to or less than the level of the spell slot you used.",
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
    },
];
