const CHAR_LP = "(", CHAR_RP = ")";

/**
 * @param {string} data
 * @returns {number}
 */
export const count_decompressed_length = (data) => {
	let len = 0, idx = 0, idx_lp = -1, idx_rp = -1;

	while ((idx_lp = data.indexOf(CHAR_LP, idx)) >= 0) {
		len += idx_lp - idx;
		idx_rp = data.indexOf(CHAR_RP, idx_lp + 1);

		// if no right parenthese
		if (idx_rp < -1) {
			len += data.length - idx_lp;
			idx = data.length;
			break;
		}
		const repeat_pattern = data.substring(idx_lp + 1, idx_rp);
		const arr = repeat_pattern.split("x");
		if (arr.length != 2 || arr.some(x => !/^\d+$/.test(x))) {
			console.log("invalid cases", repeat_pattern);
		}
		const [count, times] = arr.map(Number);
		len += count * times;
		idx = idx_rp + 1 + count;
	}

	return len + (data.length - idx);
};

/**
 * @param {string} data
 * @param {number?} start
 * @param {number?} end
 */
export const count_decompressed_length_2 = (data, start = 0, end = data.length) => {
	let len = 0, idx = start, idx_lp = -1, idx_rp = -1;

	while ((idx_lp = data.indexOf(CHAR_LP, idx)) >= 0 && (idx_lp < end)) {
		len += idx_lp - idx;
		idx_rp = data.indexOf(CHAR_RP, idx_lp + 1);

		const marker_str = data.substring(idx_lp + 1, idx_rp);
		const [count, times] = marker_str.split("x").map(Number);
		len += times * count_decompressed_length_2(data, idx_rp + 1, idx_rp + 1 + count);
		idx = idx_rp + 1 + count;
	}

	return len + Math.max(end - idx, 0);
};

