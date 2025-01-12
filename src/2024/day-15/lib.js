/**
 * @param {string[][]} grid
 * @param {string} c
 * @returns {[number, number]}
 */
const find_robot = (grid, c) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === c) {
				grid[i][j] = ".";
				return [i, j];
			}
		}
	}
};

/**
 * @param {string} data
 */
export const sum_of_gps_coordinates = (data) => {
	const [ grid_cfg, move_cfg ] = data.split("\n\n");
	const grid = grid_cfg.split("\n").map(line => line.split(""));
	const move_str = move_cfg.split("\n").join("");
	let robot_pos = find_robot(grid, "@");

	for (let i = 0; i < move_str.length; i++) {
		/** @type {[number, number]} */
		let direction;
		switch (move_str[i]) {
			case "v": direction = [1, 0]; break;
			case "^": direction = [-1, 0]; break;
			case "<": direction = [0, -1]; break;
			case ">": direction = [0, 1]; break;
		}

		let nx = robot_pos[0] + direction[0], ny = robot_pos[1] + direction[1];
		if (grid[nx][ny] === "#") {
			continue;
		}
		if (grid[nx][ny] === ".") {
			robot_pos = [nx, ny];
			continue;
		}
		// grid[nx][ny] === "O"
		let can_move = false;
		while (true) {
			nx += direction[0];
			ny += direction[1];
			if (grid[nx][ny] === "O")
				continue;
			if (grid[nx][ny] === "#") {
				can_move = false;
				break;
			}
			// grid[nx][ny] === "."
			can_move = true;
			break;
		}
		if (can_move) {
			grid[nx][ny] = "O";
			nx = robot_pos[0] + direction[0];
			ny = robot_pos[1] + direction[1];
			grid[nx][ny] = ".";
			robot_pos = [nx, ny];
		}
	}

	return grid.reduce((sum, row, row_idx) => sum + row.reduce((s, cell, col_idx) => cell === "O" ? (s + (100 * row_idx + col_idx)) : s, 0), 0);
};

/**
 * @param {string} data
 */
export const sum_of_gps_coordinates_2 = data => {
	const [ grid_cfg, move_cfg ] = data.split("\n\n");
	const grid = grid_cfg.split("\n").map(line => line.split("").flatMap(cell => {
		switch (cell) {
			case "#": return ["#", "#"];
			case "O": return ["[", "]"];
			case ".": return [".", "."];
			case "@": return ["@", "."];
		}
	}));
	const move_str = move_cfg.split("\n").join("");
	let robot_pos = find_robot(grid, "@");

	for (let i = 0; i < move_str.length; i++) {
		const move_char = move_str[i];
		/** @type {[number, number]} */
		let direction;
		switch (move_char) {
			case "v": direction = [1, 0]; break;
			case "^": direction = [-1, 0]; break;
			case "<": direction = [0, -1]; break;
			case ">": direction = [0, 1]; break;
		}
		let nx = robot_pos[0] + direction[0], ny = robot_pos[1] + direction[1];

		// simple cases
		if (grid[nx][ny] === "#")
			continue;
		if (grid[nx][ny] === ".") {
			robot_pos = [nx, ny];
			continue;
		}

		// boxes
		let can_move = false;
		if (direction[0] === 0) {
			// horizontal
			let a = nx, b = ny;
			while (true) {
				b += direction[1];
				if (grid[a][b] === "#")
					break;
				if (grid[a][b] === ".") {
					can_move = true;
					break;
				}
			}
			if (can_move) {
				// grid[a][b] === "."
				while (b != ny) {
					grid[a][b] = grid[a][b - direction[1]];
					b -= direction[1];
				}
				grid[nx][ny] = ".";
				robot_pos = [nx, ny];
			}
		} else {
			can_move = check_can_move(grid, nx, ny, direction[0]);
			if (can_move) {
				if (grid[nx][ny] === "[")
					move_vertically(grid, nx, ny, ny + 1, direction[0]);
				else
					move_vertically(grid, nx, ny - 1, ny, direction[0]);
				robot_pos = [nx, ny];
			}
		}
	}
	return grid.reduce((sum, row, row_idx) => sum + row.reduce((s, cell, col_idx) => cell === "[" ? (s + (100 * row_idx + col_idx)) : s, 0), 0);
};

/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 * @param {number} dx delta_x, as we only check vertically, so it doesn't matter about delta_y
 */
const check_can_move = (grid, x, y, dx) => {
	// simple cases
	if (grid[x][y] === ".")
		return true;
	if (grid[x][y] === "#")
		return false;
	const dy = grid[x][y] === "[" ? 1 : -1;
	return check_can_move(grid, x + dx, y, dx) && check_can_move(grid, x + dx, y + dy, dx);
};

/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 * @param {number} dx delta_x, as we only check vertically, so it doesn't matter about delta_y
 */
const move_vertically = (grid, x, yl, yr, dx) => {
	const tmp = [grid[x+dx][yl], grid[x+dx][yr]].join("");
	if (tmp === "[]") {
		move_vertically(grid, x+dx, yl, yr, dx);
	} else if (tmp === "].") {
		move_vertically(grid, x+dx, yl-1, yl, dx);
	} else if (tmp === ".[") {
		move_vertically(grid, x+dx, yr, yr+1, dx);
	} else if (tmp === "][") {
		move_vertically(grid, x+dx, yl-1, yl, dx);
		move_vertically(grid, x+dx, yr, yr+1, dx);
	}

	if (grid[x+dx][yl] === "." && grid[x+dx][yr] === ".") {
		grid[x+dx][yl] = "[";
		grid[x+dx][yr] = "]";
		grid[x][yl] = ".";
		grid[x][yr] = ".";
	}
};

