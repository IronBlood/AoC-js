/**
 * @param {number[]} arr
 */
const sum = arr => arr.reduce((sum, curr) => sum + curr, 0);
/**
 * @param {string} data
 */
export const get_quantum = (data, groups = 3) => {
	const nums = data.split("\n").map(Number);
	const weight = sum(nums) / groups;
	nums.sort((a, b) => a - b);

	/** @type {number[][]} */
	const candidates = [];

	/**
	 * @param {number[]} stack
	 * @param {number} curr_idx
	 * @param {number} remain
	 */
	const backtracking = (stack, curr_idx, remain) => {
		if (remain == 0) {
			candidates.push([...stack]);
			return;
		}
		for (let i = curr_idx - 1; i >= 0; i--) {
			if (remain - nums[i] >= 0) {
				stack.push(nums[i]);
				backtracking(stack, i, remain - nums[i]);
				stack.pop();
			}
		}
	};

	backtracking([], nums.length, weight);
	candidates.sort((a, b) => a.length - b.length);
	const final_stage = candidates.filter(x => x.length == candidates[0].length);

	let smallest = Number.MAX_SAFE_INTEGER;
	final_stage.forEach(x => {
		const mul = x.reduce((r, c) => r * c, 1);
		if (Number.isNaN(mul)) {
			console.log(x);
		} else if (smallest > mul) {
			smallest = mul;
		}
	});

	return smallest;
}

