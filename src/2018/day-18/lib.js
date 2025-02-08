/**
 * @param {string} data
 */
const init_grid = (data) => {
	const lines = data.split("\n");
	/** @type {string[][]} */
	const grid = Array.from({ length: 2 + lines.length }, () => Array(2 + lines[0].length).fill("."));

	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[0].length; j++) {
			grid[i+1][j+1] = lines[i][j];
		}
	}

	return grid;
};

/**
 * @param {string[][]} grid
 */
const transform = (grid) => {
	const M = grid.length, N = grid[0].length;
	/** @type {string[][]} */
	const next = Array.from({ length: M }, () => Array(N).fill("."));

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const check_open = (x,y) => {
		let count_trees = 0;
		for (let u = x - 1; u <= x + 1; u++) {
			for (let v = y - 1; v <= y + 1; v++) {
				if (u === x && v === y)
					continue;
				if (grid[u][v] === "|")
					count_trees++;
			}
		}
		return count_trees >= 3;
	};

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const check_tree = (x,y) => {
		let count_lumberyards = 0;
		for (let u = x - 1; u <= x + 1; u++) {
			for (let v = y - 1; v <= y + 1; v++) {
				if (u === x && v === y)
					continue;
				if (grid[u][v] === "#")
					count_lumberyards++;
			}
		}
		return count_lumberyards >= 3;
	};

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const check_lumberyard = (x,y) => {
		let count_trees = 0;
		let count_lumberyards = 0;
		for (let u = x - 1; u <= x + 1; u++) {
			for (let v = y - 1; v <= y + 1; v++) {
				if (u === x && v === y)
					continue;
				if (grid[u][v] === "|")
					count_trees++;
				if (grid[u][v] === "#")
					count_lumberyards++;
			}
		}
		return count_trees > 0 && count_lumberyards > 0;
	};

	for (let i = 1; i < M - 1; i++) {
		for (let j = 1; j < N - 1; j++) {
			if (grid[i][j] === ".") {
				if (check_open(i,j)) {
					next[i][j] = "|";
				}
			}

			if (grid[i][j] === "|") {
				next[i][j] = check_tree(i,j) ? "#" : "|";
			}

			if (grid[i][j] === "#") {
				next[i][j] = !check_lumberyard(i,j) ? "." : "#";
			}
		}
	}

	return next;
};

/**
 * @param {string} data
 */
export const get_total_resource = (data, iteration = 10) => {
	let grid = init_grid(data);
	let key = grid.map(row => row.join("")).join("\n");

	/** @type {Map<string, { grid: string[][], key: string}>} */
	const seen = new Map();

	while (iteration-- > 0) {
		if (seen.has(key)) {
			const next = seen.get(key);
			grid = next.grid;
			key = next.key;
		} else {
			grid = transform(grid);
			const next_key = grid.map(row => row.join("")).join("\n");
			seen.set(key, {
				grid,
				key: next_key,
			});
			key = next_key;
		}
	}

	let w = 0, l = 0;
	grid.forEach(row => row.forEach(cell => {
		if (cell === "|") w++;
		if (cell === "#") l++;
	}));
	return w * l;
};

