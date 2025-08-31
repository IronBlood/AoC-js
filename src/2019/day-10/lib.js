import { gcd } from "../../lib/math.js";

/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 */
const get_vectors = (grid, x, y) => {
	const X = grid.length, Y = grid[0].length;
	const vectors = new Set();
	for (let i = 0; i < X; i++) {
		for (let j = 0; j < Y; j++) {
			if ((i === x && j === y) || grid[i][j] === ".")
				continue;

			let dx = i - x, dy = j - y;
			const d = gcd(dx, dy);
			dx /= d;
			dy /= d;

			vectors.add(`${dx},${dy}`);
		}
	}
	return vectors;
};

/**
 * @param {string} data
 */
export const most_detected = (data) => {
	const grid = data.split("\n").map(line => line.split(""));

	const res = {
		grid,
		count: 0,
		/** @type {Set<string>} */
		vectors: new Set(),
		pos: [0, 0],
	};

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === "#") {
				const vectors = get_vectors(grid, i, j)
				if (res.count < vectors.size) {
					res.count = vectors.size;
					res.vectors = vectors;
					res.pos = [i, j];
				}
			}
		}
	}

	return res;
};

/**
 * @param {string} data
 */
export const find_200th = (data) => {
	const res = most_detected(data);
	const [base_x, base_y] = res.pos;

	const vectors = [...res.vectors].map(v => {
		const [dx, dy] = v.split(",").map(Number);
		let angle = Math.atan2(dy, -dx);
		if (angle < 0)
			angle += 2 * Math.PI;

		return {
			angle,
			vector: [dx, dy],
		};
	}).sort((a, b) => a.angle - b.angle);

	const grid = res.grid;
	/** @type {(x: number, y: number) => boolean} */
	const in_grid = (x, y) => x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;

	let count = 0;
	while (true) {
		for (let v of vectors) {
			const [dx, dy] = v.vector;
			let k = 1;
			while (true) {
				const x = base_x + k * dx, y = base_y + k * dy;
				k++;
				if (!in_grid(x, y)) {
					break;
				}
				if (grid[x][y] === "#") {
					grid[x][y] = ".";
					if (++count === 200) {
						return y * 100 + x;
					}
					break;
				}
			}
		}
	}
};
