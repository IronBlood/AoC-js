/**
 * @param {string[][]} grid
 * @param {string[]} queries
 * @returns {Object<string, [number, number]>}
 */
const find_in_grid = (grid, queries) => {
	let obj = {};
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			const c = grid[i][j];
			if (queries.includes(c)) {
				obj[c] = [i, j];
				grid[i][j] = ".";
			}
		}
	}
	return obj;
};

/**
 * @param {string} data
 */
export const lowest_score = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	let { S, E } = find_in_grid(grid, ["S", "E"]);

	const ROWS = grid.length, COLS = grid[0].length;
	const lowest = Array.from({ length: ROWS }, () => Array(COLS).fill(Number.MAX_SAFE_INTEGER));
	const dirs = [
		[-1, 0], // up
		[0, 1],  // right
		[1, 0],  // down
		[0, -1], // left
	];

	/**
	 * @param {[number, number]} pos
	 * @param {number} dir_idx
	 * @param {number} score
	 */
	const walk = (pos, dir_idx, score) => {
		const [x, y] = pos;
		// if reaches E
		if (x === E[0] && y === E[1]) {
			lowest[x][y] = Math.min(lowest[x][y], score);
			return;
		}

		// wall
		if (grid[x][y] === "#") {
			return;
		}

		// visited and more scores
		if (score > lowest[x][y]) {
			return;
		}

		lowest[x][y] = score;
		let nx, ny, ndi;

		// straight
		ndi = dir_idx;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		walk([nx, ny], ndi, score + 1);

		// counterclockwise
		ndi = (dir_idx - 1 + 4) % 4;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		walk([nx, ny], ndi, score + 1001);

		ndi = (dir_idx + 1) % 4;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		walk([nx, ny], ndi, score + 1001);
	};

	walk(S, 1, 0);

	return lowest[E[0]][E[1]];
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_tiles = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	let { S, E } = find_in_grid(grid, ["S", "E"]);

	const ROWS = grid.length, COLS = grid[0].length;
	/** @type {[number,number,number,number][][]} */
	const lowest = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => Array(4).fill(Number.MAX_SAFE_INTEGER)));
	const dirs = [
		[-1, 0], // N up
		[0, 1],  // E right
		[1, 0],  // S down
		[0, -1], // W left
	];

	/** @type {Set<string>} */
	let count_set = new Set();

	let lowest_e = Number.MAX_SAFE_INTEGER;

	/**
	 * @param {[number, number]} pos
	 * @param {number} dir_idx
	 * @param {number} score
	 * @param {string[]} path
	 */
	const walk = (pos, dir_idx, score, path, debug = false) => {
		const [x, y] = pos;

		// if reaches E
		if (x === E[0] && y === E[1]) {
			path.push(pos.join(","));
			if (score < lowest_e) {
				lowest_e = score;
				count_set.clear();
				for (let p of path) {
					count_set.add(p);
				}
			} else if (score === lowest_e) {
				for (let p of path) {
					count_set.add(p);
				}
			}
			path.pop();
			return;
		}

		// wall
		if (grid[x][y] === "#") {
			return;
		}

		// visited and more scores
		if (score > lowest[x][y][dir_idx]) {
			return;
		}

		lowest[x][y][dir_idx] = score;
		path.push(pos.join(","));
		let nx, ny, ndi;

		// straight
		ndi = dir_idx;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		walk([nx, ny], ndi, score + 1, path, debug);

		// counterclockwise
		ndi = (dir_idx + 3) % 4;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		walk([nx, ny], ndi, score + 1001, path, debug);

		// clockwise
		ndi = (dir_idx + 1) % 4;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		walk([nx, ny], ndi, score + 1001, path, debug);

		path.pop();
	};

	walk(S, 1, 0, []);

	return count_set.size;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_tiles_bfs = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	let { S, E } = find_in_grid(grid, ["S", "E"]);

	const ROWS = grid.length, COLS = grid[0].length;
	/** @type {[number,number,number,number][][]} */
	const lowest = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => Array(4).fill(Number.MAX_SAFE_INTEGER)));
	const dirs = [
		[-1, 0], // N up
		[0, 1],  // E right
		[1, 0],  // S down
		[0, -1], // W left
	];

	/** @type {Set<string>} */
	let count_set = new Set();

	let lowest_e = Number.MAX_SAFE_INTEGER;

	/** @type {[number, number, number, number, string[]][]} */
	const queue = [[
		S[0], // x
		S[1], // y
		1,    // dir_idx
		0,    // score
		[],   // path
	]];

	while (queue.length > 0) {
		/** @type {[number, number, number, number, string[]]} */
		const [x, y, dir_idx, score, path] = queue.shift();
		if (x === E[0] && y === E[1]) {
			path.push(E.join(","));
			if (score < lowest_e) {
				lowest_e = score;
				count_set.clear();
				for (let p of path) {
					count_set.add(p);
				}
			} else if (score === lowest_e) {
				for (let p of path) {
					count_set.add(p);
				}
			}
			continue;
		}

		// wall
		if (grid[x][y] === "#") {
			continue;
		}

		// visited and more scores
		if (score > lowest[x][y][dir_idx]) {
			continue;
		}

		lowest[x][y][dir_idx] = score;
		path.push([x,y].join(","));

		let nx, ny, ndi;

		// straight
		ndi = dir_idx;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		queue.push([nx, ny, ndi, score + 1, path.slice()]);

		// counterclockwise
		ndi = (dir_idx + 3) % 4;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		queue.push([nx, ny, ndi, score + 1001, path.slice()]);

		// clockwise
		ndi = (dir_idx + 1) % 4;
		nx = x + dirs[ndi][0];
		ny = y + dirs[ndi][1];
		queue.push([nx, ny, ndi, score + 1001, path.slice()]);
	}

	return count_set.size;
};

