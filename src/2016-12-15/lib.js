/**
 * @param {string} line
 */
const parse_disc = line => {
	const arr = line.split(" ");
	const mod = +arr[3];
	const start_idx = +arr[11].substring(0, arr[11].length-1);
	return { mod, start_idx };
};

/**
 * @param {number} num
 * @param {{ mod: number; start_idx: number }[]} discs
 * @returns {boolean}
 */
const sim = (num, discs) => {
	for (let i = 0; i < discs.length; i++) {
		const pos = (num + 1 + i + discs[i].start_idx) % discs[i].mod;
		if (pos != 0) return false;
	}
	return true;
}

/**
 * @param {string} data
 * @returns {number}
 */
export const first_time = (data, part = 1) => {
	const discs = data.split("\n").map(parse_disc);
	if (part === 2) {
		discs.push({ mod: 11, start_idx: 0 });
	}

	let i = 0;

	do {
		if (sim(i, discs))
			return i;
		i++;
	} while (true);
};

