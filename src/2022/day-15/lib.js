// @ts-check

/**
 * @param {number[]} a
 * @param {number[]} b
 */
const manhattan_distance = (a, b) => {
	return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

/**
 * @param {string} data
 * @returns {import("./types").SensorBeaconPair[]}
 */
const parse_pairs = (data) => {
	const pairs = [];
	for (const line of data.split("\n")) {
		const re = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
		const matches = re.exec(line);
		if (!matches) {
			throw new Error(`Wrong format`);
		}
		const [s_x, s_y, b_x, b_y] = matches.slice(1).map(Number);

		const sensor = [s_x, s_y];
		const beacon = [b_x, b_y];
		pairs.push({
			sensor,
			beacon,
			distance: manhattan_distance(sensor, beacon),
		});
	};

	return pairs;
};

/**
 * @param {string} data
 * @param {number} Y
 */
export const count_positions = (data, Y) => {
	const pairs = parse_pairs(data);

	const potential_pairs = pairs.filter(pair => {
		const min_dist = Math.abs(pair.sensor[1] - Y);
		return min_dist <= pair.distance;
	});

	let max_x = Number.MIN_SAFE_INTEGER,
		min_x = Number.MAX_SAFE_INTEGER;
	const set = new Set();
	potential_pairs.forEach(pair => {
		const remain = pair.distance - Math.abs(pair.sensor[1] - Y);
		min_x = Math.min(min_x, pair.sensor[0] - remain);
		max_x = Math.max(max_x, pair.sensor[0] + remain);
		if (pair.beacon[1] === Y) {
			set.add(pair.beacon.join(","));
		}
	});
	let total = max_x - min_x + 1;
	return total - set.size;
};

/**
 * @param {number[]} sensor
 * @param {number} distance
 */
const get_outside_candidates = (sensor, distance) => {
	const [x, y] = sensor;

	const candidates = [];

	const bottom = y - distance - 1,
		top = y + distance + 1,
		left = x - distance - 1,
		right = x + distance + 1;

	for (let u = x, v = top; u != right; u++, v--) {
		candidates.push([u, v]);
	}
	for (let u = right, v = y; u != x; u--, v--) {
		candidates.push([u, v]);
	}
	for (let u = x, v = bottom; u != left; u--, v++) {
		candidates.push([u, v]);
	}
	for (let u = left, v = y; u != x; u++, v++) {
		candidates.push([u, v]);
	}

	return candidates;
};

/**
 * @param {string} data
 */
export const get_freq = (data) => {
	const pairs = parse_pairs(data);

	const total_candidates = new Set();

	for (let i = 0; i < pairs.length; i++) {
		const {sensor, distance} = pairs[i];
		const candidates = get_outside_candidates(sensor, distance);

		for (let pos of candidates) {
			const [x, y] = pos;
			if (x < 0 || x > 4_000_000 || y < 0 || y > 4_000_000) {
				continue;
			}
			let match = true;
			for (let j = 0; j < pairs.length; j++) {
				if (i === j)
					continue;

				if (manhattan_distance(pos, pairs[j].sensor) <= pairs[j].distance) {
					match = false;
					break;
				}
			}
			if (match) {
				const key = pos.join(",");
				total_candidates.add(key);
			}
		}
	}

	if (total_candidates.size !== 1) {
		throw new Error(`multiple choices: ${total_candidates.size}`);
	}

	const [x, y] = [...total_candidates][0].split(",");
	return BigInt(x) * 4_000_000n + BigInt(y);
};
