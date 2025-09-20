// @ts-check

/**
 * @param {string} line
 * @returns {number}
 */
const get_matchings = (line) => {
	const cfg = line.split(": ")[1];
	const [str_l, str_r] = cfg.split(" | ");

	/** @type {Set<number>} */
	// @ts-ignore
	const set = new Set([...str_l.match(/\d+/g)].map(Number));

	let count = 0;
	// @ts-ignore
	for (const x of str_r.match(/\d+/g)) {
		const n = +x;
		if (set.has(n))
			count++;
	}
	return count;
};

/**
 * @param {string} line
 * @returns {number}
 */
export const get_point_per_line = (line) => {
	const count = get_matchings(line);
	const res = count === 0 ? 0 : Math.pow(2, count - 1);
	return res;
};

/**
 * @param {string} data
 */
export const get_points = data => {
	return data.split("\n").reduce((sum, line) => sum + get_point_per_line(line), 0);
};

/**
 * @param {string} data
 */
export const count_cards = (data) => {
	const lines = data.split("\n");

	/** @type {number[]} */
	const cards = Array(lines.length + 1).fill(1, 1);
	cards[0] = 0;

	for (let i = 0; i < lines.length; i++) {
		const id = i + 1;
		const count = get_matchings(lines[i]);
		for (let j = id + 1, max = Math.min(cards.length, id + 1 + count); j < max; j++) {
			cards[j] += cards[id];
		}
	}

	return cards.reduce((a, b) => a + b);
};
