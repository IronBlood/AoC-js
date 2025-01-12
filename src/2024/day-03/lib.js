/**
 * @param {string} cmd
 * @returns {number}
 */
export const parse_and_calc = (cmd) => {
	const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
	const matches = Array.from(cmd.matchAll(regex));
	return matches.reduce((sum, curr) => sum + Number(curr[1]) * Number(curr[2]), 0);
}

/**
 * @param {string} cmd
 * @returns {number}
 */
export const parse_and_calc_with_flags = (cmd) => {
	const regex_e = /do\(\)/g,
		regex_d = /don't\(\)/g,
		regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

	const matches = [...cmd.matchAll(regex), ...cmd.matchAll(regex_e), ...cmd.matchAll(regex_d)].sort((a, b) => a.index - b.index);
	let result = 0, enabled = true;
	for (let m of matches) {
		if (m[0] == "do()") {
			enabled = true;
		} else if (m[0] == "don't()") {
			enabled = false;
		} else if (enabled) {
			result += Number(m[1]) * Number(m[2]);
		}
	}
	return result;
};

