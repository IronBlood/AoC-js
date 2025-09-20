// @ts-check

/**
 * @param {string} line
 * @returns {number}
 */
const check = line => {
	const [id, str] = line.split(": ");
	const sets = str.split("; ");

	/** @type {[RegExp, number][]} */
	const re = [
		[/(\d+) red/, 12],
		[/(\d+) green/, 13],
		[/(\d+) blue/, 14],
	];

	for (const set of sets) {
		for (const r of re) {
			const match = set.match(r[0]);
			if (!match)
				continue

			const num = +match[1];
			if (num > r[1])
				return 0;
		}
	}

	return +id.substring(5);
};

/**
 * @param {string} line
 * @returns {number}
 */
const power = line => {
	const [id, str] = line.split(": ");
	const sets = str.split("; ");

	const re = [
		/(\d+) red/,
		/(\d+) green/,
		/(\d+) blue/,
	];

	const cubes = [0, 0, 0];
	for (const set of sets) {
		re.forEach((r, i) => {
			const match = set.match(r);
			if (match) {
				const num = +match[1];
				cubes[i] = Math.max(cubes[i], num);
			}
		});
	}

	return cubes.reduce((a, b) => a * b);
};

/**
 * @param {string} data
 */
export const possible_ids = (data) => {
	return data.split("\n").reduce((sum, line) => sum + check(line), 0);
}

/**
 * @param {string} data
 */
export const sum_power = (data) => {
	return data.split("\n").reduce((sum, line) => sum + power(line), 0);
}
