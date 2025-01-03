/**
 * @param {string} str
 * @returns {0|1}
 */
export const is_nice = (str) => {
	let count_vowel = 0;
	for (let i = 0; i < str.length; i++) {
		const c = str[i];
		if (c == "a" || c == "e" || c == "i" || c == "o" || c == "u")
			count_vowel++;
		if (count_vowel == 3)
			break;
	}
	if (count_vowel < 3)
		return 0;

	for (const x of ["ab", "cd", "pq", "xy"]) {
		if (str.indexOf(x) >= 0)
			return 0;
	}

	let count_repeat = 0;
	for (let i = 1; i < str.length; i++) {
		if (str[i] == str[i - 1])
			return 1;
	}
	return 0;
};

/**
 * @param {string} str
 * @returns {0|1}
 */
export const is_nice2 = (str) => {
	let found = false;
	for (let i = 0; i < str.length - 2; i++) {
		const t = str.substring(i, i + 2);
		if (str.indexOf(t, i + 2) >= 0) {
			found = true;
			break;
		}
	}
	if (!found) return 0;

	found = false;
	for (let i = 1; i < str.length - 1; i++) {
		if (str[i-1] == str[i+1]) {
			found = true;
			break;
		}
	}

	return found ? 1 : 0;
};

