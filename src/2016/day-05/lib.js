import { createHash } from "node:crypto";

/**
 * @param {string} str
 */
export const find_pw = (str, part = 1, digit = 5) => {
	let pw = Array(8);
	const target = "0".repeat(digit);
	let count = 0;
	for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
		const md5 = createHash('md5');
		md5.update(`${str}${i}`);
		const checksum = md5.digest('hex');
		if (checksum.startsWith(target)) {
			if (part === 1) {
				pw[count++] = checksum[digit];
			} else {
				const idx = checksum.charCodeAt(digit) - 48;
				if (idx < 0 || idx >= 8 || pw[idx] !== undefined)
					continue;
				count++;
				pw[idx] = checksum[digit+1];
			}
			if (count == 8)
				return pw.join("");
		}
	}
	return "";
};

