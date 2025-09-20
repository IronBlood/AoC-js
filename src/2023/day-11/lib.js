// @ts-check

/**
 * @param {string[][]} grid
 */
const find_no_galaxy = (grid) => {
	const H = grid.length, W = grid[0].length;
	/** @type {number[]} */
	const no_galaxy_row = [];
	/** @type {number[]} */
	const no_galaxy_col = [];

	for (let i = 0; i < H; i++) {
		let has_galaxy = false;
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === "#") {
				has_galaxy = true;
				break;
			}
		}
		if (!has_galaxy)
			no_galaxy_row.push(i);
	}

	for (let j = 0; j < W; j++) {
		let has_galaxy = false;
		for (let i = 0; i < H; i++) {
			if (grid[i][j] === "#") {
				has_galaxy = true;
				break;
			}
		}
		if (!has_galaxy)
			no_galaxy_col.push(j);
	}

	return { no_galaxy_row, no_galaxy_col };
};

/**
 * @deprecated
 * @param {string[][]} grid
 */
const expand = (grid) => {
	const H = grid.length, W = grid[0].length;
	const { no_galaxy_row, no_galaxy_col } = find_no_galaxy(grid);

	const new_grid = Array.from({ length: H + no_galaxy_row.length }, () =>
		Array(W + no_galaxy_col.length).fill(".")
	);

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {[number, number]}
	 */
	const transform_xy = (x, y) => {
		let count = 0;
		for (let i = 0; i < no_galaxy_row.length; i++) {
			if (x > no_galaxy_row[i])
				count++;
		}
		x += count;

		count = 0;
		for (let i = 0; i < no_galaxy_col.length; i++) {
			if (y > no_galaxy_col[i])
				count++;
		}
		y += count;

		return [x, y];
	};

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === "#") {
				const [x, y] = transform_xy(i, j);
				new_grid[x][y] = "#";
			}
		}
	}

	return new_grid;
};

/**
 * @param {string} data
 */
export const sum_lengths = (data, extra_larger = 2) => {
	let grid = data.split("\n").map(line => line.split(""));

	/** @type {[number, number][]} */
	const galaxies = [];
	const H = grid.length, W = grid[0].length;

	const {
		no_galaxy_col,
		no_galaxy_row,
	} = find_no_galaxy(grid);

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === "#") {
				galaxies.push([i, j]);
			}
		}
	}

	/**
	 * @param {number[]} arr
	 * @param {number} a
	 * @param {number} b
	 */
	const count_extra = (arr, a, b) => {
		[a, b] = [
			Math.min(a, b),
			Math.max(a, b),
		];

		let count = 0
		for (const x of arr) {
			if (x > b)
				break;
			if (a < x && x < b)
				count++;
		}
		return count;
	};

	const extra = extra_larger - 1;
	let sum = 0;
	for (let i = 0; i < galaxies.length - 1; i++) {
		const [a, b] = galaxies[i];
		for (let j = i + 1; j < galaxies.length; j++) {
			const [u, v] = galaxies[j];
			sum += Math.abs(u - a) + Math.abs(v - b);

			const extra_rows = count_extra(no_galaxy_row, a, u);
			const extra_cols = count_extra(no_galaxy_col, b, v);

			sum += (extra_rows + extra_cols) * extra;
		}
	}
	return sum;
};
