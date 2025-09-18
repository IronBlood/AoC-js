/**
 * @param {string[][]} grid
 * @param {number} mid
 * @param {boolean} vertical
 * @returns {string[][]}
 */
const fold = (grid, mid, vertical) => {
	if (vertical) {
		const H = grid.length, W = mid, OW = grid[0].length;
		const next_grid = Array.from({ length: H }, () => Array(W).fill("."));

		for (let i = 0; i < H; i++) {
			for (let j = 0; j < W; j++) {
				const mirrored_j = 2 * mid - j;
				if (grid[i][j] === "#" || (mirrored_j < OW && grid[i][mirrored_j] === "#")) {
					next_grid[i][j] = "#";
				}
			}
		}
		return next_grid;
	} else {
		const OH = grid.length, H = mid, W = grid[0].length;
		const next_grid = Array.from({ length: H }, () => Array(W).fill("."));

		for (let i = 0; i < H; i++) {
			for (let j = 0; j < W; j++) {
				const mirrored_i = 2 * mid - i;
				if (grid[i][j] === "#" || (mirrored_i < OH && grid[2 * mid - i][j] === "#")) {
					next_grid[i][j] = "#";
				}
			}
		}
		return next_grid;
	}
};

/**
 * @param {string} line
 */
const parse_cmd = (line) => {
	line = line.split(" ").pop();
	const mid = +line.substring(2);
	const vertical = line[0] === "x";
	return { mid, vertical };
};

/**
 * @param {string} data
 */
export const count_visible_dots_after_first_fold = (data) => {
	const [str_pos, str_cmd] = data.split("\n\n");

	const positions = str_pos.split("\n").map(line => line.split(",").map(Number));

	let max_x = 0, max_y = 0;
	positions.forEach(([x, y]) => {
		max_x = Math.max(max_x, x);
		max_y = Math.max(max_y, y);
	});

	/** @type {string[][]} */
	let grid = Array.from({ length: max_y + 1 }, () => Array(max_x + 1).fill("."));
	positions.forEach(([x, y]) => grid[y][x] = "#");

	const fold_cmd = str_cmd.split("\n")[0];
	const { mid, vertical } = parse_cmd(fold_cmd);
	grid = fold(grid, mid, vertical);

	return grid.flat().filter(x => x === "#").length;
};

/**
 * @param {string} data
 */
export const get_message = (data) => {
	const [str_pos, str_cmd] = data.split("\n\n");

	const positions = str_pos.split("\n").map(line => line.split(",").map(Number));

	let max_x = 0, max_y = 0;
	positions.forEach(([x, y]) => {
		max_x = Math.max(max_x, x);
		max_y = Math.max(max_y, y);
	});

	/** @type {string[][]} */
	let grid = Array.from({ length: max_y + 1 }, () => Array(max_x + 1).fill("."));
	positions.forEach(([x, y]) => grid[y][x] = "#");

	str_cmd.split("\n").forEach(fold_cmd => {
		const { mid, vertical } = parse_cmd(fold_cmd);
		grid = fold(grid, mid, vertical);
	});

	return grid.map(row => row.join("")).join("\n");
};

