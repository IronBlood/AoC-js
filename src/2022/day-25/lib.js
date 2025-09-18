const is_digit = (x) => /[0-9]/.test(x);

/**
 * @param {string} str
 * @returns {number}
 */
export const snafu_to_decimal = (str) => {
	let res = 0;
	for (let i = 0; i < str.length; i++) {
		const c = str[i];
		res *= 5;

		if (is_digit(c)) {
			res += +c;
		} else if (c === "-") {
			res -= 1;
		} else if (c === "=") {
			res -= 2;
		} else {
			throw new Error("never");
		}
	}
	return res;
};

/**
 * @param {number} num
 * @returns {string}
 */
export const decimal_to_snafu = (num) => {
	const res = [];
	while (num != 0) {
		const r = num % 5;
		num = (num - r) / 5;
		if (r < 3) {
			res.push(r);
		} else if (r === 3) {
			res.push("=");
			num++;
		} else if (r === 4) {
			res.push("-");
			num++;
		}
	}
	return res.reverse().join("");
};

/**
 * @param {string} data
 * @returns {string}
 */
export const get_snafu_number = (data) => {
	const sum = data.split("\n").map(snafu_to_decimal).reduce((a, b) => a + b);
	return decimal_to_snafu(sum);
}
