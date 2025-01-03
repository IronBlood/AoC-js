import { createHash } from "node:crypto";

const is_door_open = (c) => "bcdef".indexOf(c) >= 0;

/**
 * @param {string} str
 */
const get_state = (str) => {
	return createHash("md5").update(str).digest("hex").substring(0, 4);
};

const is_in_grid = (x, y) => x >= 0 && y >= 0 && x < 4 && y < 4;

/**
 * @param {string} code
 * @param {number?} part
 * @returns {string|number}
 */
export const find_path = (code, part = 1) => {
	let queue = [{ pos: [0, 0], path: "" }];
	const DIRS = [
		{ v: [-1, 0], c: "U" },
		{ v: [1, 0],  c: "D" },
		{ v: [0, -1], c: "L" },
		{ v: [0, 1],  c: "R" },
	];

	let longest_step = 0;
	let steps = 0;
	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];
		for (let { pos, path } of queue) {
			const [x, y] = pos;
			if (x === 3 && y === 3) {
				if (part === 1)
					return path;
				else {
					longest_step = steps;
					continue;
				}
			}

			if (!is_in_grid(x, y))
				continue;

			const state = get_state(code + path);
			for (let i = 0; i < 4; i++) {
				const { v, c } = DIRS[i];
				if (is_door_open(state[i])) {
					next_queue.push({
						pos: [x + v[0], y + v[1]],
						path: path + c,
					});
				}
			}
		}
		queue = next_queue;
		steps++;
	}
	return longest_step;
};

