/**
 * @param {string} data
 */
export const get_first_exception = (data, preamble_size = 25, part = 1) => {
	const numbers = data.split("\n").map(Number);

	/** @type {Map<number, [number, number][]>} */
	let sums = new Map();

	/**
	 * @param {number} num
	 * @param {[number, number]} indices
	 */
	const add_sum = (num, indices) => {
		if (sums.has(num)) {
			sums.get(num).push(indices);
		} else {
			sums.set(num, [indices]);
		}
	};

	/**
	 * @param {number} index
	 */
	const remove_sum = (index) => {
		for (const [key, combines] of sums.entries()) {
			const new_combines = [];
			for (const x of combines) {
				if (x.includes(index))
					continue;
				new_combines.push(x);
			}

			if (new_combines.length === 0) {
				sums.delete(key);
			} else if (new_combines.length < combines.length) {
				sums.set(key, new_combines);
			}
		}
	};

	for (let i = 0; i < preamble_size - 1; i++) {
		for (let j = i + 1; j < preamble_size; j++) {
			add_sum(numbers[i] + numbers[j], [i, j]);
		}
	}

	for (let i = preamble_size; i < numbers.length; i++) {
		const x = numbers[i];
		if (!sums.has(x)) {
			return (part === 1) ? x : find_weakness(numbers, x, i);
		}

		const prev = i - preamble_size;
		remove_sum(prev);

		for (let j = i - 1; j > prev; j--) {
			const y = numbers[j];
			add_sum(x + y, [j, i]);
		}
	}
};

/**
 * @param {number[]} numbers
 * @param {number} target
 * @param {number} ending
 */
const find_weakness = (numbers, target, ending) => {
	const memo = Array(ending + 1);
	memo[0] = 0;

	for (let i = 0; i < ending; i++) {
		memo[i+1] = memo[i] + numbers[i];
	}

	for (let i = 1; i <= ending; i++) {
		for (let j = 0; j < i; j++) {
			if (memo[i] - memo[j] === target) {
				return exec(numbers, j, i);
			}
		}
	}
};

/**
 * @param {number[]} numbers
 * @param {number} l
 * @param {number} r
 */
const exec = (numbers, l, r) => {
	let max = Number.MIN_SAFE_INTEGER, min = Number.MAX_SAFE_INTEGER;
	for (let i = l; i < r; i++) {
		max = Math.max(max, numbers[i]);
		min = Math.min(min, numbers[i]);
	}
	return max + min;
};

