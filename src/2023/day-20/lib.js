// @ts-check

import {
	lcm,
} from "../../lib/math.js";

/**
 * @typedef {import("./types").Modules} Modules
 */

/**
 * @param {string} data
 * @param {(m: Modules) => void} [on_sending_low]
 */
const build_modules = (data, on_sending_low) => {
	/** @type {Map<string, Modules>} */
	const map = new Map();

	// pass 1: initial all modules
	data.split("\n").forEach(line => {
		const [input_str, output_str] = line.split(" -> ");
		const outputs = output_str.split(", ");

		if (input_str === "broadcaster") {
			map.set(input_str, {
				name: input_str,
				type: "broadcast",
				outputs,
			});
		} else {
			const type_char = input_str[0];
			const name = input_str.substring(1);

			if (type_char === "%") {
				map.set(name, {
					name,
					outputs,
					type: "flipflop",
					state: "off",
				});
			} else {
				map.set(name, {
					name,
					outputs,
					type: "conjunction",
					inputs: new Map(),
					on_sending_low,
				});
			}
		}
	});

	// pass 2: register inputs for conjunctions, and find outputs
	for (const m of map.values()) {
		for (const name of m.outputs) {
			const child = map.get(name);
			if (!child) {
				map.set(name, {
					name,
					type: "output",
					outputs: [],
				});
				continue;
			}
			if (child.type === "conjunction") {
				child.inputs.set(m.name, 0);
			}
		}
	}

	return map;
};

/**
 * @param {Modules} m
 * @param {0|1} value
 * @param {string} from
 * @returns {{ ignore: true } | { ignore: false; value: 0|1 }}
 */
const handle_value = (m, value, from) => {
	if (m.type === "broadcast") {
		return {
			ignore: false,
			value: 0,
		}
	}

	if (m.type === "flipflop") {
		if (value) {
			return {
				ignore: true,
			}
		} else {
			const state = m.state;
			// toggle
			m.state = state === "off" ? "on" : "off";
			return {
				ignore: false,
				value: state === "off" ? 1 : 0,
			}
		}
	}

	if (m.type === "conjunction") {
		m.inputs.set(from, value);
		for (const v of m.inputs.values()) {
			if (!v) {
				return {
					ignore: false,
					value: 1,
				}
			}
		}
		if (typeof m.on_sending_low === "function")
			m.on_sending_low(m);
		return {
			ignore: false,
			value: 0,
		}
	}

	if (m.type === "output") {
		return { ignore: true };
	}

	// never
	return { ignore: true };
};

/**
 * @param {Map<string, Modules>} module_map
 */
const click = (module_map) => {
	let low_count = 1, high_count = 0;

	/** @type {{name: string; value: 0|1; from: string}[]} */
	let queue = [{ name: "broadcaster", value: 0, from: "button" }];
	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const node of queue) {
			const m = module_map.get(node.name);
			if (!m) {
				throw new Error(`Cannot find module named ${node}`);
			}
			const res = handle_value(m, node.value, node.from);
			if (res.ignore) {
				continue;
			}

			for (const child of m.outputs) {
				next_queue.push({
					name: child,
					value: res.value,
					from: node.name,
				});
			}

			if (res.value === 1) {
				high_count += m.outputs.length;
			} else {
				low_count += m.outputs.length;
			}
		}

		queue = next_queue;
	}

	return [low_count, high_count];
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_pulses = (data, click_count = 1000) => {
	let low_count = 0, high_count = 0;
	let should_break = false;

	const module_map = build_modules(data);

	while (click_count-- > 0) {
		const [local_low, local_high] = click(module_map);
		low_count += local_low;
		high_count += local_high;
		if (should_break) {
			break;
		}
	}
	return low_count * high_count;
};

/**
 * @param {number[]} nums
 */
const check_period = (nums) => {
	if (nums.length < 2) {
		throw new Error("not enough numbers");
	}

	const period = nums[1] - nums[0];
	for (let i = 1; i < nums.length - 1; i++) {
		const p = nums[i + 1] - nums[i];
		if (p !== period) {
			console.log("not periodic");
			return -1;
		}
	}
	return period;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const min_clicks = (data) => {
	let click_count = 0;
	const MAX_CLICKS = 10_000;

	/** @type {{ name: string; button_click: number }[]} */
	const cached = [];
	// WARN check your graph
	const selected_conjunctions = ["xq", "dv", "jc", "vv"];

	/**
	 * @param {Modules} m
	 */
	const on_sending_low = (m) => {
		if (m.type !== "conjunction") {
			throw new Error(`shouldn't be handled for ${m.name}, ${m.type}`);
		}
		if (!selected_conjunctions.includes(m.name)) {
			return;
		}

		cached.push({
			name: m.name,
			button_click: click_count,
		});
	};

	const module_map = build_modules(data, on_sending_low);

	while (click_count++ < MAX_CLICKS) {
		click(module_map);
	}

	const periods = [];
	for (const name of selected_conjunctions) {
		const filtered = cached.filter(x => x.name === name).map(x => x.button_click).sort((a, b) => a - b);
		periods.push(check_period(filtered));
	}

	return periods.reduce(lcm);
};

/**
 * Use dot(1) to generate a PNG or SVG
 * @see {@link https://en.wikipedia.org/wiki/DOT_(graph_description_language)}
 * @param {string} data
 */
export const dump_graph = (data) => {
	const module_map = build_modules(data, () => {});

	const dot_graph = [
		"digraph G {",
		"rankdir=LR;",
	];

	// register nodes
	for (const m of module_map.values()) {
		let node = "";
		switch (m.type) {
			case "broadcast":
				node = `${m.name} [shape=box, fillcolor="#617df9", style="filled"];`;
				break;
			case "flipflop":
				node = `${m.name} [shape=circle, fillcolor="#eb95f5", style="filled"];`;
				break;
			case "conjunction":
				node = `${m.name} [shape=box, fillcolor="#9ff595", style="filled"];`;
				break;
			case "output":
				node = `${m.name} [shape=hexagon, fillcolor="#f59595", style="filled"];`;
				break;
		}
		dot_graph.push(node);
	}

	// source and sink
	dot_graph.push("{rank=source; broadcaster;}");
	dot_graph.push("{rank=sink; rx;}");

	// register edges
	for (const m of module_map.values()) {
		for (const child of m.outputs) {
			dot_graph.push(`${m.name} -> ${child};`);
		}
	}

	dot_graph.push("}");

	return dot_graph.join("\n");
};
