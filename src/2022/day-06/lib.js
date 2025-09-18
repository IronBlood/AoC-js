/**
 * @param {string} str
 * @param {number} idx
 */
const char_to_idx = (str, idx) => str.charCodeAt(idx) - 97;

/**
 * @param {number[]} freq
 */
const check_marker = (freq) => {
	for (let i = 0; i < 26; i++) {
		if (freq[i] > 1)
			return false;
	}
	return true;
};

/**
 * @param {string} data
 */
export const count_chars = (data, part = 1) => {
	const freq = Array(26).fill(0);

	const len = part === 1 ? 4 : 14;

	let i = 0;
	for (; i < len; i++) {
		freq[char_to_idx(data, i)]++;
	}

	while (!check_marker(freq) && i < data.length) {
		freq[char_to_idx(data, i - len)]--;
		freq[char_to_idx(data, i)]++;
		i++;
	}

	return i;
};
