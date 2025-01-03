/**
 * @param {string} cfg
 * @param {number} part
 * @param {number} range the maximum value, excluded
 * @returns {number}
 */
export const lowest_ip = (cfg, part = 1, range = 4294967296) => {
	const settings = cfg.split("\n").map(line => line.split("-").map(Number));
	settings.sort((a, b) => a[0] === b[0] ? (b[1] - a[1]) : (a[0] - b[0]));

	if (settings[0][0] !== 0 && part === 1) {
		return 0;
	}

	const stack = [];
	for (let i = 0; i < settings.length; i++) {
		const curr = settings[i];

		// simple cases
		if (stack.length === 0) {
			stack.push(curr);
			continue;
		}

		// curr setting is included
		if (curr[1] <= stack[stack.length-1][1]) {
			continue;
		}

		// interconnected or connected, merge
		if (curr[0] <= stack[stack.length-1][1] + 1) {
			stack[stack.length-1][1] = curr[1];
			continue;
		}

		if (part === 1)
			return stack[stack.length-1][1] + 1;

		stack.push(curr);
	}

	let prev = -1, count = 0;
	for (let i = 0; i < stack.length; i++) {
		const curr = stack[i];
		count += (curr[0] - prev - 1);
		prev = curr[1];
	}
	count += range - prev - 1;
	return count;
};

