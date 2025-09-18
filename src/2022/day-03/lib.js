/**
 * @param {number} char
 */
const charcode_to_priority = char => {
	return char >= 97 ? (char - 97 + 1) : (char - 65 + 26 + 1);
};

/**
 * @param {string} line
 * @returns {number}
 */
const find_priority = (line) => {
	const map = Array(53).fill(0);
	const len = line.length, half = len >> 1;
	if (half * 2 !== len) {
		throw new Error(`odd length ${line}`);
	}
	for (let i = 0; i < half; i++) {
		map[charcode_to_priority(line.charCodeAt(i))]++;
	}
	for (let i = half; i < len; i++) {
		const priority = charcode_to_priority(line.charCodeAt(i));
		if (map[priority]) {
			return priority;
		}
	}
	throw new Error(`failed to find priority ${line}`);
};

/**
 * @param {string[]} lines
 * @param {number} idx
 */
const find_priority2 = (lines, idx) => {
	const maps = [];
	for (let i = idx; i < idx + 3; i++) {
		const line = lines[i];
		/** @type {number[]} */
		const map = Array(53).fill(0);
		for (let i = 0, len = line.length; i < len; i++) {
			map[charcode_to_priority(line.charCodeAt(i))]++;
		}
		maps.push(map);
	}

	const candidate = [];
	for (let p = 1; p <= 52; p++) {
		if ([0, 1, 2].every(x => maps[x][p])) {
			candidate.push(p);
		}
	}

	if (candidate.length !== 1) {
		throw new Error(`invalid block ${idx}`);
	}
	return candidate[0];
};

/**
 * @param {string} data
 */
export const sum_priorities = (data, part = 1) => {
	const lines = data.split("\n");
	if (part === 1) {
		return lines.map(find_priority).reduce((a, b) => a + b);
	} else {
		let sum = 0;
		for (let i = 0; i < lines.length; i += 3) {
			sum += find_priority2(lines, i);
		}
		return sum;
	}
}
