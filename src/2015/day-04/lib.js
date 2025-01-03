import { createHash } from "node:crypto";

/**
 * @param {string} str
 * @returns {number}
 */
export const mine_coin = (str, digit = 5) => {
	const targeting = "0".repeat(digit);
	for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
		const md5 = createHash('md5');
		md5.update(`${str}${i}`);
		if (md5.digest('hex').startsWith(targeting))
			return i;
	}
};

