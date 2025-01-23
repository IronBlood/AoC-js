/**
 * @param {string} data
 */
export const largest_area = (data) => {
	const positions = data.split("\n").map(line => line.split(", ").map(Number));
	let max_x = 0, max_y = 0;
	positions.forEach(([x, y]) => {
		max_x = Math.max(max_x, x);
		max_y = Math.max(max_y, y);
	});

	/** @type {number[]} */
	const areas = Array(positions.length).fill(0);

	for (let i = 0; i < max_x + 1; i++) {
		for (let j = 0; j < max_y + 1; j++) {
			let shortest_dist = Number.MAX_SAFE_INTEGER;
			let idx = -1;
			let count = 0;

			for (let k = 0; k < positions.length; k++) {
				const [x, y] = positions[k];
				let dist = Math.abs(x - i) + Math.abs(y - j);
				if (dist < shortest_dist) {
					shortest_dist = dist;
					count = 1;
					idx = k;
				} else if (dist === shortest_dist) {
					count++;
				}
			}

			// same distance to multiple source, do nothing
			if (count > 1) {
				continue;
			}

			// already infinite, do nothing
			if (areas[idx] === Number.MAX_SAFE_INTEGER) {
				continue;
			}

			if (i === 0 || j === 0 || i === max_x || j === max_y) {
				areas[idx] = Number.MAX_SAFE_INTEGER;
			} else {
				areas[idx]++;
			}
		}
	}

	let max = 0;
	for (let i = 0; i < areas.length; i++) {
		if (areas[i] === Number.MAX_SAFE_INTEGER)
			continue;
		max = Math.max(max, areas[i]);
	}
	return max;
};

/**
 * @param {string} data
 * @param {number} range
 */
export const safe_regions = (data, range) => {
	const positions = data.split("\n").map(line => line.split(", ").map(Number));
	let max_x = 0, max_y = 0;
	positions.forEach(([x, y]) => {
		max_x = Math.max(max_x, x);
		max_y = Math.max(max_y, y);
	});

	let safe = 0;

	for (let i = -range; i < max_x + range; i++) {
		for (let j = -range; j < max_y + range; j++) {
			let dist = 0;
			for (let [x, y] of positions) {
				dist += Math.abs(x - i) + Math.abs(y - j);
				if (dist > range)
					break;
			}
			if (dist < range)
				safe++;
		}
	}

	return safe;
};

