/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {string} data
 * @returns {number};
 */
export const count_antinode_locations = (data, part = 1) => {
	const grid = data.split("\n").map(line => line.split(""));

	/** @type {Map<string, Position[]>} */
	const positions_by_frequency = new Map();
	/** @type {Set<string>} */
	const antinodes = new Set();
	const rows = grid.length, cols = grid[0].length;

	/**
	 * @param {Position} pos
	 */
	const is_in_grid = pos => pos.x >= 0 && pos.x < rows && pos.y >= 0 && pos.y < cols;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const c = grid[i][j];
			if (c == ".")
				continue;

			/** @type {Position} */
			const pos = { x: i, y: j };

			if (positions_by_frequency.has(c)) {
				positions_by_frequency.get(c).push(pos);
			} else {
				positions_by_frequency.set(c, [pos]);
			}
		}
	}

	for (const positions of positions_by_frequency.values()) {
		for (let i = 0; i < positions.length - 1; i++) {
			for (let j = i + 1; j < positions.length; j++) {
				let /** @type {Position} */ antinode1, /** @type {Position} */ antinode2;
				if (part == 1) {
					antinode1 = {
						x: 2 * positions[j].x - positions[i].x,
						y: 2 * positions[j].y - positions[i].y,
					}, antinode2 = {
						x: 2 * positions[i].x - positions[j].x,
						y: 2 * positions[i].y - positions[j].y,
					};

					for (let p of [antinode1, antinode2]) {
						if (is_in_grid(p)) {
							antinodes.add(`${p.x},${p.y}`);
						}
					}
				} else if (part == 2) {
					let n = 0;
					while (true) {
						antinode1 = {
							x: (n + 1) * positions[j].x - n * positions[i].x,
							y: (n + 1) * positions[j].y - n * positions[i].y,
						}, antinode2 = {
							x: (n + 1) * positions[i].x - n * positions[j].x,
							y: (n + 1) * positions[i].y - n * positions[j].y,
						};

						let is_still_in_range = false;
						for (let p of [antinode1, antinode2]) {
							if (is_in_grid(p)) {
								is_still_in_range = true;
								antinodes.add(`${p.x},${p.y}`);
							}
						}
						if (!is_still_in_range) {
							break;
						}
						n++;
					}
				}
			}
		}
	}

	return antinodes.size;
};

