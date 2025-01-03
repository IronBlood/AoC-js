/**
 * @param {any[][]} grid
 * @param {number} x
 * @param {number} y
 */
const is_in_grid = (grid, x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

const DIRECTIONS = [0, 1, 0, -1, 0];

/**
 * @param {string[][]} grid
 * @param {[number, number]} pos
 * @returns {Map<string, [number, number]>}
 */
const bfs_min_distance = (grid, pos) => {
	const visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(0));
	/** @type {Map<string, number>} */
	const adj = new Map();
	let queue = [pos], move = 0;
	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];
		queue.forEach(([x, y]) => {
			if (!is_in_grid(grid, x, y) || grid[x][y] === "#" || visited[x][y]) {
				return;
			}
			visited[x][y] = 1;
			if (grid[x][y] !== "." && !(x === pos[0] && y === pos[1])) {
				adj.set(grid[x][y], move);
			}
			for (let i = 0; i < 4; i++) {
				next_queue.push([x + DIRECTIONS[i], y + DIRECTIONS[i + 1]]);
			}
		});
		queue = next_queue;
		move++;
	}
	return adj;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const fewest_steps = (data, part = 1) => {
	const grid = data.split("\n").map(line => line.split(""));
	/** @type {Map<string, [number, number]>} */
	const number_positions = new Map();
	let nodes_to_visit = 0;
	grid.forEach((row, r) => {
		row.forEach((cell, c) => {
			if (cell !== "#" && cell !== ".") {
				number_positions.set(cell, [r,c]);
				nodes_to_visit++;
			}
		});
	});

	/** @type {Map<string, Map<string, number>>} */
	const adjs = new Map();
	for (let [key, pos] of number_positions) {
		adjs.set(key, bfs_min_distance(grid, pos));
	}

	let min = Number.MAX_SAFE_INTEGER;
	/**
	 * @param {string} curr_node
	 * @param {Set<string>} visited
	 * @param {number} curr_steps
	 */
	const dfs = (curr_node, visited, curr_steps) => {
		visited.add(curr_node);
		if (visited.size === nodes_to_visit) {
			min = part === 1
				? Math.min(min, curr_steps)
				: Math.min(min, curr_steps + adjs.get(curr_node).get("0"));
			return;
		}

		const adj = adjs.get(curr_node);
		for (let [next_node, dist] of adj) {
			if (!visited.has(next_node)) {
				dfs(next_node, new Set(visited), curr_steps + dist);
			}
		}
		visited.delete(curr_node);
	};

	dfs("0", new Set(), 0);
	return min;
};

