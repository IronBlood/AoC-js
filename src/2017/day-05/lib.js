/**
 * @param {string} data
 * @returns {number}
 */
export const count_steps = (data, part = 1) => {
	const instructions = data.split("\n").map(Number);
	let i = 0;
	let count = 0;
	while (i < instructions.length) {
		const next_idx = instructions[i] + i;
		if (part === 1 || instructions[i] < 3) {
			instructions[i]++;
		} else {
			instructions[i]--;
		}
		count++;
		i = next_idx;
	}
	return count;
};

