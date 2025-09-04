/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} left
 * @param {number} right
 */
const two_sum = (nums, target, left = 0, right = nums.length - 1) => {
	while (left < right) {
		const res = nums[left] + nums[right];

		if (res > target) {
			right--;
		} else if (res < target) {
			left++;
		} else {
			return nums[left] * nums[right];
		}
	}
};

/**
 * @param {string} data
 */
const get_nums = (data) => data.split("\n").map(Number).sort((a, b) => a - b);

/**
 * @param {string} data
 */
export const multiply = (data) => two_sum(get_nums(data), 2020);

/**
 * @param {string} data
 */
export const multiply_3 = (data) => {
	const nums = get_nums(data);

	for (let i = 0, len = nums.length; i < len - 2; i++) {
		const res = two_sum(nums, 2020 - nums[i], i + 1);
		if (res) {
			return res * nums[i];
		}
	}
};
