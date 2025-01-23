/**
 * @param {string} data
 * @returns {number}
 */
export const remain_units = (data, part = 1, char_idx = 0) => {
	/** @type {number} */
	const stack = [];
	let idx = 0;

	const char_l = 97 + char_idx,
		char_u = 65 + char_idx;

	for (let i = 0; i < data.length; i++) {
		const curr = data.charCodeAt(i);

		if (part === 2) {
			if (curr === char_l || curr === char_u) {
				continue;
			}
		}

		if (idx > 0 && Math.abs(curr - stack[idx-1]) === 32) {
			idx--;
		} else {
			stack[idx++] = curr;
		}
	}

	return idx;
};

/**
 * @param {string} data
 */
export const shortest = (data) => {
	let ans = data.length;
	for (let i = 0; i < 26; i++) {
		ans = Math.min(ans, remain_units(data, 2, i));
	}
	return ans;
};

