/**
 * @param {string} data
 * @returns {number}
 */
export const sum_signal_strength = (data) => {
	let reg_X = 1;

	let cycle = 1, ip = 0, sum = 0;
	const instructions = data.split("\n");
	let wait = false;

	while (ip < instructions.length) {
		if ((cycle - 20) % 40 === 0) {
			sum += cycle * reg_X;
			if (cycle === 220) {
				break;
			}
		}

		const ins = instructions[ip];
		if (ins === "noop") {
			ip++;
			cycle++;
		} else {
			wait = !wait;
			if (wait) {
				cycle++;
				continue;
			} else {
				ip++;
				cycle++;

				const num = +ins.substring(5);
				reg_X += num;
			}
		}
	}

	return sum;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const get_letters = (data, test = false) => {
	let reg_X = 1;

	const CHAR_DRK = test ? "." : " ";
	const CHAR_LIT = test ? "#" : "\x1b[1;31m*\x1b[0m";
	/** @type {string[][]} */
	const CRT = Array.from({ length: 6 }, () => Array(40).fill(CHAR_DRK));

	let cycle = 1, ip = 0;
	const instructions = data.split("\n");
	let wait = false;

	const update_cycle = () => {
		cycle = (cycle + 1) % 240;
	};

	while (ip < instructions.length) {
		const row = Math.trunc((cycle - 1) / 40), col = (cycle - 1) % 40;

		if (col >= reg_X - 1 && col <= reg_X + 1) {
			CRT[row][col] = CHAR_LIT;
		}

		const ins = instructions[ip];
		if (ins === "noop") {
			ip++;
			update_cycle();
		} else {
			wait = !wait;
			if (wait) {
				update_cycle();
				continue;
			} else {
				ip++;
				update_cycle();

				const num = +ins.substring(5);
				reg_X += num;
			}
		}
	};

	return CRT.map(row => row.join("")).join("\n");
};
