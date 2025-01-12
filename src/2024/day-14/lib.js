import {
	createCanvas,
} from "canvas";
import fs from "node:fs";

/**
 * @param {number[][]} grid
 */
const largest_group = (grid) => {
	const copy = grid.map(row => row.slice());
	let max = 0;

	const dirs = [0, 1, 0, -1, 0];
	const bfs_flood = (x, y) => {
		let queue = [[x, y]];
		let count = 0;

		while (queue.length > 0) {
			/** @type {typeof queue} */
			const next_queue = [];
			for ([x, y] of queue) {
				if (!(x >= 0 && y >= 0 && x < copy.length && y < copy[0].length) || copy[x][y] == 0) {
					continue;
				}
				copy[x][y] = 0;
				count++;
				for (let i = 0; i < 4; i++) {
					next_queue.push([x + dirs[i], y + dirs[i + 1]]);
				}
			}
			queue = next_queue;
		}

		max = Math.max(max, count);
	};

	for (let i = 0; i < copy.length; i++) {
		for (let j = 0; j < copy[0].length; j++) {
			if (copy[i][j] != 0) {
				bfs_flood(i, j);
			}
		}
	}

	return max;
};

/**
 * @param {string} data
 * @param {{ x: number; y: number; second?: number; dump_image?: boolean; dir?: string }} config
 * @returns {number}
 */
export const safety_factor = (data, config) => {
	config.second = config.second || 100;
	config.dump_image = config.dump_image || false;
	const count = [
		[0,0],
		[0,0],
	];

	const mid_x = (config.x - 1) / 2,
		mid_y = (config.y - 1) / 2;


	/** @type {number[][]} */
	const grid = Array.from({ length: config.x }, () => Array(config.y).fill(0));
	const robots = data.split("\n").map(robot_cfg => {
		return robot_cfg.split(" ").map(x => x.split("=")[1].split(",").map(Number));
	});

	let second = 0;
	while (second++ < config.second) {
		count.forEach(row => row.fill(0));
		grid.forEach(row => row.fill(0));
		for (let [p, v] of robots) {
			let [x, y] = p;
			x += v[0] * second;
			y += v[1] * second;
			x %= config.x;
			y %= config.y;
			if (x < 0) x += config.x;
			if (y < 0) y += config.y;

			grid[x][y]++;

			if (x == mid_x || y == mid_y)
				continue;

			let i = x < mid_x ? 0 : 1, j = y < mid_y ? 0 : 1;
			count[i][j]++;
		}

		if (config.dump_image && largest_group(grid) > 50) {
			dumpFrame(grid, second, config.dir);
			console.log(second);
			break;
		}
	}

	return count[0][0] * count[0][1] * count[1][0] * count[1][1];
};

/**
 * @param {number[][]} grid
 * @param {number} num
 * @param {string} dir
 */
const dumpFrame = (grid, num, dir) => {
	const width = grid[0].length;
	const height = grid.length;
	const ratio = 4;
	const canvas = createCanvas(width * ratio, height * ratio);
	const ctx = canvas.getContext("2d");
	const time = new Date();

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			ctx.fillStyle = grid[y][x] > 0 ? "#00ff00" : "#000";
			ctx.fillRect(x * ratio, y * ratio, ratio, ratio);
		}
	}

	const buf = canvas.toBuffer("image/png");
	fs.writeFileSync(`${dir}/${time.getTime()}_frame_${num}.png`, buf);
};

