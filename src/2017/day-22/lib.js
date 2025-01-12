/**
 * @param {number[][]} grid
 */
const enlarge = grid => {
	const size = grid.length;
	/** @type {typeof grid} */
	const next_grid = Array.from({ length: 3 * size }, () => Array(3 * size).fill(0));
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			next_grid[size + i][size + j] = grid[i][j];
		}
	}
	return next_grid;
};

const directions = [
	[-1, 0], // N
	[0, 1],  // E
	[1, 0],  // S
	[0, -1], // W
];

/**
 * @param {string} data
 * @param {number} iterations
 */
export const count_infection = (data, iterations) => {
	/** @type {number[][]} */
	let grid = data.split("\n").map(x => x.split("").map(s => s === "#" ? 1 : 0 ));
	let count = 0;
	let carrier = {
		pos: [grid.length >> 1, grid.length >> 1],
		dir: 0,
	};

	/**
	 * @param {any[][]} grid
	 * @param {[number, number]} pos
	 */
	const is_in_grid = (grid, pos) => pos[0] >= 0 && pos[1] >= 0 && pos[0] < grid.length && pos[1] < grid[0].length;

	while (iterations-- > 0) {
		// if out of grid, enlarge and update position
		if (!is_in_grid(grid, carrier.pos)) {
			const size = grid.length;
			grid = enlarge(grid);
			carrier.pos[0] += size;
			carrier.pos[1] += size;
		}

		const [x, y] = carrier.pos;

		// step 1 & 2: turn and update state
		if (grid[x][y] === 1) {
			carrier.dir = (carrier.dir + 1) % 4;
			grid[x][y] = 0;
		} else {
			carrier.dir = (carrier.dir + 3) % 4;
			grid[x][y] = 1;
			count++;
		}

		// step 3: move
		const dir = directions[carrier.dir];
		carrier.pos[0] += dir[0];
		carrier.pos[1] += dir[1];
	}

	return count;
};

const
	/** state clean    */ STATE_C = 0,
	/** state weakened */ STATE_W = 1,
	/** state infected */ STATE_I = 2,
	/** state flagged  */ STATE_F = 3;

/**
 * @param {string} data
 * @param {number} iterations
 */
export const count_infection2 = (data, iterations) => {
	/** @type {number[][]} */
	let grid = data.split("\n").map(x => x.split("").map(s => s === "#" ? STATE_I : STATE_C ));
	let count = 0;
	let carrier = {
		pos: [grid.length >> 1, grid.length >> 1],
		dir: 0,
	};

	/**
	 * @param {any[][]} grid
	 * @param {[number, number]} pos
	 */
	const is_in_grid = (grid, pos) => pos[0] >= 0 && pos[1] >= 0 && pos[0] < grid.length && pos[1] < grid[0].length;

	while (iterations-- > 0) {
		// if out of grid, enlarge and update position
		if (!is_in_grid(grid, carrier.pos)) {
			const size = grid.length;
			grid = enlarge(grid);
			carrier.pos[0] += size;
			carrier.pos[1] += size;
		}

		const [x, y] = carrier.pos;

		// step 1 & 2: turn and update state
		switch (grid[x][y]) {
			case STATE_I:
				// infected turn right
				carrier.dir = (carrier.dir + 1) % 4;
				grid[x][y] = STATE_F;
				break;
			case STATE_C:
				// clean turn left
				carrier.dir = (carrier.dir + 3) % 4;
				grid[x][y] = STATE_W;
				break;
			case STATE_F:
				// flagged turn reverse
				carrier.dir = (carrier.dir + 2) % 4;
				grid[x][y] = STATE_C;
				break;
			case STATE_W:
				grid[x][y] = STATE_I;
				count++;
				break;
		}

		// step 3: move
		const dir = directions[carrier.dir];
		carrier.pos[0] += dir[0];
		carrier.pos[1] += dir[1];
	}

	return count;
};

