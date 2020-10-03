export const Items: {[itemid: string]: ItemData} = {
	freshherb: {
		name: "Fresh Herb",
		spritenum: 475,
		fling: {
			basePower: 30,
		},
		onSwitchOut(pokemon) {
			if (pokemon.hasType('Grass')) {
				pokemon.heal(pokemon.baseMaxhp / 4);
			},
		},
		num: 1501.1,
		gen: 4,
		desc: "If the user is a Grass-type, it regains 1/4th of its max HP upon switching out.",
	},
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

};