/**
 * @param {string} str
 * @param {number} start
 * @param {number?} end
 */
const match_abba = (str, start, end) => {
	end = end || str.length;
	for (let i = start; i < end - 3; i++) {
		if (str[i] == str[i+3] && str[i+1] == str[i+2] && str[i] != str[i+1])
			return true;
	}
	return false;
};

/**
 * @param {string} str
 * @returns {0|1}
 */
export const support_tls = str => {
	let outside_abba = false;
	let idx = 0, idx_lsb = -1, idx_rsb;
	while ((idx_lsb = str.indexOf("[", idx)) != -1) {
		idx_rsb = str.indexOf("]", idx_lsb + 1);
		if (!outside_abba && match_abba(str, idx, idx_lsb)) {
			outside_abba = true;
		}
		if (match_abba(str, idx_lsb + 1, idx_rsb))
			return 0;
		idx = idx_rsb + 1;
	}
	return (outside_abba || match_abba(str, idx)) ? 1 : 0;
};

/**
 * @param {string} str
 * @param {number} start
 * @param {number?} end
 */
const find_aba = (str, start, end) => {
	end = end || str.length;
	for (let i = start; i < end - 2; i++) {
		if (str[i] == str[i+2] && str[i] != str[i+1])
			return i;
	}
	return -1;
};

/**
 * @param {string} str
 * @returns {0|1}
 */
export const support_ssl = str => {
	/** @type {string[]} */
	const segments = [];
	let idx = 0, idx_lsb = -1, idx_rsb;
	while ((idx_lsb = str.indexOf("[", idx)) != -1) {
		idx_rsb = str.indexOf("]", idx_lsb + 1);
		segments.push(str.substring(idx, idx_lsb));
		segments.push(str.substring(idx_lsb + 1, idx_rsb));
		idx = idx_rsb + 1;
	}
	if (idx < str.length) {
		segments.push(str.substring(idx));
	}

	for (let i = 0; i < segments.length - 1; i++) {
		const seg = segments[i];
		let idx = 0;
		while ((idx = find_aba(seg, idx)) != -1) {
			const a = seg[idx], b = seg[idx+1], target = b + a + b;
			for (let j = i + 1; j < segments.length; j += 2) {
				if (segments[j].indexOf(target) >= 0) {
					return 1;
				}
			}
			idx++;
		}
	}
	return 0;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_supports = (data, part = 1) => {
	return data.split("\n").reduce((sum, line) => sum + ((part === 1) ? support_tls(line) : support_ssl(line)), 0);
};

