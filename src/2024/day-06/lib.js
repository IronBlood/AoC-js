/**
 * @param {[number,number]} d
 */
const get_next_direction = d => {
	if (d[0] == 0 && d[1] == 1) {
		d[0] = 1;
		d[1] = 0;
	} else if (d[0] == 0 && d[1] == -1) {
		d[0] = -1;
		d[1] = 0;
	} else if (d[1] == 0 && d[0] == 1) {
		d[0] = 0;
		d[1] = -1;
	} else {
		d[0] = 0;
		d[1] = 1;
	}
};

/**
 * @param {string} data
 */
export const count_distinct = (data) => {
	/** @type {string[][]} */
	const grid = data.split("\n").map(line => line.split(""));
	let distinct = 1;
	const rows = grid.length, cols = grid[0].length;

	let /** @type {[number, number]} */ pos, /** @type {[number, number]} */ direction;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (grid[i][j] !== "#" && grid[i][j] !== ".") {
				pos = [i, j];
				switch (grid[i][j]) {
					case "^": direction = [-1, 0]; break;
					case ">": direction = [0, 1]; break;
					case "v": direction = [1, 0]; break;
					case "<": direction = [0, -1]; break;
				}

				grid[i][j] = "X";
				break;
			}
		}
	}

	while (true) {
		const x = pos[0] + direction[0], y = pos[1] + direction[1];
		if (x < 0 || y < 0 || x == rows || y == cols) {
			break;
		}

		if (grid[x][y] === "#") {
			get_next_direction(direction);
		} else {
			pos[0] = x;
			pos[1] = y;
			if (grid[x][y] == ".") {
				distinct++;
				grid[x][y] = "X";
			}
		}
	}

	return distinct;
};

/**
 * TODO refactor
 * @param {string} data
 * @returns {number}
 */
export const possible_loops = data => {
	/** @type {(string|Set<string>)[][]} */
	const grid = data.split("\n").map(line => line.split(""));
	const rows = grid.length, cols = grid[0].length;
	const vecg = Array.from({ length: rows }, () => Array.from({ length: cols }, /** @returns {Set<string>} */() => new Set()));
	let loop_set = new Set();

	let /** @type {[number, number]} */ pos, /** @type {[number, number]} */ direction;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (grid[i][j] !== "#" && grid[i][j] !== ".") {
				pos = [i, j];
				switch (grid[i][j]) {
					case "^": direction = [-1, 0]; break;
					case ">": direction = [0, 1]; break;
					case "v": direction = [1, 0]; break;
					case "<": direction = [0, -1]; break;
				}

				grid[i][j] = "X";
				vecg[i][j].add(direction.join("|"));
				break;
			}
		}
	}
	const start_pos = [...pos];

	/**
	 * @param {[number, number]} pos
	 */
	const is_in_grid = (pos) => (pos[0] >= 0 && pos[0] < rows && pos[1] >= 0 && pos[1] < cols);

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const is_loop = (x, y) => {
		if (!is_in_grid([x, y]))
			return false;

		// if this cell has been visited, which mean the current cell cannot be reached
		// by the current path
		if (grid[x][y] === "X")
			return false;

		const tmp_grid = grid.map(row => row.slice()),
			tmp_vecg = vecg.map(row => row.map(set => new Set(set))),
			tmp_pos = pos.slice(),
			tmp_dir = direction.slice();
		tmp_grid[x][y] = "#";
		get_next_direction(tmp_dir);

		while (true) {
			let a = tmp_pos[0] + tmp_dir[0];
			let b = tmp_pos[1] + tmp_dir[1];

			if (!is_in_grid([a, b]))
				return false;

			if (tmp_grid[a][b] == ".") {
				tmp_pos[0] = a;
				tmp_pos[1] = b;
				tmp_grid[a][b] = "X";
				tmp_vecg[a][b].add(tmp_dir.join("|")); // mark the coming dir
			} else if (tmp_grid[a][b] == "#") {
				get_next_direction(tmp_dir);
			} else {
				// so the current cell has been visited
				// let's update the temp position first
				tmp_pos[0] = a;
				tmp_pos[1] = b;
				const tmp_dir_str = tmp_dir.join("|");
				if (tmp_vecg[a][b].has(tmp_dir_str)) {
					// the cell has been visited from the direction
					return true;
				} else {
					tmp_vecg[a][b].add(tmp_dir_str);
				}
			}
		}
	};

	while (true) {
		let x = pos[0] + direction[0],
			y = pos[1] + direction[1];

		if (!is_in_grid([x,y]))
			break;

		if (grid[x][y] == "X") {
			// has visited, so do nothing
			pos[0] = x;
			pos[1] = y;
			vecg[x][y].add(direction.join("|"));
		} else if (grid[x][y] == "#") {
			// do nothing but just change direction
			get_next_direction(direction);
		} else {
			// not visited yet, but may take a try
			if (is_loop(x, y)) {
				loop_set.add(`${x},${y}`);
			}
			// continue walking
			pos[0] = x;
			pos[1] = y;
			grid[x][y] = "X";
			vecg[x][y].add(direction.join("|"));
		}
	}

	return loop_set.size;
};

