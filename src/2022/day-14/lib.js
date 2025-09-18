// @ts-check
/**
 * @readonly
 * @enum {number}
 */
const TileType = {
	ROCK: 0,
	REST_SAND: 1,
	FALLING: 2,
};

/**
 * @param {string} data
 */
const build_rocks = (data) => {
	/** @type {Set<string>} */
	const rock_set = new Set();

	for (const line of data.split("\n")) {
		const positions = line
			.split(" -> ")
			.map(s => s.split(",").map(Number));

		for (let i = 1; i < positions.length; i++) {
			const [u, v] = positions[i - 1];
			const [x, y] = positions[i];

			let d_ux = x - u, d_vy = y - v;
			// console.log(d_ux, d_vy);
			d_ux = d_ux === 0 ? 0 : (d_ux / Math.abs(d_ux));
			d_vy = d_vy === 0 ? 0 : (d_vy / Math.abs(d_vy));

			for (let a = u, b = v; !(a === x && b === y); a += d_ux, b += d_vy) {
				rock_set.add(`${a},${b}`);
			}
			rock_set.add(`${x},${y}`);
		}
	}

	return rock_set;
};

/**
 * @param {Map<string, TileType>} tiles
 * @param {number} max_y
 */
const dump = (tiles, max_y) => {
	let min_y = 0;
	let min_x = Number.MAX_SAFE_INTEGER, max_x = Number.MIN_SAFE_INTEGER;

	for (const pos of tiles.keys()) {
		const x = +pos.split(",")[0];
		min_x = Math.min(min_x, x);
		max_x = Math.max(max_x, x);
	}

	const H = max_y - min_y + 1, W = max_x - min_x + 1;
	const grid = Array.from({ length: H }, () => Array(W).fill("."));

	for (const [pos, type] of tiles) {
		const [x, y] = pos.split(",").map(Number);
		let char;
		switch (type) {
			case TileType.FALLING:   char = "~"; break;
			case TileType.REST_SAND: char = "o"; break;
			case TileType.ROCK:      char = "#"; break;
		}
		grid[y - min_y][x - min_x] = char;
	}

	return grid.map(row => row.join("")).join("\n");
};

/**
 * @param {string} data
 */
export const count_rest_sand = (data, part = 1) => {
	/** @type {Map<string, TileType>} */
	const tiles = new Map();

	let min_x = Number.MAX_SAFE_INTEGER,
		max_x = Number.MIN_SAFE_INTEGER,
		min_y = 0,
		max_y = 0;

	for (const pos of build_rocks(data)) {
		const [x, y] = pos.split(",").map(Number);
		max_y = Math.max(max_y, y);
		min_x = Math.min(min_x, x);
		max_x = Math.max(max_x, x);
		tiles.set(pos, TileType.ROCK);
	}

	let MAX_Y = max_y + 2;

	const should_end = part === 1
		? () => tiles.has("500,1")
		: () => tiles.has("499,1") && tiles.has("501,1");

	const simulate_drop = () => {
		let x = 500, y = 0;
		while (true) {
			const pos = `${x},${y}`;
			if (part === 1 && y > max_y) {
				tiles.set(pos, TileType.FALLING);
				break;
			}

			const ny = y + 1;
			if (part === 2 && ny === MAX_Y) {
				tiles.set(pos, TileType.REST_SAND);
				break;
			}

			const pos_down = `${x},${ny}`;
			if (!tiles.has(pos_down)) {
				y = ny;
				continue;
			} else {
				const tile_down = tiles.get(pos_down);
				if (tile_down === TileType.FALLING) {
					tiles.set(pos, TileType.FALLING);
					break;
				}

				const pos_down_left = `${x-1},${ny}`,
					pos_down_right = `${x+1},${ny}`;

				if (!tiles.has(pos_down_left)) {
					x = x - 1;
					y = ny;
					continue
				} else if (tiles.get(pos_down_left) === TileType.FALLING) {
					tiles.set(pos, TileType.FALLING);
					break;
				} else if (!tiles.has(pos_down_right)) {
					x = x + 1;
					y = ny;
					continue;
				} else if (tiles.get(pos_down_right) === TileType.FALLING) {
					tiles.set(pos, TileType.FALLING);
					break;
				} else {
					// we can rest now
					tiles.set(pos, TileType.REST_SAND);
					break;
				}
			}
		}
	};

	while (!should_end()) {
		simulate_drop();
	}

	let count = part === 1 ? 0 : 1;
	for (const t of tiles.values()) {
		if (t === TileType.REST_SAND) {
			count++;
		}
	}
	return count;
};
