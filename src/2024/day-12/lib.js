const directions = [0, 1, 0, -1, 0];

const is_in_grid = (grid, x,y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
const bfs = (grid, x, y) => {
	const C = grid[x][y], CC = C.repeat(2);
	let area = 0, perimeter = 0;
	let queue = [[x,y]];

	while (queue.length > 0) {
		let next_queue = [];
		for (const [i,j] of queue) {
			if (grid[i][j] !== C)
				continue;
			area++;
			grid[i][j] = CC;
			for (let k = 0; k < 4; k++) {
				const nx = i + directions[k], ny = j + directions[k + 1];
				if (!is_in_grid(grid, nx, ny)) {
					perimeter++;
					continue;
				}

				const c = grid[nx][ny];
				if (c !== C && c !== CC) {
					perimeter++;
				}
				if (c === C) {
					next_queue.push([nx,ny]);
				}
			}
		}
		queue = next_queue;
	}

	return area * perimeter;
};

/**
 * @param {string[][] | string} grid
 */
export const total_price_2 = (data) => {
	const grid = data.split("\n").map(line => line.split(""));

	/** @type {number[][]} */
	const been = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(0));
	/** @type {number[][]} */
	const fence = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(0));
	let sum = 0;
	let area = 0;

	const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];

	/**
	 * @param {number} i
	 * @param {number} j
	 */
	const calculate = (i, j) => {
		been[i][j] = 1;
		area++;

		for (let k = 0; k < 4; k++) {
			let nx = i + dirs[k][0], ny = j + dirs[k][1];
			if (nx < 0 || ny < 0 || nx == grid.length || ny == grid[0].length || grid[nx][ny] !== grid[i][j]) {
				fence[i][j] |= (1 << k);
			} else if (!been[nx][ny]) {
				calculate(nx, ny);
			}
		}
	};

	const resolve_fence = () => {
		let perimeter = 0, v = [0, 0], tmpi, tmpj;

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[0].length; j++) {
				for (let k = 0; k < 4; k++) {
					if (fence[i][j] & (1 << k)) {
						perimeter++;
						v[0] = (k & 1) ? 1 : 0;
						v[1] = (k & 1) ? 0 : 1;
						tmpi = i;
						tmpj = j;
						while (tmpi >= 0 && tmpj >= 0 && tmpi < grid.length && tmpj < grid[0].length && (fence[tmpi][tmpj] & (1 << k))) {
							fence[tmpi][tmpj] &= ~(1 << k);
							tmpi += v[0];
							tmpj += v[1];
						}
					}
				}
			}
		}

		return perimeter;
	};

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (!been[i][j]) {
				area = 0;
				fence.forEach(row => row.fill(0));
				calculate(i, j);
				let perimeter = resolve_fence();
				sum += area * perimeter;
			}
		}
	}

	return sum;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const total_price = (data) => {
	const grid = data.split("\n").map(line => line.split(""));

	let total = 0;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j].length != 1)
				continue;

			total += bfs(grid, i, j);
		}
	}

	return total;
};

