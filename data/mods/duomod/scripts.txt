/* export const Scripts: ModdedBattleScriptsData = {
    
    onRouletteWheel () {
	this.hint("Time for the Roulette Wheel!");
        result = this.random(40);
        if (result === 0) {
	this.hint("Roulette Wheel Result: 1");
            for (const pokemon of this.getAllActive()) {
                this.heal(pokemon.maxhp, pokemon);
                pokemon.cureStatus();
            }
        } 
        else if (result === 1) {
	this.hint("Roulette Wheel Result: 2");
            for (const pokemon of this.getAllActive()) {
                let statName = 'atk';
                let bestStat = 0;
                let s: StatNameExceptHP;
                for (s in source.storedStats) {
                    if (source.storedStats[s] > bestStat) {
                        statName = s;
                        bestStat = source.storedStats[s];
                    }
                }
                this.boost({[statName]: 3}, source);
            }
        } 
        else if (result === 2) {
            for (const pokemon of this.randomActive()) {
                this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon);
            }
        } 
        else if (result === 3) {
            for (const pokemon of this.randomActive()) {
                this.directDamage(pokemon.hp - 1);
            }
        }
        else if (result === 4) {
            for (const pokemon of this.getAllActive()) {
		this.directDamage(pokemon.hp);
	    }
	}
	else if (result === 5) {
	    for (const pokemon of this.getAllActive()) {
		this.useMove("Spikes", pokemon);
		this.useMove("Spikes", pokemon);
		this.useMove("Spikes", pokemon);
		this.useMove("Charged Stone", pokemon);
	    }
	}
	else if (result === 6) {
	    result = this.random(3)
	    if (result === 0) {
		this.field.setWeather('sunnyday');
	    } 
	    else if (result === 1) {
		this.field.setWeather('raindance');
	    } 
	    else {
		this.field.setWeather('sandstorm');
	    }
	}
	else if (result === 7) {
            for (const pokemon of this.randomActive()) {
                this.directDamage(1);
            }
        }
	else if (result === 8) {
            for (const pokemon of this.randomActive()) {
                this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, pokemon);
            }
        } 
	else if (result === 9) {
	    for (const pokemon of this.getAllActive()) {
		pokemon.forceSwitchFlag = true;
	    }
	}
	else if (result === 10) {
	    for (const pokemon of this.getAllActive()) {
		this.useMove("Conversion 2", pokemon);
	    }
	}
	else if (result === 11) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Transform", pokemon); 
	    }
	}
	else if (result === 12) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Heart Swap", pokemon);
	    }
	}
	else if (result === 13) {
	    for (const pokemon of this.getAllActive()) {
		this.heal(pokemon.maxhp / 4, pokemon);
	    }
	}
	else if (result === 14) {
	    for (const pokemon of this.getAllActive()) {
		this.useMove("Scald 2", pokemon);
	    }
	}
	else if (result === 15) {
	    for (const pokemon of this.getAllActive()) {
		this.trySetStatus('tox', pokemon);
	    }
	}
	else if (result === 16) {
	    for (const pokemon of this.getAllActive()) {
		pokemon.addVolatile('choicelock');
	    }
	}
	else if (result === 17) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Court Change", pokemon);
	    }
	}
	else if (result === 18) {
            for (const pokemon of this.getAllActive()) {
                this.boost({atk: 2, spa: 2}, pokemon);
            }
        }
	else if (result === 19) {
	    for (const pokemon of this.getAllActive()) {
		this.useMove("Camouflage", pokemon);
	    }
	}
	else if (result === 20) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Skill Swap", pokemon);
	    }
	}
	else if (result === 21) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Celebrate", pokemon);
	    }
	}
	else if (result === 22) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Trick Room", pokemon);
	    }
	}
	else if (result === 23) {
	    for (const pokemon of this.randomActive()) {
		pokemon.addVolatile('confusion');
		this.boost({accuracy: -12}, pokemon);
		pokemon.ability === 'Truant';
	    }
	}
	else if (result === 24) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Haze", pokemon);
	    }
	}
	else if (result === 25) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Wonder Room", pokemon);
	    }
	}
	else if (result === 26) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Magic Room", pokemon);
	    }
	}
	else if (result === 27) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Pain Split", pokemon);
	    }
	}
	else if (result === 28) {
            for (const pokemon of this.getAllActive()) {
                pokemon.cureStatus();
            }
        } 
	else if (result === 29) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Reflect", pokemon);
		this.useMove("Light Screen", pokemon);
	    }
	}
	else if (result === 30) {
	    result = this.random(3)
	    if (result === 0) {
		this.field.setTerrain('grassyterrain');
	    } 
	    else if (result === 1) {
		this.field.setTerrain('mistyterrain');
	    } 
	    else {
		this.field.setTerrain('electricterrain');
	    }
	}
	else if (result === 31) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Neutral Air", pokemon);
	    }
	}
	else if (result === 32) {
	    for (const pokemon of this.getAllActive()) {
		this.trySetStatus('frz', pokemon);
	    }
	}
	else if (result === 33) {
	    for (const pokemon of this.randomActive()) {
		pokemon.forceSwitchFlag = true;
	    }
	}
	else if (result === 34) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Water Shield", pokemon);
	    }
	}
	else if (result === 35) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Defog", pokemon);
	    }
	}
	else if (result === 36) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Reflect Type", pokemon);
	    }
	}
	else if (result === 37) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Metronome", pokemon);
	    }
	}
	else if (result === 38) {
	    for (const pokemon of this.randomActive()) {
		this.useMove("Ultranome", pokemon);
	    }
	}
	else {
	    for (const pokemon of this.getAllActive()) {
		this.useMove("Sheer Cold", pokemon);
	    }
	}
    },
}; */