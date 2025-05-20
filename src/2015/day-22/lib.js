const spells = [
	{ name: "Magic Missile", cost: 53,  damage: 4          },
	{ name: "Drain",         cost: 73,  damage: 2, heal: 2 },
	{ name: "Shield",        cost: 113, armor:  7, last: 6 },
	{ name: "Poison",        cost: 173, damage: 3, last: 6 },
	{ name: "Recharge",      cost: 229, mana: 101, last: 5 },
];

/**
 * @typedef {Object} Buff
 * @property {"armor"|"hp"|"mana"} key
 * @property {number} value
 * @property {number} remain
 */

/**
 * @typedef {Object} PlayerState
 * @property {number} hp
 * @property {number} mana
 * @property {number} armor
 * @property {number} mana_acc
 * @property {Buff[]} buffs
 */

/**
 * @typedef {Object} BossState
 * @property {number} hp
 * @property {number} damage
 * @property {Buff[]} buffs
 */

/**
 * @template T
 * @param {T} obj
 * @returns {T}
 */
const deep_copy = obj => JSON.parse(JSON.stringify(obj));

/**
 * @param {{ hp: number; mana: number}} player_init_state
 * @param {{ hp: number; damage: number}} boss_init_state
 */
export const least_mana = (player_init_state, boss_init_state, part = 1) => {
	const PLAYER_TURN = 1, BOSS_TURN = 0;
	let min_mana = Number.MAX_SAFE_INTEGER;

	/** @type {Set<string>} */
	const memo = new Set();
	/**
	 * @param {PlayerState} player_state
	 * @param {BossState} boss_state
	 * @param {1|0} turn
	 */
	const simulate = (player_state, boss_state, turn) => {
		const key = JSON.stringify({ player_state, boss_state, turn });
		if (memo.has(key))
			return;
		memo.add(key);

		// return if player is dead
		if (player_state.hp <= 0) {
			return;
		}

		// update boss state
		if (boss_state.buffs.length > 0) {
			boss_state.buffs.forEach(b => {
				boss_state[b.key] += b.value;
				b.remain--;
			});
			boss_state.buffs = boss_state.buffs.filter(b => b.remain > 0);
		}
		if (boss_state.hp <= 0) {
			if (min_mana > player_state.mana_acc) {
				min_mana = player_state.mana_acc;
			}
			return;
		}

		// update player state
		if (player_state.buffs.length > 0) {
			player_state.buffs.forEach(b => {
				player_state[b.key] += b.value;
				b.remain--;
			});
			player_state.buffs = player_state.buffs.filter(b => b.remain > 0);
		}

		// from now on, anything passed to simulate needs to be cloned
		if (turn === BOSS_TURN) {
			const next_boss_state = deep_copy(boss_state),
				next_player_state = deep_copy(player_state);
			next_player_state.hp -= Math.max(next_boss_state.damage - next_player_state.armor, 1);
			next_player_state.armor = 0;
			simulate(next_player_state, next_boss_state, PLAYER_TURN);
		} else {
			if (part === 2) {
				player_state.hp -= 1;
				if (player_state.hp <= 0) {
					return;
				}
			}

			for (let spell of spells.filter(s => s.cost <= player_state.mana)) {
				if (boss_state.buffs.some(b => b.key === "hp") && spell.name === "Poison")
					continue;
				if (player_state.buffs.some(b => b.key === "mana") && spell.name === "Recharge")
					continue;
				if (player_state.buffs.some(b => b.key === "armor") && spell.name === "Shield")
					continue;

				const next_boss_state = deep_copy(boss_state),
					next_player_state = deep_copy(player_state);

				switch (spell.name) {
				case "Magic Missile":
					next_boss_state.hp -= spell.damage;
					break;
				case "Drain":
					next_boss_state.hp -= spell.damage;
					next_player_state.hp += spell.heal;
					break;
				case "Shield":
					next_player_state.buffs.push({
						key: "armor",
						value: spell.armor,
						remain: spell.last,
					});
					break;
				case "Poison":
					next_boss_state.buffs.push({
						key: "hp",
						value: -spell.damage,
						remain: spell.last,
					});
					break;
				case "Recharge":
					next_player_state.buffs.push({
						key: "mana",
						value: spell.mana,
						remain: spell.last,
					});
					break;
				}

				next_player_state.armor = 0;
				next_player_state.mana -= spell.cost;
				next_player_state.mana_acc += spell.cost;
				simulate(next_player_state, next_boss_state, BOSS_TURN);
			}
		}
	};

	simulate({
		hp: player_init_state.hp,
		mana: player_init_state.mana,
		armor: 0,
		mana_acc: 0,
		buffs: [],
	}, {
		hp: boss_init_state.hp,
		damage: boss_init_state.damage,
		buffs: [],
	}, PLAYER_TURN);

	return min_mana;
};

