/** @type {Map<string, [number, number]>} */
const NUMERIC_LAYOUT = new Map();
if (NUMERIC_LAYOUT.size === 0) {
	`789
456
123
x0A`.split("\n").forEach((line, row) => {
		line.split("").forEach((char, col) => {
			if (char !== "x")
				NUMERIC_LAYOUT.set(char, [row, col]);
		});
	});
}

/** @type {Map<string, [number, number]>} */
const DIRECTIONAL_LAYOUT = new Map();
if (DIRECTIONAL_LAYOUT.size === 0) {
	`x^A
<v>`.split("\n").forEach((line, row) => {
		line.split("").forEach((char, col) => {
			if (char !== "x")
				DIRECTIONAL_LAYOUT.set(char, [row, col])
		});
	});
}

/**
 * @param {[number, number]} diff
 * @param {number} steps
 * @param {boolean} horizontal_first
 * @param {Map<string, number>} memo
 */
const do_arrows = (diff, steps, horizontal_first, memo) => {
	const key = [
		diff.join(","),
		steps,
		horizontal_first ? 1 : 0,
	].join(",");
	if (memo.has(key)) {
		return memo.get(key);
	}

	const seq = [
		diff[0] < 0 ? "^".repeat(-diff[0]) : "v".repeat(diff[0]),
		diff[1] < 0 ? "<".repeat(-diff[1]) : ">".repeat(diff[1]),
		"A",
	];
	if (horizontal_first) {
		const tmp = seq[1];
		seq[1] = seq[0];
		seq[0] = tmp;
	}

	const str = seq.join("");
	let len = 0;
	if (steps === 0) {
		len = str.length;
	} else {
		let pos = DIRECTIONAL_LAYOUT.get("A");
		steps--;
		for (let i = 0; i < str.length; i++) {
			const next = DIRECTIONAL_LAYOUT.get(str[i]);
			const prev = pos;
			const next_diff = [next[0] - prev[0], next[1] - prev[1]];
			pos = next;
			if (next_diff[0] === 0 || next_diff[1] === 0) {
				len += do_arrows(next_diff, steps, false, memo);
			} else if (next[0] === 1 && next[1] === 0 && prev[0] === 0) {
				len += do_arrows(next_diff, steps, false, memo);
			} else if (prev[0] === 1 && prev[1] === 0 && next[0] === 0) {
				len += do_arrows(next_diff, steps, true, memo);
			} else {
				len += Math.min(
					do_arrows(next_diff, steps, true, memo),
					do_arrows(next_diff, steps, false, memo),
				);
			}
		}
	}

	memo.set(key, len);
	return len;
};

/**
 * @param {string} str
 * @param {number} steps
 * @param {Map<string, number>} memo
 * @returns {number}
 */
export const get_complexity = (str, steps, memo = new Map()) => {
	let pos = NUMERIC_LAYOUT.get("A");
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		let next = NUMERIC_LAYOUT.get(str[i]),
			prev = pos,
			diff = [ next[0] - prev[0], next[1] - prev[1] ];
		pos = next;
		if (prev[0] === 3 && next[1] === 0) {
			count += do_arrows(diff, steps, false, memo);
		} else if (prev[1] === 0 && next[0] === 3) {
			count += do_arrows(diff, steps, true, memo);
		} else {
			count += Math.min(
				do_arrows(diff, steps, false, memo),
				do_arrows(diff, steps, true, memo),
			);
		}
	}
	return count * Number(str.substring(0, str.length - 1));
};

/**
 * @param {string} data
 * @param {number} part
 * @returns {number}
 */
export const min_complexities = (data, part = 1) => {
	const memo = new Map();
	return data.split("\n").reduce((sum, line) => {
		const c = get_complexity(line, part === 1 ? 2 : 25, memo);
		return sum + c;
	}, 0);
};

