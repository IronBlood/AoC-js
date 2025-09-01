import {
	rotate_tile,
	flip_w_tile,
} from "../../lib/matrix.js";

/**
 * @param {any[][]} grid should be squared
 */
const get_size = (grid) => {
	return grid.length;
};

/**
 * @param {string[][]} grid
 * @param {number} x    row of the top left corner
 * @param {number} y    col of the top left corner
 * @param {number} step either 2 or 3
 */
const convert_tile_to_string = (grid, x, y, step) => {
	const strs = Array.from({ length: step }, () => "");
	for (let i = 0; i < step; i++) {
		for (let j = 0; j < step; j++) {
			strs[i] += grid[x+i][y+j];
		}
	}
	return strs.join("/");
};

/**
 * @param {string} str
 */
const convert_string_to_tile = (str) => {
	return str.split("/").map(x => x.split(""));
};

/**
 * @param {string[][]} grid
 * @param {2|3} step
 * @param {Map<string, string[][]>} convert_book
 * @returns {string[][]}
 */
const enhance = (grid, step, convert_book) => {
	const N = get_size(grid) / step;
	const ns = step + 1;
	const next_grid = Array.from({ length: ns * N }, () => Array(ns * N));

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			const replacement = convert_book.get(convert_tile_to_string(grid, i * step, j * step, step));
			if (replacement == null) {
				console.log("error, not found");
			} else {
				for (let u = 0; u < ns; u++) {
					for (let v = 0; v < ns; v++) {
						next_grid[i * ns + u][j * ns + v] = replacement[u][v];
					}
				}
			}
		}
	}

	return next_grid;
};

/**
 * @param {string} data
 * @param {number} iterations
 * @returns {number}
 */
export const count_on = (data, iterations) => {
	let grid = [
		[ ".", "#", "." ],
		[ ".", ".", "#" ],
		[ "#", "#", "#" ],
	];

	/** @type {Map<string, string[][]>} */
	const convert_book = new Map();
	data.split("\n").forEach(line => {
		const strs = line.split(" => ");
		let [grid_from, grid_to] = strs.map(convert_string_to_tile);
		convert_book.set(strs[0], grid_to);
		for (let i = 0; i < 3; i++) {
			grid_from = rotate_tile(grid_from, 1);
			convert_book.set(convert_tile_to_string(grid_from, 0, 0, get_size(grid_from)), grid_to);
		}

		grid_from = flip_w_tile(grid_from);
		convert_book.set(convert_tile_to_string(grid_from,  0, 0, get_size(grid_from)), grid_to);
		for (let i = 0; i < 3; i++) {
			grid_from = rotate_tile(grid_from, 1);
			convert_book.set(convert_tile_to_string(grid_from, 0, 0, get_size(grid_from)), grid_to);
		}
	});

	while (iterations-- > 0) {
		const size = get_size(grid);
		if (size % 2 === 0) {
			grid = enhance(grid, 2, convert_book);
		} else if (size % 3 === 0) {
			grid = enhance(grid, 3, convert_book);
		}
	}

	return grid.reduce((sum, row) => sum + row.reduce((s, c) => s + (c === "#" ? 1 : 0), 0), 0);
};

