/**
 * @param {string} str
 * @returns {number}
 */
export const total_square = (str) => {
	const l = str.split("x").map(Number);
	let area = 0, smallest = Number.MAX_SAFE_INTEGER, tmp;

	for (let i = 0; i < 2; i++) {
		for (let j = i + 1; j < 3; j++) {
			tmp = l[i] * l[j];
			smallest = Math.min(smallest, tmp);
			area += 2 * tmp;
		}
	}

	return area + smallest;
};

/**
 * @param {string} str
 * @returns {number}
 */
export const total_ribbon = (str) => {
	const [a, b, c] = str.split("x").map(Number).sort((a, b) => a - b);
	return a * b * c + 2 * (a + b);
};

