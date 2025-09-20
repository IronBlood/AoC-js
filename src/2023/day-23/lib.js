// @ts-check

/**
 * @typedef {import("./types").DirectionChars} DirectionChars
 * @typedef {import("./types").WarpPoint} WarpPoint
 * @typedef {DirectionChars} SLOPE_CHARS
 */

/** @type {Record<SLOPE_CHARS, [number, number]>} */
const SLOPE_DIRECTION = {
	"^": [-1, 0],
	">": [0, 1],
	"v": [1, 0],
	"<": [0, -1],
};

const ALL_DIRECTIONS = Object.values(SLOPE_DIRECTION);
/** @type {DirectionChars[]} */
const DIRECTION_CHARS = ["^", ">", "v", "<"];

/**
 * @type {(char: any) => char is SLOPE_CHARS}
 */
const is_slope_char = (char) => DIRECTION_CHARS.includes(char);

/**
 * @param {string} data
 * @returns {number}
 */
export const longest_hike = (data, part = 1) => {
	const grid = data.split("\n").map(line => line.split(""));

	const H = grid.length, W = grid[0].length;

	/** @type {(0|1)[][]} */
	const visited = Array.from({ length: H }, () => Array(W).fill(0));

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const can_visit = (x, y) => in_grid(x, y) && !visited[x][y] && grid[x][y] !== "#";

	const start_x = 0, start_y = 1;
	const end_x = H - 1, end_y = W - 2;

	let longest = 0;

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} step
	 */
	const dfs = (x, y, step) => {
		if (x === end_x && y === end_y) {
			longest = Math.max(longest, step);
			return;
		}

		visited[x][y] = 1;

		const c = grid[x][y];
		if (part === 1 && is_slope_char(c)) {
			const [dx, dy] = SLOPE_DIRECTION[c];
			const nx = x + dx;
			const ny = y + dy;

			if (can_visit(nx, ny)) {
				dfs(nx, ny, step + 1);
			}
		} else {
			for (const [dx, dy] of ALL_DIRECTIONS) {
				const nx = x + dx;
				const ny = y + dy;
				if (can_visit(nx, ny)) {
					dfs(nx, ny, step + 1);
				}
			}
		}

		visited[x][y] = 0;
	};

	dfs(start_x, start_y, 0);

	return longest;
};

/**
 * @param {DirectionChars} char
 * @returns {DirectionChars}
 */
const reverse_direction = (char) => {
	switch (char) {
		case "^": return "v";
		case ">": return "<";
		case "v": return "^";
		case "<": return ">";
	}
	throw new Error(`never ${char}`);
}

/**
 * @param {string[][]} grid
 * @returns {WarpPoint[]}
 */
export const find_warp_points = (grid, part = 1) => {
	/** @type {WarpPoint[]} */
	const points = [];

	const H = grid.length, W = grid[0].length;

	for (let i = 1; i < H - 1; i++) {
		for (let j = 1; j < W - 1; j++) {
			const c = grid[i][j];
			if (c === "#")
				continue;
			if (part === 1 && is_slope_char(c)) {
				points.push({
					x: i,
					y: j,
					oneway: true,
					directions: [c],
					dead_end: false,
				});
			} else {
				/** @type {DirectionChars[]} */
				const available_directions = [];
				for (const dc of DIRECTION_CHARS) {
					const [dx, dy] = SLOPE_DIRECTION[dc];
					const neighbor_char = grid[i + dx][j + dy];
					if (neighbor_char !== "#") {
						available_directions.push(dc);
					}
				}

				switch (available_directions.length) {
					case 1:
						points.push({
							x: i,
							y: j,
							oneway: false,
							directions: available_directions,
							dead_end: true,
						});
						break;
					case 3:
					case 4:
						points.push({
							x: i,
							y: j,
							oneway: false,
							directions: available_directions,
							dead_end: false,
						});
						break;
					case 2:
						if (reverse_direction(available_directions[0]) !== available_directions[1]) {
							points.push({
								x: i,
								y: j,
								oneway: false,
								directions: available_directions,
								dead_end: false,
							});
						}
				}
			}
		}
	}

	return points;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const longest_hike_fast = (data, part = 1) => {
	const grid = data.split("\n").map(line => line.split(""));
	const points = find_warp_points(grid, part);

	const H = grid.length, W = grid[0].length;

	/** @type {(0|1)[][]} */
	const visited = Array.from({ length: H }, () => Array(W).fill(0));
	/** @type {(false|WarpPoint)[][]} */
	const p_map = Array.from({ length: H }, () => Array(W).fill(false));
	points.forEach(p => {
		p_map[p.x][p.y] = p;
		if (p.dead_end) {
			console.log("dead_end", p);
		}
	});

	const start_x = 0, end_x = H - 1;
	const start_y = 1, end_y = W - 2;
	let longest = 0;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const can_visit = (x, y) => in_grid(x, y) && !visited[x][y] && grid[x][y] !== "#";

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} step
	 * @param {DirectionChars} dir
	 */
	const dfs = (x, y, step, dir) => {
		/** @type {[number, number][]} */
		const stack = [];
		while (true) {
			// nowhere to go and doesn't reach the end
			if (visited[x][y]) {
				break;
			}

			// reaching the end
			if (x === end_x && y === end_y) {
				longest = Math.max(longest, step);
				break;
			}

			// mark
			visited[x][y] = 1;
			stack.push([x, y]);
			step++;

			const [dx, dy] = SLOPE_DIRECTION[dir];
			const nx = x + dx;
			const ny = y + dy;

			const point = p_map[nx][ny];

			// easy case: fast forward
			if (point === false) {
				x = nx;
				y = ny;
				continue;
			}

			const reversed_dir = reverse_direction(dir);
			const available_directions = point.directions.filter(dc => dc !== reversed_dir);
			// reaching a slope
			if (available_directions.length === 0) {
				break;
			}
			// reaching a corner, so just need to change `dir`
			if (available_directions.length === 1) {
				x = nx;
				y = ny;
				dir = available_directions[0];
				continue;
			}

			// now we have a few branches to DFS
			for (const dir of available_directions) {
				dfs(nx, ny, step, dir);
			}
		}

		// clean up
		for (const [x, y] of stack) {
			visited[x][y] = 0;
		}
	};

	dfs(start_x, start_y, 0, "v");

	return longest;
};
