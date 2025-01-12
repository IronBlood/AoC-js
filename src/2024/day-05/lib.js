/**
 * @param {string} data
 */
export const get_sum = data => {
	const [orders, updates] = data.split("\n\n").map(seg => seg.split("\n"));

	/** @type {Map<string,Set<string>>} */
	const after_map = new Map();
	/** @type {Map<string,Set<string>>} */
	const before_map = new Map();

	orders.forEach(line => {
		const [a, b] = line.split("|");
		if (after_map.has(a)) {
			after_map.get(a).add(b);
		} else {
			const s = new Set();
			s.add(b);
			after_map.set(a, s);
		}
		if (before_map.has(b)) {
			before_map.get(b).add(a);
		} else {
			const s = new Set();
			s.add(a);
			before_map.set(b, s);
		}
	});

	/** @type {number[]} */
	const mid_numbers = [];
	updates.forEach(line => {
		const pages = line.split(",");
		let is_valid = true;
		for (let i = 0; i < pages.length - 1; i++) {
			for (let j = i + 1; j < pages.length; j++) {
				const b = before_map.get(pages[i]);
				if (b && b.has(pages[j])) {
					is_valid = false;
					break;
				}
				const a = after_map.get(pages[j]);
				if (a && a.has(pages[i])) {
					is_valid = false;
					break;
				}
			}
			if (!is_valid)
				break;
		}
		if (is_valid) {
			mid_numbers.push(+pages[(pages.length - 1) / 2]);
		}
	});
	return mid_numbers.reduce((sum, curr) => sum + curr, 0);
};

/**
 * @param {string} data
 */
export const get_sum_incorrect = data => {
	const [orders, updates] = data.split("\n\n").map(seg => seg.split("\n"));

	/** @type {Map<string,Set<string>>} */
	const after_map = new Map();
	/** @type {Map<string,Set<string>>} */
	const before_map = new Map();

	orders.forEach(line => {
		const [a, b] = line.split("|");
		if (after_map.has(a)) {
			after_map.get(a).add(b);
		} else {
			const s = new Set();
			s.add(b);
			after_map.set(a, s);
		}
		if (before_map.has(b)) {
			before_map.get(b).add(a);
		} else {
			const s = new Set();
			s.add(a);
			before_map.set(b, s);
		}
	});

	/** @type {string[]} */
	const incorrect_lines = []
	updates.forEach(line => {
		const pages = line.split(",");
		let is_valid = true;
		for (let i = 0; i < pages.length - 1; i++) {
			for (let j = i + 1; j < pages.length; j++) {
				const b = before_map.get(pages[i]);
				if (b && b.has(pages[j])) {
					is_valid = false;
					break;
				}
				const a = after_map.get(pages[j]);
				if (a && a.has(pages[i])) {
					is_valid = false;
					break;
				}
			}
			if (!is_valid)
				break;
		}
		if (!is_valid) {
			incorrect_lines.push(line);
		}
	});

	const mid_numbers = [];
	incorrect_lines.forEach(line => {
		const arr = line.split(",");
		arr.sort((x, y) => {
			const b = before_map.get(x);
			if (b && b.has(y)) {
				return 1;
			}
			const a = after_map.get(y);
			if (a && a.has(x)) {
				return 1;
			}
			return -1;
		});
		mid_numbers.push(+arr[(arr.length - 1) / 2]);
	});
	return mid_numbers.reduce((sum, curr) => sum + curr, 0);
};

