/**
 * @param {any[]}
 * @param {number} l
 * @param {number} r
 */
const spin_helper = (arr, l, r) => {
	while (l < r) {
		const t = arr[l];
		arr[l++] = arr[r];
		arr[r--] = t;
	}
};

/**
 * @param {any[]} arr
 * @param {number} x
 */
const spin = (arr, x) => {
	spin_helper(arr, 0, arr.length - x - 1);
	spin_helper(arr, arr.length - x, arr.length - 1);
	spin_helper(arr, 0, arr.length - 1);
};

/**
 * @param {any[]} arr
 * @param {string} x
 */
const exchange = (arr, x) => {
	const [i, j] = x.split("/").map(Number);
	const tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
};

/**
 * @param {any[]} arr
 * @param {string} x
 */
const partner = (arr, x) => {
	const [i, j] = x.split("/").map(s => arr.indexOf(s));
	const tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
};

/**
 * @param {string} moves
 * @param {string} str
 * @returns {string}
 */
export const after_dance = (moves, str, part = 1) => {
	let arr = str.split("");
	const cmds = moves.split(",");

	const total = part === 1 ? 1 : 1_000_000_000;
	/** @type {string[]} */
	const states = [];
	let step = 0;

	/** @type {Map<string, number>} */
	const seen = new Map();
	while (step < total) {
		if (seen.has(str)) {
			const first = seen.get(str);
			const cycle = step - first;
			const remain = (total - step) % cycle;
			str = states[first + remain];
			break;
		}

		seen.set(str, step++);
		states.push(str);

		cmds.forEach(cmd => {
			const d = cmd.substring(1);
			switch (cmd[0]) {
				case "s": spin(arr, +d); break;
				case "x": exchange(arr, d); break;
				case "p": partner(arr, d); break;
			}
		});

		str = arr.join("");
	}
	return str;
};

