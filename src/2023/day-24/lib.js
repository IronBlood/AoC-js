// @ts-check

/**
 * @typedef {import("./types").Line2D} Line2D
 * @typedef {import("./types").Line3D} Line3D
 */

/**
 * @param {string} line
 * @returns {Line2D}
 */
const parse_line = (line) => {
	const matches = line.match(/-?\d+/g);
	if (!matches) {
		throw new Error("never");
	}
	const [px, py, pz, vx, vy, vz] = matches.map(Number);
	if (vy === 0) {
		throw new Error("warning");
	}
	const a = vy / vx;
	const b = py - px * a;
	return {
		a,
		b,
		init_p: [px, py],
		init_v: [vx, vy],
	};
};

/**
 * @param {Line2D} line1
 * @param {Line2D} line2
 * @returns {[number, number] | null}
 */
const find_intersection = (line1, line2) => {
	if (line1.a === line2.a) {
		// parallel
		if (line1.b !== line2.b) {
			return null;
		}

		const [x1, y1] = line1.init_p;
		const [x2, y2] = line2.init_p;
		const [vx1, vy1] = line1.init_v;
		const [vx2, vy2] = line2.init_v;

		// the two hailstones are in relative rest
		if (vx1 === vx2) {
			if (x1 === x2) {
				console.log(`same point?`);
			}
			return null;
		}

		const t = (x2 - x1) / (vx1 - vx2);
		// never happen in the future
		if (t < 0) {
			return null;
		}

		return [
			x1 + vx1 * t,
			y1 + vy1 * t,
		];
	} else {
		const { a: a1, b: b1 } = line1;
		const { a: a2, b: b2 } = line2;

		const x = (b2 - b1) / (a1 - a2);
		const y = a1 * x + b1;

		const t1 = (x - line1.init_p[0]) / line1.init_v[0];
		const t2 = (x - line2.init_p[0]) / line2.init_v[0];

		// if any happen in the past
		if (t1 < 0 || t2 < 0) {
			return null;
		}

		return [x, y];
	}
};

/**
 * @param {string} data
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */
export const count_intersections = (data, l, r) => {
	const lines_2d = data.split("\n").map(parse_line);

	let count = 0;
	for (let i = 0; i < lines_2d.length - 1; i++) {
		const line1 = lines_2d[i];
		for (let j = i + 1; j < lines_2d.length; j++) {
			const line2 = lines_2d[j];

			const intersection = find_intersection(line1, line2);
			if (!intersection) {
				continue;
			}

			if (intersection.every(num => num >= l && num <= r)) {
				count++;
			}
		}
	}

	return count;
};

/**
 * @param {string} line
 * @returns {Line3D}
 */
const parse_line_3d = (line) => {
	const matches = line.match(/-?\d+/g);
	if (!matches) {
		throw new Error("never");
	}
	const [px, py, pz, vx, vy, vz] = matches.map(Number);

	return {
		init_p: [px, py, pz],
		init_v: [vx, vy, vz],
	};
};

/**
 * @see {@link https://old.reddit.com/r/adventofcode/comments/18pnycy/2023_day_24_solutions/keq5eqh/}
 * @see {@link https://github.com/vipul0092/advent-of-code-2023/blob/main/day24/solve.sage}
 * @param {string} data
 */
export const initial_position_sage = (data) => {
	const lines = data.split("\n").map(parse_line_3d).slice(0, 5);

	const [px1, py1, pz1] = lines[0].init_p;
	const [vx1, vy1, vz1] = lines[0].init_v;
	const [px2, py2, pz2] = lines[1].init_p;
	const [vx2, vy2, vz2] = lines[1].init_v;
	const [px3, py3, pz3] = lines[2].init_p;
	const [vx3, vy3, vz3] = lines[2].init_v;

	const script = [
		"var('x y z vx vy vz t1 t2 t3 ans')",

		`eq1 = x + (vx * t1) == ${px1} + (${vx1} * t1)`,
		`eq2 = y + (vy * t1) == ${py1} + (${vy1} * t1)`,
		`eq3 = z + (vz * t1) == ${pz1} + (${vz1} * t1)`,

		`eq4 = x + (vx * t2) == ${px2} + (${vx2} * t2)`,
		`eq5 = y + (vy * t2) == ${py2} + (${vy2} * t2)`,
		`eq6 = z + (vz * t2) == ${pz2} + (${vz2} * t2)`,

		`eq7 = x + (vx * t3) == ${px3} + (${vx3} * t3)`,
		`eq8 = y + (vy * t3) == ${py3} + (${vy3} * t3)`,
		`eq9 = z + (vz * t3) == ${pz3} + (${vz3} * t3)`,

		`eq10 = ans == x + y + z`,

		"print(solve([eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10],x,y,z,vx,vy,vz,t1,t2,t3,ans))",
	];

	return script.join("\n");
};
