/**
 * @param {string} data
 */
const build_nums = (data) => {
	const nums = data.split("\n").map(Number);
	nums.push(0);
	nums.sort((a, b) => a - b);
	nums.push(nums[nums.length - 1] + 3);
	return nums;
};

/**
 * @param {string} data
 */
export const diff_1_and_3_jolt_product = (data) => {
	const nums = build_nums(data);

	const diffs = Array(4).fill(0);
	for (let i = 1; i < nums.length; i++) {
		diffs[nums[i] - nums[i-1]]++;
	}

	return diffs[1] * diffs[3];
};

/**
 * @param {string} data
 */
export const find_ways = (data) => {
	const nums = build_nums(data);
	const len = nums.length;
	/** @type {bigint[]} */
	const dp = Array(len).fill(0n);
	dp[0] = 1n;
	for (let i = 1; i < len; i++) {
		for (let j = i - 1; j >= 0 && (nums[i] - nums[j]) <= 3; j--) {
			dp[i] += dp[j];
		}
	}
	return dp[len - 1];
};

