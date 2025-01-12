/**
 * @param {number} data
 */
export const get_steps = data => {
	if (data === 1)
		return 0;

	let d = 3, max;
	while ((max = d * d) < data) {
		d += 2;
	}

	let begin = max;
	do {
		begin -= (d - 1);
	} while (begin > data)
	let center = begin + (d - 1) / 2;
	return Math.abs(data - center) + (d - 1) / 2;
};

/**
 * @param {number} data
 * @returns {number}
 */
export const first_larger_value = data => {
	if (data === 1)
		return 2;
	if (data < 4)
		return 4;

	let d = 3;
	while (d * d < data) {
		d += 2;
	}

	/** @type {number[][]} */
	const grid = Array.from({ length: d }, () => Array(d).fill(-1));
	let x = d >>> 1, y = x;
	grid[x][y++] = 1;
	grid[x--][y] = 1;

	const directions = [
		[-1, 0], // N
		[0, -1], // W
		[1, 0],  // S
		[0, 1],  // E
	];

	let dir_idx = 0;

	/**
	 * @param {any[][]} grid
	 * @param {number} x
	 * @param {number} y
	 */
	const is_in_grid = (grid, x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

	let curr;
	while (true) {
		let count = 0;
		curr = 0;
		for (let a = x - 1; a <= x + 1; a++) {
			for (let b = y - 1; b <= y + 1; b++) {
				if ((a === x && b === y) || !is_in_grid(grid, a, b) || grid[a][b] === -1) {
					continue;
				}

				curr += grid[a][b];
				count++;
			}
		}

		if (curr > data)
			break;

		grid[x][y] = curr;
		if (count === 2) {
			dir_idx = (dir_idx + 1) % 4;
		}
		const D = directions[dir_idx];
		x += D[0];
		y += D[1];
	}

	return curr;
};

