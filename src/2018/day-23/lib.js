const re_robot = /^pos=<(\-?\d+),(\-?\d+),(\-?\d+)>, r=(\-?\d+)$/;

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef {Object} RobotProperties
 * @property {number} r
 * @typedef {Position & RobotProperties} Robot
 */

/**
 * @param {string} line
 * @returns {Robot}
 */
function parse_robot(line) {
	const match = re_robot.exec(line);
	if (!match || match.length < 5) {
		console.log("wrong format");
		process.exit(1);
	}

	const [ x, y, z, r ] = match.slice(1).map(Number);
	return { x, y, z, r };
}

/**
 * @param {Position} a
 * @param {Position} b
 */
const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

/**
 * Whether b is in range of a
 * @param {Robot} a
 * @param {Position} b
 */
const in_range = (a, b) => manhattan(a, b) <= a.r;

/**
 * @param {string} data
 */
function parse_robots(data) {
	/** @type {Robot} */
	let strongest;
	/** @type {Robot[]} */
	let robots = [];

	data.split("\n").forEach(line => {
		const robot = parse_robot(line);
		if (!strongest || robot.r > strongest.r) {
			strongest = robot;
		}
		robots.push(robot);
	});

	if (!strongest) {
		console.log("wrong format");
		process.exit(1);
	}

	return { strongest, robots };
}

/**
 * @param {string} data
 * @returns {number}
 */
export function total_number(data) {
	const { strongest, robots } = parse_robots(data);
	return robots.reduce((sum, r) => sum + (in_range(strongest, r) ? 1 : 0), 0);
}

/**
 * @param {string} data
 */
export function shortest_distance(data) {
	const { robots } = parse_robots(data);
	const arr = Array(6);
	/* min_x, min_y, min_z */
	arr.fill(Number.MAX_SAFE_INTEGER, 0, 3);
	/* max_x, max_y, max_z */
	arr.fill(Number.MIN_SAFE_INTEGER, 3);

	/** @type {(idx: number, val: number) => void} */
	const set_min = (idx, val) => {
		arr[idx] = Math.min(arr[idx], val);
	};
	/** @type {(idx: number, val: number) => void} */
	const set_max = (idx, val) => {
		arr[idx] = Math.max(arr[idx], val);
	};

	robots.forEach(({ x, y, z, r }) => {
		set_min(0, x - r);
		set_min(1, y - r);
		set_min(2, z - r);
		set_max(3, x + r);
		set_max(4, y + r);
		set_max(5, z + r);
	});

	let [
		min_x,
		min_y,
		min_z,
		max_x,
		max_y,
		max_z,
	] = arr;

	const X = max_x - min_x,
		Y = max_y - min_y,
		Z = max_z - min_z;

	let step = 1;
	const maxSpan = Math.max(X, Y, Z);

	while (step < maxSpan) {
		step <<= 1;
	}

	let best = {
		x: 0,
		y: 0,
		z: 0,
		coverage: 0,
		dist: Number.MAX_SAFE_INTEGER,
	};

	while (step >= 1) {
		let localBest = {
			x: 0,
			y: 0,
			z: 0,
			coverage: -1,
			dist: Number.MAX_SAFE_INTEGER,
		};

		for (let x = min_x; x <= max_x; x += step) {
			for (let y = min_y; y <= max_y; y += step) {
				for (let z = min_z; z <= max_z; z += step) {
					let cov = 0;
					const p = {x, y, z};
					for (const bot of robots) {
						if (in_range(bot, p))
							cov++;
					}
					const d0 = Math.abs(x) + Math.abs(y) + Math.abs(z);

					if (cov > localBest.coverage || (cov === localBest.coverage && d0 < localBest.dist)) {
						localBest = {
							x,
							y,
							z,
							coverage: cov,
							dist: d0,
						};
					}
				}
			}
		}

		best = localBest;

		min_x = best.x - step;
		max_x = best.x + step;
		min_y = best.y - step;
		max_y = best.y + step;
		min_z = best.z - step;
		max_z = best.z + step;

		step >>>= 1;
	}
	return best.dist;
}
