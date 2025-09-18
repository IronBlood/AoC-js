/** @type {() => number[]} */
const init_map = () => Array(9).fill(0);

/**
 * @param {string} data
 */
export const count_lanternfish = (data, day = 80) => {
	let map = init_map();
	data.split(",").forEach(x => map[+x]++);

	while (day-- > 0) {
		const next_map = init_map();

		for (let i = 1; i < 9; i++) {
			next_map[i-1] = map[i];
		}

		next_map[6] += (next_map[8] = map[0]);

		map = next_map;
	}

	return map.reduce((a, b) => a + b);
};
