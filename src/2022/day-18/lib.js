/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
const get_neighbors = (x, y, z) => {
	return [
		[x, y, z + 1],
		[x, y, z - 1],
		[x, y + 1, z],
		[x, y - 1, z],
		[x + 1, y, z],
		[x - 1, y, z],
	];
};

/**
 * @readonly
 * @enum {number}
 */
const CubeStates = {
	NULL: 0,
	CUBE: 1,
	CUBE_VISITED: 2,
	OUTSIDE: 3,
	NULL_VISITED: 4,
}

/**
 * @param {string} data
 * @returns {[number, number]}
 */
export const get_surface_area = (data) => {
	const res = [];

	let max = [0, 0, 0];

	const cubes = data.split("\n").map(line => {
		const arr = line.split(",").map(Number);
		for (let i = 0; i < 3; i++) {
			max[i] = Math.max(max[i], arr[i]);
		}
		return arr;
	});

	/** @type {CubeStates[][][]} */
	const grid_3d = Array.from({ length: max[0] + 1 }, () =>
		Array.from({ length: max[1] + 1 }, () => Array(max[2] + 1).fill(CubeStates.NULL))
	);
	cubes.forEach(([x, y, z]) => grid_3d[x][y][z] = CubeStates.CUBE);

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	const in_grid_3d = (x, y ,z) => true
		&& x >= 0
		&& y >= 0
		&& z >= 0
		&& x <= max[0]
		&& y <= max[1]
		&& z <= max[2];

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} original_state
	 * @param {number} visited_state
	 */
	const bfs_surface = (x, y, z, original_state, visited_state) => {
		let surface = 0;
		let queue = [[x, y, z]];
		while (queue.length > 0) {
			/** @type {typeof queue} */
			const next_queue = [];
			for (const cube of queue) {
				[x, y, z] = cube;

				// 1st guard
				if (grid_3d[x][y][z] !== original_state)
					continue;
				grid_3d[x][y][z] = visited_state;

				const neighbors = get_neighbors(x, y, z).filter(([a, b, c]) => in_grid_3d(a, b, c));
				const cube_neighbors = neighbors.filter(([a, b, c]) => [original_state, visited_state].includes(grid_3d[a][b][c]));
				surface += 6 - cube_neighbors.length;

				for (const next_cube of cube_neighbors) {
					const [a, b, c] = next_cube;
					// 2nd guard
					if (grid_3d[a][b][c] === original_state) {
						next_queue.push(next_cube);
					}
				}
			}
			queue = next_queue;
		}
		return surface;
	};

	let total = 0;
	for (let i = 0; i <= max[0]; i++) {
		for (let j = 0; j <= max[1]; j++) {
			for (let k = 0; k <= max[2]; k++) {
				if (grid_3d[i][j][k] === CubeStates.CUBE) {
					total += bfs_surface(i, j, k, CubeStates.CUBE, CubeStates.CUBE_VISITED);
				}
			}
		}
	}
	// part 1
	res.push(total);

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} original_state
	 * @param {number} visited_state
	 */
	const bfs_outside = (x, y, z) => {
		let queue = [[x, y, z]];
		while (queue.length > 0) {
			/** @type {typeof queue} */
			const next_queue = [];

			for (const cube of queue) {
				const [x, y, z] = cube;

				if (grid_3d[x][y][z] !== CubeStates.NULL)
					continue;

				grid_3d[x][y][z] = CubeStates.OUTSIDE;
				get_neighbors(x, y, z).forEach(cube => {
					const [a, b, c] = cube;
					if (in_grid_3d(a, b, c)) {
						next_queue.push(cube);
					}
				});
			}

			queue = next_queue;
		}
	};

	// bfs from 6 plane
	for (let x = 0; x <= max[0]; x++) {
		for (let y = 0; y <= max[1]; y++) {
			bfs_outside(x, y, 0);
			bfs_outside(x, y, max[2]);
		}
		for (let z = 0; z <= max[2]; z++) {
			bfs_outside(x, 0, z);
			bfs_outside(x, max[1], z);
		}
	}
	for (let y = 0; y <= max[1]; y++) {
		for (let z = 0; z <= max[2]; z++) {
			bfs_outside(0, y, z);
			bfs_outside(max[0], y, z);
		}
	}

	let null_count = 0;
	let inner_surface = 0;
	for (let i = 0; i <= max[0]; i++) {
		for (let j = 0; j <= max[1]; j++) {
			for (let k = 0; k <= max[2]; k++) {
				if (grid_3d[i][j][k] === CubeStates.NULL) {
					null_count++;
					inner_surface += bfs_surface(i, j, k, CubeStates.NULL, CubeStates.NULL_VISITED);
				}
			}
		}
	}
	// part 2
	res.push(total - inner_surface);

	return res;
};
