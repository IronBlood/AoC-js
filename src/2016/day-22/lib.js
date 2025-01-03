import { writeFileSync } from "node:fs";
import {
	createCanvas,
} from "canvas";

/**
 * @param {Map<any, number>} map
 * @param {any} x
 */
const add_to_map = (map, x) => {
	map.set(x, (map.get(x) || 0) + 1);
};

/**
 * @param {string} data
 */
export const count_pairs = data => {
	/** @type {Map<number, number>} */
	const avail_map = new Map();
	/** @type {Map<number, number>} */
	const used_map = new Map();
	let pairs = 0;
	const nodes = data.split("\n").slice(2).map(line => line.split(" ").filter(x => x.length > 0));

	nodes.forEach(x => {
		const node_name = x[0];
		const [total, used, avail, percent] = x.slice(1).map(str => +str.substring(0, str.length - 1));
		add_to_map(avail_map, avail);
		if (used > 0)
			add_to_map(used_map, used);
	});

	const used_keys = [...used_map.keys()];
	const avail_keys = [...avail_map.keys()];

	used_keys.forEach(u => {
		avail_keys.forEach(a => {
			if (u <= a) {
				let contrib = used_map.get(u) * avail_map.get(a);
				pairs += contrib;
			}
		});
	});

	return pairs;
};

/**
 * @param {number}
 */
const get_filled_color = (percent) => {
	if (percent === 0)
		return "#a3d485";
	if (percent <= 75)
		return "#dadb95";
	if (percent <= 87.5)
		return "#96add9";
	if (percent < 100)
		return "#3d62a8";
	return "#ff0000";
};

/**
 * @param {string} data
 * @param {string} filename
 */
export const print_canvas = (data, filename) => {
	const nodes = data.split("\n").slice(2).map(line => line.split(" ").filter(x => x.length > 0));

	let max_x = 0, max_y = 0;
	// first loop, find max_x and max_y
	nodes.forEach(node => {
		const [_, X, Y] = node[0].split("-");
		max_x = Math.max(max_x, +X.substring(1));
		max_y = Math.max(max_y, +Y.substring(1));
	});

	max_x++;
	max_y++;

	let grid_size = 100;
	const canvas = createCanvas(max_x * grid_size, max_y * grid_size);
	const ctx = canvas.getContext("2d");

	const line_height = 30;
	ctx.font = "24px Arial";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;

	nodes.forEach(node => {
		const [_, X, Y] = node[0].split("-");
		const [total, used, avail, percent] = node.slice(1).map(str => +str.substring(0, str.length - 1));
		const x = +X.substring(1) * grid_size;
		const y = +Y.substring(1) * grid_size;

		ctx.fillStyle = get_filled_color(percent);
		if (used > 100)
			ctx.fillStyle = "#555555";
		if (avail === 89 && percent !== 0)
			ctx.fillStyle = "#cccccc";
		ctx.fillRect(x, y, grid_size, grid_size);
		ctx.strokeRect(x, y, grid_size, grid_size);
		ctx.fillStyle = "black";
		ctx.fillText(`${X}-${Y}`, x, y + line_height);
		ctx.fillText(`${used}/${total}`, x, y + line_height * 2);
		ctx.fillText(`${avail}`, x, y + line_height * 3);
	});

	const buf = canvas.toBuffer("image/png");
	writeFileSync(filename, buf);
}

