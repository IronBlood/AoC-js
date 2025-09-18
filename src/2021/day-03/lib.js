/**
 * @param {string[]} nums
 */
const get_the_most_common_digit_at_idx = (nums, idx) => {
	let count = 0;
	nums.forEach(line => {
		if (line[idx] === "1") {
			count++;
		} else {
			count--;
		}
	});
	return count;
};

/**
 * @param {string} data
 */
export const get_power_consumption = (data) => {
	const nums = data.split("\n"), len = nums[0].length;

	const gamma = Array(len), epsilon = Array(len);

	for (let i = 0; i < len; i++) {
		const count = get_the_most_common_digit_at_idx(nums, i);

		if (count > 0) {
			gamma[i] = "1";
			epsilon[i] = "0";
		} else {
			gamma[i] = "0";
			epsilon[i] = "1";
		}
	}

	return Number.parseInt(gamma.join(""), 2) * Number.parseInt(epsilon.join(""), 2);
};

/**
 * @param {string[]} nums
 */
const find_in_common = (nums, most = true) => {
	const len = nums[0].length;
	let idx = 0;

	while (nums.length > 1) {
		const c = get_the_most_common_digit_at_idx(nums, idx) >= 0 ? "1" : "0";
		nums = most
			? nums.filter(x => x[idx] === c)
			: nums.filter(x => x[idx] !== c);
		idx = (idx + 1) % len;
	}

	return nums[0];
};

/**
 * @param {string} data
 */
export const get_life_support_rating = (data) => {
	const numbers = data.split("\n");

	const o_rating = find_in_common(numbers),
		c_rating = find_in_common(numbers, false);

	return Number.parseInt(o_rating, 2) * Number.parseInt(c_rating, 2);
};
