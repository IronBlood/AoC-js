// @ts-check

/**
 * @param {string[][]} grid
 */
export const calc_load = (grid) => {
	const H = grid.length, W = grid[0].length;
	return grid.reduce((sum, row, idx) => sum + (H - idx) * row.filter(x => x === "O").length, 0);
};

/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 */
const move_o_north = (grid, x, y) => {
	let nx = x;
	while (nx - 1 >= 0 && grid[nx - 1][y] === ".") {
		nx--;
	}
	grid[x][y] = ".";
	grid[nx][y] = "O";
};

/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 */
const move_o_west = (grid, x, y) => {
	let ny = y;
	while (ny - 1 >= 0 && grid[x][ny - 1] === ".") {
		ny--;
	}
	grid[x][y] = ".";
	grid[x][ny] = "O";
};

/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 */
const move_o_south = (grid, x, y) => {
	let nx = x;
	const H = grid.length;
	while (nx + 1 < H && grid[nx + 1][y] === ".") {
		nx++;
	}
	grid[x][y] = ".";
	grid[nx][y] = "O";
};

/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 */
const move_o_east = (grid, x, y) => {
	let ny = y;
	const W = grid[0].length;
	while (ny + 1 < W && grid[x][ny + 1] === ".") {
		ny++;
	}
	grid[x][y] = ".";
	grid[x][ny] = "O";
};

/**
 * @param {string[][]} grid
 */
const roll_north = (grid) => {
	const H = grid.length, W = grid[0].length;

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === "O") {
				move_o_north(grid, i, j);
			}
		}
	}
};

/**
 * @param {string[][]} grid
 */
const roll_west = (grid) => {
	const H = grid.length, W = grid[0].length;

	for (let j = 0; j < W; j++) {
		for (let i = 0; i < H; i++) {
			if (grid[i][j] === "O") {
				move_o_west(grid, i, j);
			}
		}
	}
};

/**
 * @param {string[][]} grid
 */
const roll_south = (grid) => {
	const H = grid.length, W = grid[0].length;

	for (let i = H - 1; i >= 0; i--) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === "O") {
				move_o_south(grid, i, j);
			}
		}
	}
};

/**
 * @param {string[][]} grid
 */
const roll_east = (grid) => {
	const H = grid.length, W = grid[0].length;

	for (let j = W - 1; j >= 0; j--) {
		for (let i = 0; i < H; i++) {
			if (grid[i][j] === "O") {
				move_o_east(grid, i, j);
			}
		}
	}
};

/**
 * @param {string[][]} grid
 */
export const do_cycle = (grid, cycle = 1) => {
	while (cycle-- > 0) {
		roll_north(grid);
		roll_west(grid);
		roll_south(grid);
		roll_east(grid);
	}
};

/**
 * @param {string} data
 */
export const total_load = (data) => {
	const grid = data.split("\n").map(line => line.split(""));

	roll_north(grid);

	return calc_load(grid);
};

/**
 * @param {Map<string, string>} map
 * @param {string} s
 * @returns {number}
 */
const find_period = (map, s) => {
	let period = 0;
	/** @type {string} */
	let t = s;

	while ((t = map.get(t) || "") !== s) {
		period++;
	}

	return period;
};

/**
 * @param {string} data
 */
export const total_load2 = (data) => {
	let grid = data.split("\n").map(line => line.split(""));

	/** @type {Map<string, number>} */
	const seen = new Map();
	/** @type {Map<string, string>} */
	const next_map = new Map();

	let count = 1_000_000_000;

	let iter = 0;

	while (iter < count) {
		if (seen.has(data)) {
			const first = /** @type {number} */ (seen.get(data));
			const cycle_len = iter - first;
			let remaining = (count - iter) % cycle_len;
			while (remaining-- > 0) {
				data = /** @type {string} */ (next_map.get(data));
			}
			break;
		}

		seen.set(data, iter);
		let next_data = next_map.get(data);
		if (!next_data) {
			const grid = data.split("\n").map(line => line.split(""));
			do_cycle(grid);
			next_data = grid.map(row => row.join("")).join("\n");
			next_map.set(data, next_data);
		}

		data = next_data;
		iter++;
	}

	grid = data.split("\n").map(line => line.split(""));

	return calc_load(grid);
};
