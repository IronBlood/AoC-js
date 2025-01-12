/**
 * @param {string} data
 */
export const checksum = (data, part = 1) => {
	return data.split("\n").reduce((sum, line) => {
		const matches = line.match(/\d+/g);
		if (part === 1) {
			let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER;
			for (let i = 0; i < matches.length; i++) {
				const num = +matches[i];
				min = Math.min(min, num);
				max = Math.max(max, num);
			}
			return sum + max - min;
		} else {
			/** @type {number[]} */
			let nums = [];
			for (let i = 0; i < matches.length; i++) {
				nums.push(+matches[i]);
			}
			nums.sort((a,b) => a - b);
			for (let i = 0; i < nums.length - 1; i++) {
				for (let j = i + 1; j < nums.length; j++) {
					if (nums[j] % nums[i] === 0) {
						return sum + nums[j] / nums[i];
					}
				}
			}
		}
	}, 0);
};

