import { lcm } from "../../lib/math.js";

/**
 * @param {string} data
 */
export const count_steps = (data) => {
	const [instructions, cfg] = data.split("\n\n");

	const tree = Object.fromEntries(cfg.split("\n").map(line => {
		/** @type {string[]} */
		const [node, left, right] = line.match(/[A-Z]{3}/g);
		return [node, { L: left, R: right }];
	}));

	let curr = "AAA";
	let steps = 0;

	while (curr !== "ZZZ") {
		const key = instructions[steps++ % instructions.length];
		curr = tree[curr][key];
	}

	return steps;
};

/**
 * @param {string} data
 */
export const count_steps2 = (data) => {
	const [instructions, cfg] = data.split("\n\n");

	let nodes = [];

	const tree = Object.fromEntries(cfg.split("\n").map(line => {
		/** @type {string[]} */
		const [node, left, right] = line.match(/[0-9A-Z]{3}/g);

		if (node[2] === "A") {
			nodes.push(node);
		}

		return [node, { L: left, R: right }];
	}));

	/**
	 * @param {string} node
	 */
	const _count_steps = (node) => {
		let steps = 0;

		while (node[2] !== "Z") {
			const key = instructions[steps++ % instructions.length];
			node = tree[node][key];
		}

		return steps;
	};

	const steps = nodes.map(_count_steps);

	return steps.reduce(lcm);
};
