/**
 * @param {string} str
 */
const check_1478 = str => [
	2, // 1
	3, // 7
	4, // 4
	7, // 8
].includes(str.length);

/**
 * @param {string} data
 */
export const count_1478 = (data) => {
	const digits = [];
	data.split("\n").forEach(line => {
		digits.push(...line.split(" | ")[1].split(" "));
	});
	return digits.filter(check_1478).length;
};

/**
 * @param {string} str
 */
const missing_chars = (str) => {
	const set = new Set("abcdefg".split(""));
	for (let i = 0; i < str.length; i++) {
		set.delete(str[i]);
	}
	return Array.from(set);
}

/**
 * @param {string} str
 */
export const parse_digits = (str) => {
	const [patterns, digits] = str.split(" | ").map(x => x.split(" "));
	patterns.push(...digits);

	/** @type {Set<number>[]} */
	const map = Array.from({ length: 7 }, () => new Set());

	/**
	 * @param {string} str
	 * @param {number} num
	 */
	const add_candidate = (str, num) => {
		for (let i = 0; i < str.length; i++) {
			map[str.charCodeAt(i) - 97].add(num);
		}
	};

	const len_5 = [], len_6 = [];

	for (let p of patterns) {
		switch (p.length) {
			case 2: add_candidate(p, 1); break;
			case 3: add_candidate(p, 7); break;
			case 4: add_candidate(p, 4); break;
			case 7: add_candidate(p, 8); break;
			case 5: len_5.push(p); break;
			case 6: len_6.push(p); break;
		}
	}

	/** @type {string[]} */
	const resolved = Array(7);
	for (let i = 0; i < 7; i++) {
		if (map[i].has(7) && !map[i].has(1)) {
			resolved[i] = 'A';
			break;
		}
	}

	for (const x of len_6) {
		for (const missing of missing_chars(x)) {
			const idx = missing.charCodeAt(0) - 97;
			if (map[idx].has(1)) {
				// 6
				resolved[idx] = 'C';
			} else if (map[idx].has(4)) {
				// 0
				resolved[idx] = 'D';
			} else {
				// 9
				resolved[idx] = 'E';
			}
		}
	}

	if (resolved.includes('D')) {
		const num_4 = patterns.find(x => x.length === 4);
		if (!num_4) {
			console.log("missing 4");
		}
		for (let i = 0; i < 4; i++) {
			const idx = num_4.charCodeAt(i) - 97;
			if (map[idx].has(1)) {
				// map[idx].delete(4);
			} else {
				if (!resolved[idx]) {
					resolved[idx] = 'B';
				}
			}
		}
	}

	for (const x of len_5) {
		const mcs = missing_chars(x).map(c => c.charCodeAt(0) - 97);
		if (mcs.some((idx) => map[idx].has(4)) && mcs.every((idx) => !map[idx].has(1))) {
			// 3
			if (resolved[mcs[0]] === 'B') {
				resolved[mcs[1]] = 'E';
			} else if (resolved[mcs[1]] = 'B') {
				resolved[mcs[0]] = 'E';
			}
		} else {
			let resolved_idx;

			resolved_idx = resolved.indexOf('B');
			if (resolved_idx >= 0) {
				if (mcs.indexOf(resolved_idx) >= 0) {
					// 2
					let idx = mcs[0];
					if (idx === resolved_idx) {
						idx = mcs[1];
					}
					resolved[idx] = 'F';
				}
			}

			resolved_idx = resolved.indexOf('C');
			if (resolved_idx >= 0) {
				if (mcs.indexOf(resolved_idx) >= 0) {
					// 5
					let idx = mcs[0];
					if (idx === resolved_idx) {
						idx = mcs[1];
					}
					resolved[idx] = 'E';
				}
			}
		}
	}

	let count = 0;
	for (let i = 0; i < 7; i++) {
		if (resolved[i] === undefined) {
			count++;
		}
	}

	if (count > 1) {
		throw new Error("wrong algorithm");
	}

	for (let i = 0; i < 7; i++) {
		if (resolved[i] === undefined) {
			resolved[i] = 'G';
			break;
		}
	}

	const num = digits.map(x => {
		if (x.length === 2)
			return "1";
		if (x.length === 3)
			return "7";
		if (x.length === 4)
			return "4";
		if (x.length === 7)
			return "8";

		const missing = missing_chars(x).map(c => resolved[c.charCodeAt(0) - 97]).sort().join("");

		switch (missing) {
			case "D": return "0";
			case "C": return "6";
			case "E": return "9";
			case "BE": return "3";
			case "BF": return "2";
			case "CE": return "5";
		}
		console.log(`failed to parse ${x}, ${missing}`);
		return " ";
	}).join("");

	return +num;
};

/**
 * @param {string} data
 */
export const get_sum = (data) => {
	return data.split("\n").map(parse_digits).reduce((a, b) => a + b);
};
