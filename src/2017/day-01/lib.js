/**
 * @param {string} data
 * @returns {number}
 */
export const get_captcha = (data, part = 1) => {
	let sum = 0;
	for (let i = 0, len = data.length, half = len / 2; i < len; i++) {
		const j = (i + (part === 1 ? 1 : half)) % len;
		if (data[i] == data[j]) {
			sum += +data[i];
		}
	}
	return sum;
};

