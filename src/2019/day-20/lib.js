/**
 * @param {string[][]} g
 */
export const helper_grid_to_str = (g) => g.map(row => row.join("")).join("\n");

/**
 * @param {string} s
 */
export const helper_str_to_grid = (s) => s.split("\n").map(line => line.split(""));

/**
 * @param {string[][]} raw_grid
 */
const get_boundaries = (raw_grid) => {
	let outer_top_boundary = 0,
		outer_bottom_boundary = raw_grid.length - 1;
	while (!raw_grid[outer_top_boundary].includes("#")) {
		outer_top_boundary++;
	}
	while (!raw_grid[outer_bottom_boundary].includes("#")) {
		outer_bottom_boundary--;
	}

	let outer_left_boundary = 0,
		outer_right_boundary = raw_grid[outer_top_boundary].length - 1;
	while (!["#", "."].includes(raw_grid[outer_top_boundary][outer_left_boundary])) {
		outer_left_boundary++;
	}
	while (!["#", "."].includes(raw_grid[outer_top_boundary][outer_right_boundary])) {
		outer_right_boundary--;
	}

	let inner_top_boundary = outer_top_boundary,
		inner_bottom_boundary = outer_bottom_boundary;
	while (raw_grid[inner_top_boundary].indexOf(" ", outer_left_boundary) > outer_right_boundary) {
		inner_top_boundary++;
	}
	while (raw_grid[inner_bottom_boundary].indexOf(" ", outer_left_boundary) > outer_right_boundary) {
		inner_bottom_boundary--;
	}

	let inner_left_boundary = outer_left_boundary,
		inner_right_boundary = outer_right_boundary;

	while (["#", "."].includes(raw_grid[inner_top_boundary][inner_left_boundary])) {
		inner_left_boundary++;
	}
	while (["#", "."].includes(raw_grid[inner_top_boundary][inner_right_boundary])) {
		inner_right_boundary--;
	}

	// TODO update explanation
	inner_top_boundary--;
	inner_bottom_boundary++;
	inner_left_boundary--;
	inner_right_boundary++;

	return {
		outer_top_boundary,
		outer_bottom_boundary,
		outer_left_boundary,
		outer_right_boundary,
		inner_top_boundary,
		inner_bottom_boundary,
		inner_left_boundary,
		inner_right_boundary,
	};
};

/**
 * Get warp points from a row, and will replace the character to space in raw_grid
 * @param {string[][]} raw_grid
 * @param {number}     row the row to check
 * @param {number}     lb the left boundary, included
 * @param {number}     rb the right boundary, included
 * @param {boolean}    up should we go up for the name?
 * @param {[number, number]} p0 the top left position
 * @returns the transformed position and name pair
 */
const get_h_warp_points = (raw_grid, row, lb, rb, up, p0) => {
	const [x0, y0] = p0;

	/** @type {[string, [number, number]][]} */
	const res = [];

	for (let i = lb; i <= rb; i++) {
		if (raw_grid[row][i] === "#")
			continue;

		let name = "";
		if (up) {
			name += raw_grid[row-2][i];
			name += raw_grid[row-1][i];
			raw_grid[row-2][i] = " ";
			raw_grid[row-1][i] = " ";
		} else {
			name += raw_grid[row+1][i];
			name += raw_grid[row+2][i];
			raw_grid[row+2][i] = " ";
			raw_grid[row+1][i] = " ";
		}

		res.push([name, [row - x0, i - y0]]);
	}

	return res;
};

/**
 * Get warp points from a row, and will replace the character to space in raw_grid
 * @param {string[][]} raw_grid
 * @param {number}     col the col to check
 * @param {number}     tb the top boundary, excluded
 * @param {number}     bb the bottom boundary, excluded
 * @param {boolean}    left should we go left for the name?
 * @param {[number, number]} p0 the top left position
 * @returns the transformed position and name pair
 */
const get_v_wrap_points = (raw_grid, col, tb, bb, left, p0) => {
	const [x0, y0] = p0;

	/** @type {[string, [number, number]][]} */
	const res = [];

	for (let i = tb + 1; i < bb; i++) {
		if (raw_grid[i][col] === "#")
			continue;

		let name = "";
		if (left) {
			name += raw_grid[i][col-2];
			name += raw_grid[i][col-1];
			raw_grid[i][col-2] = " ";
			raw_grid[i][col-1] = " ";
		} else {
			name += raw_grid[i][col+1];
			name += raw_grid[i][col+2];
			raw_grid[i][col+1] = " ";
			raw_grid[i][col+2] = " ";
		}

		res.push([name, [i - x0, col - y0]]);
	}

	return res;
};

/**
 * @param {string} data
 * @returns {import("./types").Grid}
 */
export const parse_grid = (data) => {
	const raw_grid = helper_str_to_grid(data);

	const {
		outer_top_boundary,
		outer_bottom_boundary,
		outer_left_boundary,
		outer_right_boundary,
		inner_top_boundary,
		inner_bottom_boundary,
		inner_left_boundary,
		inner_right_boundary,
	} = get_boundaries(raw_grid);

	const p0 = [outer_top_boundary, outer_left_boundary];

	/** @type {Map<string, [number, number][]>} */
	const map = new Map();
	const warps = [
		get_h_warp_points(raw_grid, outer_top_boundary, outer_left_boundary, outer_right_boundary, true, p0),
		get_h_warp_points(raw_grid, inner_top_boundary, inner_left_boundary, inner_right_boundary, false, p0),
		get_h_warp_points(raw_grid, inner_bottom_boundary, inner_left_boundary, inner_right_boundary, true, p0),
		get_h_warp_points(raw_grid, outer_bottom_boundary, outer_left_boundary, outer_right_boundary, false, p0),
		get_v_wrap_points(raw_grid, outer_left_boundary, outer_top_boundary, outer_bottom_boundary, true, p0),
		get_v_wrap_points(raw_grid, inner_left_boundary, inner_top_boundary, inner_bottom_boundary, false, p0),
		get_v_wrap_points(raw_grid, inner_right_boundary, inner_top_boundary, inner_bottom_boundary, true, p0),
		get_v_wrap_points(raw_grid, outer_right_boundary, outer_top_boundary, outer_bottom_boundary, false, p0),
	].flat();
	warps.forEach(([name, pos]) => {
		if (map.has(name)) {
			map.get(name).push(pos);
		} else {
			map.set(name, [pos]);
		}
	});

	/** @type {import("./types").WarpPoint[]} */
	const WPs = [];
	for (const [name, locations] of map) {
		WPs.push({ name, locations });
	}

	const G = raw_grid.slice(outer_top_boundary, outer_bottom_boundary + 1).map(row => row.slice(outer_left_boundary, outer_right_boundary + 1));

	return {
		G,
		WPs,
		boundaries: {
			it: inner_top_boundary - outer_top_boundary,
			il: inner_left_boundary - outer_left_boundary,
			ir: inner_right_boundary - outer_left_boundary,
			ib: inner_bottom_boundary - outer_top_boundary,
		},
	};
};

class PortalManager {
	/**
	 * @param {import("./types").WarpPoint[]} WPs
	 */
	constructor(WPs) {
		WPs = WPs.filter(x => !["AA", "ZZ"].includes(x.name));
		/** @private @type {Map<string, import("./types").Location>} */
		this._map = new Map();

		WPs.forEach(x => {
			const [a, b] = x.locations;
			this._map.set(this.serialize(a), b);
			this._map.set(this.serialize(b), a);
		});
	}

	/**
	 * @public
	 * @param {import("./types").Location} x
	 */
	jumpable(x) {
		return this._map.has(this.serialize(x));
	}

	/**
	 * @public
	 * @param {import("./types").Location} x
	 */
	warp(x) {
		return this._map.get(this.serialize(x));
	}

	/**
	 * @private
	 * @param {import("./types").Location} x
	 */
	serialize(x) {
		return x.join(",");
	}
}

/**
 * @param {string} data
 */
export const min_steps = (data) => {
	const { G, WPs } = parse_grid(data);

	const [start_loc, end_loc] = [
		"AA",
		"ZZ",
	].map(name => WPs.find(x => x.name === name).locations[0]);

	const portals = new PortalManager(WPs);

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const is_ingrid = (x, y) => {
		const H = G.length, W = G[0].length;

		if (x < 0 || y < 0 || x >= H || y >= W)
			return false;

		return G[x][y] !== " ";
	};

	let steps = -1;
	let queue = [start_loc];

	const visited = G.map(row => row.map(_ => 0));

	const DIRS = [0, 1, 0, -1, 0];

	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const loc of queue) {
			const [x, y] = loc;
			if (x === end_loc[0] && y === end_loc[1]) {
				return steps + 1;
			}

			if (!is_ingrid(x, y) || G[x][y] === "#" || visited[x][y]) {
				continue;
			}
			visited[x][y] = 1;

			for (let i = 0; i < 4; i++) {
				next_queue.push([
					x + DIRS[i],
					y + DIRS[i + 1],
				]);
			}

			if (portals.jumpable([x, y])) {
				next_queue.push(portals.warp([x, y]));
			}
		}

		steps++;

		queue = next_queue;
	}
};

class StatedGrid {
	/**
	 * @param {string[][]} grid
	 * @param {import("./types").Location} start_loc
	 * @param {import("./types").Location} end_loc
	 * @param {boolean} is_root
	 */
	constructor(grid, start_loc, end_loc, is_root = false) {
		/** @type {string[][]} */
		this.grid = grid.map(row => row.slice());
		this.start_loc = start_loc;
		this.end_loc = end_loc;

		if (!is_root) {
			for (const [x, y] of [start_loc, end_loc]) {
				// Mark the start and end locations as walls
				this.grid[x][y] = "#";
			}
		} else {
			const H = this.grid.length, W = this.grid[0].length;
			// close top and bottom
			for (let i = 0; i < W; i++) {
				this.grid[0][i] = "#";
				this.grid[H - 1][i] = "#";
			}
			// close left and right
			for (let i = 0; i < H; i++) {
				this.grid[i][0] = "#";
				this.grid[i][W - 1] = "#";
			}

			for (const [x, y] of [start_loc, end_loc]) {
				// Mark the start and end locations as empty spaces
				this.grid[x][y] = ".";
			}
		}

		/** @type {number[][]} */
		this.visited = this.grid.map(row => row.map(_ => 0));
	}
}

/**
 * @param {string} data
 */
export const min_steps_part2 = (data) => {
	const { G, WPs, boundaries } = parse_grid(data);

	const [start_loc, end_loc] = [
		"AA",
		"ZZ",
	].map(name => WPs.find(x => x.name === name).locations[0]);

	const portals = new PortalManager(WPs);

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const is_ingrid = (x, y) => {
		const H = G.length, W = G[0].length;

		if (x < 0 || y < 0 || x >= H || y >= W)
			return false;

		return G[x][y] !== " ";
	}

	/**
	 * If the location is at the inner boundary, it will go deeper, otherwise it will go back
	 * @param {number} x
	 * @param {number} y
	 * @returns
	 */
	const warp_direction = (x, y) => (
		x === boundaries.it ||
		x === boundaries.ib ||
		y === boundaries.il ||
		y === boundaries.ir) ? 1 : -1;

	const DIRS = [0, 1, 0, -1, 0];

	const stated_grids = [
		new StatedGrid(G, start_loc, end_loc, true),
	];

	/** @type {import("./types").StatedPosition} */
	let queue = [{
		location: start_loc,
		depth: 0,
		steps: -1,
	}];

	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const { location, depth, steps } of queue) {
			if (depth < 0) {
				continue; // Skip negative depth
			}

			if (depth > stated_grids.length) {
				console.log("invalid depth");
				continue; // Skip if depth exceeds the number of stated grids
			} else if (depth === stated_grids.length) {
				// Create a new StatedGrid for the next depth
				stated_grids.push(new StatedGrid(G, start_loc, end_loc));
			}

			const { grid, visited } = stated_grids[depth];
			const [x, y] = location;

			if (depth === 0 && x === end_loc[0] && y === end_loc[1]) {
				return steps + 1; // reached ZZ
			}

			if (!is_ingrid(x, y) || grid[x][y] === "#" || visited[x][y]) {
				continue; // Skip if out of bounds, wall, or already visited
			}
			visited[x][y] = 1; // Mark as visited
			for (let i = 0; i < 4; i++) {
				next_queue.push({
					location: [
						x + DIRS[i],
						y + DIRS[i + 1],
					],
					depth,
					steps: steps + 1,
				});
			}

			if (portals.jumpable([x, y])) {
				const warp_loc = portals.warp([x, y]);
				const warp_dir = warp_direction(x, y);
				next_queue.push({
					location: warp_loc,
					depth: depth + warp_dir,
					steps: steps + 1,
				});
			}
		}

		queue = next_queue;
	}
};
