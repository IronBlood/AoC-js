/**
 * @param {string} data
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

