// @ts-check

/**
 * @param {string[][]} grid
 * @param {number} part
 * @returns {number}
 */
export const find_mirror = (grid, part) => {
	const H = grid.length, W = grid[0].length;

	/**
	 * @param {number} i
	 * @param {number} j
	 */
	const is_vertical_mirrored = (i, j) => {
		while (i >= 0 && j < W) {
			for (let k = 0; k < H; k++) {
				if (grid[k][i] !== grid[k][j]) {
					return false;
				}
			}
			i--;
			j++;
		}
		return true;
	};

	/**
	 * @param {number} i
	 * @param {number} j
	 */
	const is_horizontal_mirrored = (i, j) => {
		while (i >= 0 && j < H) {
			for (let k = 0; k < W; k++) {
				if (grid[i][k] !== grid[j][k]) {
					return false;
				}
			}
			i--;
			j++;

		}
		return true;
	}

	/**
	 * @param {number?} res
	 */
	const find_res = (res) => {
		for (let i = 0; i < W - 1; i++) {
			if (is_vertical_mirrored(i, i + 1)) {
				const local_res = i + 1;
				if (part === 1 || res !== local_res)
					return local_res;
			}
		}

		for (let i = 0; i < H - 1; i++) {
			if (is_horizontal_mirrored(i, i + 1)) {
				const local_res = (i + 1) * 100;
				if (part === 1 || res !== local_res)
					return local_res;
			}
		}

		return -1;
	};

	if (part === 1) {
		return find_res(null);
	} else {
		const original_res = find_res(null);
		for (let i = 0; i < H; i++) {
			for (let j = 0; j < W; j++) {
				const original = grid[i][j];
				grid[i][j] = (original === "#" ? "." : "#");
				const res = find_res(original_res);
				if (res >= 0) {
					return res;
				}
				grid[i][j] = original;
			}
		}
		return -1;
	}
};

/**
 * @param {string} data
 * @returns {number}
 */
export const sum_notes = (data, part = 1) => {
	return data.split("\n\n").reduce((sum, block, idx) => {
		const grid = block.split("\n").map(line => line.split(""));
		const res = find_mirror(grid, part);
		if (res === -1) {
			console.log(`Cannot find mirror for ${idx}`);
			console.log(block);
		}
		return sum + res;
	}, 0);
};
