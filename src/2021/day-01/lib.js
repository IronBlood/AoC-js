/**
 * @param {number[]} nums
 */
const count_increase = (nums) => {
	let count = 0;
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] > nums[i-1])
			count++;
	}
	return count;
};

/**
 * @param {string} data
 */
export const count_measurements = (data, part = 1) => {
	const measurements = data.split("\n").map(Number);
	if (part === 1) {
		return count_increase(measurements);
	} else {
		const grouped = Array(measurements.length - 2);
		for (let i = 0; i < grouped.length; i++) {
			grouped[i] = measurements[i] + measurements[i+1] + measurements[i+2];
		}
		return count_increase(grouped);
	}
}
