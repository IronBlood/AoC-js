/**
 * @param {string} str
 */
export const floor = (str) => {
	let ans = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] == "(") ans++;
		else ans--;
	}
	return ans;
};

/**
 * @param {string} str
 */
export const first_enter_basement = (str) => {
	let ans = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] == "(") ans++;
		else ans--;

		if (ans < 0) return i + 1;
	}
	return -1;
}

