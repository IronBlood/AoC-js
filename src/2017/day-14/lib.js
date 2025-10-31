import {
	hash,
} from "../day-10/lib.js";

/**
 * @param {string} hex_str
 */
const count_bit_str = (hex_str) => {
	const POP = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4];
	let count = 0;
	for (let i = 0, len = hex_str.length; i < len; i++) {
		const char = hex_str.charCodeAt(i);
		let idx = -1;
		if (char >= 48 && char < 58) {
			idx = char - 48; // 0-9
		} else if (char >= 65 && char < 71) {
			idx = 10 + char - 65; // A-F
		} else if (char >= 97 && char < 103) {
			idx = 10 + char - 97; // a-f
		}
		if (idx < -1) {
			throw new Error("invalid str");
		}
		count += POP[idx];
	}
	return count;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_squares = (data) => {
	let squares = 0;
	for (let i = 0; i < 128; i++) {
		const str = hash(`${data}-${i}`);
		squares += count_bit_str(str);
	}
	return squares;
};

const get_digit = (x, n) => (x & (1 << n)) ? 1 : 0;

/**
 * @param {string} data
 * @returns {number}
 */
export const count_regions = (data) => {
	const disk = Array.from({ length: 128 }, (_, idx) => {
		const str = hash(`${data}-${idx}`);
		return str.split("").flatMap(c => {
			const n = parseInt(c, 16);
			return [
				get_digit(n, 3),
				get_digit(n, 2),
				get_digit(n, 1),
				get_digit(n, 0),
			];
		});
	});

	const DIRECTIONS = [0, 1, 0, -1, 0];

	/**
	 * @param {number[][]} grid
	 * @param {number} x
	 * @param {number} y
	 */
	const is_in_grid = (grid, x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

	/**
	 * @param {number[][]} grid
	 * @param {number} x
	 * @param {number} y
	 */
	const dfs = (grid, x, y) => {
		if (!is_in_grid(grid, x, y) || grid[x][y] === 0)
			return;
		grid[x][y] = 0;
		for (let i = 0; i < 4; i++) {
			dfs(grid, x + DIRECTIONS[i], y + DIRECTIONS[i+1]);
		}
	};

	let groud_id = 0;
	for (let i = 0; i < disk.length; i++) {
		for (let j = 0; j < disk[0].length; j++) {
			if (disk[i][j] === 1) {
				dfs(disk, i, j);
				groud_id++;
			}
		}
	}
	return groud_id;
};

