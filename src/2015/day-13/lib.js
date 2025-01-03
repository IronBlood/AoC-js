/**
 * @param {string} data
 */
export const arrange = (data, part = 1) => {
	/** @type {Map<string, id>} */
	const name_to_id = new Map();
	let id = 0;

	const lines = data.split("\n").map(t => t.slice(0, t.length - 1));

	// first pass
	lines.forEach(t => {
		const arr = t.split(" ");
		for (const name of [arr[0], arr[arr.length - 1]]) {
			if (!name_to_id.has(name)) {
				name_to_id.set(name, id++);
			}
		}
	});

	const grid = Array.from({ length: id }, () => Array(id).fill(0));
	// second pass
	lines.forEach(t => {
		const arr = t.split(" ");
		const u = name_to_id.get(arr[0]),
			v = name_to_id.get(arr[arr.length - 1]);
		grid[u][v] = arr[2] == "lose" ? -Number(arr[3]) : Number(arr[3]);
	});

	let ans = Number.MIN_SAFE_INTEGER;

	/**
	 * @param {number[]} seats
	 * @returns {number}
	 */
	const calc = (part === 1) ? seats => {
		let sum = 0;
		for (let i = 0; i < seats.length - 1; i++) {
			const a = seats[i], b = seats[i+1];
			sum += grid[a][b] + grid[b][a];
		}
		// for the test case and the input, start and end won't be calculated twice
		const s = seats[0], e = seats[seats.length - 1];
		sum += grid[s][e] + grid[e][s];
		return sum;
	} : seats => {
		let sum = 0;
		for (let i = 0; i < seats.length - 1; i++) {
			const a = seats[i], b = seats[i+1];
			sum += grid[a][b] + grid[b][a];
		}
		return sum;
	};

	/**
	 * @param {number[]} seats
	 * @param {number[]} candidates
	 * @param {Set<number>} seen
	 */
	const backtracking = (seats, candidates, seen) => {
		if (seen.size == candidates.length) {
			ans = Math.max(ans, calc(seats));
		} else {
			for (let i = 0; i < candidates.length; i++) {
				if (seen.has(i)) continue;
				seats.push(candidates[i]);
				seen.add(i);
				backtracking(seats, candidates, seen);
				seen.delete(i);
				seats.pop();
			}
		}
	}

	const candidates = [];
	if (part === 1) {
		for (let i = 1; i < id; i++) candidates.push(i);
		backtracking([0], candidates, new Set());
	} else {
		for (let i = 0; i < id; i++) candidates.push(i);
		backtracking([], candidates, new Set());
	}

	return ans;
};

