/**
 * @param {number} num
 * @returns {0|1}
 */
export const valid_password = num => {
	let digits = num.toString().split("").map(Number);

	let found_adj = false;
	for (let i = 0; i < 5; i++) {
		if (digits[i] === digits[i + 1]) {
			found_adj = true;
			break;
		}
	}
	if (!found_adj)
		return 0;

	for (let i = 0; i < 5; i++) {
		if (digits[i] > digits[i + 1]) {
			return 0;
		}
	}

	return 1;
};

/**
 * @param {number} num
 * @returns {0|1}
 */
export const valid_password2 = num => {
	let digits = num.toString().split("").map(Number);

	for (let i = 0; i < 5; i++) {
		if (digits[i] > digits[i + 1]) {
			return 0;
		}
	}

	let found_adj = false;
	let i = 0;

	while (i < 6) {
		let j = i + 1;
		while (j < 6 && digits[j] === digits[i]) {
			j++;
		}
		if (j - i === 2) {
			found_adj = true;
			break;
		}
		i = j;
	}

	return found_adj ? 1 : 0;
};

/**
 * @param {string} data
 */
export const count_passwords = (data, part = 1) => {
	const [low, high] = data.split("-").map(Number);
	let sum = 0;
	for (let i = low; i <= high; i++) {
		sum += part === 1 ? valid_password(i) : valid_password2(i);
	}
	return sum;
}
