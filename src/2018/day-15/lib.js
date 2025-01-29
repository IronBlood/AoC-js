/**
 * @typedef {Object} Unit
 * @property {0|1}              type 0E, 1G
 * @property {string}           type_str
 * @property {number}           hp
 * @property {[number, number]} pos
 */

/** @type {[number, number][]} */
const directions = [
	[-1, 0], // up
	[0, -1], // left
	[0, 1],  // right
	[1, 0],  // down
];

/**
 * @param {Unit[]} units
 */
const is_finished = (units) => {
	units = units.filter(u => u.hp > 0);

	if (units.length <= 1)
		return true;

	let type = units[0].type;
	for (let u of units) {
		if (u.type !== type)
			return false;
	}
	return true;
};

/**
 * @param {string[][]} grid
 * @param {[number, number]} source
 * @param {[number, number]} target
 * @returns {number}
 */
const get_distance = (grid, source, target) => {
	if (source[0] === target[0] && source[1] === target[1])
		return 0;

	const M = grid.length, N = grid[0].length;

	// start of bfs
	let dist = 0;
	let queue = [source];

	/** @type {number[][]} */
	const visited = Array.from({ length: M }, () => Array(N).fill(0));

	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];
		for (let [x, y] of queue) {
			if (x === target[0] && y === target[1]) {
				return dist;
			}

			if (x < 0 || x >= M || y < 0 || y >= N || visited[x][y] === 1) {
				continue;
			}
			if (grid[x][y] !== ".") {
				if (x !== source[0] || y !== source[1]) {
					continue;
				}
			}

			visited[x][y] = 1;
			directions.forEach(d => {
				next_queue.push([
					x + d[0],
					y + d[1],
				]);
			});
		}

		dist++;
		queue = next_queue;
	}

	// unreachable
	return -1;
};

/**
 * @param {string[][]}        grid
 * @param {Unit}              unit
 * @param {Unit[]}            candidates
 */
const reachable = (grid, unit, candidates) => {
	const M = grid.length, N = grid[0].length;
	const squares = candidates.flatMap(c => {
		return directions.map(d => [
			c.pos[0] + d[0],
			c.pos[1] + d[1],
		]).filter(([x, y]) => {
			let check = x >= 0 && x < M && y >= 0 && y < N;
			// out of range
			if (!check) {
				return false;
			}
			// empty spot
			if (grid[x][y] === ".")
				return true;

			if (x === unit.pos[0] && y === unit.pos[1])
				return true;
			return false;
		});
	});

	return squares.map(loc => ({
		loc,
		dist: get_distance(grid, unit.pos, loc)
	})).filter(s => s.dist >= 0);
};

/**
 * @param {string[][]} grid
 * @param {[number, number]} source
 * @param {[number, number]} target
 * @returns {[number, number]}
 */
const shortest_vector = (grid, source, target) => {
	let idx = -1, shortest_dist = Number.MAX_SAFE_INTEGER;
	const M = grid.length, N = grid[0].length;

	directions.forEach((d, i) => {
		const x = source[0] + d[0], y = source[1] + d[1];
		if (x >= 0 && x < M && y >= 0 && y < N && grid[x][y] === ".") {
			const dist = get_distance(grid, [x,y], target);
			if (dist < 0)
				return;

			if (shortest_dist > dist) {
				shortest_dist = dist;
				idx = i;
			}
		}
	});

	return directions[idx];
};

/**
 * @param {string[][]}        grid
 * @param {Unit}              unit
 * @param {Unit[]}            candidates
 * @param {Map<string, Unit>} locations
 * @param {number}            part
 * @param {number}            elf_damage
 */
const act = (grid, unit, candidates, locations, part = 1, elf_damage = 3) => {
	let damage = 3;
	if (part === 2 && unit.type === 0) {
		damage = elf_damage;
	}

	// not able to act
	if (unit.hp <= 0)
		return;
	// no more opponents
	if (candidates.length === 0)
		return;

	const reachable_squares = reachable(grid, unit, candidates);
	if (reachable_squares.length === 0) {
		return;
	}

	// sort nearest first
	// then readable orders
	reachable_squares.sort((a, b) => a.dist !== b.dist
		? a.dist - b.dist
		: a.loc[0] !== b.loc[0]
		? a.loc[0] - b.loc[0]
		: a.loc[1] - b.loc[1]
	);
	const target = reachable_squares[0];
	if (target.dist > 0) {
		// need to move first
		const v = shortest_vector(grid, unit.pos, target.loc);
		const [x, y] = unit.pos;
		const nx = x + v[0], ny = y + v[1];
		grid[x][y] = ".";
		locations.delete(unit.pos.join(","));
		grid[nx][ny] = unit.type_str;
		unit.pos = [nx, ny];
		locations.set(unit.pos.join(","), unit);
	}

	const M = grid.length, N = grid[0].length;
	let [x, y] = unit.pos;
	/** @type {Unit[]} */
	let opponents = [];
	for (let i = 0; i < 4; i++) {
		const query_loc = [
			x + directions[i][0],
			y + directions[i][1],
		].join(",");
		let o = locations.get(query_loc);
		if (o && o.type != unit.type) {
			opponents.push(o);
		}
	}

	if (opponents.length > 0) {
		let idx = 0, lowest_hp = opponents[0].hp;
		opponents.forEach((o, i) => {
			if (o.hp > 0 && lowest_hp > o.hp) {
				lowest_hp = o.hp
				idx = i;
			}
		});
		const o = opponents[idx];
		o.hp -= damage;
		if (o.hp <= 0) {
			locations.delete(o.pos.join(","));
			const [x,y] = o.pos;
			grid[x][y] = ".";
		}
	}
};

/**
 * @param {string} data
 */
export const get_outcome = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	const M = grid.length, N = grid[0].length;
	/** @type {Map<string, Unit>} locations */
	const locations = new Map();

	/** @type {Unit[]} */
	let units = [];
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			let idx = "EG".indexOf(grid[i][j]);
			if (idx >= 0) {
				const unit = {
					type: idx,
					type_str: grid[i][j],
					hp: 200,
					pos: [i, j],
				};
				units.push(unit);
				locations.set(unit.pos.join(","), unit);
			}
		}
	}

	let rounds = 0;
	while (!is_finished(units)) {
		let should_break = false;
		units.sort((a, b) => a.pos[0] === b.pos[0]
			? (a.pos[1] - b.pos[1])
			: (a.pos[0] - b.pos[0])
		);

		for (let i = 0; i < units.length; i++) {
			const u = units[i];
			act(grid, u, units.filter(x => x.hp > 0 && x.type != u.type), locations);
			if (is_finished(units) && i !== units.length - 1) {
				should_break = true;
				break;
			}
		}

		units = units.filter(x => x.hp > 0);

		if (should_break) {
			break;
		}
		rounds++;
	}

	return rounds * units.reduce((sum, curr) => sum + curr.hp, 0);
};

/**
 * @param {string} data
 */
export const get_outcome2 = (data) => {
	const ori_grid = data.split("\n").map(line => line.split(""));
	const M = ori_grid.length, N = ori_grid[0].length;

	/** @type {Unit[]} */
	let ori_units = [];
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			let idx = "EG".indexOf(ori_grid[i][j]);
			if (idx >= 0) {
				const unit = {
					type: idx,
					type_str: ori_grid[i][j],
					hp: 200,
					pos: [i, j],
				};
				ori_units.push(unit);
			}
		}
	}

	/**
	 * @param {Unit[]} units
	 */
	const count_elves = (units) => units.filter(u => u.type === 0).length;

	let elf_damage = 4;
	let rounds = 0;
	const elves_number = count_elves(ori_units);

	while (true) {
		rounds = 0;

		// duplicate, be careful
		let grid = ori_grid.map(row => row.slice());
		let units = ori_units.map(({ hp, type, type_str, pos}) => ({ hp, type, type_str, pos: pos.slice() }));
		const locations = new Map();
		units.forEach(u => locations.set(u.pos.join(","), u));

		// simulate
		// TODO could be optimized without full simulations, but usually the time consumption is acceptable
		while (!is_finished(units)) {
			let should_break = false;
			units.sort((a, b) => a.pos[0] === b.pos[0]
				? (a.pos[1] - b.pos[1])
				: (a.pos[0] - b.pos[0])
			);

			for (let i = 0; i < units.length; i++) {
				const u = units[i];
				act(grid, u, units.filter(x => x.hp > 0 && x.type != u.type), locations, 2, elf_damage);
				if (is_finished(units) && i !== units.length - 1) {
					should_break = true;
					break;
				}
			}

			units = units.filter(x => x.hp > 0);

			if (should_break) {
				break;
			}
			rounds++;
		}

		if (count_elves(units) != elves_number) {
			elf_damage++;
			continue;
		}

		// elves win
		return rounds * units.reduce((sum, curr) => sum + curr.hp, 0);
	}
};

