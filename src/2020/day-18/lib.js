/**
 * @param {string} str
 * @returns {number}
 */
export const evaluate1 = (str) => {
	const len = str.length;
	let idx = 0;

	const skip_whitespaces = () => {
		while (idx < len && /\s+/.test(str[idx]))
			idx++;
	};

	const __is_digit = (x) => /[0-9]/.test(x);

	const parse_number = () => {
		let start = idx;

		while (idx < len && __is_digit(str[idx])) {
			idx++;
		}

		return +str.substring(start, idx);
	};

	/**
	 * @param {number|undefined} a
	 * @param {number|undefined} op
	 * @param {number} b
	 */
	const calc = (a, op, b) => {
		if (a === undefined || op === undefined)
			return b;

		switch (op) {
			case "+": a += b; break;
			case "*": a *= b; break;
		}

		return a;
	};

	const parse_value = () => {
		let a, op, b;

		while (idx < len) {
			skip_whitespaces();
			switch (str[idx]) {
				case " ":
					idx++;
					break;

				case "*":
				case "+":
					a = calc(a, op, b);
					op = str[idx++];
					break;

				case "(":
					idx++;
					b = parse_value();
					break;
				case ")":
					idx++;
					return calc(a, op, b);

				default:
					b = parse_number();
			}
		}

		return calc(a, op, b);
	};

	return parse_value();
};

/**
 * @param {(number|"+"|"*")[]} arr
 * @param {"+"|"*"} op
 */
const shrink = (arr, op) => {
	let idx;

	while ((idx = arr.indexOf(op)) >= 0) {
		if (idx < 1 || idx > arr.length - 2) {
			throw new Error(`invalid position ${idx} for operator ${op}`);
		}

		const a = arr[idx - 1], b = arr[idx + 1];
		if (typeof a !== "number" || typeof b !== "number") {
			throw new Error(`invalid opcodes a: ${a}, b: ${b}`);
		}

		arr = [
			...arr.slice(0, idx - 1),
			op === "+" ? (a + b) : (a * b),
			...arr.slice(idx + 2),
		];
	}

	return arr;
};

/**
 * @param {(number|"+"|"*")[]} arr
 */
export const calc2 = (arr) => {
	arr = shrink(arr, "+");
	arr = shrink(arr, "*");
	return arr[0];
};

/**
 * @param {string} str
 * @returns {number}
 */
export const evaluate2 = (str) => {
	const len = str.length;
	let idx = 0;

	const skip_whitespaces = () => {
		while (idx < len && /\s+/.test(str[idx]))
			idx++;
	};

	const __is_digit = (x) => /[0-9]/.test(x);

	const parse_number = () => {
		let start = idx;

		while (idx < len && __is_digit(str[idx])) {
			idx++;
		}

		return +str.substring(start, idx);
	};

	/**
	 * @returns {number}
	 */
	const parse_value = () => {
		const stack = [];

		while (idx < len) {
			skip_whitespaces();
			switch (str[idx]) {
				case "(":
					idx++;
					stack.push(parse_value());
					break;
				case ")":
					idx++;
					return calc2(stack);
				case "*":
				case "+":
					stack.push(str[idx++]);
					break;
				default:
					stack.push(parse_number());
			}
		}
		return calc2(stack);
	};

	return parse_value();
};

/**
 * @param {string} data
 */
export const get_sum = (data, part = 1) => {
	const evaluate = part === 1 ? evaluate1 : evaluate2;
	return data.split("\n").reduce((sum, curr) => sum + evaluate(curr), 0);
};
