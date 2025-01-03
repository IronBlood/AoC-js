/**
 * @param {string[][]} grid
 * @param {number} idx
 * @param {number} start
 * @param {number} end
 */
const flip_row = (grid, idx, start, end) => {
	while (start < end) {
		const tmp = grid[idx][start];
		grid[idx][start] = grid[idx][end];
		grid[idx][end] = tmp;
		start++;
		end--;
	}
};

/**
 * @param {string[][]} grid
 * @param {number} idx
 * @param {number} start
 * @param {number} end
 */
const flip_col = (grid, idx, start, end) => {
	while (start < end) {
		const tmp = grid[start][idx];
		grid[start][idx] = grid[end][idx];
		grid[end][idx] = tmp;
		start++;
		end--;
	}
};

/**
 * @param {string[][]} grid
 * @param {number} idx
 * @param {number} offset
 */
const shift_row = (grid, idx, offset) => {
	flip_row(grid, idx, 0, grid[0].length - 1 - offset);
	flip_row(grid, idx, grid[0].length - offset, grid[0].length - 1);
	flip_row(grid, idx, 0, grid[0].length - 1);
};

/**
 * @param {string[][]} grid
 * @param {number} idx
 * @param {number} offset
 */
const shift_col = (grid, idx, offset) => {
	flip_col(grid, idx, 0, grid.length - 1 - offset);
	flip_col(grid, idx, grid.length - offset, grid.length - 1);
	flip_col(grid, idx, 0, grid.length - 1);
};

/**
 * @param {string[][]} grid
 * @param {string} cmd
 */
export const exec = (grid, cmd) => {
	if (cmd.startsWith("rect")) {
		const [cols, rows] = cmd.split(" ")[1].split("x").map(Number);
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				grid[i][j] = "#";
			}
		}
	} else {
		const arr = cmd.split(" ");
		const idx = +arr[2].split("=")[1];
		const offset = +arr[4];
		if (arr[1] == "row") {
			shift_row(grid, idx, offset % grid[0].length);
		} else {
			shift_col(grid, idx, offset % grid.length);
		}
	}
};

/**
 * @param {string[][]} grid
 * @param {string} data
 */
export const count_pixels_after_execution = (grid, data) => {
	data.split("\n").forEach(cmd => exec(grid, cmd));
	console.log(grid.map(row => row.join("")).join("\n"));
	return grid.reduce((sum, row) => sum + row.reduce((s, c) => s + (c === "#" ? 1 : 0), 0), 0);
};

