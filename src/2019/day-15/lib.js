import {
	IntcodeVM,
	STEP_EVENT,
} from "../common/IntcodeVM.js";

/**
 * @param {[number, number]} pos
 * @param {1|2|3|4} dir
 */
const update_pos = (pos, dir) => {
	let [x, y] = pos;
	switch (dir) {
		case 1: x--; break; // north
		case 2: x++; break; // south
		case 3: y--; break; // west
		case 4: y++; break; // east
	}

	return [x, y];
};

/**
 * @param {string} data
 */
export const find_oxygen = (data) => {
	const program = data.split(",").map(Number);
	let vm = new IntcodeVM(program);

	let pos = [0, 0];
	const DIRECTIONS = [1, 2, 3, 4];

	/** @type {Set<string>} format "x,y,d" */
	const visited = new Set();

	/** @type {Set<string>} format "x,y" */
	const walls = new Set();

	/** @type {{ vm: IntcodeVM; pos: [number, number]; dir: number}[]} */
	let queue = DIRECTIONS.map(dir => ({
		vm: vm.clone(),
		pos: pos.slice(),
		dir
	}));

	let step = 0;
	let found = false;
	let oxygen_location;
	let oxygen_step;

	// This BFS intended to find all walls as well for part 2
	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const { vm, pos, dir } of queue) {
			const key = `${pos[0]},${pos[1]},${dir}`;
			if (visited.has(key))
				continue;
			visited.add(key);

			vm.push_input(dir);
			const res = vm.run_until_event();

			// halted
			if (res.type === STEP_EVENT.HALTED) {
				continue;
			}

			// invalid
			if (res.type === STEP_EVENT.INPUT_NEEDED) {
				console.log(`invalid status`);
				continue;
			}

			// now let's handle the output
			if (res.type === STEP_EVENT.OUTPUT) {
				const new_pos = update_pos(pos, dir);
				if (res.value === 2) {
					found = true;
					oxygen_location = new_pos.slice();
					continue;
				}

				if (res.value === 0) {
					walls.add(new_pos.join(","));
				}

				// actually moved
				if (res.value === 1) {
					for (const new_dir of DIRECTIONS) {
						const future_pos = update_pos(new_pos, new_dir);
						if (walls.has(future_pos.join(","))) {
							// we already checked it's a wall, so skip
							// this is based on the assumption, that each move doesn't create a different map
							continue;
						}

						next_queue.push({
							vm: vm.clone(),
							pos: new_pos.slice(),
							dir: new_dir,
						});
					}
				}
			}
		}

		step++;
		if (found && !oxygen_step) {
			oxygen_step = step;
		}

		queue = next_queue;
	}

	return {
		walls,
		oxygen_location,
		oxygen_step,
	};
};

/**
 * @param {Set<string>} walls The location of all walls, format "x,y"
 * @param {[number, number]} oxygen_location
 */
export const count_minutes = (walls, oxygen_location) => {
	/** @type {[number, number][]} */
	const wall_arr = [];
	let min_x = Number.MAX_SAFE_INTEGER,
		min_y = Number.MAX_SAFE_INTEGER,
		max_x = Number.MIN_SAFE_INTEGER,
		max_y = Number.MIN_SAFE_INTEGER;

	for (const str of walls) {
		const [x, y] = str.split(",").map(Number);

		min_x = Math.min(min_x, x);
		max_x = Math.max(max_x, x);
		min_y = Math.min(min_y, y);
		max_y = Math.max(max_y, y);

		wall_arr.push([x, y]);
	}

	const X = max_x - min_x + 1,
		Y = max_y - min_y + 1;

	/** @type {string[][]} */
	const grid = Array.from({ length: X }, () => Array(Y).fill(" "));
	wall_arr.forEach(([x, y]) => grid[x - min_x][y - min_y] = "#");

	/** @type {[number, number][]} */
	let queue = [[
		oxygen_location[0] - min_x,
		oxygen_location[1] - min_y
	]];

	let minute = -1; // pre-initial
	/** @type {Set<string>} */
	const visited = new Set();
	const directions = [0, -1, 0, 1, 0];
	const in_grid = (x, y) => x >= 0 && x < X && y >= 0 && y < Y;

	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const [x, y] of queue) {
			if (!in_grid(x, y) || grid[x][y] === "#") {
				continue;
			}

			const key = `${x},${y}`;
			if (visited.has(key))
				continue;
			visited.add(key);

			for (let i = 0; i < 4; i++) {
				next_queue.push([x + directions[i], y + directions[i + 1]]);
			}
		}

		if (next_queue.length > 0) {
			minute++;
		}

		queue = next_queue;
	}

	return minute;
};
