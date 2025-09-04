// @ts-check

/**
 * @param {string} line
 * @returns {number[]}
 */
const get_pos = (line) => {
	let q = 0, r = 0, s = 0;
	for (let idx = 0; idx < line.length; ) {
		let c = line[idx];
		if (c !== "e" && c !== "w") {
			c = line.substring(idx, idx + 2);
			idx += 2;
		} else {
			idx++;
		}

		switch (c) {
			case "e": r--; break;
			case "w": r++; break;
			case "se": q++; r--; break;
			case "nw": q--; r++; break;
			case "sw": q++; break;
			case "ne": q--; break;
		}
		s = 0 - q - r;
	}
	return [q, r, s];
};

/**
 * @param {string} data
 */
export const count_black = (data) => {
	/** @type {Set<string>} */
	const set = new Set();

	data.split("\n").forEach(line => {
		const pos = get_pos(line);
		const key = pos.join(",");
		if (set.has(key)) {
			// console.log(`changing ${key} to white`);
			set.delete(key);
		} else {
			// console.log(`changing ${key} to black`);
			set.add(key);
		}
	});

	return set.size;
};

/**
 * @param {number} q
 * @param {number} r
 * @param {number} s
 */
const get_neighbor = (q, r, s) => {
	const res = [];
	for (const [dq, dr] of [
		[0, -1],
		[0, 1],
		[1, -1],
		[-1, 1],
		[1, 0],
		[-1, 0],
	]) {
		const nq = q + dq;
		const nr = r + dr;
		const ns = 0 - nq - nr;
		res.push([nq, nr, ns]);
	}
	return res;
};

/**
 * @param {Set<string>} prev_set
 * @returns {Set<string>}
 */
const flip = (prev_set) => {
	/** @type {typeof prev_set} */
	const next_set = new Set();

	const prev_black_pos = [...prev_set].map(str => str.split(",").map(Number));
	const MIN_QRS = Array(3).fill(Number.MAX_SAFE_INTEGER);
	const MAX_QRS = Array(3).fill(Number.MIN_SAFE_INTEGER);
	prev_black_pos.forEach(pos => {
		for (let i = 0; i < 3; i++) {
			MIN_QRS[i] = Math.min(pos[i], MIN_QRS[i]);
			MAX_QRS[i] = Math.max(pos[i], MAX_QRS[i]);
		}
	});

	const [MIN_Q, MIN_R, MIN_S] = MIN_QRS;
	const [MAX_Q, MAX_R, MAX_S] = MAX_QRS;

	/**
	 * @param {number} q
	 * @param {number} r
	 * @param {number} s
	 * @returns {number}
	 */
	const count_neighbor_black = (q, r, s) => {
		return get_neighbor(q, r, s).reduce((sum, pos) =>
			sum += (prev_set.has(pos.join(",")) ? 1 : 0),
		0);
	};

	for (let q = MIN_Q - 1; q <= MAX_Q + 1; q++) {
		for (let r = MIN_R - 1; r <= MAX_R + 1; r++) {
			const s = 0 - q - r;
			const key = [q, r, s].join(",");
			const is_black = prev_set.has(key);
			const black_neighbors = count_neighbor_black(q, r, s);
			if (is_black) {
				if (black_neighbors === 0 || black_neighbors > 2) {
					// flip white
				} else {
					// remain black
					next_set.add(key);
					// console.log(`remain black ${key}`);
				}
			} else {
				if (black_neighbors === 2) {
					// flip black
					next_set.add(key);
				}
			}
		}
	}

	return next_set;
};

/**
 * @param {string} data
 */
export const count_black2 = (data, day_count = 100) => {
	/** @type {Set<string>} */
	let set = new Set();
	data.split("\n").forEach(line => {
		const pos = get_pos(line);
		const key = pos.join(",");
		if (set.has(key)) {
			set.delete(key);
		} else {
			set.add(key);
		}
	});

	while (day_count-- > 0) {
		// console.log(`set size before flipping: ${set.size}`);
		set = flip(set);
		// console.log(`set size after flipping: ${set.size}`);
		// console.log(set);
	}

	return set.size;
};
