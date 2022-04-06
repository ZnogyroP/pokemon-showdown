export const Statuses: {[k: string]: EffectData} = {
  frz: {
		name: 'frz',
	   id: 'frz',
	  	num: 0,
		effectType: 'Status',
    	onStart: function (target, source, sourceEffect) {
			this.add('-status', target, 'frz');
			this.hint("Time for a bonus wheel!");
    	},
		duration: 3,
		onBeforeMove: function (pokemon, target, move) {
      pokemon.statusData.time--;
			if (move.flags['defrost']) return;
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove: function () {},
		onHit: function () {},
		onAfterMoveSecondary: function (target, source, move) {
			if ((move.secondary && move.secondary.status === 'brn') || move.statusRoll === 'brn') {
				target.cureStatus();
			}
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (move.flags['defrost']) pokemon.cureStatus();
		},
		onResidual: function (pokemon) {
			if (this.randomChance(40, 100)) pokemon.cureStatus();
		},
	  	onEnd: function (target) {
			this.add('-curestatus', target, 'frz');
		},
	},
};
