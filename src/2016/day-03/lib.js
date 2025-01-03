/**
 * @param {number[]} nums
 */
export const can_form_a_triangle = nums => {
	nums.sort((a, b) => a - b);
	return nums[0] + nums[1] > nums[2] ? 1 : 0;
};

/**
 * @param {string} data
 */
export const count_triangles = data => {
	return data.split("\n").reduce((sum, line) => {
		const matches = line.match(/^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/);
		return sum + can_form_a_triangle([+matches[1], +matches[2], +matches[3]]);
	}, 0);
};

/**
 * @param {string} data
 */
export const count_triangles_by_column = data => {
	const lines = data.split("\n");
	let count = 0;
	for (let i = 0; i < lines.length - 2; i += 3) {
		const segments = lines.slice(i, i + 3).map(x => {
			const matches = x.match(/^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/);
			return [+matches[1], +matches[2], +matches[3]];
		});
		for (let j = 0; j < 3; j++) {
			count += can_form_a_triangle([segments[0][j], segments[1][j], segments[2][j]]);
		}
	}
	return count;
};

