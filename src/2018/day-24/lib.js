/**
 * @typedef {Object} Group
 * @property {number} units
 * @property {number} hp
 * @property {number} damage
 * @property {number} initiative
 * @property {string} attack_type
 * @property {string[]} weaknesses
 * @property {string[]} immunities
 * @property {number} effective_power
 * @property {boolean} chosen
 * @typedef {Object} AttackingGroup
 * @property {Group} attacker
 * @property {Group} defender
 * @typedef {Object} LostUnit
 * @property {number} idx
 * @property {number} units
 */

/**
 * @param {string} data
 * @returns {Group[]}
 */
export const parse_groups = (data) => {
	const lines = data.split("\n").slice(1);
	return lines.map(line => {
		let m;

		const re_number = /\d+/g;
		let aux = [];
		while ((m = re_number.exec(line))) {
			aux.push(+m[0]);
		}
		const [units, hp, damage, initiative] = aux;

		const re_attack_type = /\d+ (\w+) damage/;
		m = re_attack_type.exec(line);
		const attack_type = m[1];

		const re_special = /\((.*)\)/;
		m = re_special.exec(line);

		let immunities = [], weaknesses = [];
		/** @param {string} str */
		const handle_special = str => {
			if (str.indexOf(";") >= 0) {
				for (const x of str.split("; ")) {
					handle_special(x);
				}
			} else {
				const [type, option] = str.split(" to ");
				const options = option.split(", ");
				if (type === "weak") {
					weaknesses = options;
				} else {
					immunities = options;
				}
			}
		}

		if (m) {
			handle_special(m[1]);
		}

		const effective_power = units * damage;

		return {
			units,
			hp,
			damage,
			initiative,
			attack_type,
			immunities,
			weaknesses,
			effective_power,
			chosen: false,
		};
	});
}

/**
 * @param {Group[]} groups
 */
const helper_sort_group = groups => {
	groups.sort((a, b) => a.effective_power === b.effective_power
		? (b.initiative - a.initiative)
		: (b.effective_power - a.effective_power));
};

/**
 * @param {Group} attacker
 * @param {Group} defender
 */
const helper_get_damage = (attacker, defender) => {
	let damage = attacker.effective_power;
	if (defender.immunities.indexOf(attacker.attack_type) >= 0) {
		damage = -1;
	} else if (defender.weaknesses.indexOf(attacker.attack_type) >= 0) {
		damage *= 2;
	}

	return damage;
};

/**
 * @param {Group} x
 */
const helper_remaining_filter = x => x.units > 0;

/**
 * @param {Group} x
 */
const helper_refresh_group = x => {
	x.chosen = false;
	x.effective_power = x.units * x.damage;
};

/**
 * @param {Group[]} groups
 */
const helper_sum_remaining = groups => groups.reduce((sum, x) => sum + x.units, 0);

/**
 * @param {Group} attacker
 * @param {Group[]} defenders
 * @returns {number} index of the array of defenders
 */
const helper_choose_opponent = (attacker, defenders) => {
	let idx = -1,
		max_damage          = Number.MIN_SAFE_INTEGER,
		max_effective_power = Number.MIN_SAFE_INTEGER,
		max_initiative      = Number.MIN_SAFE_INTEGER;

	const clear_prev = () => {
		if (idx >= 0) {
			defenders[idx].chosen = false;
		}
	};

	for (let i = 0; i < defenders.length; i++) {
		const defender = defenders[i];
		if (defender.chosen) {
			continue;
		}

		const damage = helper_get_damage(attacker, defender);
		if (damage < 0) {
			continue;
		}

		if (damage > max_damage) {
			clear_prev();

			defender.chosen = true;
			idx = i;

			max_damage = damage;
			max_effective_power = defender.effective_power;
			max_initiative = defender.initiative;
		} else if (damage === max_damage) {
			if (defender.effective_power > max_effective_power) {
				clear_prev();

				defender.chosen = true;
				idx = i;

				max_effective_power = defender.effective_power;
				max_initiative = defender.initiative;
			} else if (defender.effective_power === max_effective_power) {
				if (defender.initiative > max_initiative) {
					clear_prev();

					defender.chosen = true;
					idx = i;

					max_initiative = defender.initiative;
				}
			}
		}
	}

	return idx;
};

/**
 * @param {string} data
 * @returns {{ immune_win: boolean; remaining: number}}
 */
export const winning_units = (data, boost_count = 0) => {
	let [immune_system_group, infection_group] = data.split("\n\n").map(parse_groups);

	immune_system_group.forEach(x => {
		x.damage += boost_count;
		x.effective_power = x.damage * x.units;
	});

	let counter = 0;
	while (immune_system_group.length > 0 && infection_group.length > 0) {
		helper_sort_group(immune_system_group);
		helper_sort_group(infection_group);

		/** @type {AttackingGroup[]} */
		const pairs = [];
		immune_system_group.forEach((attacker, idx) => {
			const defender_idx = helper_choose_opponent(attacker, infection_group);
			if (defender_idx < 0) {
				return;
			}

			pairs.push({
				attacker,
				defender: infection_group[defender_idx],
			});
		});
		infection_group.forEach(attacker => {
			const defender_idx = helper_choose_opponent(attacker, immune_system_group);
			if (defender_idx < 0)
				return;

			pairs.push({
				attacker,
				defender: immune_system_group[defender_idx],
			});
		});

		const total_before = helper_sum_remaining(immune_system_group) + helper_sum_remaining(infection_group);
		pairs.sort((a, b) => b.attacker.initiative - a.attacker.initiative);
		pairs.forEach(({ attacker, defender }) => {
			// update effective_power
			attacker.effective_power = attacker.units * attacker.damage;
			if (attacker.effective_power <= 0)
				return;

			const damage = helper_get_damage(attacker, defender);
			const lost = Math.min(Math.floor(damage / defender.hp), defender.units);
			defender.units -= lost;
		});

		immune_system_group = immune_system_group.filter(helper_remaining_filter)
		infection_group = infection_group.filter(helper_remaining_filter);

		const total_after = helper_sum_remaining(immune_system_group) + helper_sum_remaining(infection_group);
		if (total_after === total_before) {
			return {
				immune_win: false,
				remaining: helper_sum_remaining(infection_group),
			};
		}

		immune_system_group.forEach(helper_refresh_group);
		infection_group.forEach(helper_refresh_group);
	}

	return immune_system_group.length > 0
		? {
			immune_win: true,
			remaining: helper_sum_remaining(immune_system_group),
		} : {
			immune_win: false,
			remaining: helper_sum_remaining(infection_group),
		}
};

/**
 * @param {string} data
 */
export const min_fix = (data) => {
	/** @type {ReturnType<typeof winning_units>} */
	let res;

	let low = 0, high = 1;
	while (!(res = winning_units(data, high)).immune_win) {
		low = high;
		high *= 2;
	}

	while (low < high) {
		const mid = (low + high) >> 1;
		if (winning_units(data, mid).immune_win) {
			high = mid;
		} else {
			low = mid + 1;
		}
	}

	return winning_units(data, low).remaining;
};
