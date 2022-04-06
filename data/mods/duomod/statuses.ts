export const Statuses: {[k: string]: ModdedPureEffectData} = {
  frz: {
		name: 'frz',
	   id: 'frz',
    onStart(target, source, sourceEffect) {
      this.effectData.time = 4;
    },
		onBeforeMove(pokemon, target, move) {
      pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			if (move.flags['defrost']) return;
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove() {},
		onHit() {},
		onAfterMoveSecondary(target, source, move) {
			if ((move.secondary && move.secondary.status === 'brn') || move.statusRoll === 'brn') {
				target.cureStatus();
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.flags['defrost']) pokemon.cureStatus();
		},
		onResidual(pokemon) {
			if (this.randomChance(40, 100)) pokemon.cureStatus();
		},
	},
};
