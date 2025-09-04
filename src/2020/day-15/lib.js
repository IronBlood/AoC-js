/**
 * @param {string} data
 */
export const get_nth_num = (data, part = 1) => {
	const max = part === 1 ? 2020 : 30_000_000;
	const nums = data.split(",").map(Number);

	const map_idx = Array(max + 100).fill(-1);

	for (let i = 0; i < nums.length - 1; i++) {
		map_idx[nums[i]] = i;
	}

	let last = nums[nums.length - 1];
	for (let i = nums.length - 1; i < max - 1; i++) {
		const prev = map_idx[last];
		map_idx[last] = i;
		last = prev === -1 ? 0 : (i - prev);
	}

	return last;
};
