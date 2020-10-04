export const Items: {[k: string]: ModdedItemData} = {
	drytorch: {
		name: "Dry Torch",
		spritenum: 61,
		fling: {
			basePower: 30,
		},
		onTryHit(target, source, move) {
			if (pokemon.hasType('Fire')) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('drytorch')) {
				}
				return null;
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
		onAfterMoveSecondary(target, source, move) {
			if (move.totalDamage <= target.maxhp / 10)
				target.switchFlag = true;
		},
		num: 1508.1,
		gen: 4,
		desc: "Switches the user out if they deal less than 10% with an attacking move.",
	},
};