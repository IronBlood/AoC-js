/**
 * @param {number[]} integers
 * @param {number} mode
 */
const get_num_by_mode = (integers, idx, mode) => {
	const x = integers[idx];
	return mode === 0 ? integers[x] : x;
};

/**
 * @param {number} integers
 */
const exec = (integers, part = 1) => {
	let ip = 0;
	let outputs = [];

	const input = part === 1 ? 1 : 5;

	while (true) {
		const x = integers[ip];
		const opcode = x % 100;

		if (opcode === 99) {
			break;
		} else if (opcode === 1 || opcode === 2) {
			const mode_a = Math.trunc(x / 100) % 10,
				mode_b = Math.trunc(x / 1000) % 10;
			const a = get_num_by_mode(integers, ip + 1, mode_a),
				b = get_num_by_mode(integers, ip + 2, mode_b),
				c = integers[ip + 3];
			integers[c] = opcode === 1
				? a + b
				: a * b;

			ip += 4;
		} else if (opcode === 3) {
			integers[integers[ip + 1]] = input;
			ip += 2;
		} else if (opcode === 4) {
			const mode_a = Math.trunc(x / 100) % 10;
			outputs.push(get_num_by_mode(integers, ip + 1, mode_a));
			ip += 2;
		} else if ([5, 6, 7, 8].includes(opcode)) {
			const mode_a = Math.trunc(x / 100) % 10,
				mode_b = Math.trunc(x / 1000) % 10;
			const a = get_num_by_mode(integers, ip + 1, mode_a),
				b = get_num_by_mode(integers, ip + 2, mode_b);

			if (opcode === 5) {
				if (a !== 0) {
					ip = b;
				} else {
					ip += 3;
				}
			}

			if (opcode === 6) {
				if (a === 0) {
					ip = b;
				} else {
					ip += 3;
				}
			}

			if (opcode === 7) {
				integers[integers[ip + 3]] = (a < b) ? 1 : 0;
				ip += 4;
			}

			if (opcode === 8) {
				integers[integers[ip + 3]] = (a === b) ? 1 : 0;
				ip += 4;
			}
		} else {
			console.log("illegal opcode");
		}
	}

	return outputs;
};

/**
 * @param {string} data
 */
export const get_diagnostic_code = (data, part = 1) => {
	const integers = data.split(",").map(Number);

	const outputs = exec(integers, part);

	const sum = outputs.reduce((s, x) => s + x, 0);
	if (outputs.length === 0 || sum !== outputs[outputs.length - 1]) {
		console.log("didn't pass test");
	}
	return sum;
};

