// @ts-check

/**
 * @param {number[]} arr
 */
const shrimp = (arr) => Array.from({ length: arr.length - 1 }, (_, idx) => arr[idx + 1] - arr[idx])

/**
 * @param {number[]} arr
 */
const find_next = (arr, part) => {
	if (arr.every(x => x === 0)) {
		arr.push(0);
	} else {
		const delta = shrimp(arr);
		find_next(delta, part);
		if (part === 1) {
			arr.push(arr[arr.length - 1] + delta[delta.length - 1]);
		} else {
			arr.unshift(arr[0] - delta[0]);
		}
	}
};

/**
 * @param {string} line
 * @returns {number}
 */
const get_next = (line, part) => {
	const nums = line.split(" ").map(Number);
	find_next(nums, part);
	return part === 1 ? nums[nums.length - 1] : nums[0];
};

/**
 * @param {string} data
 */
export const sum_extrapolated = (data, part = 1) => {
	return data.split("\n").map(line => get_next(line, part)).reduce((a, b) => a + b);
};
