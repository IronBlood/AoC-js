/**
 * @param {string[][]} grid
 * @returns {number}
 */
const get_groups = (grid) => {
	const dup = grid.map(row => row.slice());
	const M = dup.length, N = dup[0].length;
	let count = 0;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const bfs = (x, y) => {
		const dirs = [0, 1, 0, -1, 0];
		let queue = [[x, y]];
		while (queue.length > 0) {
			const next_queue = [];

			for (let i = 0; i < queue.length; i++) {
				const [x, y] = queue[i];
				if (x < 0 || y < 0 || x >= M || y >= N || dup[x][y] === ".")
					continue;
				dup[x][y] = ".";
				for (let j = 0; j < 4; j++) {
					next_queue.push([
						x + dirs[j],
						y + dirs[j + 1],
					]);
				}
			}

			queue = next_queue;
		}
	};

	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (dup[i][j] === "#") {
				count++;
				bfs(i, j);
			}
		}
	}

	return count;
};

/**
 * @param {[number, number][][]} points
 * @param {number} second
 * @returns {string[][] | null}
 */
const gen_grid = (points, second) => {
	const positions = points.map(([pos, v]) => [
		pos[0] + second * v[0],
		pos[1] + second * v[1],
	]);

	let min_x = Number.MAX_SAFE_INTEGER,
		min_y = Number.MAX_SAFE_INTEGER,
		max_x = Number.MIN_SAFE_INTEGER,
		max_y = Number.MIN_SAFE_INTEGER;

	positions.forEach(([x, y]) => {
		min_x = Math.min(min_x, x);
		max_x = Math.max(max_x, x);

		min_y = Math.min(min_y, y);
		max_y = Math.max(max_y, y);
	});

	const row = max_x - min_x + 1,
		col = max_y - min_y + 1;

	if (Math.min(row, col) >= 30)
		return null;

	/** @type {string[][]} */
	const grid = Array.from({ length: col }, () => Array(row).fill("."));

	positions.forEach(([x, y]) => {
		grid[y - min_y][x - min_x] = "#";
	});

	return grid;
};

/**
 * @param {string} data
 * @returns {{ second: number; message: string }}
 */
export const get_msg = (data) => {
	const reg = /<([^>]+)>/g;

	const points = data.split("\n").map(line => {
		const matches = line.match(reg);
		return [...matches].map(/** @param {string} x */ x => {
			return x.substring(1, x.length - 1).split(",").map(Number);
		});
	});

	const threshold = points.length / 5;

	let i = 0, /** @type {string[][]} */ grid;
	let min = Number.MAX_SAFE_INTEGER;
	while (true) {
		grid = gen_grid(points, i);

		if (grid === null) {
			i++;
			continue;
		}

		const groups = get_groups(grid);
		min = Math.min(min, groups);
		if (groups < threshold) {
			break;
		}
		i++;
	}

	return {
		second: i,
		message: grid.map(row => row.join("")).join("\n"),
	};
}

