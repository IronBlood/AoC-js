// @ts-check

const Vectors = {
	GO_NORTH: [-1, 0],
	GO_EAST: [0, 1],
	GO_SOUTH: [1, 0],
	GO_WEST: [0, -1],

	GO_SE: [1, 1],
	GO_SW: [1, -1],
	GO_NE: [-1, 1],
	GO_NW: [-1, -1],
};

const CHARS = {
	V_PIPE: "|",
	H_PIPE: "-",
	/** ╰ */
	B_NE: "L",
	/** ╯ */
	B_NW: "J",
	/** ╮ */
	B_SW: "7",
	/** ╭ */
	B_SE: "F",
};

const ANSI_FG_DARK_RED = "\x1b[0;31m";
const ANSI_FG_DARK_GRN = "\x1b[0;32m";
const ANSI_FG_BRGT_BLU = "\x1b[1;34m";
const ANSI_FG_END      = "\x1b[0m";
const CHAR_HOLLOW      = " ";

/**
 * @param {string[][]} grid
 * @param {[number, number]} start
 * @returns {[false] | [true, number]}
 */
const walk = (grid, start, enable_color = false) => {
	let steps = 0, [x, y] = start;
	let start_c = grid[x][y];

	let dir = [
		CHARS.H_PIPE,
		CHARS.B_NW,
		CHARS.B_SW,
	].includes(start_c)
	? Vectors.GO_EAST
	: start_c === CHARS.B_SE
	? Vectors.GO_NORTH
	: Vectors.GO_SOUTH;

	const start_dir = dir;

	const in_grid = (x, y) => x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;

	while (true) {
		if (!in_grid(x, y)) {
			return [false];
		}

		// it's a loop!
		if (steps > 0 && x === start[0] && y === start[1]) {
			if (dir !== start_dir) {
				return [false];
			}

			if (enable_color)
				grid[x][y] = grid[x][y].replace(ANSI_FG_DARK_RED, ANSI_FG_BRGT_BLU);
			return [true, steps];
		}

		// update steps first
		steps++;

		const curr_char = grid[x][y];
		if (enable_color)
			grid[x][y] = `${ANSI_FG_DARK_RED}${curr_char}${ANSI_FG_END}`;

		// the simpliest cases
		if ([CHARS.V_PIPE, CHARS.H_PIPE].includes(curr_char)) {
			const [dx, dy] = dir;

			if ((curr_char === CHARS.V_PIPE && dy !== 0) || (curr_char === CHARS.H_PIPE && dx !== 0)) {
				return [false];
			}

			x += dx;
			y += dy;

			continue;
		}

		// check and change directions
		if (curr_char === CHARS.B_NE) {
			if (dir === Vectors.GO_SOUTH) {
				dir = Vectors.GO_EAST;
			} else if (dir === Vectors.GO_WEST) {
				dir = Vectors.GO_NORTH;
			} else {
				return [false];
			}
		}
		if (curr_char === CHARS.B_NW) {
			if (dir === Vectors.GO_EAST) {
				dir = Vectors.GO_NORTH;
			} else if (dir === Vectors.GO_SOUTH) {
				dir = Vectors.GO_WEST;
			} else {
				return [false];
			}
		}
		if (curr_char === CHARS.B_SE) {
			if (dir === Vectors.GO_WEST) {
				dir = Vectors.GO_SOUTH;
			} else if (dir === Vectors.GO_NORTH) {
				dir = Vectors.GO_EAST;
			} else {
				return [false];
			}
		}
		if (curr_char === CHARS.B_SW) {
			if (dir === Vectors.GO_EAST) {
				dir = Vectors.GO_SOUTH;
			} else if (dir === Vectors.GO_NORTH) {
				dir = Vectors.GO_WEST;
			} else {
				return [false];
			}
		}

		const [dx, dy] = dir;
		x += dx;
		y += dy;
	}
};

/**
 * @param {string[][]} grid
 * @returns {[number, number] | undefined}
 */
const find_start = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === "S")
				return [i, j];
		}
	}
};

/**
 * @param {string[][]} grid
 */
const flood = (grid) => {
	// WARN: check your input first
	let queue = [[0, 0]];

	const dirs = [0, 1, 0, -1, 0];

	const in_grid = (x, y) => x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;

	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];
		for (const [x, y] of queue) {
			if (!in_grid(x, y) || grid[x][y].startsWith("\x1b")) {
				continue;
			}
			grid[x][y] = `${ANSI_FG_DARK_GRN}${grid[x][y]}${ANSI_FG_END}`;

			for (let i = 0; i < 4; i++) {
				next_queue.push([
					x + dirs[i],
					y + dirs[i + 1],
				]);
			}
		}
		queue = next_queue;
	}
};

/**
 * @param {string[][]} grid
 */
const walk2 = (grid) => {
	const H = grid.length, W = grid[0].length;
	let start, found = false;
	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j].startsWith(ANSI_FG_DARK_RED)) {
				found = true;
				start = [i, j];
				break;
			}
		}
	}

	if (!start) {
		throw new Error("");
	}

	// top left should be `F`
	let [x, y] = start;
	let vector_forward = Vectors.GO_EAST;
	let steps          = 0;
	let hollow_count   = 0;

	const in_grid = (x, y) => x >= 0 && x < H && y >= 0 && y < W;

	const extract_char = (x, y) => {
		return grid[x][y][ANSI_FG_DARK_RED.length]
	};

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const bfs = (x, y) => {
		const is_hollow = (char) => char.length === 1 && char !== CHAR_HOLLOW;

		const raw_char = grid[x][y];
		// visited or border
		if (!is_hollow(raw_char)) {
			return;
		}

		const dirs = [0, 1, 0, -1, 0];

		let queue = [[x, y]];
		while (queue.length) {
			/** @type {typeof queue} */
			const next_queue = [];

			for (const [u, v] of queue) {

				if (!in_grid(u, v) || !is_hollow(grid[u][v]))
					continue;

				grid[u][v] = CHAR_HOLLOW;
				hollow_count++;

				for (let i = 0; i < 4; i++) {
					next_queue.push([
						u + dirs[i],
						v + dirs[i + 1],
					]);
				}
			}

			queue = next_queue;
		}

	};

	while (true) {
		// looped
		if (steps > 0 && x === start[0] && y === start[1]) {
			break;
		}

		steps++;
		const curr_char = extract_char(x, y);

		let vector_check;

		if (curr_char === CHARS.V_PIPE) {
			vector_check = vector_forward === Vectors.GO_SOUTH
				? Vectors.GO_WEST
				: Vectors.GO_EAST;
		}

		if (curr_char === CHARS.H_PIPE) {
			vector_check = vector_forward === Vectors.GO_EAST
				? Vectors.GO_SOUTH
				: Vectors.GO_NORTH;
		}

		if (vector_check) {
			const [dcx, dcy] = vector_check;
			// @ts-ignore
			bfs(x + dcx, y + dcy);

			const [dx, dy] = vector_forward;
			x += dx;
			y += dy;

			continue;
		}

		// change directions
		switch (curr_char) {
			case CHARS.B_NE:
				if (vector_forward === Vectors.GO_SOUTH) {
					vector_forward = Vectors.GO_EAST;
					vector_check   = [
						Vectors.GO_SW,
						Vectors.GO_SOUTH,
						Vectors.GO_WEST,
					];
				} else {
					vector_forward = Vectors.GO_NORTH;
					vector_check   = [
						Vectors.GO_NE,
						Vectors.GO_NORTH,
						Vectors.GO_EAST,
					];
				}
				break;
			case CHARS.B_NW:
				if (vector_forward === Vectors.GO_EAST) {
					vector_forward = Vectors.GO_NORTH;
					vector_check   = [
						Vectors.GO_SE,
						Vectors.GO_SOUTH,
						Vectors.GO_EAST,
					];
				} else {
					vector_forward = Vectors.GO_WEST;
					vector_check   = [
						Vectors.GO_NW,
						Vectors.GO_NORTH,
						Vectors.GO_WEST,
					];
				}
				break;
			case CHARS.B_SE:
				if (vector_forward === Vectors.GO_WEST) {
					vector_forward = Vectors.GO_SOUTH;
					vector_check   = [
						Vectors.GO_NW,
						Vectors.GO_NORTH,
						Vectors.GO_WEST,
					];
				} else {
					vector_forward = Vectors.GO_EAST;
					vector_check   = [
						Vectors.GO_SE,
						Vectors.GO_SOUTH,
						Vectors.GO_EAST,
					];
				}
				break;
			case CHARS.B_SW:
				if (vector_forward === Vectors.GO_EAST) {
					vector_forward = Vectors.GO_SOUTH;
					vector_check   = [
						Vectors.GO_SW,
						Vectors.GO_SOUTH,
						Vectors.GO_WEST,
					];
				} else {
					vector_forward = Vectors.GO_WEST;
					vector_check   = [
						Vectors.GO_NE,
						Vectors.GO_NORTH,
						Vectors.GO_EAST,
					];
				}
				break;
		}

		if (!vector_check)
			throw new Error("");

		for (const [dcx, dcy] of vector_check) {
			bfs(x + dcx, y + dcy);
		}

		const [dx, dy] = vector_forward;
		x += dx;
		y += dy;
	}

	return hollow_count;
};

/**
 * @param {string} c
 */
const beautiful_replace = (c) => {
	return c
		.replace("7", "╮")
		.replace("F", "╭")
		.replace("L", "╰")
		.replace("J", "╯");
};

/**
 * @param {string[][]} grid
 */
const beautiful_dump = (grid) => {
	console.log(grid
		.map(row => row.map(beautiful_replace).join(""))
		.join("\n")
	);
};

/**
 * @param {string} data
 * @returns {number}
 */
export const solve = (data, part = 1) => {
	const grid = data.split("\n").map(line => line.split(""));
	const start = find_start(grid);
	if (!start) {
		throw new Error("failed to find start");
	}

	const [sx, sy] = start;

	let steps = -1;

	for (const c of Object.values(CHARS)) {
		grid[sx][sy] = c;
		const res = walk(grid, start);
		if (res[0]) {
			steps = Math.ceil(res[1] / 2);
			break;
		}
	}

	if (part === 1)
		return steps;

	walk(grid, start, true);
	flood(grid);

	const count = walk2(grid);
	beautiful_dump(grid);
	return count;
};
