/**
 * @param {string} str
 * @param {string} char
 */
const count_char = (str, char = "0") => {
	let count = 0;
	for (let i = 0, len = str.length; i < len; i++) {
		if (str[i] === char)
			count++;
	}
	return count;
};

/**
 * @param {string} data
 * @param {number} width
 * @param {number} height
 */
export const get_mul = (data, width = 25, height = 6) => {
	const len = width * height;
	let min_0 = Number.MAX_SAFE_INTEGER;
	let res;

	for (let ptr = 0; ptr < data.length; ptr += len) {
		const slice = data.slice(ptr, ptr + len);
		const local_0 = count_char(slice, "0");
		if (min_0 > local_0) {
			min_0 = local_0;
			res = count_char(slice, "1") * count_char(slice, "2");
		}
	}

	return res;
};

/**
 * @param {string} data
 */
export const decode = data => {
	const W = 25, H = 6;
	/** @type {string[][]} */
	const grid = Array.from({ length: H }, () => Array(W).fill("2"));

	for (let base = 0, win = W * H, len = data.length; base < len; base += win) {
		for (let i = 0; i < H; i++) {
			for (let j = 0; j < W; j++) {
				if (grid[i][j] === "2")
					grid[i][j] = data[base + W * i + j];
			}
		}
	}

	return grid.map(row => row.map(x => {
		switch (x) {
			case "2": return " "; // transparent
			case "1": return "X"; // white
			case "0": return "."; // black
		}
	}).join("")).join("\n");
};
