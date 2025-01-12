/**
 * @param {[number, number, number]} regs
 * @param {number[]} prog
 */
const sim = (regs, prog) => {
	const output = [];

	let count = 0;
	/**
	 * @param {number} oprand
	 */
	const get_oprand = oprand => {
		if (oprand <= 3) return oprand;
		return regs[oprand - 4];
	};

	for (let i = 0; i < prog.length; ) {
		if (count++ === 100_000_000)
			break;
		let should_jump = false;
		const opcode = prog[i], oprand = prog[i + 1];
		switch (opcode) {
			// adv combo
			case 0: regs[0] = (regs[0] / Math.pow(2, get_oprand(oprand))) | 0; break;
			// bxl literal
			case 1: regs[1] = regs[1] ^ oprand; break;
			// bst combo
			case 2: regs[1] = (get_oprand(oprand) & 0x7); break;
			// jnz literal
			case 3:
				if (regs[0] != 0) {
					should_jump = true;
					i = oprand;
				}
				break;
			// bxc ignore
			case 4: regs[1] = regs[1] ^ regs[2]; break;
			// out combo
			case 5: output.push(get_oprand(oprand) & 0x7); break;
			// bdv combo
			case 6: regs[1] = (regs[0] / Math.pow(2, get_oprand(oprand))) | 0; break;
			// cdv combo
			case 7: regs[2] = (regs[0] / Math.pow(2, get_oprand(oprand))) | 0; break;
		}
		if (!should_jump) {
			i += 2;
		}
	}

	return output.join(",");
};

/**
 * @param {string} data
 * @returns {string}
 */
export const sim_8bit_computer = (data) => {
	const [str_reg, str_prog] = data.split("\n\n");
	let regs = str_reg.split("\n").map(line => Number(line.split(": ")[1]));
	let prog = str_prog.split(": ")[1].split(",").map(Number);
	return sim(regs, prog);
};

/**
 * @param {string} data
 * @returns {string}
 */
export const find_a = (data) => {
	const [str_reg, str_prog] = data.split("\n\n");
	let regs = str_reg.split("\n").map(line => Number(line.split(": ")[1]));
	const target = str_prog.split(": ")[1];
	let prog = target.split(",").map(Number);
	for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
		const r = regs.slice();
		r[0] = i;
		if (sim(r, prog) === target) {
			return i;
		}
	}
};

