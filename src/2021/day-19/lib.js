/**
 * @typedef {import("./types").Point} Point
 * @typedef {import("./types").Vector} Vector
 */

/**
 * @param {Point} a
 * @param {Point} b
 * @returns {Vector}
 */
const get_vector = (a, b) => {
	return {
		x: a.x - b.x,
		y: a.y - b.y,
		z: a.z - b.z,
	};
};

/**
 * @param {Point} p
 * @param {Vector} offset
 */
const apply_offset = (p, offset) => {
	let { x, y, z } = p;
	let { x: u, y: v, z: w } = offset;
	return {
		x: x + u,
		y: y + v,
		z: z + w,
	};
};

/**
 * @param {Vector} v
 * @param {Vector} u
 */
const is_same_vector = (v, u) => {
	return v.x === u.x && v.y === u.y && v.z === u.z;
};

/**
 * @param {Vector | Point} v
 */
const serialize_vector_or_point = (v) => [ v.x, v.y, v.z ].join(",");

/**
 * @param {Point} a
 * @param {Point} b
 */
const manhattan = (a, b) => {
	return 0
		+ Math.abs(a.x - b.x)
		+ Math.abs(a.y - b.y)
		+ Math.abs(a.z - b.z);
};

class Space {
	/**
	 * @param {string} id
	 * @param {number[][]} beacons
	 */
	constructor(id, beacons) {
		this.id = id;

		this.offset = {
			x: 0,
			y: 0,
			z: 0,
		};

		this.state = 0;

		/** @type {Point[]} */
		this.points = beacons.map(([x, y, z]) => ({x, y, z}));
		/** @type {Vector[]} */
		this.vectors = [];
		this.generate_vectors();

		/** @private @type {Point[]} */
		this.original_points  = this.points .map(({x, y, z}) => ({x, y, z}));
		/** @private @type {Vector[]} */
		this.original_vectors = this.vectors.map(({x, y, z}) => ({x, y, z}));
	}

	/**
	 * @private
	 */
	generate_vectors() {
		for (let i = 0, len = this.points.length; i < len - 1; i++) {
			const p = this.points[i];
			for (let j = i + 1; j < len; j++) {
				const q = this.points[j];
				this.vectors.push(get_vector(p, q));
				this.vectors.push(get_vector(q, p));
			}
		}
	}

	serialize_vectors() {
		return this.vectors.map(serialize_vector_or_point).sort();
	}

	rotate() {
		this.state = (this.state + 1) % 24;
		switch (this.state) {
			case 0:
				this.points = this.original_points.map(({x, y, z}) => ({x, y, z}));
				this.vectors = this.original_vectors.map(({x, y, z}) => ({x, y, z}));
				break;
			case 4:
				this.points = this._flip_z(this.original_points);
				this.vectors = this._flip_z(this.original_vectors);
				break;
			case 8:
				this.points = this._z_to_x(this.original_points);
				this.vectors = this._z_to_x(this.original_vectors);
				break;
			case 12:
				this.points = this._flip_z(this._z_to_x(this.original_points));
				this.vectors = this._flip_z(this._z_to_x(this.original_vectors));
				break;
			case 16:
				this.points = this._z_to_y(this.original_points);
				this.vectors = this._z_to_y(this.original_vectors);
				break;
			case 20:
				this.points = this._flip_z(this._z_to_y(this.original_points));
				this.vectors = this._flip_z(this._z_to_y(this.original_vectors));
				break;
			default:
				this._normal_rotate(this.points);
				this._normal_rotate(this.vectors);
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	update_offset(x, y, z) {
		this.offset = {
			x,
			y,
			z,
		};
	}

	/**
	 * @param {Set<string>} set
	 */
	register_beacons(set) {
		this.points.forEach(p => set.add(serialize_vector_or_point(apply_offset(p, this.offset))));
	}

	/**
	 * @private
	 * @template {Point | Vector} T
	 * @param {T[]} arr
	 * @returns {T[]}
	 */
	_flip_z(arr) {
		return arr.map(({x, y, z}) => ({
			x: -y,
			y: -x,
			z: -z,
		}));
	}

	/**
	 * @private
	 * @template {Point | Vector} T
	 * @param {T[]} arr
	 * @returns {T[]}
	 */
	_z_to_y(arr) {
		return arr.map(({x, y, z}) => ({
			x,
			y: -z,
			z: y,
		}));
	}

	/**
	 * @private
	 * @template {Point | Vector} T
	 * @param {T[]} arr
	 * @returns {T[]}
	 */
	_z_to_x(arr) {
		return arr.map(({x, y, z}) => ({
			x: -z,
			y,
			z: x,
		}));
	}

	/**
	 * @private
	 * @template {Point | Vector} T
	 * @param {T[]} arr
	 */
	_normal_rotate(arr) {
		for (const p of arr) {
			const {x, y} = p;
			p.x = y;
			p.y = -x;
		}
	}
}

/**
 * @param {Space} a
 * @param {Space} b
 * @returns {Set<string>}
 */
const get_shared_vectors = (a, b) => {
	const set_a = new Set(a.serialize_vectors());
	const arr = b.serialize_vectors().filter(v => set_a.has(v));
	return new Set(arr);
};

/**
 * @param {Space} a The space which offset has been applied
 * @param {Space} b The space to be updated
 * @param {Set<string>} shared_vectors
 */
const update_offset = (a, b, shared_vectors) => {
	const vector_pq = [...shared_vectors][0];

	/**
	 * @param {Space} x
	 * @returns {Point[]}
	 */
	const find_pq = (x) => {
		for (let i = 0, len = x.points.length; i < len - 1; i++) {
			const p = x.points[i];
			for (let j = i + 1; j < len; j++) {
				const q = x.points[j];
				let v = get_vector(p, q);
				if (serialize_vector_or_point(v) === vector_pq) {
					return [p, q];
				}
				v = get_vector(q, p);
				if (serialize_vector_or_point(v) === vector_pq) {
					return [q, p];
				}
			}
		}
		return null;
	};

	const pair_a = find_pq(a), pair_b = find_pq(b);
	if (pair_a === null || pair_b === null) {
		throw new Error(`failed to find ${vector_pq}`);
	}

	const [a_p, a_q] = pair_a, [b_p, b_q] = pair_b;
	if (!is_same_vector(
		get_vector(a_p, b_p),
		get_vector(a_q, b_q),
	)) {
		throw new Error(`cannot map from a to b`);
	}

	b.update_offset(
		a.offset.x + a_p.x - b_p.x,
		a.offset.y + a_p.y - b_p.y,
		a.offset.z + a_p.z - b_p.z,
	);
};

/**
 * @param {string} data
 */
export const solver19 = (data) => {
	const scanners = data.split("\n\n").map(block => {
		const cfg = block.split("\n");
		const id = /\d+/.exec(cfg[0]);
		return new Space(+id, cfg.slice(1).map(line => line.split(",").map(Number)));
	});

	const known_spaces = [scanners[0]];
	let remain = scanners.slice(1);

	while (remain.length > 0) {
		const next = [];

		for (const s of remain) {
			let found = false;
			for (const ks of known_spaces) {
				let j = 24;
				while (j-- > 0) {
					const same = get_shared_vectors(ks, s);
					const count = same.size;
					if (count >= 132) {
						found = true;
						update_offset(ks, s, same);
						known_spaces.push(s);
						break;
					}
					s.rotate();
				}
				if (found)
					break;
			}
			if (!found) {
				next.push(s);
			}
		}

		if (next.length === remain.length) {
			throw new Error(`unable to finish, remain ${next.length}`);
		} else {
			remain = next;
		}
	}

	const set_beacons = new Set();
	known_spaces.forEach(s => s.register_beacons(set_beacons));
	const beacon_number = set_beacons.size;

	let max_manhattan = 0;
	for (let i = 0, len = known_spaces.length; i < len - 1; i++) {
		const a = known_spaces[i];
		for (let j = i + 1; j < len; j++) {
			const b = known_spaces[j];
			max_manhattan = Math.max(max_manhattan, manhattan(a.offset, b.offset));
		}
	}

	return [beacon_number, max_manhattan];
};
