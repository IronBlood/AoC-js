/**
 * @param {number} x
 * @param {number} y
 */
const get_adjacent = (x, y) => {
	return [
		[x, y - 1],
		[x, y + 1],
		[x - 1, y],
		[x + 1, y],
	];
};

/**
 * @param {string[][]} grid
 */
export const mutate = (grid) => {
	const next_grid = grid.map(row => row.map(_ => "."));

	const H = grid.length, W = grid[0].length;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	const count_adj = (x, y) => {
		let sum = 0;

		for (const [u, v] of get_adjacent(x, y)) {
			if (!in_grid(u, v))
				continue;
			if (grid[u][v] === "#")
				sum++;
		}

		return sum;
	};

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const should_die = (x, y) => count_adj(x, y) !== 1;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const should_infest = (x, y) => [1, 2].includes(count_adj(x, y));

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === "#") {
				next_grid[i][j] = should_die(i, j) ? "." : "#";
			} else {
				if (should_infest(i, j)) {
					next_grid[i][j] = "#";
				}
			}
		}
	}

	return next_grid;
};

/**
 * @param {string[][]} grid
 */
export const serialize = (grid) => grid.map(row => row.join("")).join("\n");

/**
 * @param {string} data
 */
export const gridfy = (data) => data.split("\n").map(line => line.split(""));

/**
 * @param {string[][]} grid
 */
export const rate = (grid) => grid.reduce((rating, row, row_idx) => rating | row.reduce((r, c, col_idx) => c === "." ? r : (r | (1 << (grid[0].length * row_idx + col_idx))), 0), 0);

/**
 * @param {string} data
 * @returns {number}
 */
export const get_rating = (data) => {
	/** @type {Set<string>} */
	const set = new Set();
	set.add(data);

	let grid = gridfy(data);

	while (true) {
		grid = mutate(grid);
		data = serialize(grid);
		if (set.has(data))
			break;
		set.add(data);
	}

	return rate(grid);
};

/**
 * A helper function to get the adjacents for the recursive part
 * @param {number} level
 * @param {number} x
 * @param {number} y
 */
export const get_adjacent_r = (level, x, y) => {
	/** @type {[number, number, number][]} */
	const res = [];

	const is_center = (a, b) => a === 2 && b === 2;

	/**
	 * check a, b in the same level
	 * @param {number} a
	 * @param {number} b
	 */
	const in_same_level = (a, b) => a >= 0 && a < 5 && b >= 0 && b < 5;

	// handle regular adjacents on the same level
	for (const [a, b] of get_adjacent(x, y)) {
		if (!is_center(a, b) && in_same_level(a, b)) {
			res.push([level, a, b]);
		}
	}

	// handle the out ring
	do {
		// top row
		if (x === 0) {
			res.push([level + 1, 1, 2]);
		}

		// bottom row
		if (x === 4) {
			res.push([level + 1, 3, 2]);
		}

		// left column
		if (y === 0) {
			res.push([level + 1, 2, 1]);
		}

		// right column
		if (y === 4) {
			res.push([level + 1, 2, 3]);
		}
	} while (0);

	// handle the inner ring
	do {
		if (x === 1 && y === 2) {
			for (let i = 0; i < 5; i++) {
				res.push([level - 1, 0, i]);
			}
		}

		if (x === 3 && y === 2) {
			for (let i = 0; i < 5; i++) {
				res.push([level - 1, 4, i]);
			}
		}

		if (x === 2 && y === 1) {
			for (let i = 0; i < 5; i++) {
				res.push([level - 1, i, 0]);
			}
		}

		if (x === 2 && y === 3) {
			for (let i = 0; i < 5; i++) {
				res.push([level - 1, i, 4]);
			}
		}
	} while (0);

	return res;
};

/**
 * @param {string} data
 * @param {number} minutes
 * @returns {number}
 */
export const count_bugs = (data, minutes) => {
	const create_empty_grid = () => {
		/** @type {string[][]} */
		const grid = Array.from({ length: 5 }, () => Array(5).fill("."));
		grid[2][2] = "?";
		return grid;
	};

	const init_map = () => {
		return Array.from({ length: 2 * (minutes + 1) + 1 }, create_empty_grid);
	};

	/**
	 * @param {number} num
	 */
	const get_idx = (num) => num + minutes + 1;

	/**
	 * @param {string[][][]} map
	 * @param {number} level
	 * @param {number} x
	 * @param {number} y
	 */
	const count_adj = (map, level, x, y) => {
		let sum = 0;

		for (const [l, u, v] of get_adjacent_r(level, x, y)) {
			if (!map[get_idx(l)]) {
				console.log(l, get_idx(l));
			}
			if (map[get_idx(l)][u][v] === "#")
				sum++;
		}

		return sum;
	};

	/**
	 * @param {string[][][]} map
	 * @param {number} level
	 * @param {number} x
	 * @param {number} y
	 */
	const should_die = (map, level, x, y) => count_adj(map, level, x, y) !== 1;

	/**
	 * @param {string[][][]} map
	 * @param {number} level
	 * @param {number} x
	 * @param {number} y
	 */
	const should_infest = (map, level, x, y) => [1, 2].includes(count_adj(map, level, x, y));

	const init_grid = gridfy(data);
	init_grid[2][2] = "?";
	let map = init_map();
	map[get_idx(0)] = init_grid;

	for (let time = 1; time <= minutes; time++) {
		const next_map = init_map();
		for (let level = -time; level <= time; level++) {
			const next_grid = next_map[get_idx(level)],
				curr_grid = map[get_idx(level)];

			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 5; j++) {
					if (i === 2 && j === 2)
						continue;

					if (curr_grid[i][j] === "#") {
						next_grid[i][j] = should_die(map, level, i, j) ? "." : "#";
					} else {
						if (should_infest(map, level, i, j)) {
							next_grid[i][j] = "#";
						}
					}
				}
			}
		}
		map = next_map;
	}

	/**
	 * @param {string[][]} grid
	 */
	const helper_count_bug = (grid) => grid.reduce((sum, row) => sum + row.reduce((s, c) => s + (c === "#" ? 1 : 0), 0), 0);

	return map.reduce((sum, grid) => sum + helper_count_bug(grid), 0);
};

