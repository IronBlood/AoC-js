/**
 * @typedef {Object} Robot
 * @property {string} id
 * @property {number[]} values
 */

/**
 * @param {number} a
 * @param {number} b
 */
const helper_sort = (a,b) => a - b;

/**
 * @param {Map<string, Robot>} map
 * @param {number} value
 * @param {string} id
 * @returns {Robot}
 */
const helper_assign_value_to_robot = (map, value, id) => {
	let bot;
	if (map.has(id)) {
		bot = map.get(id);
		bot.values.push(value);
		bot.values.sort(helper_sort);
		if (bot.values.length > 2) {
			console.log(`[warning] bot ${id} now has values: ${bot.values.join(",")}`);
		}
	} else {
		bot = {
			id,
			values: [value],
		};
		map.set(id, bot);
	}
	return bot;
};

/**
 * @param {string} data
 * @param {{
 *   check_robot?: (r: Robot) => void;
 *   handle_outputs?: (id: string, value: number) => void;
 * } | undefined} cb
 */
export const simulate = (data, cb) => {
	let debug = false;
	const lines = data.split("\n");

	/** @type {Map<string, Robot>} */
	const map_robots = new Map();;

	/** @type {string[]} */
	let cmd_queue = [];
	lines.forEach(line => {
		if (line.startsWith("value ")) {
			const [_1, v, _2, _3, _4, id] = line.split(" ");
			/** @type {Robot} */
			let bot = helper_assign_value_to_robot(map_robots, +v, id);
			if (cb && typeof cb.check_robot === "function") {
				cb.check_robot(bot);
			}
		} else {
			cmd_queue.push(line);
		}
	});

	if (debug) {
		console.log("================ debug ================");
		for (const r of map_robots.values()) {
			console.log(`robot ${r.id} with ${r.values.length} value(s): ${r.values.join(",")}`);
		}
		console.log("================ debug ================");
	}

	while (cmd_queue.length > 0) {
		const next_queue = [];
		cmd_queue.forEach(cmd => {
			const arr = cmd.split(" ");
			const bot_id = arr[1],
				lower_bot_check = arr[5] == "bot",
				lower_bot_id = arr[6],
				higher_bot_check = arr[10] == "bot",
				higher_bot_id = arr[11];

			/** @param {Robot} */
			let source_robot;
			if (!map_robots.has(bot_id)) {
				source_robot = {
					id: bot_id,
					values: [],
				};
				map_robots.set(bot_id, source_robot);
			} else {
				source_robot = map_robots.get(bot_id);
			}
			if (source_robot.values.length < 2) {
				next_queue.push(cmd);
				return;
			}

			if (cb && cb.check_robot) {
				cb.check_robot(source_robot);
			}

			if (lower_bot_check) {
				helper_assign_value_to_robot(map_robots, source_robot.values[0], lower_bot_id);
			} else {
				if (cb && typeof cb.handle_outputs === "function") {
					cb.handle_outputs(lower_bot_id, source_robot.values[0]);
				}
			}
			if (higher_bot_check) {
				helper_assign_value_to_robot(map_robots, source_robot.values[1], higher_bot_id);
			} else {
				if (cb && typeof cb.handle_outputs === "function") {
					cb.handle_outputs(higher_bot_id, source_robot.values[1]);
				}
			}
			source_robot.values = [];
		});
		if (cmd_queue.length == next_queue.length) {
			console.log("[warning] nothing can be done");
			break;
		}
		cmd_queue = next_queue;
	}
};

