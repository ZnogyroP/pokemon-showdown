export const Moves: {[moveid: string]: MoveData} = {
	headspacebutt: {
		num: 1029,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the target.",
		name: "head butt",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	tackel: {
		num: 1033,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "No additional effect.",
		name: "tackel",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
//	anthrax: {
//		num: 1001,
//		accuracy: 90,
//		basePower: 0,
//		category: "Status",
//		desc: "Badly poisons the target, but lowers the user's Defense and Sp. Def by 1.",
//		shortDesc: "Badly poisons foe, user's Defenses drop.",
//		name: "Anthrax",
//		pp: 30,
//		priority: 0,
//		flags: {protect: 1, reflectable: 1, mirror: 1},
//		onHit(target, source) {
//			if (!ignoreImmunities && status.id &&
//				!(source?.hasAbility('normalize') && ['tox', 'psn'].includes(status.id))) {
//				if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
//					this.battle.debug('immune to status');
//					if ((sourceEffect as Move)?.status) {
//						this.battle.add('-immune', this);
//					}
//					return false;
//				}
//			},
//		},
//		secondary: null,
//		target: "allAdjacentFoes",
//		type: "Normal",
//		zMove: {boost: {atk: 1}},
//		contestType: "Cool",
//	},	
};