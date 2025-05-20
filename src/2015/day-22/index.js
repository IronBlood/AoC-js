import {
	least_mana,
} from "./lib.js";

export function main(content) {
	const [b_hp, b_d] = content.split("\n").map(line => +line.split(": ")[1]);
	console.log(least_mana({hp: 50, mana: 500}, {hp: b_hp, damage: b_d}));
	console.log(least_mana({hp: 50, mana: 500}, {hp: b_hp, damage: b_d}, 2));
}
