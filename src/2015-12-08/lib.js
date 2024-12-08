/**
 * @param {string} line
 * @returns {number}
 */
const real_len = line => {
	let count = 0;
	for (let i = 1, len = line.length - 1; i < len; ) {
		if (line[i] == '\\') {
			if (line[i+1] == 'x') {
				count++;
				i += 4;
			} else {
				count++;
				i += 2;
			}
		} else {
			count++;
			i++;
		}
	}
	return count;
};

/**
 * @param {string[]} lines
 * @returns {number}
 */
export const diff_decode = lines => {
	return lines.reduce((sum, curr) => {
		const x = real_len(curr);
		return sum + curr.length - x;
	}, 0);
};

/**
 * @param {string} line
 * @returns {number}
 */
const encode_len = line => {
	let len = 6;
	for (let i = 1, l = line.length; i < l - 1; i++) {
		const c = line[i];
		if (c == "\\" || c == "\"") {
			len += 2;
		} else {
			len++;
		}
	}
	return len;
};

/**
 * @param {string[]} lines
 * @returns {number}
 */
export const diff_encode = lines => {
	return lines.reduce((sum, curr) => {
		const x = encode_len(curr);
		return sum + x - curr.length;
	}, 0);
};

