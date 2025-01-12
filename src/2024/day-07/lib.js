/**
 * @param {number} target
 * @param {number[]} nums
 * @returns {boolean}
 */
export const is_valid = (target, nums) => {
	let candidates = [nums[0]];
	for (let i = 1; i < nums.length; i++) {
		const tmp = [];
		candidates.forEach(x => {
			tmp.push(x * nums[i]);
			tmp.push(x + nums[i]);
		});
		candidates = tmp;
	}
	return candidates.some(x => x === target);
};

/**
 * @param {number} target
 * @param {number[]} nums
 * @returns {boolean}
 */
export const is_valid_2 = (target, nums) => {
	let candidates = [nums[0]];
	for (let i = 1; i < nums.length; i++) {
		let tmp = [];
		for (const c of candidates) {
			const str_a = String(c) + String(nums[i]);
			tmp.push(+str_a);
			let a = c + nums[i];
			if (a <= target)
				tmp.push(a);
			a = c * nums[i];
			if (a <= target)
				tmp.push(a);
		}
		candidates = tmp;
	}
	return candidates.some(x => x === target);
};

/**
 * @param {string} data
 * @returns {number}
 */
export const total_calibration = (data, part = 1) => {
	const valid_func = part === 1 ? is_valid : is_valid_2;
	return data.split("\n").reduce((sum, line) => {
		const arr = line.split(": ");
		const target = +arr[0], nums = arr[1].split(" ").map(Number);
		if (valid_func(target, nums)) {
			return (sum + target);
		} else {
			return sum;
		}
	}, 0);
};

