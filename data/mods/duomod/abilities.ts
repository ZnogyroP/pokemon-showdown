export const Abilities: {[k: string]: ModdedAbilityData} = {
	powerofalchemy: {
		inherit: true,
		onAllyFaint(ally) {
			let pokemon = this.effectData.target;
			if (!pokemon.hp) return;
			let isAbility = pokemon.ability === 'powerofalchemy';
			/**@type {string[]} */
			let possibleAbilities = [ally.ability];
			if (ally.m.innates) possibleAbilities = possibleAbilities.concat(ally.m.innates);
			let bannedAbilities = ['battlebond', 'comatose', 'disguise', 'flowergift', 'forecast', 'illusion', 'imposter', 'multitype', 'powerconstruct', 'powerofalchemy', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'wonderguard', 'zenmode'];
			bannedAbilities.push(pokemon.ability);
			if (pokemon.m.innates) bannedAbilities = bannedAbilities.concat(pokemon.m.innates);
			possibleAbilities = possibleAbilities.filter(val => !bannedAbilities.includes(val));
			if (!possibleAbilities.length) return;
			let ability = this.dex.getAbility(possibleAbilities[this.random(possibleAbilities.length)]);
			this.add('-ability', pokemon, ability, '[from] ability: Power of Alchemy', '[of] ' + ally);
			if (isAbility) {
				pokemon.setAbility(ability);
			} else {
				pokemon.removeVolatile("abilitypowerofalchemy");
				pokemon.addVolatile("ability:" + ability, pokemon);
			}
		},
	},
	receiver: {
		inherit: true,
		onAllyFaint(ally) {
			let pokemon = this.effectData.target;
			if (!pokemon.hp) return;
			let isAbility = pokemon.ability === 'receiver';
			/**@type {string[]} */
			let possibleAbilities = [ally.ability];
			if (ally.m.innates) possibleAbilities = possibleAbilities.concat(ally.m.innates);
			let bannedAbilities = ['battlebond', 'comatose', 'disguise', 'flowergift', 'forecast', 'illusion', 'imposter', 'multitype', 'powerconstruct', 'powerofalchemy', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'wonderguard', 'zenmode'];
			bannedAbilities.push(pokemon.ability);
			if (pokemon.m.innates) bannedAbilities = bannedAbilities.concat(pokemon.m.innates);
			possibleAbilities = possibleAbilities.filter(val => !bannedAbilities.includes(val));
			if (!possibleAbilities.length) return;
			let ability = this.dex.getAbility(possibleAbilities[this.random(possibleAbilities.length)]);
			this.add('-ability', pokemon, ability, '[from] ability: Receiver', '[of] ' + ally);
			if (isAbility) {
				pokemon.setAbility(ability);
			} else {
				pokemon.removeVolatile("ability:receiver");
				pokemon.addVolatile("ability:" + ability, pokemon);
			}
		},
	},
	trace: {
		inherit: true,
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return;
			let isAbility = pokemon.ability === 'trace';
			/**@type {Pokemon[]} */
			let possibleTargets = [];
			for (let target of pokemon.side.foe.active) {
				if (target && !target.fainted) {
					possibleTargets.push(target);
				}
			}
			while (possibleTargets.length) {
				let rand = this.random(possibleTargets.length);
				let target = possibleTargets[rand];
				/**@type {string[]} */
				let possibleAbilities = [target.ability];
				if (target.m.innates) possibleAbilities = possibleAbilities.concat(target.m.innates);
				let bannedAbilities = ['battlebond', 'comatose', 'disguise', 'flowergift', 'forecast', 'illusion', 'imposter', 'multitype', 'powerconstruct', 'powerofalchemy', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'zenmode'];
				bannedAbilities.push(pokemon.ability);
				if (pokemon.m.innates) bannedAbilities = bannedAbilities.concat(pokemon.m.innates);
				possibleAbilities = possibleAbilities.filter(val => !bannedAbilities.includes(val));
				if (!possibleAbilities.length) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				let ability = this.dex.getAbility(this.sample(possibleAbilities));
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
				if (isAbility) {
					pokemon.setAbility(ability);
				} else {
					pokemon.removeVolatile("ability:trace");
					pokemon.addVolatile("ability:" + ability, pokemon);
				}
				return;
			}
		},
	},
	angler: {
		desc: "If the user is hit by a Water-type move, they take 0.25x damage from it and the opponent recieves recoil equal to the damage dealt.",
		shortDesc: "The damage from Water-type attacks against this Pokemon is partially reflected.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.25);
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.damage(target.getUndynamaxedHP(damage)/2, source, target);
			}
		},
		name: "Angler",
		rating: 2,
		num: 1.1,
	},

  edible: {
		desc: "The user takes 2x damage from Bite moves, but 0.5x damage from Punch moves.",
		shortDesc: "This Pokemon takes 1/2 damage from punch moves, 2x damage from bite moves.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.flags['bite']) mod *= 2;
			if (move.flags['punch']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Edible",
		rating: 3.5,
		num: 2.1,
	},

	coloredrocks: {
		desc: "This Pokemon's Ground-type moves become Fairy-type moves and have their power multiplied by 1.2. Additionally, Stealth Rock will become Fairy-type.",
		shortDesc: "This Pokemon's Ground-type moves become Fairy type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Ground' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
				move.aerilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Colored Rocks",
		rating: 4,
		num: 3.1,
	},
 
  maximumedge: {
		desc: "The user's extreme edge gets tarnished when hit by a Fairy-type move.",
		shortDesc: "The user gains a Fairy-type weakness.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(2);
			}
		},
		name: "Maximum Edge",
		rating: 2,
		num: 4.1,
	},
	
  darkaura: {
		desc: "The user has so much edge that the Sun damages it.",
		shortDesc: "The user loses some of its HP in the Sun.",
      onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday') {
				this.damage(target.baseMaxhp / 8, target, target);
			} else if (effect.id === 'desolateland') {
				this.damage(target.baseMaxhp, target, target);
			}
		},
		name: "Dark Aura",
		rating: 2,
		num: 5.1,
	},

  camobody: {
		desc: "The user gains a typing if Terrain is active.",
		shortDesc: "The user gains a typing if Terrain is active.", 
  		onUpdate(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				if (pokemon.hasType('Electric')) return false;
			  if (!pokemon.addType('Electric')) return false;
				this.add('-start', pokemon, 'typeadd', 'Electric', '[from] ability: Camo Body');
			} else if (this.field.isTerrain('grassyterrain')) {
				if (pokemon.hasType('Grass')) return false;
			  if (!pokemon.addType('Grass')) return false;
				this.add('-start', pokemon, 'typeadd', 'Grass', '[from] ability: Camo Body');
			} else if (this.field.isTerrain('mistyterrain')) {
				if (pokemon.hasType('Fairy')) return false;
			  if (!pokemon.addType('Fairy')) return false;
				this.add('-start', pokemon, 'typeadd', 'Fairy', '[from] ability: Camo Body');
      }},    
		name: "Camo Body",
		rating: 2,
		num: 6.1,
	},

	windproof: {
		desc: "This Pokemon is immune to Flying-type moves.",
		shortDesc: "This Pokemon is immune to Flying-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
					this.add('-immune', target, '[from] ability: Windproof');
				}
				return null;
		},
		name: "Windproof",
		rating: 3,
		num: 6.1,
	},

deteriorate: {
		desc: "This Pokemon loses 1/6th of its max HP each turn.",
		shortDesc: "This Pokemon loses 1/6th of its max HP each turn.",
   	onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.damage(pokemon.baseMaxhp / 6, pokemon, pokemon);
			}
		},
		name: "Deteriorate",
		rating: -1,
		num: 7.1,
	},

adaptation: {
		desc: "This Pokemon's first moveslot determines its secondary typing.",
		shortDesc: "This Pokemon first moveslot determines its secondary typing.",
		onStart (pokemon) {
			const type = this.dex.getMove(pokemon.moveSlots[0].id).type;
			if (pokemon.hasType(type) || !pokemon.setType(type)) return false;
			this.add('-start', pokemon, 'typeadd', type, '[from] ability: Adaptation');
		},
		name: "Adaptation",
		rating: 4,
		num: 8.1,
	},

disappearance: {
		desc: "This Pokemon forces the target to switch out when hit under 50% of its max health.",
		shortDesc: "This Pokemon forces out the target if under 50% of its max HP.",
  		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.add('-activate', target, 'ability: Disappearance');
        source.forceSwitchFlag = true;
      }
		},
		name: "Disappearance",
		rating: 4,
		num: 9.1,
	},

	hypeoverload: {
		desc: "The user damages the target by 1/3 of its max HP upon fainting.",
		shortDesc: "Damages target by 1/3rd max HP upon fainting.",
		name: "Hype Overload",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(source.baseMaxhp / 3, source, target);
			}
		},
		rating: 2.5,
		num: 10.1,
	},

	prevailingwind: {
		shortDesc: "On switchin, this Pokemon summons Tailwind.",
			onStart: function(source) {
			this.useMove("Tailwind", source);
		  },  
    name: "Prevailing Wind",
    rating: 2.5,
		num: 11.1,
    },

	lightbringer: {
		shortDesc: "If Sun is up, the user replenishes it.",
		onStart(source) {
			if (['sunnyday'].includes(source.effectiveWeather())) {
        this.field.clearWeather();
        this.field.setWeather('sunnyday');
			  }
      },
		name: "Lightbringer",
		rating: 4,
		num: 12.1,
	},

	radioactivegas: {
		shortDesc: "Removes all active Pokemons' items.",
		onStart(target, pokemon, source) {
		const item = target.takeItem(source);
      for (const target of this.getAllActive()) {
			if (item) {
				this.add(target, item.name, '[from] ability: Radioactive Gas', '[of] ' + source);
			}}
    },
		name: "Radioactive Gas",
		rating: 4,
		num: 13.1,
	},

  deathscall: {
			onStart(pokemon) {
				this.add('-fieldactivate', 'move: Fairy Lock');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			  },
    		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},

		name: "Death's Call",
		rating: 4,
		num: 14.1,
  },
  
	contaminate: {
		shortDesc: "This Pokemon's Water-type moves have a 20% chance of badly poisoning.",
		onModifyMovePriority: 1,
			onModifyMove(move) {
			if (move.type === 'Water') {      
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 20,
				status: 'tox',
			});
      }
},
		name: "Contaminate",
		rating: 2,
		num: 15.1,
	},

	flametrap: {
		shortDesc: "This Pokemon's Fire-type moves trap the target.",
		onModifyMovePriority: 1,
			onModifyMove(move) {
			if (move.type === 'Fire') {      
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
    		volatileStatus: 'partiallytrapped',
			});
      }
},
		name: "Flame Trap",
		rating: 2,
		num: 16.1,
	},

  rageboost: {
  		shortDesc: "Drops the opponents' stats if they boost.",
      onAnyModifyBoost(boosts, target, pokemon, source, effect) {
			let statsLowered = false;
			let i: BoostsName;
			for (i in boosts) {
				if (boosts[i]! > 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
          this.boost({
            atk: -1,
            def: -1,
            spa: -1,
            spd: -1,
            spe: -1,});
    }},
        name: "Rage Boost",
        rating: 2,
        num: 17.1,
    },

	poweroftwo: {
		shortDesc: "If this Pokemon has two moves or less, its power boosts by 1.5x",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
        return this.chainModify(1.5);
			}
		},
		name: "Power of Two",
		rating: 2,
		num: 18.1,
	},

	voltdiversion: {
		shortDesc: "Applies a 1.3x boost to Electric attacks, but loses HP to do so.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify([0x14CC, 0x1000]);
      }
		},	
  	onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && move.type === 'Electric') {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.getAbility('Volt Diversion'));
			}
    },
  	name: "Volt Diversion",
		rating: 2,
		num: 19.1,
	},

	roulettespin: {
		shortDesc: "On switchin, this Pokemon uses Metronome.",
			onStart: function(source) {
			this.useMove("roulettewheel", source);
		  },  
    name: "Roulette Spin",
    rating: 2.5,
		num: 20.1,
    },  
  
 	slightofhand: {
		shortDesc: "This Pokemon's Status moves have priority raised by 1, but Dark types are immune.",
		onPrepareHit(pokemon, source, target, move) {
			if (basePowerAfterMultiplier <= 60) return priority + 1;
		},
	name: "Slight of Hand",
		rating: 4,
		num: 21.1,
	},

	fortification: {
		desc: "This Pokemon's Attack and Defense are raised by 1 stage at the end of each full turn it has been on the field.",
		shortDesc: "This Pokemon's Attack and Defense are raised 1 stage at the end of each full turn on the field.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({atk: 1, def: 1});
			}
		},
		name: "Fortification",
		rating: 4.5,
		num: 22.1,
	},   

	fragile: {
		shortDesc: "The user, Egg, transforms when hit.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
      if (
				effect && effect.effectType === 'Move' &&
				['egg'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Fragile');
        this.effectData.busted = true;
				return 0;
			}   
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['egg', 'eggcracked'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['egg', 'eggcracked'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['egg'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'eggcracked';
				pokemon.formeChange(speciesid, this.effect, true);
			}
		},
		name: "Fragile",
		rating: 3.5,
		num: 23.1,
	},
	bagoftricks: {
		shortDesc: "The user and target swap items when the user is sent out.",
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Trick', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Trick');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Trick');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Trick');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Trick');
			}
			}
		},
		name: "Bag of Tricks",
		rating: 3.5,
		num: 24.1,
	},
	sleightofhand: {
		shortDesc: "This Pokemon's punch moves have their priority increased by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.flags['punch']) return priority + 1;
		},
		name: "Sleight of Hand",
		rating: 3.5,
		num: 25.1,
	},
	annelaitset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.25);
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.damage(target.getUndynamaxedHP(damage)/2, source, target);
				this.boost({def: 2});

			}
		},
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		name: "Annelait Set",
		rating: 5,
		num: 73073,
	},
	arachwichset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify(1.5);
			}
		},
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectData.target;
					this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.flags['bite']) mod *= 2;
			if (move.flags['punch']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Arachwich Set",
		rating: 5,
		num: 73073,
	},
	azuroltset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
		name: "Azurolt Set",
		rating: 5,
		num: 73073,
	},
	baloonset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onStart: function(source) {
			this.useMove("roulettewheel", source);
		  },  
		 onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
		name: "Baloon Set",
		rating: 5,
		num: 73073,
	},
	bismageset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magician', '[of] ' + target);
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Ground' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
				move.aerilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Bismage Set",
		rating: 5,
		num: 73073,
	},
	blastoraset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		onStart(pokemon) {
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 150;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (bp === 1) bp = 80;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, target]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) return;
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add('-activate', pokemon, 'ability: Forewarn', warnMoveName, '[of] ' + warnTarget);
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Flying';
				move.aerilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Blastora Set",
		rating: 5,
		num: 73073,
	},
	blaydgeset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", "[of] " + target);
				}
			}
		},
 		     onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday') {
				this.damage(target.baseMaxhp / 8, target, target);
			} else if (effect.id === 'desolateland') {
				this.damage(target.baseMaxhp, target, target);
			}
		},
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(2);
			}
		},
		name: "Blaydge Set",
		rating: 5,
		num: 73073,
	},
	cadbunnyset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.item) return;
			const pickupTargets = [];
			for (const target of this.getAllActive()) {
				if (target.lastItem && target.usedItemThisTurn && this.isAdjacent(pokemon, target)) {
					pickupTargets.push(target);
				}
			}
			if (!pickupTargets.length) return;
			const randomTarget = this.sample(pickupTargets);
			const item = randomTarget.lastItem;
			randomTarget.lastItem = '';
			this.add('-item', pokemon, this.dex.getItem(item), '[from] ability: Pickup');
			pokemon.setItem(item);
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Cadbunny Set",
		rating: 5,
		num: 73073,
	},
	catelaxset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
			pokemon.abilityData.ending = false;
		},
		onEnd(source) {
			// FIXME this happens before the pokemon switches out, should be the opposite order.
			// Not an easy fix since we cant use a supported event. Would need some kind of special event that
			// gathers events to run after the switch and then runs them when the ability is no longer accessible.
			// (If your tackling this, do note extreme weathers have the same issue)

			// Mark this pokemon's ability as ending so Pokemon#ignoringAbility skips it
			source.abilityData.ending = true;
			for (const pokemon of this.getAllActive()) {
				if (pokemon !== source) {
					// Will be suppressed by Pokemon#ignoringAbility if needed
					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
				}
			}
		},
		name: "Catelax Set",
		rating: 5,
		num: 73073,
	},
	cephalopireset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onUpdate(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				if (pokemon.hasType('Electric')) return false;
			  if (!pokemon.addType('Electric')) return false;
				this.add('-start', pokemon, 'typeadd', 'Electric', '[from] ability: Camo Body');
			} else if (this.field.isTerrain('grassyterrain')) {
				if (pokemon.hasType('Grass')) return false;
			  if (!pokemon.addType('Grass')) return false;
				this.add('-start', pokemon, 'typeadd', 'Grass', '[from] ability: Camo Body');
			} else if (this.field.isTerrain('mistyterrain')) {
				if (pokemon.hasType('Fairy')) return false;
			  if (!pokemon.addType('Fairy')) return false;
				this.add('-start', pokemon, 'typeadd', 'Fairy', '[from] ability: Camo Body');
      }},    
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectData.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		name: "Cephalopire Set",
		rating: 5,
		num: 73073,
	},
	chemiclysmset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onStart(target, pokemon, source) {
		const item = target.takeItem(source);
      for (const target of this.getAllActive()) {
			if (item) {
				this.add(target, item.name, '[from] ability: Radioactive Gas', '[of] ' + source);
			}}
    },
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Stench flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		name: "Chemiclysm Set",
		rating: 5,
		num: 73073,
	},
	clietyset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('naturalcure')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Cure');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (effect && effect.id === 'toxicspikes') return;
			if (status.id === 'slp' || status.id === 'frz') return;
			this.add('-activate', target, 'ability: Synchronize');
			// Hack to make status-prevention abilities think Synchronize is a status move
			// and show messages when activating against it.
			// @ts-ignore
			source.trySetStatus(status, target, {status: status.id, id: 'synchronize'});
		},
		name: "Cliety Set",
		rating: 5,
		num: 73073,
	},
	crazeflyset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-ability', target, 'Gooey');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Electric';
				move.galvanizeBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.galvanizeBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
					this.add('-immune', target, '[from] ability: Windproof');
				}
				return null;
		},
		name: "Crazefly Set",
		rating: 5,
		num: 73073,
	},
	crypteridset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'tox',
				ability: this.dex.getAbility('poisontouch'),
			});
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Solid Rock neutralize');
				return this.chainModify(0.75);
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({atk: 1, def: 1});
			}
		},
		name: "Crypterid Set",
		rating: 5,
		num: 73073,
	},
	debringset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
					this.add('-immune', target, '[from] ability: Levitate');
				}
				return null;
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		name: "Debring Set",
		rating: 5,
		num: 73073,
	},
	deliriophageset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Unnerve', pokemon.side.foe);
		},
		onFoeTryEatItem: false,
	      onAnyModifyBoost(boosts, target, pokemon, source, effect) {
			let statsLowered = false;
			let i: BoostsName;
			for (i in boosts) {
				if (boosts[i]! > 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
          this.boost({
            atk: -1,
            def: -1,
            spa: -1,
            spd: -1,
            spe: -1,});
    }},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !target.hp) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},
		name: "Deliriophage Set",
		rating: 5,
		num: 73073,
	},
	detonukeset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Steel') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.knownType || pokemon.hasType('Steel')) {
				pokemon.maybeTrapped = true;
			}
		},
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'groudon') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('sunnyday');
		},
		onModifySpe(spe) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(2);
			}
		},
		name: "Detonuke Set",
		rating: 5,
		num: 73073,
	},
	draxplosionset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onAllyModifyMove(move) {
			if (typeof move.accuracy === 'number') {
				move.accuracy *= 1.2;
			}
		},
		onStart(source) {
			if (['sunnyday'].includes(source.effectiveWeather())) {
        this.field.clearWeather();
        this.field.setWeather('sunnyday');
			  }
      },
		name: "Draxplosion Set",
		rating: 5,
		num: 73073,
	},
	eggset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
      if (
				effect && effect.effectType === 'Move' &&
				['egg'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Fragile');
        this.effectData.busted = true;
				return 0;
			}   
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['egg', 'eggcracked'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['egg', 'eggcracked'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['egg'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'eggcracked';
				pokemon.formeChange(speciesid, this.effect, true);
			}
		},
		onSourceTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed', 'strengthsap'];
			if (canOoze.includes(effect.id)) {
				this.damage(damage);
				return 0;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 2}, target, target);
			}
		},
		name: "Egg Set",
		rating: 5,
		num: 73073,
	},
	falkickset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp === pokemon.maxhp) return priority + 1;
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		onStart(source) {
			this.field.setWeather('deltastream');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'deltastream' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('deltastream')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		name: "Falkick Set",
		rating: 5,
		num: 73073,
	},
	fantomset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
			onStart: function(source) {
			this.useMove("Tailwind", source);
		  },  
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Motor Drive');
				}
				return null;
			}
		},
		name: "Fantom Set",
		rating: 5,
		num: 73073,
	},
	flamepionset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		onModifyMovePriority: 1,
			onModifyMove(move) {
			if (move.type === 'Fire') {      
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
    		volatileStatus: 'partiallytrapped',
			});
      }
},
		name: "Flamepion Set",
		rating: 5,
		num: 73073,
	},
	floundrawnset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Absorb');
				}
				return null;
			}
		},
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "Floundrawn Set",
		rating: 5,
		num: 73073,
	},
	fluidrakeset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		onModifyMovePriority: 1,
			onModifyMove(move) {
			if (move.type === 'Water') {      
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 20,
				status: 'tox',
			});
      }
},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Stench flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		name: "Fluidrake Set",
		rating: 5,
		num: 73073,
	},
	grievengeset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
			onStart(pokemon) {
				this.add('-fieldactivate', 'move: Fairy Lock');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			  },
    		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},
		onModifyMove(move) {
			move.infiltrates = true;
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Inner Focus');
			}
		},		
		name: "Grievenge Set",
		rating: 5,
		num: 73073,
	},
	hyperoachset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onStart(source) {
			this.field.setWeather('desolateland');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'desolateland' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('desolateland')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(source.baseMaxhp / 3, source, target);
			}
		},
		name: "Hyperoach Set",
		rating: 5,
		num: 73073,
	},
	komodithset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles.dynamax) { // hardcode
				move.type = 'Water';
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Komodith Set",
		rating: 5,
		num: 73073,
	},
	magicidaset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Trick', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Trick');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Trick');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Trick');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Trick');
			}
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.flags['punch']) return priority + 1;
		},
  		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.add('-activate', target, 'ability: Disappearance');
        source.forceSwitchFlag = true;
      }
		},
		name: "Magicida Set",
		rating: 5,
		num: 73073,
	},
	monstratusset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		name: "Monstratus Set",
		rating: 5,
		num: 73073,
	},
	mortemothset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (!move.isFutureMove) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectData.target);
				}
			}
		},
 	  	onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.damage(pokemon.baseMaxhp / 6, pokemon, pokemon);
			}
		},
		name: "Mortemoth Set",
		rating: 5,
		num: 73073,
	},
	pterrostset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onStart (pokemon) {
			const type = this.dex.getMove(pokemon.moveSlots[0].id).type;
			if (pokemon.hasType(type) || !pokemon.setType(type)) return false;
			this.add('-start', pokemon, 'typeadd', type, '[from] ability: Adaptation');
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
    },
		name: "Pterrost Set",
		rating: 5,
		num: 73073,
	},
	robitset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify([0x14CC, 0x1000]);
      }
		},	
  	onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && move.type === 'Electric') {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.getAbility('Volt Diversion'));
			}
    },
		name: "Robit Set",
		rating: 5,
		num: 73073,
	},
	sharmpedoset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(4);
		},
		onStart(target, pokemon, source) {
			const item = target.takeItem(source);
		},
		name: "Sharmpedo Set",
		rating: 5,
		num: 73073,
	},
	spiroxset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onCriticalHit: false,
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Pickpocket', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Pickpocket', '[of] ' + source);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
    				return this.chainModify(1.3);
			}
		},
		name: "Spirox Set",
		rating: 5,
		num: 73073,
	},
	treemuset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-ability', pokemon, 'Anticipation');
						return;
					}
				}
			}
		},
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status && this.randomChance(1, 3)) {
				this.debug('shed skin');
				this.add('-activate', pokemon, 'ability: Shed Skin');
				pokemon.cureStatus();
			}
		},
		name: "Treemu Set",
		rating: 5,
		num: 73073,
	},
	valianchset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.getItem(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			}
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		name: "Valianch Set",
		rating: 5,
		num: 73073,
	},
	joulibranchset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status ==='brn' || pokemon.status === 'par' || pokemon.status === 'frz' || pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Slime Armor');
				pokemon.cureStatus();
			}
		},
		name: "Joulibranch Set",
		rating: 5,
		num: 73073,
	},
	digidoseset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Magma Armor');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false;
		},
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Absorb');
				}
				return null;
			}
		},
		name: "Digidose Set",
		rating: 5,
		num: 73073,
	},
	castaruptset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
			this.damage(source.baseMaxhp / 8, source, target);
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 2}, target, target);
			}
		},
		name: "Castarupt Set",
		rating: 5,
		num: 73073,
	},
	nectranceset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
			if (move.category === 'Specical') {
				this.add('-ability', target, 'Nectar Veil');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		onStart: function(source) {
			this.useMove("luckychant", source);
		}, 
		name: "Nectrance Set",
		rating: 5,
		num: 73073,
	},
	batravoltset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
					this.add('-immune', target, '[from] ability: Levitate');
				}
				return null;
		},
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				source.trySetStatus('tox', target);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Toxic Skin');
				pokemon.cureStatus();
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.side.foe.active) {
				if (!target || !target.hp) continue;
				this.damage(target.baseMaxhp / 10, target, pokemon);
			}
		},
		name: "Batravolt Set",
		rating: 5,
		num: 73073,
	},
	inscubaset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
	onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		onStart(pokemon) {
			const r = this.random(100);
			let newType;
			let tempType = '???';
			if (r < 11) {
				newType = 'Normal';
			} else if (r < 21) {
				newType = 'Grass';
			} else if (r < 31) {
				newType = 'Fire';
			} else if (r < 41) {
				newType = 'Water';
			} else if (r < 51) {
				newType = 'Electric';
			} else if (r < 61) {
				newType = 'Ground';
			} else if (r < 71) {
				newType = 'Flying';
			} else if (r < 81) {
				newType = 'Steel';
			} else if (r < 91) {
				newType = 'Dragon';
			} else if (r < 101) {
				newType = 'Fairy';
			}
			pokemon.spa: 20;
			this.add('-start', pokemon, 'typechange', newType);
			this.add('-start', pokemon, 'typechange', tempType, '[silent]');
		},
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Water' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				let type = pokemon.types[0];
				move.type = type;
			}
		},
		name: "Inscuba Set",
		rating: 5,
		num: 73073,
	},
	smorkeset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Water') {
				mod *= 7;
				mod /= 8;
			}
			return this.chainModify(mod);
		},
		name: "Smorke Set",
		rating: 5,
		num: 73073,
	},
	lemoticset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		onEatItem(item, pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.getItem(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			}
		},
		name: "Lemotic Set",
		rating: 5,
		num: 73073,
	},
	electritarset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Unnerve', pokemon.side.foe);
		},
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('poisontouch'),
			});
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status ==='slp' || pokemon.status === 'par') {
				this.add('-activate', pokemon, 'ability: Slime Armor');
				pokemon.cureStatus();
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Overcoat');
				return null;
			}
		},
		onFoeTryEatItem: false,
		name: "Electritar Set",
		rating: 5,
		num: 73073,
	},
	chimidaset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
			if (target !== source && move.type === 'Ground') {
				this.add('-immune', target, '[from] ability: Storm Drain');
				return null;
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Flying';
				move.aerilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Storm Drain');
				}
				return this.effectData.target;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Cleanliness');
			}
			return false;
		},
		name: "Chimida Set",
		rating: 5,
		num: 73073,
	},
	fluxtapeset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Competitive only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Competitive');
				this.boost({spa: 2}, target, target, null, true);
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles.dynamax) { // hardcode
				move.type = 'Fire';
				move.aerilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Fluxtape Set",
		rating: 5,
		num: 73073,
	},
	abysseilset: {
		shortDesc: "A combination of three abilities. Check the spreadsheet to see which.",
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Veil');
			}
			return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Grass') {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 9;
			mod /= 10;
			return this.chainModify(mod);
		},
		name: "Abysseil Set",
		rating: 5,
		num: 73073,
	},
};