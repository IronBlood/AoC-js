// @ts-check

/**
 * @param {Set<string>} set
 * @param {string} line
 * @param {number[]} region
 */
const change = (set, line, region) => {
	const do_add = line.startsWith("on");
	const matches = line.match(/-?\d+\.\.-?\d+/g);
	if (!matches) {
		throw new Error("never");
	}

	const boundries = matches.map(x => x.split("..").map(Number));

	const lo_x = Math.max(region[0], boundries[0][0]);
	const lo_y = Math.max(region[0], boundries[1][0]);
	const lo_z = Math.max(region[0], boundries[2][0]);

	const hi_x = Math.min(region[1], boundries[0][1]);
	const hi_y = Math.min(region[1], boundries[1][1]);
	const hi_z = Math.min(region[1], boundries[2][1]);

	for (let x = lo_x; x <= hi_x; x++) {
		for (let y = lo_y; y <= hi_y; y++) {
			for (let z = lo_z; z <= hi_z; z++) {
				const key = [x, y, z].join(",");
				if (do_add) {
					set.add(key);
				} else {
					set.delete(key);
				}
			}
		}
	}
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_on_cubes = (data) => {
	const on_cubes = new Set();
	data.split("\n").forEach(line => change(on_cubes, line, [-50, 50]));
	return on_cubes.size;
};

/**
 * @readonly @enum {number}
 */
const SegmentRelations = {
	NOT_OVERLAPPED: 0,
	LEFT_OVERLAPPED: 1,
	RIGHT_OVERLAPPED: 2,
	FULLY_CONTAINED: 3,
	FULLY_CONTAINING: 4,
	EQUALITY: 5,
};

/**
 * checking a to b
 * @param {number[]} a
 * @param {number[]} b
 * @returns {SegmentRelations}
 */
const check_segments = (a, b) => {
	if (a[0] === b[0] && a[1] === b[1]) {
		return SegmentRelations.EQUALITY;
	}

	if (a[1] < b[0] || b[1] < a[0]) {
		return SegmentRelations.NOT_OVERLAPPED;
	}

	if (b[0] <= a[0] && a[1] <= b[1]) {
		return SegmentRelations.FULLY_CONTAINED;
	}

	if (a[0] <= b[0] && b[1] <= a[1]) {
		return SegmentRelations.FULLY_CONTAINING;
	}

	if (b[0] <= a[0] && a[0] <= b[1]) {
		return SegmentRelations.LEFT_OVERLAPPED;
	}

	if (a[0] <= b[0] && b[0] <= a[1]) {
		return SegmentRelations.RIGHT_OVERLAPPED;
	}

	throw new Error(`INVALID`);
};

/**
 * Slice a by b
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[][]}
 */
const slice_segment = (a, b) => {
	const res = [];
	if (b[0] > a[0]) {
		res.push([
			a[0],
			b[0] - 1,
		]);
	}
	res.push([
		Math.max(a[0], b[0]),
		Math.min(a[1], b[1]),
	]);
	if (b[1] < a[1]) {
		res.push([
			b[1] + 1,
			a[1],
		]);
	}
	return res;
};

export class Cube {
	/**
	 * @param {number[]} xmm min and max for x
	 * @param {number[]} ymm min and max for y
	 * @param {number[]} zmm min and max for z
	 */
	constructor(xmm, ymm, zmm) {
		this.xmm = xmm;
		this.ymm = ymm;
		this.zmm = zmm;
	}

	get points() {
		return 1
			* (this.xmm[1] - this.xmm[0] + 1)
			* (this.ymm[1] - this.ymm[0] + 1)
			* (this.zmm[1] - this.zmm[0] + 1);
	}

	get vertices() {
		const vertices = [];
		for (const x of this.xmm) {
			for (const y of this.ymm) {
				for (const z of this.zmm) {
					vertices.push([x, y, z]);
				}
			}
		}
		return vertices;
	}

	/**
	 * @param {Cube} other
	 */
	is_same(other) {
		return true
			&& this.xmm[0] === other.xmm[0]
			&& this.xmm[1] === other.xmm[1]
			&& this.ymm[0] === other.ymm[0]
			&& this.ymm[1] === other.ymm[1]
			&& this.zmm[0] === other.zmm[0]
			&& this.zmm[1] === other.zmm[1];
	}

	/**
	 * @param {Cube} other
	 */
	overlap(other) {
		return !(false
			|| check_segments(this.xmm, other.xmm) === SegmentRelations.NOT_OVERLAPPED
			|| check_segments(this.ymm, other.ymm) === SegmentRelations.NOT_OVERLAPPED
			|| check_segments(this.zmm, other.zmm) === SegmentRelations.NOT_OVERLAPPED
		);
	}

	/**
	 * Check whether the other cube is contained in this cube
	 * @param {Cube} other
	 */
	containing(other) {
		return true
			&& check_segments(this.xmm, other.xmm) === SegmentRelations.FULLY_CONTAINING
			&& check_segments(this.ymm, other.ymm) === SegmentRelations.FULLY_CONTAINING
			&& check_segments(this.zmm, other.zmm) === SegmentRelations.FULLY_CONTAINING;
	}

	/**
	 * @param {Cube} other
	 */
	get_overlapping(other) {
		return new Cube(
			[
				Math.max(this.xmm[0], other.xmm[0]),
				Math.min(this.xmm[1], other.xmm[1]),
			],
			[
				Math.max(this.ymm[0], other.ymm[0]),
				Math.min(this.ymm[1], other.ymm[1]),
			],
			[
				Math.max(this.zmm[0], other.zmm[0]),
				Math.min(this.zmm[1], other.zmm[1]),
			],
		);
	}

	/**
	 * @todo
	 * @param {Cube} overlap
	 * @returns {Cube[]}
	 */
	substract(overlap) {
		const sliced_x = slice_segment(this.xmm, overlap.xmm);
		const sliced_y = slice_segment(this.ymm, overlap.ymm);
		const sliced_z = slice_segment(this.zmm, overlap.zmm);

		const res = [];
		sliced_x.forEach(xmm => {
			sliced_y.forEach(ymm => {
				sliced_z.forEach(zmm => {
					const cube = new Cube(xmm, ymm, zmm);
					if (!cube.is_same(overlap)) {
						res.push(cube);
					}
				});
			});
		});
		return res;
	}
}

/**
 * @param {Cube[]} cubes
 * @param {Cube} cube
 */
const add_cube = (cubes, cube) => {
	let queue = [cube];
	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const cube of queue) {
			let handled = false;
			for (let i = 0; i < cubes.length; i++) {
				const a = cubes[i];

				if (!a.overlap(cube))
					continue;

				// the current cube is larger, so deleting the smaller one
				// and checking the next;
				if (cube.containing(a)) {
					cubes.splice(i--, 1);
					next_queue.push(cube);
					continue;
				}

				// cube is contained in an existing one, so skip it
				if (a.containing(cube)) {
					handled = true;
					break;
				}

				handled = true;
				// slice the current cube to smaller cubes, by removing the overlapping cube, and adding the rest to the next iteration
				const overlap = cube.get_overlapping(a);
				next_queue.push(...cube.substract(overlap));
				break;
			}

			// not overlapped with any existing cubes
			if (!handled) {
				cubes.push(cube);
			}
		}

		queue = next_queue;
	}
};

/**
 * @param {Cube[]} cubes
 * @param {Cube} cube
 */
const sub_cube = (cubes, cube) => {
	for (let i = 0; i < cubes.length; i++) {
		const a = cubes[i];
		if (cube.containing(a)) {
			cubes.splice(i--, 1);
			continue;
		}
		if (!cube.overlap(a)) {
			continue;
		}

		const overlap = a.get_overlapping(cube);
		const remaining = a.substract(overlap);
		// it doesn't hurt if we move one step back
		cubes.splice(i--, 1, ...remaining);
	}
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_on_cubes2 = (data) => {
	/** @type {Cube[]} */
	const cubes = [];
	data.split("\n").forEach(line => {
		const do_add = line.startsWith("on");
		const matches = line.match(/-?\d+\.\.-?\d+/g);
		if (!matches) {
			throw new Error("never");
		}

		const boundries = matches.map(x => x.split("..").map(Number));
		const cube = new Cube(
			boundries[0],
			boundries[1],
			boundries[2],
		);

		if (do_add) {
			add_cube(cubes, cube);
		} else {
			sub_cube(cubes, cube);
		}
	});

	return cubes.reduce((sum, cube) => sum + cube.points, 0);
};
