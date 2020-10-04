export const Items: {[itemid: string]: ItemData} = {
	dangersiren: {
		name: "Danger Siren",
		spritenum: 272,
		fling: {
			basePower: 80,
		},
		onAfterMoveSecondary(target, source, move) {
			if (damage >= target.maxhp / 10)
				source.switchFlag = true;
		},
		num: 1508.1,
		gen: 4,
		desc: "Switches the user out if they deal less than 10% with an attacking move.",
	},
};