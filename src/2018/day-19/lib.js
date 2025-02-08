import { Simulator } from "../day-16/lib.js";

/**
 * @param {string} opcodes
 * @param {string} str
 */
const check_shortcut = (opcodes, str) => {
	let ret = 0;
	for (let i = 0; i < opcodes.indexOf(str); i++) {
		if (opcodes[i] === ",")
			ret++;
	}
	return ret;
};

/**
 * @param {string} data
 */
export const get_reg0 = (data, part = 1) => {
	const lines = data.split("\n");
	const ip = lines[0], instructions = lines.slice(1).map(line => {
		const tmp = line.split(" ");
		return {
			opcode: tmp[0],
			oprands: tmp.slice(1).map(Number),
		};
	});
	const PTR = +ip.split(" ")[1];
	let idx;

	/** @type {number[]} */
	const registers = Array(6).fill(0);
	if (part === 2) {
		registers[0] = 1;
	}

	const shortcut = "seti,seti,mulr,eqrr,addr,addi,addr,addi,gtrr,addr,seti,addi,gtrr,addr,seti,mulr";
	const opcodes = instructions.map(ins => ins.opcode).join(",");
	const shortcut_idx = check_shortcut(opcodes, shortcut);
	const TGT_PTR = instructions[shortcut_idx].oprands[2];
	const SRC_PTR = instructions[shortcut_idx+3].oprands[1];
	while ((idx = registers[PTR]) >= 0 && idx < instructions.length) {
		// decoded shortcut for part 2
		if (part === 2 && idx === shortcut_idx + 1) {
			while (registers[TGT_PTR] <= registers[SRC_PTR]) {
				if (registers[SRC_PTR] % registers[TGT_PTR] === 0) {
					registers[0] += registers[TGT_PTR];
				}
				registers[TGT_PTR]++;
			}
			break;
		}

		const { opcode, oprands } = instructions[idx];
		let should_break = false;
		try {
			Simulator[opcode](oprands, registers);
			registers[PTR]++;
		} catch (e) {
			should_break = true;
		}
		if (should_break)
			break;
	}

	return registers[0];
};

