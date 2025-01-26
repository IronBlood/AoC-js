/**
 * @param {string} data
 * @returns {string}
 */
export const first_crash = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	const M = grid.length, N = grid[0].length;

	const DIRS = [
		[-1, 0], // N
		[0, 1],  // E
		[1, 0],  // S
		[0, -1], // W
	];

	/** @type {{
	 * pos: [number, number];
	 * dir: number;
	 * turns: number;
	 * }[]} */
	const carts = [];
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			const pos = [i, j];
			switch (grid[i][j]) {
				case "^": carts.push({ pos, dir: 0, turns: 0, }); grid[i][j] = "|"; break;
				case ">": carts.push({ pos, dir: 1, turns: 0, }); grid[i][j] = "-"; break;
				case "v": carts.push({ pos, dir: 2, turns: 0, }); grid[i][j] = "|"; break;
				case "<": carts.push({ pos, dir: 3, turns: 0, }); grid[i][j] = "-"; break;
			}
		}
	}

	const loc_set = new Set();
	carts.forEach(c => loc_set.add(c.pos.join(",")));

	while (true) {
		for (let c of carts) {
			const old_pos = c.pos.join(",");
			const [x, y] = c.pos;
			const nx = x + DIRS[c.dir][0],
				ny = y + DIRS[c.dir][1];
			const npos = [nx, ny], new_pos = npos.join(",");

			if (loc_set.has(new_pos)) {
				return [ny, nx].join(",");
			}
			loc_set.delete(old_pos);
			loc_set.add(new_pos);

			// update dir
			if (grid[nx][ny] === "+") {
				let step = 0;
				switch (c.turns) {
					case 0: step = 3; break;
					case 2: step = 1; break;
				}
				c.dir = (c.dir + step) % 4;
				c.turns = (c.turns + 1) % 3;
			} else if (grid[nx][ny] === "/") {
				switch (c.dir) {
					case 0: c.dir = 1; break;
					case 1: c.dir = 0; break;
					case 2: c.dir = 3; break;
					case 3: c.dir = 2; break;
				}
			} else if (grid[nx][ny] === "\\") {
				switch (c.dir) {
					case 0: c.dir = 3; break;
					case 1: c.dir = 2; break;
					case 2: c.dir = 1; break;
					case 3: c.dir = 0; break;
				}
			}

			c.pos = npos;
		}

		carts.sort((a, b) => a.pos[0] === b.pos[0]
			? (a.pos[1] - b.pos[1])
			: (a.pos[0] - b.pos[0])
		);
	}
};

/**
 * @param {string} data
 * @returns {string}
 */
export const last_position = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	const M = grid.length, N = grid[0].length;

	const DIRS = [
		[-1, 0], // N
		[0, 1],  // E
		[1, 0],  // S
		[0, -1], // W
	];

	/** @type {{
	 * pos: [number, number];
	 * dir: number;
	 * turns: number;
	 * enabled: boolean;
	 * }[]} */
	let carts = [];
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			const pos = [i, j];
			switch (grid[i][j]) {
				case "^": carts.push({ pos, dir: 0, turns: 0, enabled: true, }); grid[i][j] = "|"; break;
				case ">": carts.push({ pos, dir: 1, turns: 0, enabled: true, }); grid[i][j] = "-"; break;
				case "v": carts.push({ pos, dir: 2, turns: 0, enabled: true, }); grid[i][j] = "|"; break;
				case "<": carts.push({ pos, dir: 3, turns: 0, enabled: true, }); grid[i][j] = "-"; break;
			}
		}
	}

	while (carts.length > 1) {
		for (let i = 0; i < carts.length; i++) {
			const c = carts[i];
			if (!c.enabled) {
				continue;
			}

			const old_pos = c.pos.join(",");
			const [x, y] = c.pos;
			const nx = x + DIRS[c.dir][0],
				ny = y + DIRS[c.dir][1];

			// handle crash
			let idx = carts.findIndex(crash => crash.pos[0] === nx && crash.pos[1] === ny);
			if (idx >= 0) {
				c.enabled = false;
				carts[idx].enabled = false;
				continue;
			}

			// update dir
			if (grid[nx][ny] === "+") {
				let step = 0;
				switch (c.turns) {
					case 0: step = 3; break;
					case 2: step = 1; break;
				}
				c.dir = (c.dir + step) % 4;
				c.turns = (c.turns + 1) % 3;
			} else if (grid[nx][ny] === "/") {
				switch (c.dir) {
					case 0: c.dir = 1; break;
					case 1: c.dir = 0; break;
					case 2: c.dir = 3; break;
					case 3: c.dir = 2; break;
				}
			} else if (grid[nx][ny] === "\\") {
				switch (c.dir) {
					case 0: c.dir = 3; break;
					case 1: c.dir = 2; break;
					case 2: c.dir = 1; break;
					case 3: c.dir = 0; break;
				}
			}

			c.pos = [nx, ny];
		}

		carts = carts.filter(c => c.enabled);
		carts.sort((a, b) => a.pos[0] === b.pos[0] ? (a.pos[1] - b.pos[1]) : (a.pos[0] - b.pos[0]));
	}

	const [x,y] = carts[0].pos;
	return `${y},${x}`;
};

