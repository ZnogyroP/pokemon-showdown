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
	waterbucket: {
		name: "Water Bucket",
		spritenum: 430,
		fling: {
			basePower: 10,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if pokemon.hasType('Water') {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Water Bucket boost');
				return this.chainModify(2);
			}
			else if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Water Bucket debuff');
				return this.chainModify(0.5);
			}}
		},
		num: 1503.1,
		gen: 3,
		desc: "If the holder is Water-type, they take half damage from resisted moves and double damage from super-effective moves.",
	},
	lightfeather: {
		name: "Light Feather",
		spritenum: 535,
		basePowerCallback(pokemon, target, move) {
			if pokemon.hasType('Flying') {
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
};