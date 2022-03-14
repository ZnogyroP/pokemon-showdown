/*
i'm sorry it looks disgusting i made a lot of this a long time ago

List of flags and their descriptions:

authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.

*/

export const Moves: {[moveid: string]: MoveData} = {

	deeznutsjoke: {
		num: 669,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Does stuff.",
		name: "Deez Nuts Joke",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'deeznutsjoke',
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Deez Nuts Joke');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Deez Nuts Joke');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
					if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Deez Nuts Joke', move);
					return false;
				}
			},
		},
		boosts: {
			atk: 3,
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	dundaboat: {
		num: 3001,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Paralyzes target or user; can't use if statused.",
		name: "Dundaboat",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry(pokemon) {
			if (pokemon.status) {
				return null;
			}
		},
		onHit(target, source, move) {
			const result = this.random(2);
			if (result === 0) {
				target.trySetStatus('par', source);
			}
			else {
				if (source.hasType('Electric')) {
					source.setType(source.getTypes(true).map(type => type === "Electric" ? "???" : type));
					this.add('-start', source, 'typechange', source.types.join('/'), '[from] move: Dundaboat');
				}
				source.trySetStatus('par', source);
			}
		}
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	extremebeam: {
		num: 3002,
		accuracy: 100,
		basePower: 300,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following two turns and cannot select a move.",
		shortDesc: "User cannot move next two turns.",
		name: "EXTREME BEAM",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
			duration: 2,
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	neutralair: {
		num: 3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, abilities become nullified.",
		name: "Neutral Air",
		pp: 5,
		priority: 0,
		flags: {},
		pseudoWeather: 'neutralair',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('floatstone')) {
					return 8;
				}
				return 5;
			},
			onStart(side, source) {
				this.add('-fieldstart', 'move: Neutral Air', '[of] ' + source);
				const (pokemon for getAllActive()) {
					this.add('-endability', pokemon);
					this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon, pokemon, 'neutralair');
				}
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('neutralair');
			},
			onResidualOrder: 24,
			onEnd() {
				this.add('-fieldend', 'move: Neutral Air');
			},
		},
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	quadrupleaxel: {
		num: 3006,
		accuracy: 60,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		desc: "Hits three times. Power increases to 40 for the second hit, 60 for the third, and 80 for the fourth. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. The user does not have Skill Link because I'm not doing that.",
		shortDesc: "Hits 4 times. Each hit can miss, but power rises.",
		name: "Quadruple Axel",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},


	skitterout: {
		num: 3008,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "The user switches the target out, then switches out.",
		name: "Skitter Out",
		pp: 1,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		forceSwitch: true,
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cute",
	},
	striketheearth: {
		num: 3009,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles.striketheearth || move.hit === 1) {
				pokemon.addVolatile('striketheearth');
			}
			return this.clampIntRange(move.basePower * pokemon.volatiles.furycutter.multiplier, 1, 140);
		},
		category: "Physical",
		shortDesc: "Power doubles if used last turn.",
		name: "Strike the Earth",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.multiplier < 2) {
					this.effectData.multiplier <<= 1;
				}
				this.effectData.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	stupidcannon: {
		num: 3010,
		accuracy: 100,
		basePower: 0,
		damage: 5,
		category: "Special",
		shortDesc: "For your own sake, please don't use this.",
		name: "Stupid Cannon",
		pp: 10,
		priority: 0,
		flags: {bullet, protect: 1, mirror: 1},
		multihit: 22,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	watershield: {
		num: 3011,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "The user gains armor that punishes contact.",
		name: "Water Shield",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'watershield',
		condition: {
			var waterCount: number;
			onStart(side) {
				this.add('-sidestart', side, 'Water Shield' + waterCount);
				waterCount = 8;
			},
			onDamagingHitOrder: 1,
			onDamagingHit(damage, target, source, move) {
				if (move.flags['contact']) {
					this.damage(source.baseMaxhp / 16, source, target);
					waterCount = waterCount - 1;
				}
			}
			onEnd(side) {
				waterCount = 0;
				this.add('-sideend', side, 'Water Shield');
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},

	
};