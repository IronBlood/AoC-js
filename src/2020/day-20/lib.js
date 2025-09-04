import {
	rotate_tile,
	flip_w_tile,
} from "../../lib/matrix.js";

/**
 * Enum for rotate and flip state
 * @readonly
 * @enum {number}
 */
const RFState = {
	/** Rotate 0 */
	R0:   0,
	/** Rotate 90 */
	R90:  1,
	/** Rotate 180 */
	R180: 2,
	/** Rotate 270 */
	R270: 3,
	/** Rotate 0, then flip vertically */
	F0:   4,
	/** Rotate 90, then flip vertically */
	F90:  5,
	/** Rotate 180, then flip vertically */
	F180: 6,
	/** Rotate 270, then flip vertically */
	F270: 7,
};

/**
 * @param {number} num
 */
const get_paired_border_str = (num) => {
	if (typeof num != "number" || num < 0 || num >= 1024 || Math.trunc(num) !== num)
		throw new Error(`invalid num ${num}`);

	const arr = num.toString(2).padStart(10, "0").split("").reverse();

	return Number.parseInt(arr.join(""), 2);
}

/**
 * @param {number} num
 * @deprecated
 */
const get_paired_border = (num) => {
	if (typeof num != "number" || num < 0 || num >= 1024 || Math.trunc(num) !== num)
		throw new Error(`invalid num ${num}`);

	let res = 0;
	for (let i = 0; i < 10; i++) {
		res = (res << 1) | (num & 1);
		num >>= 1;
	}
	return res;
}

/**
 * @param {number} a
 * @param {number} b
 */
const can_be_paired = (a, b) => a === get_paired_border(b);

/**
 * @param {string[]} lines
 */
const get_inner_grid = (lines) => {
	const H = lines.length, W = lines[0].length;
	return lines.slice(1, H - 1).map(line => line.split("").slice(1, W - 1));
};

class Tile {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		const arr = str.split("\n");
		const match = /\d+/.exec(arr[0]);
		if (!match) {
			throw new Error(`wrong tile ${arr[0]}`);
		}

		/** @public @readonly @type {number} */
		this.id = +match[0];
		/** @public @readonly @type {string[]} */
		this.lines = arr.slice(1);
		/** @public @readonly @type {number[]} */
		this.borders = this._get_borders();

		/** @private @type {boolean} */
		this._is_corner = false;

		/** @public @readonly @type {number[]} */
		this.unmatched_borders = [];

		/** @private @type {RFState} */
		this.state = RFState.R0;
	}

	/**
	 * @private
	 */
	_get_borders() {
		const raw_borders = [];
		const aux = [];

		const c2n = (c) => c === "#" ? "1" : "0";

		const H = this.lines.length, W = this.lines[0].length;

		aux.length = 0;
		for (let i = 0; i < W; i++) {
			aux.push(c2n(this.lines[0][i]));
		}
		raw_borders.push(aux.join(""));
		raw_borders.push(aux.reverse().join(""));

		aux.length = 0;
		for (let i = 0; i < H; i++) {
			aux.push(c2n(this.lines[i][W - 1]));
		}
		raw_borders.push(aux.join(""));
		raw_borders.push(aux.reverse().join(""));

		aux.length = 0;
		for (let i = W - 1; i >= 0; i--) {
			aux.push(c2n(this.lines[H - 1][i]));
		}
		raw_borders.push(aux.join(""));
		raw_borders.push(aux.reverse().join(""));

		aux.length = 0;
		for (let i = H - 1; i >= 0; i--) {
			aux.push(c2n(this.lines[i][0]));
		}
		raw_borders.push(aux.join(""));
		raw_borders.push(aux.reverse().join(""));

		return raw_borders.map(bin_str => Number.parseInt(bin_str, 2));
	}

	is_corner() {
		return this._is_corner;
	}

	set_corner() {
		this._is_corner = true;
	}

	/**
	 * @param {number} border
	 */
	set_unmatched(border) {
		this.unmatched_borders.push(border);
	}

	/**
	 * @param {number} border
	 */
	use_top(border) {
		const idx = this.borders.indexOf(border);
		if (idx < 0) {
			// shouldn't be here, just in case
			throw new Error(`${border} doesn't belong to this tile`);
		}

		switch (idx) {
			case 0: this.state = RFState.R0;   break;
			case 1: this.state = RFState.F0;   break;

			case 2: this.state = RFState.R90;  break;
			case 3: this.state = RFState.F90;  break;

			case 4: this.state = RFState.R180; break;
			case 5: this.state = RFState.F180; break;

			case 6: this.state = RFState.R270; break;
			case 7: this.state = RFState.F270; break;
		}
	}

	/**
	 * @param {number} border
	 */
	use_left(border) {
		const idx = this.borders.indexOf(border);
		if (idx < 0) {
			// shouldn't be here, just in case
			throw new Error(`${border} doesn't belong to this tile`);
		}

		switch (idx) {
			case 6: this.state = RFState.R0;   break;
			case 3: this.state = RFState.F0;   break;

			case 0: this.state = RFState.R90;  break;
			case 5: this.state = RFState.F90;  break;

			case 2: this.state = RFState.R180; break;
			case 7: this.state = RFState.F180; break;

			case 4: this.state = RFState.R270; break;
			case 1: this.state = RFState.F270; break;
		}
	}

	/**
	 * @returns {number}
	 */
	get_top_border() {
		switch(this.state) {
			case RFState.R0: return this.borders[0];
			case RFState.F0: return this.borders[1];

			case RFState.R90: return this.borders[2];
			case RFState.F90: return this.borders[3];

			case RFState.R180: return this.borders[4];
			case RFState.F180: return this.borders[5];

			case RFState.R270: return this.borders[6];
			case RFState.F270: return this.borders[7];
		}
		return -1;
	}

	/**
	 * @returns {number}
	 */
	get_left_border() {
		switch(this.state) {
			case RFState.R0: return this.borders[6];
			case RFState.F0: return this.borders[3];

			case RFState.R90: return this.borders[0];
			case RFState.F90: return this.borders[5];

			case RFState.R180: return this.borders[2];
			case RFState.F180: return this.borders[7];

			case RFState.R270: return this.borders[4];
			case RFState.F270: return this.borders[1];
		}
		return -1;
	}

	/**
	 * @returns {number}
	 */
	get_right_border() {
		switch(this.state) {
			case RFState.R0: return this.borders[2];
			case RFState.F0: return this.borders[7];

			case RFState.R90: return this.borders[4];
			case RFState.F90: return this.borders[1];

			case RFState.R180: return this.borders[6];
			case RFState.F180: return this.borders[3];

			case RFState.R270: return this.borders[0];
			case RFState.F270: return this.borders[5];
		}
		return -1;
	}

	/**
	 * @returns {number}
	 */
	get_bottom_border() {
		switch(this.state) {
			case RFState.R0: return this.borders[4];
			case RFState.F0: return this.borders[5];

			case RFState.R90: return this.borders[6];
			case RFState.F90: return this.borders[7];

			case RFState.R180: return this.borders[0];
			case RFState.F180: return this.borders[1];

			case RFState.R270: return this.borders[2];
			case RFState.F270: return this.borders[3];
		}
		return -1;
	}

	get_inner_image() {
		let grid = get_inner_grid(this.lines);

		switch (this.state) {
			case RFState.R0: break;
			case RFState.F0:
				grid = flip_w_tile(grid);
				break;

			case RFState.R90:
				grid = rotate_tile(grid, 3);
				break;
			case RFState.F90:
				grid = rotate_tile(grid, 3);
				grid = flip_w_tile(grid);
				break;

			case RFState.R180:
				grid = rotate_tile(grid, 2);
				break;
			case RFState.F180:
				grid = rotate_tile(grid, 2);
				grid = flip_w_tile(grid);
				break;

			case RFState.R270:
				grid = rotate_tile(grid, 1);
				break;
			case RFState.F270:
				grid = rotate_tile(grid, 1);
				grid = flip_w_tile(grid);
				break;
		}

		return grid;
	}
}

/**
 * @param {Tile[]} tiles
 * @returns {string[][]}
 */
const join_tile_in_a_row = (tiles) => {
	if (tiles.length === 0)
		return [[]];

	const images = tiles.map(t => t.get_inner_image());
	const N = images.length, H = images[0].length, W = images[0][0].length;
	const res = Array.from({ length: H }, () => Array(N * W));
	for (let i = 0; i < N; i++) {
		for (let x = 0; x < H; x++) {
			for (let y = 0; y < W; y++) {
				res[x][i * W + y] = images[i][x][y];
			}
		}
	}
	return res;
};

/**
 * @overload
 * @param {string} data
 * @returns {number}
 */
/**
 * @overload
 * @param {string} data
 * @param {true} raw_mode
 * @returns {Tile[]}
 */
/**
 * @param {string} data
 * @param {boolean} [raw_mode]
 * @returns {number|Tile[]}
 */
export const get_corners = (data, raw_mode) => {
	const tiles = data.split("\n\n").map(x => new Tile(x));

	/** @type {number[][]} */
	const map = Array.from({ length: 1024 }, () => []);

	/**
	 * @param {number} border
	 * @param {number} id
	 */
	const add_border_to_map = (border, id) => {
		map[border].push(id);
	};

	tiles.forEach(tile => {
		for (const border of tile.borders) {
			add_border_to_map(border, tile.id);
		}
	});

	let res = 1;
	tiles.forEach(tile => {
		for (const border of tile.borders) {
			if (map[border].length === 1) {
				tile.set_unmatched(border);
			}
		}
		if (tile.unmatched_borders.length === 4) {
			res *= tile.id;
			tile.set_corner();
		}
	});

	return raw_mode ? tiles : res;
};

/**
 * @param {Tile} tile
 */
const set_top_left = (tile) => {
	for (const border of tile.unmatched_borders) {
		tile.use_top(border);
		const left = tile.get_left_border();
		if (tile.unmatched_borders.indexOf(left) >= 0) {
			break;
		}
	}
};

/**
 * @param {Tile[]} tiles
 */
const restore_image = (tiles) => {
	/** @type {Tile | null} top left corner */
	let A = null;
	for (const x of tiles) {
		if (x.is_corner()) {
			A = x;
			break;
		}
	}

	if (!A) {
		throw new Error(`no corners`);
	}

	set_top_left(A);
	/** @type {number[][]} */
	const borders = Array.from({ length: 1024 }, () => []);
	/** @type {Map<number, Tile>} */
	const map = new Map();
	/** @type {Set<number>} */
	const used = new Set();
	used.add(A.id);

	for (const x of tiles) {
		map.set(x.id, x);
		for (const b of x.borders) {
			borders[b].push(x.id);
		}
	}

	const grid = [[A]];
	let row = 0, col = 1;
	let W = 0;

	/**
	 * @param {number} row
	 * @param {number} col
	 */
	const dfs = (row, col) => {
		if (used.size === tiles.length) {
			// console.log(grid.map(row => row.map(tile => tile.id).join(",")).join("\n"));
			return true;
		}

		let found = false;
		if (col === 0) {
			const top = grid[row - 1][0];
			const target_top = get_paired_border(top.get_bottom_border());
			for (const candidate_id of borders[target_top]) {
				if (used.has(candidate_id))
					continue;

				used.add(candidate_id);

				const candidate = map.get(candidate_id);
				if (!candidate) {
					throw new Error(`failed to find tile_id ${candidate_id}`);
				}
				candidate.use_top(target_top);
				if (!grid[row])
					grid[row] = [];
				grid[row][col] = candidate;

				found = dfs(row, col + 1);
				if (found)
					return true;
				used.delete(candidate_id);
			}
			return false;
		} else if (row === 0) {
			const left = grid[0][col - 1];
			const target_left = get_paired_border(left.get_right_border());
			for (const candidate_id of borders[target_left]) {
				if (used.has(candidate_id))
					continue;

				used.add(candidate_id);

				const candidate = map.get(candidate_id);
				if (!candidate) {
					throw new Error(`failed to find tile_id ${candidate_id}`);
				}
				candidate.use_left(target_left);

				grid[0][col] = candidate;

				if (candidate.is_corner()) {
					W = col + 1;
					found = dfs(row + 1, 0);
				} else {
					found = dfs(0, col + 1);
				}
				if (found)
					return true;
				used.delete(candidate_id);
			}
			return false;
		} else {
			const left = grid[row][col - 1], top = grid[row - 1][col];
			const target_left = get_paired_border(left.get_right_border());

			for (const candidate_id of borders[target_left]) {
				if (used.has(candidate_id))
					continue;

				const candidate = map.get(candidate_id);
				if (!candidate) {
					throw new Error(`failed to find tile_id ${candidate_id}`);
				}
				candidate.use_left(target_left);

				if (!can_be_paired(candidate.get_top_border(), top.get_bottom_border())) {
					continue;
				}

				used.add(candidate_id);
				grid[row][col] = candidate;
				if (col + 1 === W) {
					found = dfs(row + 1, 0);
				} else {
					found = dfs(row, col + 1);
				}
				if (found)
					return true;
				used.delete(candidate_id);
			}
			return false;
		}
	};

	const res = dfs(0, 1);

	return grid.map(row => join_tile_in_a_row(row)).flat();
};

/**
 * @typedef {(0|1)[][]} Marked
 * @typedef {[number, number]} Position
 */

class SeaMonster {
	constructor() {
		const raw = [
			"                  # ",
			"#    ##    ##    ###",
			" #  #  #  #  #  #   ",
		];

		/** @public @readonly @type {number} */
		this.H = raw.length;
		/** @public @readonly @type {number} */
		this.W = raw[0].length;
		/** @public @readonly @type {Position[]} */
		this.cells = [];

		for (let i = 0; i < this.H; i++) {
			for (let j = 0; j < this.W; j++) {
				if (raw[i][j] === "#")
					this.cells.push([i, j]);
			}
		}
	}
}

/**
 * @param {SeaMonster} monster
 * @param {string[][]} image
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
const check_sea_monster_at_xy = (monster, image, x, y) => monster.cells.every(([ dx, dy ]) => image[x + dx][y + dy] === "#");

/**
 * @param {SeaMonster} monster
 * @param {Marked} marked
 * @param {number} x
 * @param {number} y
 */
const mark_sea_monster_at_xy = (monster, marked, x, y) => monster.cells.forEach(([ dx, dy ]) => marked[x + dx][y + dy] = 1);

/**
 * @param {SeaMonster} monster
 * @param {string[][]} image
 * @param {Marked} marked
 */
const check_and_mark_sea_monster = (monster, image, marked) => {
	const H = image.length, W = image[0].length;
	for (let i = 0; i < H - monster.H + 1; i++) {
		for (let j = 0; j < W - monster.W + 1; j++) {
			if (check_sea_monster_at_xy(monster, image, i, j)) {
				mark_sea_monster_at_xy(monster, marked, i, j);
			}
		}
	}
};

/**
 * @param {string} data
 */
export const check_sea_monster = (data) => {
	const tiles = get_corners(data, true);

	// 0
	let image = restore_image(tiles);
	/** @type {Marked} */
	let marked = Array.from({ length: image.length }, () => Array(image[0].length).fill(0));
	const monster = new SeaMonster();

	check_and_mark_sea_monster(monster, image, marked);

	// 90
	image = rotate_tile(image, 1);
	marked = rotate_tile(marked, 1);
	check_and_mark_sea_monster(monster, image, marked);

	// 180
	image = rotate_tile(image, 1);
	marked = rotate_tile(marked, 1);
	check_and_mark_sea_monster(monster, image, marked);

	// 270
	image = rotate_tile(image, 1);
	marked = rotate_tile(marked, 1);
	check_and_mark_sea_monster(monster, image, marked);

	// F270
	image = flip_w_tile(image);
	marked = flip_w_tile(marked);
	check_and_mark_sea_monster(monster, image, marked);

	// 90
	image = rotate_tile(image, 1);
	marked = rotate_tile(marked, 1);
	check_and_mark_sea_monster(monster, image, marked);

	// 180
	image = rotate_tile(image, 1);
	marked = rotate_tile(marked, 1);
	check_and_mark_sea_monster(monster, image, marked);

	// 270
	image = rotate_tile(image, 1);
	marked = rotate_tile(marked, 1);
	check_and_mark_sea_monster(monster, image, marked);

	return image.flat().filter(ch => ch === "#").length -
		marked.flat().filter(m => m === 1).length;
};
