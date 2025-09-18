// @ts-check

/**
 * @param {number} i
 * @param {number} j
 */
const serialize_pos = (i, j) => `${i},${j}`;

/**
 * @param {string} str
 */
const deserialize_pos = (str) => str.split(",").map(Number);

/**
 * @param {string} str
 */
const get_elves = (str) => {
	const lines = str.split("\n");
	const H = lines.length, W = lines[0].length;

	/** @type {Set<string>} */
	const elves = new Set();
	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (lines[i][j] === "#") {
				elves.add(serialize_pos(i, j));
			}
		}
	}

	return elves;
};

/**
 * @param {number} x
 * @param {number} y
 */
const get_neighbors = (x, y) => {
	const res = [];

	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			if (dx === 0 && dy === 0) {
				continue;
			}

			res.push([
				x + dx,
				y + dy,
			]);
		}
	}

	return res;
};

let consider_orders = [
	"N",
	"S",
	"W",
	"E",
];

/**
 * @param {number} x
 * @param {number} y
 * @param {number[][]} neighbors
 * @param {Set<string>} elves
 */
const get_next = (x, y, neighbors, elves) => {
	/** @type {(0|1)[][]} */
	const map = Array.from({ length: 3 }, () => Array(3).fill(0));
	for (const [nx, ny] of neighbors) {
		if (elves.has(serialize_pos(nx, ny))) {
			map[nx - (x - 1)][ny - (y - 1)] = 1;
		}
	}

	for (let d of consider_orders) {
		if (d === "N") {
			if (map[0].every(x => x === 0)) {
				return serialize_pos(x - 1, y);
			}
		}

		if (d === "S") {
			if (map[2].every(x => x === 0)) {
				return serialize_pos(x + 1, y);
			}
		}

		if (d === "W") {
			if ([
				map[0][0], // NW
				map[1][0], // W
				map[2][0], // SW
			].every(x => x === 0)) {
				return serialize_pos(x, y - 1);
			}
		}

		if (d === "E") {
			if ([
				map[0][2], // NE
				map[1][2], // E
				map[2][2], // SE
			].every(x => x === 0)) {
				return serialize_pos(x, y + 1);
			}
		}
	}

	// throw new Error(`never ${x}, ${y}, ${map.map(row => row.join("")).join("\n")}`);
	// cannot move
	return serialize_pos(x, y);
};

/**
 * TODO
 * @param {Set<string>} elves
 * @return {{elves: Set<string>; should_move: boolean}}
 */
const move = (elves) => {
	/** @type {Map<string, string>} from last to next */
	const plans = new Map();
	/** @type {Map<string, number>} check whether next tile would be occupied by multiple*/
	const count = new Map();
	let should_move = false;

	for (const e of elves) {
		const [x, y] = deserialize_pos(e);
		let local_move = false;

		const neighbors = get_neighbors(x, y);

		for (const [nx, ny] of neighbors) {
			if (elves.has(serialize_pos(nx, ny))) {
				local_move = true;
				break;
			}
		}

		const ne = !local_move ? e : get_next(x, y, neighbors, elves);
		plans.set(e, ne);
		count.set(ne, (count.get(ne) || 0) + 1);
	}

	// Update orders
	consider_orders = [...consider_orders.slice(1), consider_orders[0]];

	/** @type {Set<string>} the real move */
	const next = new Set();
	for (const [e, ne] of plans) {
		let nc = count.get(ne);
		if (nc === undefined) {
			throw new Error("never");
		}

		if (nc > 1) {
			// remain
			next.add(e);
		} else {
			should_move = should_move || ne !== e;
			next.add(ne);
		}
	}

	return {
		elves: next,
		should_move,
	}
}

/**
 * @param {Set<string>} elves
 * @return {{max_x: number; min_x: number; max_y: number; min_y: number}}
 */
const get_mm = (elves) => {
	let max_x = Number.MIN_SAFE_INTEGER, max_y = Number.MIN_SAFE_INTEGER;
	let min_x = Number.MAX_SAFE_INTEGER, min_y = Number.MAX_SAFE_INTEGER;

	for (const e of elves) {
		const [x, y] = deserialize_pos(e);

		max_x = Math.max(max_x, x);
		min_x = Math.min(min_x, x);
		max_y = Math.max(max_y, y);
		min_y = Math.min(min_y, y);
	}

	return { max_x, min_x, max_y, min_y };
};

/**
 * @param {Set<string>} elves
 */
const dump = (elves) => {
	const { max_x, min_x, max_y, min_y } = get_mm(elves);

	const H = max_x - min_x + 1;
	const W = max_y - min_y + 1;

	const grid = Array.from({ length: H }, () => Array(W).fill("."));
	for (const e of elves) {
		const [x, y] = deserialize_pos(e);
		grid[x - min_x][y - min_y] = "#";
	}

	console.log(grid.map(row => row.join("")).join("\n"));
}

/**
 * @param {Set<string>} elves
 * @return {number}
 */
const count_rec = (elves) => {
	const { max_x, min_x, max_y, min_y } = get_mm(elves);

	return (max_x - min_x + 1) * (max_y - min_y + 1) - elves.size;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_empty_rectangles = (data, part = 1) => {
	let elves = get_elves(data), should_move = true;
	let count = 0;

	// reset
	consider_orders = [
		"N",
		"S",
		"W",
		"E",
	];

	while (should_move) {
		const res = move(elves);
		elves = res.elves;
		should_move = res.should_move;

		count++;

		if (part === 1 && count > 10) {
			break;
		}
	}

	return part === 1 ? count_rec(elves) : count;
};
