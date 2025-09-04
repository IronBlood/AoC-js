/**
 * @param {string} group
 */
const count_group = (group) => {
	const set = new Set();
	group.split("\n").forEach(line => {
		for (let i = 0; i < line.length; i++) {
			set.add(line[i]);
		}
	});
	return set.size;
};

/**
 * @param {string} group
 */
const count_group_2 = (group) => {
	const lines = group.split("\n");

	let sum = 0;
	for (let i = 97; i < 97 + 26; i++) {
		const c = String.fromCharCode(i);
		if (lines.every(x => x.includes(c))) {
			sum++;
		}
	}
	return sum;
};

/**
 * @param {string} data
 */
export const sum_counts = (data, part = 1) => {
	const fn = part === 1 ? count_group : count_group_2;
	return data.split("\n\n").reduce((sum, group) => sum + fn(group), 0)
};

