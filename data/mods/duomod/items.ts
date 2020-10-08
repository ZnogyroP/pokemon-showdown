export const Items: {[k: string]: ModdedItemData} = {
	drytorch: {
		name: "Dry Torch",
		spritenum: 61,
		fling: {
			basePower: 30,
		},
		onTryHit(target, source, move) {
			if (source.hasType('Fire')) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('drytorch')) {
				}
			}}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('drytorch');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'item: Dry Torch');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Dry Torch boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Dry Torch boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Dry Torch', '[silent]');
			},
		},
		num: 1502.1,
		gen: 2,
		desc: "If the holder is Fire-type and gets hit by a Fire-type move, the holder's Fire-type attacks have 1.5x power.",
	},
	brittlealloy: {
		name: "Brittle Alloy",
		spritenum: 286,
		fling: {
			basePower: 30,
		},
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Steel')) {
				return this.chainModify(0.7);
			}
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Steel')) {
				return this.chainModify(0.7);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType('Steel')) {
				return this.chainModify(1.5);
			}
		},
		num: 1507.1,
		gen: 2,
		desc: "If the holder is a Steel-type, they gain 1.5x Speed, but drops to 0.7x in Defense and Sp.Def.",
		shortDesc: "Holder Steel-type gains 1.5x Speed, loses 0.7x bulk.",
	},
	dangersiren: {
		name: "Danger Siren",
		spritenum: 272,
		fling: {
			basePower: 80,
		},
		onAfterHit(target, source, move) {
			if (move.totalDamage <= target.maxhp / 10 && damage !== 0) {
			source.switchFlag = true;
			}	
		},
		num: 1508.1,
		gen: 4,
		desc: "Switches the user out if they deal less than 10% with an attacking move.",
	},
  freshherb: {
		name: "Fresh Herb",
		spritenum: 475,
		fling: {
			basePower: 30,
		},
		onSwitchOut(pokemon) {
			if (pokemon.hasType('Grass')) {
				pokemon.heal(pokemon.baseMaxhp / 4);
			}
		},
		num: 1501.1,
		gen: 4,
		desc: "If the user is a Grass-type, it regains 1/4th of its max HP upon switching out.",
	},
  waterbucket: {
		name: "Water Bucket",
		spritenum: 430,
		fling: {
			basePower: 10,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hasType('Water')) {
      if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Water Bucket debuff');
				return this.chainModify(0.5);}
      }
		},
		num: 1503.1,
		gen: 3,
		desc: "If the holder is Water-type, they take half damage from resisted moves and double damage from super-effective moves.",
	},

	lightfeather: {
		name: "Light Feather",
		spritenum: 535,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hasType('Flying')) {
			if (this.queue.willMove(target)) {
				this.debug('Light Feather damage boost');
				return move.basePower * 1.2;
			}
			this.debug('Light Feather NOT boosted');
			return move.basePower;
		}},
		num: 1504.1,
		gen: 3,
		desc: "Boosts the power of a Flying-type holder by 1.2x if they move first.",
	},
	powergenerator: {
		name: "Power Generator",
		spritenum: 118,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			if (pokemon.hasType('Electric')) {
			pokemon.addVolatile('generating');
      }
    },
		condition: {
			duration: 5,
			onStart(target) {
				this.add('-start', target, 'item: Power Generator');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1);
			},
			onEnd(target) {
				this.boost(atk: 1, def: 1, spa: 1, spd: 1, spe: 1);
      },
		},
		num: 1505.1,
		gen: 5,
		desc: "If an Electric-type holder stays on the field for 5 turns, it gains a +1 boost in all stats.",
	},
  oddscale: {
		name: "Odd Scale",
		spritenum: 108,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (target !== source && move.category !== 'Status') {
				if (target.hasType('Dragon')) {
					this.boost({atk: 1, spa: 1});
				}
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.getMove(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},	
		num: 1506.1,
		gen: 2,
		desc: "If the holder is Dragon-type, they cannot use Status moves. However, they gain +1 Atk. and Sp.Atk whenever hit.",
	},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	brightjewel: {
		name: "Bright Jewel",
		spritenum: 141,
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move?.effectType === 'Move' && this.activeMove.id === 'knockoff' || this.activeMove.id === 'corrosivegas' && this.activeMove.id === 'trick' || this.activeMove.id === 'switcheroo') {
				this.damage(source.baseMaxhp / 6, source, target);
				return false;
			}
		},

		num: 1509.1,
		gen: 5,
		onTakeItem: false,
		desc: "Holder's item cannot be removed. If attempted, damages foe.",
	},

	grayscarf: {
		name: "Gray Scarf",
		spritenum: 179,
		fling: {
			basePower: 90,
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (pokemon.hasType('Normal')) {
				if (move?.type === 'Normal') return priority + 1;
			}
		},
		num: 1510.1,
		gen: 4,
		desc: "Holder's Normal-type moves have +1 priority.",
	},
	sereneballoon: {
		name: "Serene Balloon",
		spritenum: 6,
		fling: {
			basePower: 30,
		},
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Fairy')) {
				return this.chainModify(1.2);
			}
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Fairy')) {
				return this.chainModify(1.2);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType('Fairy')) {
				return this.chainModify(1.2);
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.getMove(moveSlot.move).category !== 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},	
		num: 1511.1,
		gen: 2,
		desc: "If the holder is a Steel-type, they gain 1.2x in Speed and both defensive stats, but cannot use attacking moves.",
		shortDesc: "Holder Fairy-type gains 1.2x Def, Sp.Def, Speed; cannot attack.",
	},
	ninevoltbattery: {
		name: "Nine-Volt Battery",
		spritenum: 60,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			if (pokemon.hasType('Electric')) {
				this.boost({spe: 1}, pokemon);
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasType('Electric')) {
				if (pokemon.activeTurns) {
					this.boost({spe: -12});
				}
			}
		},
		num: 1512.1,
		gen: 5,
		desc: "Raises holder's Attack by 1 if hit by an Electric-type attack. Single use.",
	},

};