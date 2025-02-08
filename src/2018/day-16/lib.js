/**
 * @param {number[]} oprands
 * @param {number} reg_len
 * @param {number} len
 * @param {number} start
 */
const common_r_check = (oprands, reg_len, len = 1, start = 0) => {
	for (let i = start; i < len; i++) {
		if (oprands[i] < 0 || oprands[i] >= reg_len) {
			throw null;
		}
	}
};

/** @type {Record<string, (oprands: number[], registers: number[]) => void>} */
export const Simulator = {
	addr: (oprands, registers) => {
		common_r_check(oprands, registers.length, 2);
		const [A, B, C] = oprands;
		registers[C] = registers[A] + registers[B];
	},
	addi: (oprands, registers) => {
		common_r_check(oprands, registers.length, 1);
		const [A, B, C] = oprands;
		registers[C] = registers[A] + B;
	},

	mulr: (oprands, registers) => {
		common_r_check(oprands, registers.length, 2);
		const [A, B, C] = oprands;
		registers[C] = registers[A] * registers[B];
	},
	muli: (oprands, registers) => {
		common_r_check(oprands, registers.length, 1);
		const [A, B, C] = oprands;
		registers[C] = registers[A] * B;
	},

	banr: (oprands, registers) => {
		common_r_check(oprands, registers.length, 2);
		const [A, B, C] = oprands;
		registers[C] = registers[A] & registers[B];
	},
	bani: (oprands, registers) => {
		common_r_check(oprands, registers.length, 1);
		const [A, B, C] = oprands;
		registers[C] = registers[A] & B;
	},

	borr: (oprands, registers) => {
		common_r_check(oprands, registers.length, 2);
		const [A, B, C] = oprands;
		registers[C] = registers[A] | registers[B];
	},
	bori: (oprands, registers) => {
		common_r_check(oprands, registers.length, 1);
		const [A, B, C] = oprands;
		registers[C] = registers[A] | B;
	},

	setr: (oprands, registers) => {
		common_r_check(oprands, registers.length, 1);
		const [A, B, C] = oprands;
		registers[C] = registers[A];
	},
	seti: (oprands, registers) => {
		const [A, B, C] = oprands;
		registers[C] = A;
	},

	gtir: (oprands, registers) => {
		common_r_check(registers, registers.length, 1, 1);
		const [A, B, C] = oprands;
		registers[C] = (A > registers[B]) ? 1 : 0;
	},
	gtri: (oprands, registers) => {;
		common_r_check(oprands, registers.length, 1);
		const [A, B, C] = oprands;
		registers[C] = (registers[A] > B) ? 1 : 0;
	},
	gtrr: (oprands, registers) => {
		common_r_check(oprands, registers.length, 2);
		const [A, B, C] = oprands;
		registers[C] = (registers[A] > registers[B]) ? 1 : 0;
	},

	eqir: (oprands, registers) => {
		common_r_check(registers, registers.length, 1, 1);
		const [A, B, C] = oprands;
		registers[C] = (A === registers[B]) ? 1 : 0;
	},
	eqri: (oprands, registers) => {;
		common_r_check(oprands, registers.length, 1);
		const [A, B, C] = oprands;
		registers[C] = (registers[A] === B) ? 1 : 0;
	},
	eqrr: (oprands, registers) => {
		common_r_check(oprands, registers.length, 2);
		const [A, B, C] = oprands;
		registers[C] = (registers[A] === registers[B]) ? 1 : 0;
	},
};

/**
 * @param {string} segment
 * @returns {0|1}
 */
const test_three_or_more = (segment) => {
	const tmp = segment.split("\n");
	const code = tmp[1].split(" ").map(Number);
	const registers = tmp[0].substring(9, tmp[0].length - 1).split(", ").map(Number);
	const after = tmp[2].substring(9, tmp[2].length - 1).split(", ").map(Number);

	const oprands = code.slice(1);
	let count = 0;
	for (let func_name of Object.keys(Simulator)) {
		const dup = registers.slice();
		try {
			Simulator[func_name](oprands, dup);
			let valid = true;
			for (let i = 0; i < dup.length; i++) {
				if (dup[i] != after[i]) {
					valid = false;
					break;
				}
			}
			if (valid) {
				count++;
			}
		} catch (e) {
			// intentionally ignore exceptions
		}
	}

	return count >= 3 ? 1 : 0;
};

/**
 * @param {string} data
 */
export const count_three_opcodes = (data) => {
	const segments = data.split("\n\n");
	return segments.reduce((sum, curr) => sum + test_three_or_more(curr), 0);
};

/**
 * @param {string} samples
 * @param {string} instructions
 */
export const get_reg0 = (samples, instructions) => {
	/** @type {Array<keyof Simulator>} */
	const func_names = Object.keys(Simulator);
	const func_map = Array.from({ length: 16 }, () => new Set(func_names));

	samples.split("\n\n").forEach(segment => {
		const tmp = segment.split("\n");
		const code = tmp[1].split(" ").map(Number);
		const registers = tmp[0].substring(9, tmp[0].length - 1).split(", ").map(Number);
		const after = tmp[2].substring(9, tmp[2].length - 1).split(", ").map(Number);

		const oprands = code.slice(1);
		func_names.forEach(func_name => {
			const dup = registers.slice();
			try {
				Simulator[func_name](oprands, dup);
				for (let i = 0; i < dup.length; i++) {
					if (dup[i] != after[i]) {
						throw null;
					}
				}
			} catch (e) {
				func_map[code[0]].delete(func_name);
			}
		});
	});

	/** @type {string[]} */
	const final_map_num_to_name = Array(16);
	/** @type {Set<string>} */
	const fixed_names = new Set();
	while (fixed_names.size != 16) {
		const size = fixed_names.size;

		for (let i = 0; i < 16; i++) {
			if (final_map_num_to_name[i] != null) {
				continue;
			}

			if (func_map[i].size === 1) {
				const name = [...func_map[i]][0];
				func_map.forEach(s => s.delete(name));
				final_map_num_to_name[i] = name;
				fixed_names.add(name);
			}
		}

		if (size === fixed_names.size) {
			console.error("cannot continue");
			process.exit(1);
		}
	}

	const registers = [0, 0, 0, 0];
	instructions.split("\n").forEach(line => {
		const tmp = line.split(" ").map(Number);
		const func = final_map_num_to_name[tmp[0]];
		Simulator[func](tmp.slice(1), registers);
	});
	return registers[0];
};

