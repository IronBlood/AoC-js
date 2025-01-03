/**
 * @param {number} num
 * @param {number} height
 * @param {number} width
 */
const make_grid = (num, height, width) => {
	/** @type {string[][]} */
	const grid = Array.from({ length: height }, () => Array(width).fill("."));

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			let sum = i * i + 3 * i + 2 * i * j + j + j * j + num;
			let count = 0;
			while (sum > 0) {
				count += (sum & 1);
				sum >>>= 1;
			}
			if (count & 1) {
				grid[i][j] = "#";
			}
		}
	}

	return grid;
};

/**
 * @param {string} str
 * @param {[number, number]} target
 */
export const shortest_steps = (str, target) => {
	const num = +str;

	const grid = make_grid(num, 4 * target[0], 4 * target[1]);

	/**
	 * @param {any[][]} grid
	 * @param {number} x
	 * @param {number} y
	 */
	const is_in_grid = (grid, x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

	const dirs = [0, 1, 0, -1, 0];
	let move = 0;

	let queue = [[1,1]];
	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];
		for (let [x, y] of queue) {
			if (!is_in_grid(grid, x, y) || grid[x][y] !== ".") {
				continue;
			}
			if (x === target[0] && y === target[1]) {
				return move;
			}
			grid[x][y] = "o";
			for (let i = 0; i < 4; i++) {
				next_queue.push([x + dirs[i], y + dirs[i + 1]]);
			}
		}
		move++;
		queue = next_queue;
	}
	return move;
};

/**
 * @param {string} str
 */
export const count_locations = (str, move = 50) => {
	const num = +str;

	let size = 4 * Math.max(move, 3);

	const grid = make_grid(num, size, size);

	/**
	 * @param {any[][]} grid
	 * @param {number} x
	 * @param {number} y
	 */
	const is_in_grid = (grid, x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

	const dirs = [0, 1, 0, -1, 0];

	let queue = [[1,1]];
	let count = 0;
	while (move-- >= 0) {
		/** @type {typeof queue} */
		const next_queue = [];
		for (let [x, y] of queue) {
			if (!is_in_grid(grid, x, y) || grid[x][y] !== ".") {
				continue;
			}
			grid[x][y] = "o";
			count++;
			for (let i = 0; i < 4; i++) {
				next_queue.push([x + dirs[i], y + dirs[i + 1]]);
			}
		}
		queue = next_queue;
	}
	return count;
};

