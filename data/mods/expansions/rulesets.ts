export const Formats: {[k: string]: FormatData} = {
	fifthmoveadditions: {
    effectType: 'Rule',
		name: 'Fifth Move Additions',
		desc: 'Adds a fifth move to every Pokemon.',
    onBegin() {
      for (const side0 of this.sides[0].pokemon) { // i had to do both sides individually from lack of knowledge in this language, if anyone knows of a way to condense this then feel free to let me know
			side0.baseMoveSlots[side0.moveSlots.length] = {
	  			move: "Fifth Move",
      		id: "fifthmove",
      		pp: 1,
         	maxpp: 1,
        		target: "normal",
      		disabled: false,
       		used: false,
     		};
		}

      for (const side1 of this.sides[1].pokemon) { // i had to do both sides individually from lack of knowledge in this language, if anyone knows of a way to condense this then feel free to let me know
			side1.baseMoveSlots[side1.moveSlots.length] = {
	  			move: "Fifth Move",
      		id: "fifthmove",
      		pp: 1,
         	maxpp: 1,
        		target: "normal",
      		disabled: false,
       		used: false,
     		};        
		}
	 },
	},


};


