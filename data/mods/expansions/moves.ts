export const Moves: {[moveid: string]: ModdedMoveData} = {
	
	"gastroacid": {
		inherit: true,
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
				if (pokemon.m.innates) (pokemon.m.innates as string[]).forEach(innate => pokemon.removeVolatile("ability" + innate));
			},
		},
	},
	
	fifthmove: {
		num: 3000,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Fifth Move",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onHit(target, source, effect) {
			if (source.species.name === 'Threedy') {
				this.useMove("Replicate", source);
			}
			if (source.species.name === 'Amvip') {
				this.useMove("Lethal Fang", source);
			}
			if (source.species.name === 'Capsaken') {
				this.useMove("Revitalization", source);
			}
			if (source.species.name === 'Shinamako') {
				this.useMove("Cumbersome Crash", source);
			}
			if (source.species.name === 'Abrakin') {
				this.useMove("Curse of the Moon", source);
			}
			if (source.species.name === 'Avasterror') {
				this.useMove("Poseidon's Breath", source);
			}
			if (source.species.name === 'Dustrake') {
				this.useMove("Duststorm Whip-Up", source);
			}
			if (source.species.name === 'Eneryth') {
				this.useMove("Energy Breaker", source);
			}
			if (source.species.name === 'Skyrider') {
				this.useMove("Final Judgment", source);
			}
			if (source.species.name === 'Tusquoka') {
				this.useMove("Enforcer Punch", source);
			}
			if (source.species.name === 'Turbulusk') {
				this.useMove("Liftoff", source);
			}
		},
		target: "self",
		type: "Normal",
		contestType: "Cute",
	},
	
	replicate: {
		num: 3001,
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		name: "Replicate",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemData, source, source, move, item)) return false;
			if (!item.fling) return false;
			move.basePower = item.fling.basePower;
			if (item.isBerry) {
				move.onHit = function (foe) {
					if (this.singleEvent('Eat', item, null, foe, null, null)) {
						this.runEvent('EatItem', foe, null, null, item);
						if (item.id === 'leppaberry') foe.staleness = 'external';
					}
					if (item.onEat) foe.ateBerry = true;
				};
			} else if (item.fling.effect) {
				move.onHit = item.fling.effect;
			} else {
				if (!move.secondaries) move.secondaries = [];
				if (item.fling.status) {
					move.secondaries.push({status: item.fling.status});
				} else if (item.fling.volatileStatus) {
					move.secondaries.push({volatileStatus: item.fling.volatileStatus});
				}
			}
			source.addVolatile('fling');
		},
    
    /// this is basically just a fling that doesn't remove the user's item for now, no idea where to even start with coding this
		
    secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cute",
	},

	lethalfang: {
		num: 3002,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Lethal Fang",
		pp: 1,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'tox',
      boosts: {
        atk: -1,
				def: -1,
        spa: -1,
        spd: -1,
        spe: -1,
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},

	revitalization: {
		num: 3003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Revitalization",
		pp: 1,
		priority: 0,
		flags: {heal: 1},
		onHit(target, source, move) {
			this.heal(target.maxhp);
      this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "self",
		type: "Fire",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},

	cumbersomecrash: {
		num: 3004,
		accuracy: 100,
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Fishious Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Fishious Rend NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		name: "Cumbersome Crash",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
	},
  
  curseofthemoon: {
		num: 3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Curse of the Moon",
		pp: 1,
		priority: 0,
		flags: {mystery: 1},
		onHit(target) {
			this.add('-start', target, 'typechange', 'Ghost', 'Dark');
		},
    boosts: {
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Cool",
	},

	poseidonsbreath: {
		num: 3006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Poseidon's Breath",
		pp: 1,
		priority: 0,
		flags: {mystery: 1},
		volatileStatus: 'gastroacid',
		onTryHit(target) {
			if (target.getAbility().isPermanent) {
				return false;
			}
		},
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
        this.heal(pokemon.maxhp);
			},
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent) pokemon.removeVolatile('gastroacid');
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
  
  duststormwhipup: {
		num: 3007,
		accuracy: 100,
		basePower: 110,
		category: "Status",
		name: "Duststorm Whip-Up",
		pp: 1,
		priority: 0,
		flags: {protect: 1},
		weather: 'Sandstorm',
		secondary: null,
		target: "all",
		type: "Ground",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
  
  energybreaker: {
		num: 3008,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Energy Breaker",
		pp: 1,
		priority: 0,
		flags: {protect: 1},
		onStart(source) {
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.volatiles['embargo']) {
					pokemon.addVolatile('embargo');
				}
  			if (!pokemon.volatiles['gastroacid']) {
					pokemon.addVolatile('gastroacid');
				}      
			}
		},
    onEnd(pokemon) {
			const source = this.effectData.target;
			for (const target of this.getAllActive()) {
        if (target.volatiles['embargo']) {
  				target.removeVolatile('embargo');
        }
        if (target.volatiles['gastroacid']) {
  				target.removeVolatile('gastroacid');
        }
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},

	finaljudgment: {
		num: 3009,
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Final Judgment",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		contestType: "Beautiful",
	},

	enforcerpunch: {
		num: 3010,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Enforcer Punch",
		pp: 1,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1, distance: 1, punch: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Fighting', type);
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "Normal",
		zMove: {basePower: 170},
		contestType: "Tough",
	},

  liftoff: {
		num: 3011,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Liftoff",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBeforeMovePriority: 2,
		onBeforeMove(pokemon, target, move) {
		  if (pokemon.baseSpecies.baseSpecies === 'Turbulusk' && !pokemon.transformed) {
        pokemon.formeChange('Turbulusk-Airborne', this.effect, false, '[msg]');
      }
    },
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Liftoff', '[of] ' + source);
				}
				const item2 = source.takeItem();
				if (item2) {
					this.add('-enditem', source, item2.name, '[from] move: Liftoff', '[of] ' + source);
				}        
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},

};
