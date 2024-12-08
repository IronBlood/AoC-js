import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const base_filename = `${__dirname}/base.txt`;
const content = readFileSync(base_filename, "utf8").trimEnd();

const WAR = content.split("\n\n").map(seg => {
	const lines = seg.split("\n");
	const arr = [];
	for (let i = 1; i < lines.length; i++) {
		let match = lines[i].match(/^(\S+)\s+(\d+)\s+(\d+)\s+(\d+)$/);
		if (match) {
			const [_, name, cost, damage, armor] = match;
			arr.push({
				name,
				cost: +cost,
				damage: +damage,
				armor: +armor,
			});
		} else {
			// Rings
			match = lines[i].match(/^(.+?)\s+(\d+)\s+(\d+)\s+(\d+)$/);
			const [_, name, cost, damage, armor] = match;
			arr.push({
				name,
				cost: +cost,
				damage: +damage,
				armor: +armor,
			});
		}
	}
	return arr;
});

/**
 * @typedef {Object} Role
 * @property {number} hp
 * @property {number} damage
 * @property {number} armor
 */

/**
 * @param {Role} player
 * @param {Role} boss
 */
export const can_win = (player, boss) => {
	while (player.hp > 0 && boss.hp > 0) {
		boss.hp -= Math.max(player.damage - boss.armor, 1);
		if (boss.hp <= 0)
			return true;
		player.hp -= Math.max(boss.damage - player.armor, 1);
	}
	return player.hp > 0;
};

/**
 * @param {{ build: Role; cost: number }[]} builds
 * @param {number} base_damage
 * @param {number} base_armor
 * @param {number} base_cost
 * @param {{cost: number; damage: number; armor: numer}[]} rings
 */
const backtracking_rings = (builds, base_damage, base_armor, base_cost, rings) => {
	/**
	 * @param {number[]} stack
	 * @param {number} curr_idx
	 */
	const dfs = (stack, curr_idx) => {
		if (stack.length <= 2) {
			let extra_damage = 0,
				extra_armor = 0,
				extra_cost = 0;
			for (let i = 0; i < stack.length; i++) {
				const ring = rings[stack[i]];
				extra_damage += ring.damage;
				extra_armor += ring.armor;
				extra_cost += ring.cost;
			}
			builds.push({
				build: {
					damage: base_damage + extra_damage,
					armor: base_armor + extra_armor,
					hp: 100,
				},
				cost: base_cost + extra_cost,
			});
		}
		if (stack.length < 2) {
			for (let i = curr_idx + 1; i < rings.length; i++) {
				stack.push(i);
				dfs(stack, i);
				stack.pop(i);
			}
		}
	};

	dfs([], -1);
};

/**
 * @returns {{ build: Role; cost: number }[]}
 */
const get_builds = () => {
	const builds = [];
	const [weapons, armors, rings] = WAR;
	for (let i = 0; i < weapons.length; i++) {
		for (let j = -1; j < armors.length; j++) {
			const damage = weapons[i].damage,
				armor = (j >= 0) ? armors[j].armor : 0,
				cost = weapons[i].cost + ((j >= 0) ? armors[j].cost : 0);
			backtracking_rings(builds, damage, armor, cost, rings);
		}
	}
	return builds;
};

/**
 * @param {string} boss_data
 */
export const win_with_least_gold = (boss_data) => {
	const [b_hp, b_d, b_a] = boss_data.split("\n").map(line => Number(line.split(": ")[1]));
	const builds = get_builds().sort((a, b) => a.cost - b.cost);
	let min = Number.MAX_SAFE_INTEGER;
	builds.forEach(b => {
		const boss = {
			hp: b_hp,
			damage: b_d,
			armor: b_a,
		};
		if (b.cost < min && can_win(b.build, boss)) {
			min = b.cost;
		}
	});
	return min;
};

/**
 * @param {string} boss_data
 */
export const lose_with_most_gold = (boss_data) => {
	const [b_hp, b_d, b_a] = boss_data.split("\n").map(line => Number(line.split(": ")[1]));
	const builds = get_builds().sort((a, b) => b.cost - a.cost);
	let max = 0;
	builds.forEach(b => {
		const boss = {
			hp: b_hp,
			damage: b_d,
			armor: b_a,
		};
		if (b.cost > max && !can_win(b.build, boss)) {
			max = b.cost;
		}
	});
	return max;
};

