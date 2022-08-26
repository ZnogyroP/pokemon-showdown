// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
import {Utils} from './../lib/utils';

export const Formats: (FormatsData | {section: string, column?: number})[] = [
	{
		section: "Sw/Sh Singles",
	},
	
	{
        name: "[Gen 8] Duomod",
        desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, built around the idea where nobody is ever truly losing.`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Subscribe For More Content', 'Duomod Data Mod'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
        unbanlist: [
             'Abysseil', 'Annelait', 'Azurolt', 'Baloon', 'BaloonPopped', 'BaloonWater', 'Catelax', 'Crypterid', 'Deliriophage', 'Detonuke', 'Draglow', 'Draxplosion', 'Fluidrake', 'Fluxtape', 'FluxtapeRadio', 'FluxtapeStereo', 'Gorilax', 'Grievenge', 'Hyperoach', 'Lemotic', 'Lumineel', 'Modolith', 'Monstratus', 'Mortemoth', 'Pokat', 'Spirox', 'SpiroxAncient', 'SpiroxRipped', 'Treemu', 'Valianch', 'Spisces', 'Pterrost', 'Jewelode', 'Jellyolk', 'Crazefly', 'Fairydisc', 'Badgearth',
			],	
			onSwitchIn(pokemon) {
        		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        	},	
	}, 
];
