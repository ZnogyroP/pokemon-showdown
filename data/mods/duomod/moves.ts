/*

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
	dirtyscheme: {
		num: 3003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's primary stats by 1 stage. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then raises most stats by 1.",
		name: "Dirty Scheme",
		pp: 8,
		priority: 0,
		flags: {charge: 1, nonsky: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	appletree: {
		num: 1016.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Heals the opponent by 30% of their max HP, but heals the user by 70%.",
		shortDesc: "Heals user by 70%, target by 30%.",
		name: "Apple Tree",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon, target) {
			move.heal = [3, 10];
		},
		secondary: null,
		self: {
		heal: [7, 10] },
		target: "normal",
		type: "Grass",
		contestType: "Cute",
	},
	wildfire: {
		num: 3004,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		desc: "Has a 100% chance to burn the target.",
		shortDesc: "100% chance to burn the target.",
		name: "Wildfire",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	washout: {
		num: 3005,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "This move's type effectiveness against Poison is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Poison.",
		name: "Wash Out",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Poison') return 1;
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	chargedstone: {
		num: 3006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/40, 1/20, 1/10, 1/5, or 1/2.5 of their maximum HP, rounded down, based on their weakness to the Electric type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Spinning Web or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Electric weakness.",
		name: "Charged Stone",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'chargedstone',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Charged Stone');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('chargedstone')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 10);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Electric",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	jewelshards: {
		num: 3007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Hurts grounded foes on switch-in with 2 layers.",
		name: "Jewel Shards",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'jewelshards',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Jewel Shards');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'Jewel Shards');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 0, 1];
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 5);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	dedefog: {
		num: 3008,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Prevents the target from using Defog.",
		shortDesc: "Target can't use Defog.",
		name: "De-Defog",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'taunt',
		condition: {
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: De-defog');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: De-defog');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (move.id == 'Defog' || move.id == 'Spinning Web') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (move.id == 'Defog' || move.id == 'Spinning Web') {
					this.add('cant', attacker, 'move: De-defog', move);
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	piercingshot: {
		num: 2006,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Defense by 2 stages.",
		shortDesc: "100% chance to lower the target's Defense by 2.",
		name: "Piercing Shot",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -2,
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	clearbeam: {
		num: 1033.1,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Does not factor type effectiveness.",
		name: "Clear Beam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 0;
			if (type === 'Grass') return 0;
			if (type === 'Fire') return 0;
			if (type === 'Water') return 0;
			if (type === 'Electric') return 0;
			if (type === 'Flying') return 0;
			if (type === 'Ground') return 0;
			if (type === 'Dragon') return 0;
			if (type === 'Fairy') return 0;
			if (type === 'Steel') return 0;
			if (type === 'Bug') return 0;
			if (type === 'Poison') return 0;
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	roulettewheel: {
		num: 1013.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "A signature move of the Roulettemons. Try it out!",
		shortDesc: "Use it yourself.",
		name: "Roulette Wheel",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source) {
			const result = this.random(3);
			if (result === 0) {
				target.trySetStatus('brn', source);
			} else if (result === 1) {
				target.trySetStatus('par', source);
			} else {
				target.trySetStatus('tox', source);
			}
		},
		onTryMove(target, source) {
			const result = this.random(3);
			if (result === 0) {
				this.field.setTerrain('grassyterrain');
			} else if (result === 1) {
				this.field.setTerrain('electricterrain');
			} else {
				this.field.setTerrain('mistyterrain');
			}
		},
		onTryHit(target, source) {
			const result = this.random(3);
			if (result === 0) {
				this.field.setWeather('sunnyday');
			} else if (result === 1) {
				this.field.setWeather('raindance');
			} else {
				this.field.setWeather('sandstorm');
			}
		},
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	spinningweb: {
		num: 3009,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field.",
		shortDesc: "Free user from hazards/bind/Leech Seed.",
		name: "Spinning Web",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit(target) {
			if (target.hasType('Fire')) return false;					}
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Spinning Web', '[of] ' + pokemon);
			}
			const sideConditions = ['dewyflowers', 'chargedstone', 'jewelshards'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Spinning Web', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['dewyflowers', 'chargedstone', 'jewelshards'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Spinning Web', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	rancidrush: {
		num: 1026.1,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Power doubles if the target is poisoned.",
		shortDesc: "Power doubles if the target is poisoned.",
		name: "Rancid Rush",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
				return false;
			}
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
};
