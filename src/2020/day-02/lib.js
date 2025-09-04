/**
 * @param {string} line
 * @returns {1|0}
 */
const check = (line, part = 1) => {
	const re = /(\d+)-(\d+) ([a-z]): ([a-z]+)/;
	const matches = re.exec(line);

	const char = matches[3];
	const pw = matches[4];

	if (part === 1) {
		const low = +matches[1];
		const high = +matches[2];
		let count = 0;
		for (let i = 0; i < pw.length; i++) {
			if (pw[i] === char)
				count++;
		}

		return (count >= low && count <= high) ? 1 : 0;
	} else {
		const left = +matches[1] - 1,
			right = +matches[2] - 1,
			a = pw[left],
			b = pw[right];

		return ((a === char && b !== char) || (a !== char && b === char)) ? 1 : 0;
	}
};

/**
 * @param {string} data
 */
export const count_valid_passwords = (data, part = 1) => {
	return data.split("\n").reduce((sum, line) => sum + check(line, part), 0);
};
