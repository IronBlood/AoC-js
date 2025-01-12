/**
 * @template T
 * @param {Map<T, Set<T>>} map
 * @param {T} a
 * @param {T} b
 */
const add_pair = (map, a, b) => {
	if (!map.has(a)) {
		map.set(a, new Set());
	}
	map.get(a).add(b);
};

/**
 * @param {string} data
 * @returns {Set<string>}
 */
export const find_sets_of = (data, count = 3) => {
	const groups = data.split("\n").map(line => line.split("-"));
	/** @type {Map<string, Set<string>>} */
	const adjs = new Map();
	groups.forEach(pair => {
		add_pair(adjs, pair[0], pair[1]);
		add_pair(adjs, pair[1], pair[0]);
	});
	/** @type {Set<string>} */
	const candidates = new Set();
	for (let [k,set] of adjs.entries()) {
		const arr = Array.from(set);
		for (let i = 0; i < arr.length; i++) {
			for (let j = i + 1; j < arr.length; j++) {
				if (adjs.get(arr[i]).has(arr[j])) {
					candidates.add([k, arr[i], arr[j]].sort().join(","));
				}
			}
		}
	}
	return candidates;
}

export const count_start_with = (data, char = "t", set_count = 3) => {
	const groups = Array.from(find_sets_of(data, set_count)).map(str => str.split(","));
	let count = 0;
	groups.forEach(pair => {
		let found = false;
		for (let c of pair) {
			if (c.startsWith(char)) {
				count++;
				return;
			}
		}
	});
	return count;
};

/**
 * @param {string} data
 * @returns {string}
 */
export const find_passwd = (data) => {
	const groups = data.split("\n").map(line => line.split("-"));
	/** @type {Map<string, Set<string>>} */
	const adjs = new Map();
	groups.forEach(pair => {
		add_pair(adjs, pair[0], pair[1]);
		add_pair(adjs, pair[1], pair[0]);
	});

	let pw = "";
	let max = 0;

	/**
	 * @param {string} curr
	 */
	const brute_force = curr => {
		/** @type {string[]} */
		const neighbors = Array.from(adjs.get(curr));

		const candidates = [curr];
		for (let i = 0; i < neighbors.length - 1; i++) {
			let strong_connected = true;
			for (let j = i + 1; j < neighbors.length; j++) {
				if (!adjs.get(neighbors[i]).has(neighbors[j])) {
					strong_connected = false;
					break;
				}
			}
			if (strong_connected) {
				candidates.push(neighbors[i]);
				if (i === neighbors.length - 2) {
					candidates.push(neighbors[neighbors.length - 1]);
				}
			}
		}

		if (candidates.length > max) {
			max = candidates.length;
			pw = candidates.sort().join(",");
		}
	};

	for (let node of adjs.keys()) {
		brute_force(node);
	}

	return pw;
};

