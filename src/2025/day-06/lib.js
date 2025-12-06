/**
 * @param {string} data
 */
export const grand_total = (data) => {
	const lines = data.split("\n");
	const operations = lines.pop().match(/(\+|\*)/g);
	const numbers = lines.map(line => line.match(/\d+/g).map(Number));

	const COLS = numbers[0].length;
	const res = Array(COLS);
	for (let j = 0; j < COLS; j++) {
		const op = operations[j];
		let num = op === "+" ? 0 : 1;
		for (let i = 0; i < numbers.length; i++) {
			const x = numbers[i][j];
			if (op === "+") {
				num += x;
			} else {
				num *= x;
			}
		}
		res[j] = num;
	}
	return res.reduce((a, b) => a + b);
};

/**
 * @param {string} data
 */
export const grand_total2 = (data) => {
	const lines = data.split("\n");
	const operation = lines.pop();
	const len = lines[0].length;

	let total = 0;
	const regex = /(\+|\*)/g;
	let m;

	/**
	 * @param {number} idx
	 * @return {number[]}
	 */
	const parse_num = (idx) => {
		let j = idx + 1;
		for (let i = 0; i < lines.length; i++) {
			while (j < len && lines[i][j] !== " ") {
				j++;
			}
		}

		/** @type {number[]} */
		const nums = Array(j - idx).fill(0);
		for (let i = idx; i < j; i++) {
			/** @type {number[]} */
			const buf = [];
			for (let line of lines) {
				const c = line[i];
				if (/\d/.test(c)) {
					buf.push(+c);
				}
			}
			nums[i - idx] = buf.reduce((a, b) => a * 10 + b);
		}

		return nums;
	};

	while ((m = regex.exec(operation)) !== null) {
		const op = m[0];
		const idx = m.index;
		const nums = parse_num(idx);

		total += op === "+"
			? nums.reduce((a, b) => a + b)
			: nums.reduce((a, b) => a * b);
	}
	return total;
}
