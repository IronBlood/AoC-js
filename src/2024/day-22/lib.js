const MOD = 16777216;

/**
 * @param {number} num
 */
export const next_secret_num = num => {
	let tmp = num * 64;
	num ^= tmp;
	num %= MOD;

	tmp = (num / 32) | 0;
	num ^= tmp;
	num %= MOD;

	tmp = num * 2048;
	num ^= tmp;
	num %= MOD;
	
	if (num < 0)
		num += MOD

	return num;
};

/**
 * @param {string} data
 */
export const sum_2000th = (data) => {
	return data.split("\n").reduce((sum, line) => {
		let num = Number(line);
		let count = 2000;
		while (count-- > 0) {
			num = next_secret_num(num);
		}
		return sum + num;
	}, 0);
};

/**
 * @param {string} data
 * @param {number} cycles
 */
export const max_seq = (data, cycles = 2000) => {
	const lines = data.split("\n");
	/** @type {number[][]} */
	const deltas = Array.from({ length: lines.length }, () => Array(cycles - 1));
	const prices = lines.map(line => {
		let num = Number(line);
		/** @type {number[]} */
		const arr = Array(cycles);
		let i = 0;
		do {
			arr[i++] = num % 10;
			num = next_secret_num(num);
		} while (i < cycles);
		return arr;
	});
	prices.forEach((p, row) => {
		for (let i = 0; i < cycles - 1; i++) {
			deltas[row][i] = p[i + 1] - p[i];
		}
	});
	/** @param {Map<string, number>} */
	const seq_sum_map = new Map();
	prices.forEach((p, row) => {
		let visited = new Set();
		for (let i = 4; i < p.length; i++) {
			const diff_seq = deltas[row].slice(i-4, i).join(",");
			if (visited.has(diff_seq))
				continue;
			visited.add(diff_seq);
			seq_sum_map.set(diff_seq, (seq_sum_map.get(diff_seq) || 0) + p[i]);
		}
	});
	let max = Number.MIN_SAFE_INTEGER;
	for (let [k, v] of seq_sum_map.entries()) {
		if (max < v) {
			max = v;
		}
	}
	return max;
};

