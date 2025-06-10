/**
 * @param {number[]} integers
 */
const exec = integers => {
	for (let ip = 0; ip < integers.length; ip += 4) {
		const opcode = integers[ip];
		if (![1, 2, 99].includes(opcode)) {
			console.error(`unknown opcode ${opcode} @ ${ip}`);
		}
		if (opcode === 99) {
			break;
		}
		let a = integers[ip + 1],
			b = integers[ip + 2],
			c = integers[ip + 3];
		integers[c] = opcode === 1
			? integers[a] + integers[b]
			: integers[a] * integers[b];
	}
	//console.log(integers);
};

/**
 * @param {string} data
 */
export const get_pos0 = (data, adjust = [0, 0]) => {
	const integers = data.split(",").map(Number);

	integers[1] = adjust[0];
	integers[2] = adjust[1];

	exec(integers);

	return integers[0];
};

/**
 * @param {string} data
 */
export const get_pair = (data) => {
	let val;
	for (let i = 0; i <= 99; i++) {
		for (let j = 0; j <= 99; j++) {
			if (get_pos0(data, [i, j]) === 19690720) {
				return 100 * i + j;
			}
		}
	}
	return -1;
};
