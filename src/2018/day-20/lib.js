/**
 * @param {string[][]} grid
 * @returns {[number, number]}
 */
const find_start = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === "X") {
				grid[i][j] = ".";
				return [i, j];
			}
		}
	}
};

/**
 * @param {string|string[][]} grid
 * @returns {number}
 */
export const do_fewest_doors = (grid) => {
	if (typeof grid === "string") {
		grid = grid.split("\n").map(line => line.split(""));
	}

	let [x, y] = find_start(grid);
	//console.log(x, y);
	let furthest = Number.MIN_SAFE_INTEGER,
		fewest = Number.MAX_SAFE_INTEGER;

	const directions = [0, 1, 0, -1, 0];

	let queue = [{ pos: [x, y], step: 0, doors: 0}];
	const visited = grid.map(row => row.map(() => 0));
	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];
		for (let { pos: [x, y], step, doors } of queue) {
			if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || visited[x][y] === 1) {
				continue;
			}
			visited[x][y] = 1;
			if (step > furthest) {
				fewest = doors;
			} else if (step === furthest) {
				fewest = Math.min(fewest, doors);
			}

			for (let i = 0; i < 4; i++) {
				let nx = x + directions[i],
					ny = y + directions[i + 1];
				if (grid[nx][ny] === "#")
					continue;
				next_queue.push({
					pos: [
						x + 2 * directions[i],
						y + 2 * directions[i + 1],
					],
					step: step + 1,
					doors: doors + 1,
				});
			}
		}
		queue = next_queue;
	}
	return fewest;
};

/**
 * @param {string[][]} grid
 * @returns {number}
 */
const do_rooms = (grid) => {
	let [x, y] = find_start(grid);
	let count = 0;

	const directions = [0, 1, 0, -1, 0];

	let queue = [{ pos: [x, y], step: 0, doors: 0}];
	const visited = grid.map(row => row.map(() => 0));
	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];
		for (let { pos: [x, y], step, doors } of queue) {
			if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || visited[x][y] === 1) {
				continue;
			}
			visited[x][y] = 1;
			if (doors >= 1000) {
				count++;
			}

			for (let i = 0; i < 4; i++) {
				let nx = x + directions[i],
					ny = y + directions[i + 1];
				if (grid[nx][ny] === "#")
					continue;
				next_queue.push({
					pos: [
						x + 2 * directions[i],
						y + 2 * directions[i + 1],
					],
					step: step + 1,
					doors: doors + 1,
				});
			}
		}
		queue = next_queue;
	}
	return count;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const get_count = (data, part = 1) => {
	let x = 0, y = 0;
	/** @type {[number, number][]} */
	const stack = [];

	let w = Number.MAX_SAFE_INTEGER,
		n = Number.MAX_SAFE_INTEGER,
		e = Number.MIN_SAFE_INTEGER,
		s = Number.MIN_SAFE_INTEGER;

	for (let i = 0; i < data.length; i++) {
		const c = data[i];
		if (c === "^" || c === "$")
			continue;
		if (c === "(") {
			stack.push([x, y])
		} else if (c === "|") {
			[x, y] = stack[stack.length - 1];
		} else if (c === ")") {
			stack.pop();
		} else {
			switch (c) {
				case "E": y++; break;
				case "W": y--; break;
				case "N": x--; break;
				case "S": x++; break;
				default:
					console.error("???", c, i);
					process.exit(-1);
			}

			w = Math.min(w, y);
			e = Math.max(e, y);
			n = Math.min(n, x);
			s = Math.max(s, x);
		}
	}

	const row = 2 * (s - n + 1) + 1, col = 2 * (e - w + 1) + 1;
	/** @type {string[][]} */
	const grid = Array.from({ length: row }, () => Array(col).fill("?"));

	x = -n * 2 + 1, y = -w * 2 + 1;
	grid[x][y] = "X";

	for (let i = 0; i < data.length; i++) {
		const c = data[i];
		if (c === "^" || c === "$")
			continue;
		if (c === "(") {
			stack.push([x, y])
		} else if (c === "|") {
			[x, y] = stack[stack.length - 1];
		} else if (c === ")") {
			stack.pop();
		} else {
			switch (c) {
				case "E":
					grid[x][++y] = "|";
					grid[x][++y] = ".";
					break;
				case "W":
					grid[x][--y] = "|";
					grid[x][--y] = ".";
					break;
				case "N":
					grid[--x][y] = "-";
					grid[--x][y] = ".";
					break;
				case "S":
					grid[++x][y] = "-";
					grid[++x][y] = ".";
					break;
				default:
					console.error("???", c, i);
					process.exit(-1);
			}
		}
	}

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === "?") {
				grid[i][j] = "#";
			}
		}
	}

	//console.log(grid.map(row => row.join("")).join("\n"));
	return part === 1
		? do_fewest_doors(grid)
		: do_rooms(grid);
};

