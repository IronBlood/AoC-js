/**
 * @param {string[]} lines
 * @param {number} idx
 */
const get_message_by_column = (lines, idx, part = 1) => {
	const freq = Array(26).fill(0);
	lines.forEach(line => freq[line.charCodeAt(idx) - 97]++);
	let max = freq[0], max_idx = 0, min = freq[0], min_idx = 0;
	for (let i = 0; i < 26; i++) {
		if (freq[i] > max) {
			max = freq[i];
			max_idx = i;
		}
		if (freq[i] < min) {
			min = freq[i];
			min_idx = i;
		}
	}
	return 97 + (part == 1 ? max_idx : min_idx);
};

/**
 * @param {string} data
 */
export const get_message = (data, part = 1) => {
	const lines = data.split("\n");
	const len = lines[0].length;
	let buf = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		buf[i] = get_message_by_column(lines, i, part);
	}
	return new TextDecoder().decode(buf);
};

