/**
 * @param {string} data
 * @param {number} rows
 * @returns {number}
 */
export const count_safe_tiles = (data, rows) => {
	let row = [ ".", ...data.split(""), "." ];
	let count = 0;

	do {
		const next_row = Array(row.length).fill(".");
		for (let i = 1; i < row.length - 1; i++) {
			if (row[i] === ".") count++;

			const pattern = row.slice(i-1, i+2).join("");
			if (["^^.", ".^^", "^..", "..^"].includes(pattern))
				next_row[i] = "^";
		}

		row = next_row;
	} while(--rows > 0);
	return count;
};

/**
 * @param {string} data
 * @param {number} rows
 * @returns {number}
 */
export const count_safe_tiles2 = (data, rows) => {
	let row = 0n;
	let mask = 0n;
	data.split("").reverse().forEach((x, idx) => {
		if (x === "^") {
			row |= 1n << BigInt(idx);
		}
		mask |= 1n << BigInt(idx);
	});
	const len = data.length;
	let count = 0;

	/**
	 * @param {BigInt} x
	 * @param {number} i
	 */
	const is_safe = (x, i) => (x & (1n << BigInt(i))) === 0n;

	while (rows-- > 0) {
		for (let i = 0; i < len; i++) {
			if (is_safe(row, i)) {
				count++;
			}
		}

		row = (row << 1n) ^ (row >> 1n);
		row &= mask;
	}

	return count;
};
