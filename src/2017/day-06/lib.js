/**
 * @param {number[]} nums
 */
const dispatch = (nums) => {
	let max_idx = 0, max = nums[0];
	for (let i = 1; i < nums.length; i++) {
		if (max < nums[i]) {
			max = nums[i];
			max_idx = i;
		}
	}
	const count = max % nums.length, x = Math.ceil(max / nums.length);
	nums[max_idx] = 0;
	for (let i = 0; i < nums.length; i++) {
		const idx = (max_idx + 1 + i) % nums.length;
		if (count === 0) {
			nums[idx] += x;
		} else {
			nums[idx] += i < count ? x : (x - 1);
		}
	}
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_cycles = (data, part = 1) => {
	/** @type {number[]} */
	const nums = [];
	const matches = data.match(/\d+/g);
	for (let m of matches) {
		nums.push(+m);
	}

	/** @type {Set<string>} */
	const seen = new Set();
	let seen_state = "";
	while (true) {
		const key = nums.join(",");
		if (seen.has(key)) {
			seen_state = key;
			break;
		}
		seen.add(key);

		dispatch(nums);
	}

	if (part === 1)
		return seen.size;

	let count = 0;
	let key;
	do {
		count++;
		dispatch(nums);
		key = nums.join(",");
	} while (key !== seen_state)

	return count;
};

