export const Formats: {[k: string]: FormatData} = {
	fifthmoveadditions: {
    effectType: 'Rule',
		name: 'Fifth Move Additions',
		desc: 'Adds a fifth move to every Pokemon.',
    onBegin() {
      for (const side0 of this.sides[0].pokemon) { // i had to do both sides individually from lack of knowledge in this language, if anyone knows of a way to condense this then feel free to let me know
          if (side0.baseSpecies.baseSpecies === 'Threedy') {
            side0.moveSlots[4] = {
  			    move: "Replicate",
      			id: "replicate",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Amvip') {
            side0.moveSlots[4] = {
  			    move: "Lethal Fang",
      			id: "lethalfang",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Capsaken') {
            side0.moveSlots[4] = {
  			    move: "Revitalize",
      			id: "revitalize",
      			pp: 1,
         		maxpp: 1,
        		target: "self",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Shinamako') {
            side0.moveSlots[4] = {
  			    move: "Cumbersome Crash",
      			id: "cumbersomecrash",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };   

          if (side0.baseSpecies.baseSpecies === 'Abrakin') {
            side0.moveSlots[4] = {
  			    move: "Curse of the Moon",
      			id: "curseofthemoon",
      			pp: 1,
         		maxpp: 1,
        		target: "self",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Avasterror') {
            side0.moveSlots[4] = {
  			    move: "Poseidon's Breath",
      			id: "poseidonsbreath",
      			pp: 1,
         		maxpp: 1,
        		target: "self",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Dustrake') {
            side0.moveSlots[4] = {
  			    move: "Duststorm Whip-Up",
      			id: "duststormwhipup",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Eneryth') {
            side0.moveSlots[4] = {
  			    move: "Energy Breaker",
      			id: "energybreaker",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Skyrider') {
            side0.moveSlots[4] = {
  			    move: "Final Judgment",
      			id: "finaljudgment",
      			pp: 1,
         		maxpp: 1,
        		target: "allAdjacent",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Tusquoka') {
            side0.moveSlots[4] = {
  			    move: "Enforcer Punch",
      			id: "enforcerpunch",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side0.baseSpecies.baseSpecies === 'Turbulusk') {
            side0.moveSlots[4] = {
  			    move: "Liftoff",
      			id: "liftoff",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    
        }

       for (const side1 of this.sides[1].pokemon) { // i had to do both sides individually from lack of knowledge in this language, if anyone knows of a way to condense this then feel free to let me know
          if (side1.baseSpecies.baseSpecies === 'Threedy') {
            side1.moveSlots[4] = {
  			    move: "Replicate",
      			id: "replicate",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Amvip') {
            side1.moveSlots[4] = {
  			    move: "Lethal Fang",
      			id: "lethalfang",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Capsaken') {
            side1.moveSlots[4] = {
  			    move: "Revitalize",
      			id: "revitalize",
      			pp: 1,
         		maxpp: 1,
        		target: "self",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Shinamako') {
            side1.moveSlots[4] = {
  			    move: "Cumbersome Crash",
      			id: "cumbersomecrash",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };   

          if (side1.baseSpecies.baseSpecies === 'Abrakin') {
            side1.moveSlots[4] = {
  			    move: "Curse of the Moon",
      			id: "curseofthemoon",
      			pp: 1,
         		maxpp: 1,
        		target: "self",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Avasterror') {
            side1.moveSlots[4] = {
  			    move: "Poseidon's Breath",
      			id: "poseidonsbreath",
      			pp: 1,
         		maxpp: 1,
        		target: "self",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Dustrake') {
            side1.moveSlots[4] = {
  			    move: "Duststorm Whip-Up",
      			id: "duststormwhipup",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Eneryth') {
            side1.moveSlots[4] = {
  			    move: "Energy Breaker",
      			id: "energybreaker",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Skyrider') {
            side1.moveSlots[4] = {
  			    move: "Final Judgment",
      			id: "finaljudgment",
      			pp: 1,
         		maxpp: 1,
        		target: "allAdjacent",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Tusquoka') {
            side1.moveSlots[4] = {
  			    move: "Enforcer Punch",
      			id: "enforcerpunch",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    

          if (side1.baseSpecies.baseSpecies === 'Turbulusk') {
            side1.moveSlots[4] = {
  			    move: "Liftoff",
      			id: "liftoff",
      			pp: 1,
         		maxpp: 1,
        		target: "normal",
      			disabled: false,
       			used: false,
     			  virtual: true,
     		  };    
        }
    };


};
