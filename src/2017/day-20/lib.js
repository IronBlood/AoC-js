/**
 * @param {string} data
 */
export const closest_particle = (data) => {
	const particles = data.split("\n").map((line, idx) => {
		const matches = [...line.matchAll(/<([^<>]*)>/g)].map(m => m[1]);
		const [p, v, a] = [matches[0], matches[1], matches[2]].map(str => str.trim().split(",").map(Number));
		return {
			id: idx,
			p,
			v,
			a,
		};
	});

	// 10000 iterations should be enough
	let count = 10000, min_dist = Number.MAX_SAFE_INTEGER, id = -1;
	while (count-- > 0) {
		particles.forEach(x => {
			for (let i = 0; i < 3; i++) {
				x.v[i] += x.a[i];
				x.p[i] += x.v[i];
			}
		});
	}

	particles.forEach((x,idx) => {
		const dist = x.p.reduce((s, c) => s + Math.abs(c), 0);
		if (dist < min_dist) {
			min_dist = dist;
			id = idx;
		}
	});

	return id;
};

/**
 * @param {string} data
 */
export const count_left = (data) => {
	let particles = data.split("\n").map((line, idx) => {
		const matches = [...line.matchAll(/<([^<>]*)>/g)].map(m => m[1]);
		const [p, v, a] = [matches[0], matches[1], matches[2]].map(str => str.trim().split(",").map(Number));
		return {
			id: idx,
			p,
			v,
			a,
			p_str: p.join(","),
		};
	});

	// 10000 iterations should be enough
	let count = 10000;
	while (count-- > 0) {
		if (particles.length <= 1)
			break;

		/** @type {Map<string, number>} */
		const pos_map = new Map();
		particles.forEach(x => {
			for (let i = 0; i < 3; i++) {
				x.v[i] += x.a[i];
				x.p[i] += x.v[i];
			}
			x.p_str = x.p.join(",");
			pos_map.set(x.p_str, (pos_map.get(x.p_str) || 0) + 1);
		});

		particles = particles.filter(x => pos_map.get(x.p_str) === 1);
	}

	return particles.length;
};

