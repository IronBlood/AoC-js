// @ts-check

/**
 * @readonly
 * @enum {number}
 */
const Directions = {
	NORTH: 0,
	SOUTH: 1,
	EAST: 2,
	WEST: 3,
};

const Vectors = [
	[-1, 0],
	[1, 0],
	[0, 1],
	[0, -1],
];

/**
 * @param {string} c
 * @param {Directions} dir
 * @returns {Directions}
 */
const change_dir = (c, dir) => {
	if (c === "/") {
		switch (dir) {
			case Directions.EAST: return Directions.NORTH;
			case Directions.WEST: return Directions.SOUTH;
			case Directions.NORTH: return Directions.EAST;
			case Directions.SOUTH: return Directions.WEST;
		}
	} else {
		// \
		switch (dir) {
			case Directions.EAST: return Directions.SOUTH;
			case Directions.WEST: return Directions.NORTH;
			case Directions.NORTH: return Directions.WEST;
			case Directions.SOUTH: return Directions.EAST;
		};
	}
	// safe
	return -1;
};

/**
 * @param {string} c
 * @param {Directions} dir
 * @returns {Directions[]}
 */
const split_dir = (c, dir) => {
	if (c === "-") {
		if (dir === Directions.NORTH || dir === Directions.SOUTH) {
			return [ Directions.EAST, Directions.WEST ];
		} else {
			return [ dir ];
		}
	} else {
		if (dir === Directions.EAST || dir === Directions.WEST) {
			return [ Directions.NORTH, Directions.SOUTH ];
		} else {
			return [ dir ];
		}
	}
	// safe
	return [];
};

/**
 * @param {string|string[][]} data
 * @returns {number}
 */
export const energized_tiles = (data, starting_beam = { pos: [0, 0], dir: Directions.EAST }) => {
	const grid = typeof data === "string"
		? data.split("\n").map(line => line.split(""))
		: data;

	const H = grid.length, W = grid[0].length;
	/** @type {number[][]} */
	const visited = Array.from({ length: H }, () => Array(W).fill(0));

	const in_grid = (x, y) => x >= 0 && x < H && y >= 0 && y < W;

	let beams = [starting_beam];

	while (beams.length > 0) {
		/** @type {typeof beams} */
		const next_beams = [];

		for (const b of beams) {
			const [x, y] = b.pos;
			const flag = 1 << b.dir;
			if (!in_grid(x, y) || (visited[x][y] & flag)) {
				continue;
			}
			visited[x][y] |= flag;

			const c = grid[x][y];

			if (c === ".") {
				const [dx, dy] = Vectors[b.dir];
				next_beams.push({
					pos: [
						x + dx,
						y + dy,
					],
					dir: b.dir,
				});
				continue;
			}

			if (c === "/" || c === "\\") {
				const dir = change_dir(c, b.dir);
				const [dx, dy] = Vectors[dir];
				next_beams.push({
					pos: [
						x + dx,
						y + dy,
					],
					dir,
				});
				continue;
			}

			if (c === "-" || c === "|") {
				split_dir(c, b.dir).forEach(dir => {
					const [dx, dy] = Vectors[dir];
					next_beams.push({
						pos: [
							x + dx,
							y + dy,
						],
						dir,
					});
				});
				continue;
			}

			throw new Error(`invalid character ${c}`);
		};

		beams = next_beams;
	}

	return visited.flat().filter(x => x > 0).length;
};

/**
 * @param {string} data
 */
export const most_energized = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	const H = grid.length, W = grid[0].length;

	let max = 0;
	for (let i = 0; i < W; i++) {
		max = Math.max(max, energized_tiles(grid, {
			pos: [0, i],
			dir: Directions.SOUTH,
		}));
		max = Math.max(max, energized_tiles(grid, {
			pos: [H - 1, i],
			dir: Directions.NORTH,
		}));
	}
	for (let i = 0; i < H;  i++) {
		max = Math.max(max, energized_tiles(grid, {
			pos: [i, 0],
			dir: Directions.EAST,
		}));
		max = Math.max(max, energized_tiles(grid, {
			pos: [i, W - 1],
			dir: Directions.WEST,
		}));
	}
	return max;
};
