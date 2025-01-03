/**
 * @param {string[]} lines
 * @returns {number}
 */
export const shortest = (lines) => {
	/** @type {Map<string, [string, number][]>} */
	const adj = new Map();
	lines.forEach(t => {
		const arr = t.split(" ");
		const distance = +arr[4];
		for (const city of [arr[0], arr[2]]) {
			if (!adj.has(city)) {
				adj.set(city, []);
			}
		}
		adj.get(arr[0]).push([arr[2], distance]);
		adj.get(arr[2]).push([arr[0], distance]);
	});

	let ans = Number.MAX_SAFE_INTEGER;
	/**
	 * @param {Set<string>} seen
	 * @param {string} curr
	 * @param {number} sum
	 */
	const dfs = (seen, curr, sum) => {
		if (seen.size == adj.size) {
			ans = Math.min(ans, sum);
		}
		for (let [next, distance] of adj.get(curr)) {
			if (seen.has(next))
				continue;
			seen.add(next);
			dfs(seen, next, sum + distance);
			seen.delete(next);
		}
	};

	for (let city of adj.keys()) {
		const seen = new Set();
		seen.add(city);
		dfs(seen, city, 0);
	}

	return ans;
};

/**
 * @param {string[]} lines
 * @returns {number}
 */
export const longest = (lines) => {
	/** @type {Map<string, [string, number][]>} */
	const adj = new Map();
	lines.forEach(t => {
		const arr = t.split(" ");
		const distance = +arr[4];
		for (const city of [arr[0], arr[2]]) {
			if (!adj.has(city)) {
				adj.set(city, []);
			}
		}
		adj.get(arr[0]).push([arr[2], distance]);
		adj.get(arr[2]).push([arr[0], distance]);
	});

	let ans = 0;
	/**
	 * @param {Set<string>} seen
	 * @param {string} curr
	 * @param {number} sum
	 */
	const dfs = (seen, curr, sum) => {
		if (seen.size == adj.size) {
			ans = Math.max(ans, sum);
		}
		for (let [next, distance] of adj.get(curr)) {
			if (seen.has(next))
				continue;
			seen.add(next);
			dfs(seen, next, sum + distance);
			seen.delete(next);
		}
	};

	for (let city of adj.keys()) {
		const seen = new Set();
		seen.add(city);
		dfs(seen, city, 0);
	}

	return ans;
};

