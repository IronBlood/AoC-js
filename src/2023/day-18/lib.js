// @ts-check

const Vectors = {
	L: [0n, -1n],
	U: [-1n, 0n],
	R: [0n, 1n],
	D: [1n, 0n],
};

/**
 * @readonly
 * @enum {number}
 */
const VertexType = {
	INVALID: -1,
	TOP_LEFT: 0,
	TOP_RIGHT: 1,
	BOTTOM_LEFT: 2,
	BOTTOM_RIGHT: 3,
};

/**
 * @param {[bigint, bigint][]} positions
 */
const build_grid = (positions) => {
	const converted = positions.map(arr => arr.map(Number));

	let max_x = Number.MIN_SAFE_INTEGER, max_y = Number.MIN_SAFE_INTEGER,
		min_x = Number.MAX_SAFE_INTEGER, min_y = Number.MAX_SAFE_INTEGER;

	converted.forEach(([x, y]) => {
		max_x = Math.max(max_x, x);
		max_y = Math.max(max_y, y);
		min_x = Math.min(min_x, x);
		min_y = Math.min(min_y, y);
	});

	const H = max_x - min_x + 1;
	const W = max_y - min_y + 1;

	/** @type {string[][]} */
	const grid = Array.from({ length: H }, () => Array(W).fill(" "));
	converted.forEach(([x, y]) => {
		grid[x - min_x][y - min_y] = "#";
	});

	return grid;
};

/**
 * @param {string[][]} grid
 */
const beautiful_dump = (grid) => {
	console.log(grid.map(row => row.join("")).join("\n"));
};

/**
 * @param {string} data
 */
export const dig_cubes = (data) => {
	let x = 0n, y = 0n;
	/** @type {[bigint, bigint][]} */
	const positions = [[x, y]];
	const keys = Object.keys(Vectors);

	data.split("\n").forEach(line => {
		const [dir, steps_str] = line.split(" ");
		let steps = +steps_str;
		/** @type {bigint[]} */
		const [dx, dy] = Vectors[dir];

		while (steps-- > 0) {
			x += dx;
			y += dy;
			positions.push([x, y]);
		}
	});

	const grid = build_grid(positions);
	const H = grid.length, W = grid[0].length;
	// beautiful_dump(grid);

	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {string} s
	 * @param {string} t
	 */
	const flood = (x, y, s, t) => {
		let queue = [[x, y]];
		const dirs = [0, 1, 0, -1, 0];
		while (queue.length) {
			const next_queue = [];
			for (const [x, y] of queue) {
				if (!in_grid(x, y) || grid[x][y] !== s)
					continue;
				grid[x][y] = t;

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

	const CHAR_E = " ", CHAR_O = "*";
	for (let i = 0; i < W; i++) {
		if (grid[0][i] === CHAR_E) {
			flood(0, i, CHAR_E, CHAR_O);
		}
		if (grid[H - 1][i] === " ") {
			flood(H - 1, i, CHAR_E, CHAR_O);
		}
	}
	for (let i = 0; i < H; i++) {
		if (grid[i][0] === CHAR_E) {
			flood(i, 0, CHAR_E, CHAR_O);
		}
		if (grid[i][W - 1] === CHAR_E) {
			flood(i, W - 1, CHAR_E, CHAR_O);
		}
	}

	return grid.flat().filter(x => x !== CHAR_O).length;
};

/**
 * @param {bigint[][]} positions
 */
export const shoelace = (positions) => {
	const len = positions.length;
	if (len === 0) {
		return 0n;
	}

	let sum = 0n;
	for (let i = 0; i < len; i++) {
		const next = (i + 1) % len;
		sum += positions[i][0] * positions[next][1] - positions[i][1] * positions[next][0];
	}
	if (sum < 0n)
		sum = -sum;
	return sum / 2n;
};

/**
 * @param {string} data
 */
const parse1 = (data) => {
	return data.split("\n").map(line => {
		const [dir_str, dist_str] = line.split(" ");
		const dist = BigInt(dist_str);
		return { dir_str, dist };
	});
};

/**
 * @param {string} data
 */
const parse2 = (data) => {
	return data.split("\n").map(line => {
		const hex_raw = line.split(" ")[2];
		const dist_hex = hex_raw.substring(2, 7);
		const dir_str = "RDLU"[+hex_raw[7]];
		const dist = BigInt(`0x${dist_hex}`);
		return { dir_str, dist };
	});
};

/**
 * @param {string} data
 */
export const dig_cubes_2 = (data, part = 1) => {
	const instructions = part === 1 ? parse1(data) : parse2(data);

	let x = 0n, y = 0n;

	/** @type {bigint[][]} */
	const vertices_left = [];
	/** @type {bigint[][]} */
	const vertices_right = [];
	/** @type {bigint[][]} */
	const centers = [];

	/**
	 * @param {bigint} x
	 * @param {bigint} y
	 * @param {VertexType} type
	 */
	const get_vertex_pos = (x, y, type) => {
		switch (type) {
			case VertexType.TOP_LEFT:     return [x - 1n, y - 1n];
			case VertexType.TOP_RIGHT:    return [x - 1n, y + 1n];
			case VertexType.BOTTOM_LEFT:  return [x + 1n, y - 1n];
			case VertexType.BOTTOM_RIGHT: return [x + 1n, y + 1n];
		}
		throw new Error(`invalid type at ${x}, ${y}`);
	};

	/**
	 * @param {bigint} x
	 * @param {bigint} y
	 * @param {string} prev previous direction
	 * @param {string} curr current direction
	 */
	const handle_vertices = (x, y, prev, curr) => {
		let vertex_l = VertexType.INVALID;
		let vertex_r = VertexType.INVALID;

		const turn = prev + curr;
		switch (turn) {
			case "RU":
			case "UR":
				vertex_l = VertexType.TOP_LEFT;
				vertex_r = VertexType.BOTTOM_RIGHT;
				break;
			case "RD":
			case "DR":
				vertex_l = VertexType.TOP_RIGHT;
				vertex_r = VertexType.BOTTOM_LEFT;
				break;
			case "LU":
			case "UL":
				vertex_l = VertexType.BOTTOM_LEFT;
				vertex_r = VertexType.TOP_RIGHT;
				break;
			case "LD":
			case "DL":
				vertex_l = VertexType.BOTTOM_RIGHT;
				vertex_r = VertexType.TOP_LEFT;
				break;
		}

		if (vertex_l === VertexType.INVALID || vertex_r === VertexType.INVALID) {
			throw new Error(`Unhandled turn: ${turn}`);
		}

		vertices_left.push( get_vertex_pos(x, y, vertex_l));
		vertices_right.push(get_vertex_pos(x, y, vertex_r));
		centers.push([x, y]);
	};

	for (let i = 0, len = instructions.length; i < len; i++) {
		const curr_ins = instructions[i];
		const prev_ins = instructions[(i + len - 1) % len];
		handle_vertices(x, y, prev_ins.dir_str, curr_ins.dir_str);
		const [dx, dy] = Vectors[curr_ins.dir_str];
		x += dx * curr_ins.dist * 2n;
		y += dy * curr_ins.dist * 2n;
	}

	const res = [
		shoelace(vertices_left),
		shoelace(vertices_right),
	];

	const [a, b] = res.map(x => x / 4n);
	return a > b ? a : b;
};

/**
 * @param {string} data
 */
export const dig_cubes_3 = (data, part = 1) => {
	const instructions = part === 1 ? parse1(data) : parse2(data);

	let x = 0n, y = 0n;
	const trench_centers = [];

	for (let {dir_str, dist} of instructions) {
		const [dx, dy] = Vectors[dir_str];
		x += dx * dist;
		y += dy * dist;
		trench_centers.push([x, y]);
	}

	const area = shoelace(trench_centers);
	const perimeter = instructions.reduce((s, {dist}) => s + dist, 0n);
	return area + perimeter/2n + 1n;
};
