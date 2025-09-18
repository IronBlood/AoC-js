// @ts-check

import { Dir } from "node:fs";

/**
 * @typedef {import("./types").WallInfo} WallInfo
 * @typedef {import("./types").Instruction} Instruction
 * @typedef {import("./types").Tile} Tile
 * @typedef {import("./types").Direction} Direction
 * @typedef {import("./types").Position} Position
 * @typedef {import("./types").State} State
 * @typedef {import("./types").Graph} Graph
 * @typedef {import("./types").Neighbors3D} Neighbors3D
 * @typedef {import("./types").FaceAdj} FaceAdj
 */

const CHAR_EMPTY = " ";
const CHAR_WALL  = "#";

/**
 * @param {string} str
 * @return {string[][]}
 */
const gen_grid = (str) => {
	const lines = str.split("\n");
	const W = Math.max(...lines.map(l => l.length));
	const grid = lines.map(line => {
		if (line.length < W) {
			line = line.padEnd(W, CHAR_EMPTY);
		}
		return line.split("");
	});
	return grid;
};

/**
 * @param {string[][]} grid
 * @returns {WallInfo}
 */
export const get_rows_and_cols_with_walls = (grid) => {
	const H = grid.length, W = grid[0].length;
	/** @type {(0|1)[]} */
	const rows = Array(H).fill(0);
	/** @type {(0|1)[]} */
	const cols = Array(W).fill(0);

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === CHAR_WALL) {
				rows[i] = 1;
				break;
			}
		}
	}

	for (let j = 0; j < W; j++) {
		for (let i = 0; i < H; i++) {
			if (grid[i][j] === CHAR_WALL) {
				cols[j] = 1;
				break;
			}
		}
	}

	return { rows, cols };
};

/** @type {(x: any) => x is "R" | "L"} */
const is_direction_char = (x) => /[RL]/.test(x);

/**
 * @param {string} str
 * @returns {Instruction[]}
 */
export const parse_instructions = (str) => {
	/** @type {Instruction[]} */
	const res = [];
	if (!/^[0-9RL]+$/.test(str)) {
		throw new Error("never");
	}

	for (const x of str.split(/([RL])/).filter(Boolean)) {
		if (is_direction_char(x)) {
			res.push(x);
		} else {
			res.push(+x);
		}
	}

	return res;
};

/**
 * @param {string[][]} grid
 */
export const get_borders = (grid, i, j) => {
	/** @type {Record<Direction, number>} */
	const borders = Object.create(null);
	const H = grid.length, W = grid[0].length;
	let x;

	x = i - 1;
	while (x >= 0 && grid[x][j] !== CHAR_EMPTY) {
		x--;
	}
	borders.N = x;

	x = i + 1;
	while (x < H && grid[x][j] !== CHAR_EMPTY) {
		x++;
	}
	borders.S = x;

	x = j - 1;
	while (x >= 0 && grid[i][x] !== CHAR_EMPTY) {
		x--;
	}
	borders.W = x;

	x = j + 1;
	while (x < W && grid[i][x] !== CHAR_EMPTY) {
		x++;
	}
	borders.E = x;

	return borders;
};

/**
 * @param {Record<Direction, number>} borders
 * @param {number} y
 */
const get_left = (borders, y, steps = 1) => {
	const L = borders.W, R = borders.E, W = R - L - 1;
	steps %= W;

	let rel_y = y - L - 1;
	rel_y = (rel_y - steps + W) % W;
	return L + 1 + rel_y;
};

/**
 * @param {Record<Direction, number>} borders
 * @param {number} y
 */
const get_right = (borders, y, steps = 1) => {
	const L = borders.W, R = borders.E, W = R - L - 1;
	steps %= W;

	let rel_y = y - L - 1;
	rel_y = (rel_y + steps) % W;
	return L + 1 + rel_y;
};

/**
 * @param {Record<Direction, number>} borders
 * @param {number} x
 */
const get_top = (borders, x, steps = 1) => {
	const L = borders.N, R = borders.S, H = R - L - 1;
	steps %= H;

	let rel_x = x - L - 1;
	rel_x = (rel_x - steps + H) % H;
	return L + 1 + rel_x;
};

/**
 * @param {Record<Direction, number>} borders
 * @param {number} x
 */
const get_bottom = (borders, x, steps = 1) => {
	const L = borders.N, R = borders.S, H = R - L - 1;
	steps %= H;

	let rel_x = x - L - 1;
	rel_x = (rel_x + steps) % H;
	return L + 1 + rel_x;
};

/**
 * @param {string[][]} grid
 * @param {(0|1)[]} rows
 * @param {(0|1)[]} cols
 * @param {Record<Direction, number>} borders
 * @param {number} i
 * @param {number} j
 */
const get_farthest_neighbors = (grid, rows, cols, borders, i, j) => {
	/** @type {Record<Direction, number>} */
	const neighbors = Object.create(null);

	if (cols[j]) {
		let x = i;
		let steps = 0;
		while (true) {
			x = get_bottom(borders, x);
			if (grid[x][j] === CHAR_WALL) {
				break;
			}
			steps++;
		}
		neighbors.S = steps;

		x = i;
		steps = 0;
		while (true) {
			x = get_top(borders, x);
			if (grid[x][j] === CHAR_WALL) {
				break;
			}
			steps++;
		}
		neighbors.N = steps;
	}

	if (rows[i]) {
		let y;
		let steps;

		y = j;
		steps = 0;
		while (true) {
			y = get_left(borders, y);
			if (grid[i][y] === CHAR_WALL) {
				break;
			}
			steps++;
		}
		neighbors.W = steps;

		y = j;
		steps = 0;
		while (true) {
			y = get_right(borders, y);
			if (grid[i][y] === CHAR_WALL) {
				break;
			}
			steps++;
		}
		neighbors.E = steps;
	}

	return neighbors;
};

/**
 * @param {string[][]} grid
 * @param {(0|1)[]} rows
 * @param {(0|1)[]} cols
 * @returns {Graph}
 */
export const build_graph = (grid, rows, cols) => {
	/** @type {Map<string, Tile>} */
	const tiles = new Map();

	const H = grid.length;
	const W = grid[0].length;

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === CHAR_EMPTY || grid[i][j] === CHAR_WALL)
				continue;

			/** @type {Position} */
			const position = [i, j];
			const key = position.join(",");
			const borders = get_borders(grid, i, j);
			const farthest_tiles = get_farthest_neighbors(grid, rows, cols, borders, i, j);
			tiles.set(key, {
				position,
				borders,
				farthest_tiles,
			});
		}
	}

	return { tiles, rows, cols };
};

/** @type {Direction[]} */
const DIRECTIONS = [ "E", "S", "W", "N" ];

/**
 * @param {Direction} d
 */
const turn_dir = (d, t) => {
	let idx = DIRECTIONS.indexOf(d);
	idx = (idx + (t === "R" ? 1 : 3)) % 4;
	return DIRECTIONS[idx];
};

/**
 * @param {Graph} graph
 * @param {State} state
 * @param {Instruction} instruction
 */
const walk = (graph, state, instruction) => {
	if (is_direction_char(instruction)) {
		state.direction = turn_dir(state.direction, instruction);
	} else {
		const key = state.position.join(",");
		const tile = graph.tiles.get(key);
		if (!tile) {
			throw new Error(`never ${key}`);
		}

		let [x, y] = state.position;
		let steps = Math.min(instruction, tile.farthest_tiles[state.direction] ?? Infinity);
		switch (state.direction) {
			case "N":
				state.position[0] = get_top(tile.borders, x, steps);
				break;
			case "S":
				state.position[0] = get_bottom(tile.borders, x, steps);
				break;
			case "E":
				state.position[1] = get_right(tile.borders, y, steps);
				break;
			case "W":
				state.position[1] = get_left(tile.borders, y, steps);
				break;
		}
	}
};

/**
 * @param {State} state
 */
export const serialize_password = (state) => {
	const idx = DIRECTIONS.indexOf(state.direction);
	if (idx < 0) {
		throw new Error("never");
	}

	const [x, y] = state.position;

	return 1000 * (x + 1) + 4 * (y + 1) + idx;
};

/**
 * @param {string} data
 */
export const get_password = (data) => {
	const [seg0, seg1] = data.split("\n\n");

	const raw_grid = gen_grid(seg0);

	const wall_info = get_rows_and_cols_with_walls(raw_grid);
	const { rows, cols } = wall_info;
	const graph = build_graph(raw_grid, rows, cols);

	let j = raw_grid[0].indexOf(".");
	if (j < 0) {
		throw new Error("never");
	}

	/** @type {State} */
	const state = {
		position: [0, j],
		direction: "E",
	};

	for (const instruction of parse_instructions(seg1)) {
		walk(graph, state, instruction);
	}

	// console.log(state);
	return serialize_password(state);
};

/**
 * To calculate the face size of N
 * @param {string} str
 */
const get_N = (str) => {
	let non_empty_char_count = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] !== CHAR_EMPTY && str[i] !== "\n") {
			non_empty_char_count++;
		}
	}

	const N = Math.sqrt(non_empty_char_count / 6);
	if (N !== Math.trunc(N)) {
		throw new Error(`${non_empty_char_count} -> ${N}`);
	}
	return N;
};

/**
 * Get the faces shape
 * @param {string} str
 * @param {number} N
 */
const get_faces = (str, N) => {
	const lines = str.split("\n");
	const H = lines.length, W = Math.max(...lines.map(l => l.length));
	if (H % N !== 0 || W % N !== 0) {
		throw new Error(`invalid H & W: ${H} ${W}`);
	}

	/** @type {number[][]} */
	const shape = Array.from({ length: H / N }, () => Array(W / N).fill(0));
	let id = 1;

	for (let i = 0; i < shape.length; i++) {
		const u = i * N;
		for (let j = 0; j < shape[0].length; j++) {
			const v = j * N;
			if (v >= lines[u].length || lines[u][v] === CHAR_EMPTY) {
				continue;
			}

			shape[i][j] = id++;
		}
	}

	return shape;
};

// TODO
// Pattern: ${source_id}-${P1},${P2}...
// P: ${source_direction}${target_id}${target_edge}${reversed ? "T" : "F"}
// reversed if: the values of the changing row / col, change differently (+1 vs -1)
// The following patterns only covers the example from the description
// and also my input.
const FACE_RELATIONS = new Map([
	["012\n030\n450\n600", [
		"1-N6WF,S3NF,W4WT,E2WF",
		"2-N6SF,S3EF,W1EF,E5ET",
		"3-N1SF,S5NF,W4NF,E2SF",
		"4-N3WF,S6NF,W1WT,E5WF",
		"5-N3SF,S6EF,W4EF,E2ET",
		"6-N4SF,S2NF,W1NF,E5SF",
	]],
	["0010\n2340\n0056", [
		"1-N2NT,S4NF,W3NF,E6ET",
		"2-N1NT,S5ST,W6ST,E3WF",
		"3-N1WF,S5ET,W2EF,E4WF",
		"4-N1SF,S5NF,W3EF,E6NT",
		"5-N4SF,S2ST,W3ST,E6WF",
		"6-N4ET,S2WT,W5EF,E1ET",
	]],
]);

/**
 * @param {Direction} d
 */
const get_opposite_direction = (d) => {
	switch (d) {
		case "E": return "W";
		case "N": return "S";
		case "S": return "N";
		case "W": return "E";
	}
};

/**
 * @param {string[]} relations
 * @returns {FaceAdj[]}
 */
const restore_face_adjs = (relations) => {
	return relations.map(line => {
		let segments = line.split("-");
		const id = +segments[0];

		const adjs = Object.create(null);
		segments = segments[1].split(",");

		for (const s of segments) {
			const direction = s[0];
			const id = +s[1];
			const edge = s[2];
			const reversed = s[3] === "T" ? true : false;

			adjs[direction] = {
				id,
				edge,
				reversed,
				/** @ts-ignore */
				new_direction: get_opposite_direction(edge),
			}
		}

		return { id, adjs };
	});
};

/**
 * @param {string} str
 */
const build_neighbors = (str) => {
	const N = get_N(str);
	const shape = get_faces(str, N);
	const face_pattern = shape.map(row => row.join("")).join("\n");
	const relations = FACE_RELATIONS.get(face_pattern);
	if (!relations) {
		throw new Error("TODO");
	}
	const faces = restore_face_adjs(relations);
	// console.log(JSON.stringify(faces, null, 2));

	/** @type {Map<number, Position>} */
	const region_top_left = new Map();
	for (let i = 0; i < shape.length; i++) {
		for (let j = 0; j < shape[0].length; j++) {
			const id = shape[i][j];
			// id starts from 1
			if (id === 0) {
				continue;
			}

			region_top_left.set(id, [i * N, j * N]);
		}
	}


	const grid = gen_grid(str);
	const H = grid.length, W = grid[0].length;
	/** @type {Neighbors3D[][]} */
	const neighbors = Array.from({ length: H }, () =>
		Array.from({ length: W }, () => Object.create(null))
	);

	/**
	 * @param {number} face_id
	 */
	const handle_border = (face_id) => {
		const top_left = region_top_left.get(face_id);
		const face = faces.find(x => x.id === face_id);
		if (!top_left || !face) {
			throw new Error("never");
		}

		const [base_x, base_y] = top_left;

		/**
		 * @param {number} target_id
		 * @param {number} offset
		 * @param {boolean} reversed
		 * @returns {[number, number]}
		 */
		const _get_top = (target_id, offset, reversed) => {
			const top_left = region_top_left.get(target_id);
			if (!top_left) {
				throw new Error("never");
			}

			const [base_x, base_y] = top_left;

			return reversed
				? [base_x, base_y + (N - 1 - offset)]
				: [base_x, base_y + offset];
		};

		/**
		 * @param {number} target_id
		 * @param {number} offset
		 * @param {boolean} reversed
		 * @returns {[number, number]}
		 */
		const _get_left = (target_id, offset, reversed) => {
			const top_left = region_top_left.get(target_id);
			if (!top_left) {
				throw new Error("never");
			}

			const [base_x, base_y] = top_left;

			return reversed
				? [base_x + (N - 1 - offset), base_y]
				: [base_x + offset, base_y];
		};

		/**
		 * @param {number} target_id
		 * @param {number} offset
		 * @param {boolean} reversed
		 * @returns {[number, number]}
		 */
		const _get_bottom = (target_id, offset, reversed) => {
			const top_left = region_top_left.get(target_id);
			if (!top_left) {
				throw new Error("never");
			}

			const [base_x, base_y] = top_left;

			return reversed
				? [base_x + N - 1, base_y + (N - 1 - offset)]
				: [base_x + N - 1, base_y + offset];
		};

		/**
		 * @param {number} target_id
		 * @param {number} offset
		 * @param {boolean} reversed
		 * @returns {[number, number]}
		 */
		const _get_right = (target_id, offset, reversed) => {
			const top_left = region_top_left.get(target_id);
			if (!top_left) {
				throw new Error("never");
			}

			const [base_x, base_y] = top_left;

			return reversed
				? [base_x + (N - 1 - offset), base_y + N - 1]
				: [base_x + offset, base_y + N - 1];
		};

		/**
		 * @param {{ id: number; edge: Direction; reversed: boolean}} cfg
		 * @param {number} offset
		 */
		const _get_position = (cfg, offset) => {
			const { id, edge, reversed } = cfg;
			switch (edge) {
				case "E": return _get_right(id, offset, reversed);
				case "S": return _get_bottom(id, offset, reversed);
				case "W": return _get_left(id, offset, reversed);
				case "N": return _get_top(id, offset, reversed);
			}
		};

		for (let dy = 0; dy < N; dy++) {
			neighbors[base_x][base_y + dy].N = {
				position: _get_position(face.adjs.N, dy),
				direction: face.adjs.N.new_direction,
			};
			neighbors[base_x + N - 1][base_y + dy].S = {
				position: _get_position(face.adjs.S, dy),
				direction: face.adjs.S.new_direction,
			};
		}
		for (let dx = 0; dx < N; dx++) {
			neighbors[base_x + dx][base_y].W = {
				position: _get_position(face.adjs.W, dx),
				direction: face.adjs.W.new_direction,
			};
			neighbors[base_x + dx][base_y + N - 1].E = {
				position: _get_position(face.adjs.E, dx),
				direction: face.adjs.E.new_direction,
			};
		}
	};

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Direction} direction
	 * @returns {[number, number]}
	 */
	const _get_next = (x, y, direction) => {
		switch (direction) {
			case "E": return [x, y + 1];
			case "S": return [x + 1, y];
			case "W": return [x, y - 1];
			case "N": return [x - 1, y];
		}
	};

	const handle_regular = (face_id) => {
		const top_left = region_top_left.get(face_id);
		if (!top_left) {
			throw new Error("never");
		}
		const [base_x, base_y] = top_left;

		for (let dx = 0; dx < N; dx++) {
			const x = base_x + dx;
			for (let dy = 0; dy < N; dy++) {
				const y = base_y + dy;
				const n = neighbors[x][y];

				for (const k of DIRECTIONS) {
					// for tiles on borders, skip directions that have been set
					if (n[k])
						continue;

					n[k] = {
						position: _get_next(x, y, k),
						direction: k,
					};
				}
			}
		}
	};

	for (let id = 1; id < 7; id++) {
		handle_border(id);
		handle_regular(id);
	}

	const flatted = neighbors.flat();
	const n_empty = flatted.filter(v => Object.keys(v).length === 0).length;
	const n_regul = flatted.filter(v => Object.keys(v).length === 4).length;
	if (n_regul !== 6 * N * N) {
		throw new Error("never");
	}
	if (n_regul + n_empty !== H * W) {
		throw new Error("never");
	}

	return neighbors;
};

/**
 * @param {string[][]} grid
 * @param {State} state
 */
const print_char = (grid, state) => {
	let char = " ";
	switch (state.direction) {
		case "E": char = ">"; break;
		case "S": char = "v"; break;
		case "W": char = "<"; break;
		case "N": char = "^"; break;
	}

	const [x, y] = state.position;
	grid[x][y] = char;
};

/**
 * @param {string[][]} grid
 * @param {Neighbors3D[][]} neighbors
 * @param {State} state
 * @param {Instruction} instruction
 */
const walk3D = (grid, neighbors, state, instruction, debug = false) => {
	if (is_direction_char(instruction)) {
		state.direction = turn_dir(state.direction, instruction);
		if (debug) {
			print_char(grid, state);
		}
	} else {
		while (instruction-- > 0) {
			if (debug) {
				print_char(grid, state);
			}
			const [curr_x, curr_y] = state.position;
			const next = neighbors[curr_x][curr_y][state.direction];
			const [next_x, next_y] = next.position;
			if (grid[next_x][next_y] === CHAR_WALL) {
				break;
			}

			state.position = next.position;
			state.direction = next.direction;
		}
	}
};

/**
 * @param {string} data
 */
export const get_password2 = (data) => {
	const [seg0, seg1] = data.split("\n\n");

	let j = seg0.indexOf(".");
	if (j < 0) {
		throw new Error("never");
	}

	/** @type {State} */
	const state = {
		position: [0, j],
		direction: "E",
	}

	// TODO
	const neighbors = build_neighbors(seg0);

	const grid = gen_grid(seg0);
	for (const instruction of parse_instructions(seg1)) {
		// walk3D(grid, neighbors, state, instruction, true);
		walk3D(grid, neighbors, state, instruction);
	}

	// console.log(grid.map(row => row.join("")).join("\n"));
	return serialize_password(state);
};
