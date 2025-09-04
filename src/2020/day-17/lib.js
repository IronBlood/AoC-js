/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 */
const get_neighbors3 = (x, y, z) => {
	const neighbors = [];
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			for (let dz = -1; dz <= 1; dz++) {
				if (dx === 0 && dy === 0 && dz === 0)
					continue;
				neighbors.push([x + dx, y + dy, z + dz]);
			}
		}
	}
	return neighbors;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 */
const get_neighbors4 = (x, y, z, w) => {
	const neighbors = [];
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			for (let dz = -1; dz <= 1; dz++) {
				for (let dw = -1; dw <= 1; dw++) {
					if (dx === 0 && dy === 0 && dz === 0 && dw === 0)
						continue;
					neighbors.push([
						x + dx,
						y + dy,
						z + dz,
						w + dw,
					]);
				}
			}
		}
	}
	return neighbors;
};

export class EnergyCube3 {
	/**
	 * @param {string} data
	 */
	constructor(data) {
		const grid = data.split("\n").map(line => line.split(""));
		/** @private @type {number} */
		this.x0 = 0;
		/** @private @type {number} */
		this.x1 = grid.length - 1;
		/** @private @type {number} */
		this.y0 = 0;
		/** @private @type {number} */
		this.y1 = grid[0].length - 1;
		/** @private @type {number} */
		this.z0 = 0;
		/** @private @type {number} */
		this.z1 = 0;
		/** @private @type {Map<string, boolean>} */
		this.cubes = new Map();
		for (let x = this.x0; x <= this.x1; x++) {
			for (let y = this.y0; y <= this.y1; y++) {
				if (grid[x][y] === "#") {
					this.cubes.set(`${x},${y},${0}`, true);
				}
			}
		}
	}

	mutate() {
		const next_cubes = new Map();
		this.x0--;
		this.x1++;
		this.y0--;
		this.y1++;
		this.z0--;
		this.z1++;

		for (let x = this.x0; x <= this.x1; x++) {
			for (let y = this.y0; y <= this.y1; y++) {
				for (let z = this.z0; z <= this.z1; z++) {
					const neighbors = get_neighbors3(x, y, z);
					let active_neighbors = 0;
					for (const neighbor of neighbors) {
						const neighbor_key = neighbor.join(",");
						if (this.cubes.get(neighbor_key)) {
							active_neighbors++;
						}
					}

					const key = `${x},${y},${z}`;
					const value = this.cubes.get(key);
					if ((value && (active_neighbors === 2 || active_neighbors === 3)) || (!value && active_neighbors === 3)) {
						next_cubes.set(key, true);
					}
				}
			}
		}
		this.cubes = next_cubes;
	}

	count() {
		return this.cubes.size;
	}
}

class EnergyCube4 {
	/**
	 * @param {string} data
	 */
	constructor(data) {
		const grid = data.split("\n");
		/** @private @type {number} */
		this.x0 = 0;
		/** @private @type {number} */
		this.x1 = grid.length - 1;
		/** @private @type {number} */
		this.y0 = 0;
		/** @private @type {number} */
		this.y1 = grid[0].length - 1;
		/** @private @type {number} */
		this.z0 = 0;
		/** @private @type {number} */
		this.z1 = 0;
		/** @private @type {number} */
		this.w0 = 0;
		/** @private @type {number} */
		this.w1 = 0;
		/** @private @type {Map<string, boolean>} */
		this.cubes = new Map();
		for (let x = this.x0; x <= this.x1; x++) {
			for (let y = this.y0; y <= this.y1; y++) {
				if (grid[x][y] === "#") {
					this.cubes.set(`${x},${y},${0},${0}`, true);
				}
			}
		}
	}

	mutate() {
		const next_cubes = new Map();
		this.x0--;
		this.x1++;
		this.y0--;
		this.y1++;
		this.z0--;
		this.z1++;
		this.w0--;
		this.w1++;

		for (let x = this.x0; x <= this.x1; x++) {
			for (let y = this.y0; y <= this.y1; y++) {
				for (let z = this.z0; z <= this.z1; z++) {
					for (let w = this.w0; w <= this.w1; w++) {
						const neighbors = get_neighbors4(x, y, z, w);
						let active_neighbors = 0;
						for (const neighbor of neighbors) {
							const neighbor_key = neighbor.join(",");
							if (this.cubes.get(neighbor_key))
								active_neighbors++;
						}

						const key = [x, y, z, w].join(",");
						const value = this.cubes.get(key);
						if ((value && (active_neighbors === 2 || active_neighbors === 3)) || (!value && active_neighbors === 3)) {
							next_cubes.set(key, true);
						}
					}
				}
			}
		}
		this.cubes = next_cubes;
	}

	count() {
		return this.cubes.size;
	}
}

/**
 * @param {string} data
 */
export const count_cubes = (data, count = 6, part = 1) => {
	const cube = part === 1 ? new EnergyCube3(data) : new EnergyCube4(data);
	while (count-- > 0) {
		cube.mutate();
	}
	return cube.count();
};
