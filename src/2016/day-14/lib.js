import { createHash } from "node:crypto";

/**
 * @param {string} str
 * @param {number} times
 */
export const get_md5 = (str, times) => {
	while (times-- > 0) {
		str = createHash("md5").update(str).digest("hex");
	}
	return str;
};

/**
 * @param {string} salt
 * @returns {number}
 */
export const get_index = (salt, part = 1) => {
	/** @type {{ idx: number; hash?: string; key: string }[]} */
	const triple_hashes = [];
	/** @type {typeof triple_hashes} */
	const keys = [];

	const five_times = "0123456789abcdef".split("").map(x => [x, x.repeat(5)]);

	let idx = 0;
	while (keys.length < 64) {
		const checksum = get_md5(`${salt}${idx}`, part === 1 ? 1 : 2017);

		for (let i = 0; i < checksum.length - 2; i++) {
			const char = checksum[i];
			if (char === checksum[i+1] && char === checksum[i+2]) {
				triple_hashes.push({
					idx,
					key: char,
				});
				break;
			}
		}

		const f = five_times.reduce((arr, [c, s]) => {
			if (checksum.indexOf(s) >= 0) {
				arr.push(c);
			}
			return arr;
		}, []);

		f.forEach(x => {
			for (let i = 0; i < triple_hashes.length; i++) {
				let diff = 0;
				if (triple_hashes[i].key === x && (diff = (idx - triple_hashes[i].idx)) > 0 && diff <= 1000) {
					keys.push(triple_hashes[i]);
					triple_hashes.splice(i, 1);
					i--;
				}
			}
		});

		idx++;
	}

	keys.sort((a, b) => a.idx - b.idx);
	return keys[63].idx;
};

