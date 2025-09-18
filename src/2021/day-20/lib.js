/**
 * @param {number} x
 * @param {number} y
 */
const get_neighbors = (x, y) => {
	const neighbors = [];
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			neighbors.push([
				x + dx,
				y + dy,
			]);
		}
	}

	return neighbors.map(n => n.join(","));
};

/**
 * @param {Set<string>} set
 * @param {string} pattern
 * @param {number} tb
 * @param {number} bb
 * @param {number} lb
 * @param {number} rb
 */
const mutate = (set, pattern, tb, bb, lb, rb, background) => {
	/** @type {Set<string>} */
	const next_set = new Set();

	for (let i = tb - 1; i < bb + 1; i++) {
		for (let j = lb - 1; j < rb + 1; j++) {
			let idx = 0;
			for (const n of get_neighbors(i, j)) {
				const [r, c] = n.split(",").map(Number);
				let d;
				if (r < tb || r >= bb || c < lb || c >= rb) {
					d = background;
				} else {
					d = set.has(n) ? 1 : 0;
				}
				idx = (idx << 1) | d;
			}

			if (pattern[idx] === "#")
				next_set.add(`${i},${j}`);
		}
	}

	return next_set;
};

/**
 * @param {string} data
 */
export const count_lit_pixels = (data, part = 1) => {
	const [pattern, block_image] = data.split("\n\n");

	/** @type {Set<string>} */
	let lit_set = new Set();
	const lines = block_image.split("\n");

	let tb = 0, bb = lines.length, lb = 0, rb = lines[0].length;
	let background = 0;

	lines.forEach((line, row) => {
		for (let col = 0; col < rb; col++) {
			if (line[col] === "#") {
				lit_set.add(`${row},${col}`);
			}
		}
	});

	// console.log(lit_set.size);

	let steps = part === 1 ? 2 : 50;
	while (steps-- > 0) {
		lit_set = mutate(lit_set, pattern, tb--, bb++, lb--, rb++, background);
		// console.log(lit_set.size);
		background = background
			? (pattern[511] === "#" ? 1 : 0)
			: (pattern[0] === "#" ? 1 : 0);
	}
	return lit_set.size;
};
