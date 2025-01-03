/**
 * @param {"a"|"b"|"c"|"d"} c
 */
const get_idx = c => {
	const char_code = c.charCodeAt(0);
	return char_code >= 97 ? (char_code - 97) : -1;
};

/**
 * example:
 *   cpy b c   < -1
 *   inc a     < pc
 *   dec c     < +1
 *   jnz c -2  < +2
 *   dec d     < +3
 *   jnz d -5  < +4
 * @param {string[][]} instructions
 * @param {number} pc
 */
const is_multiple = (instructions, pc) => {
	if (pc - 1 < 0)
		return false;
	if (pc + 4 > instructions.length)
		return false;
	if (false
		|| instructions[pc - 1][0] != "cpy"
		|| instructions[pc + 1][0] != "dec"
		|| instructions[pc + 2][0] != "jnz"
		|| instructions[pc + 3][0] != "dec"
		|| instructions[pc + 4][0] != "jnz"
	)
		return false;
	return true;
};

/**
 * @param {string} data
 */
export const exec = (data, registers = new Int32Array(4), part = 1) => {
	const instructions = data.split("\n").map(line => line.split(" "));
	for (let i = 0; i < instructions.length; ) {
		let jump = false;
		let op = get_idx(instructions[i][1]);
		let target_idx = 0;
		switch (instructions[i][0]) {
			case "cpy":
				target_idx = get_idx(instructions[i][2]);
				if (target_idx != -1)
					registers[target_idx] = op === -1 ? +instructions[i][1] : registers[op];
				break;
			case "inc":
				if (op !== -1) {
					if (is_multiple(instructions, i)) {
						let [_, src, dst] = instructions[i - 1];
						let dec1_op = instructions[i + 1][1], dec2_op = instructions[i + 3][1];
						let jnz1_op = instructions[i + 2][1], jnz1_off = instructions[i + 2][2],
							jnz2_op = instructions[i + 4][1], jnz2_off = instructions[i + 4][2];
						if (dst != dec1_op || dec1_op != jnz1_op || dec2_op != jnz2_op || jnz1_off != "-2" || jnz2_off != "-5") {
							console.error("invalid");
						} else {
							let b = get_idx(src), c = get_idx(dec1_op), d = get_idx(dec2_op);
							registers[op] += (b === -1 ? +src : registers[b]) * registers[d];
							registers[c] = 0;
							registers[d] = 0;
							i += 5;
							jump = true;
						}
					} else {
						registers[op]++;
					}
				}
				break;
			case "dec": if (op !== -1) registers[op]--; break;
			case "jnz":
				if ((op === -1 ? +instructions[i][1] : registers[op]) !== 0) {
					target_idx = get_idx(instructions[i][2]);
					let offset = target_idx === -1 ? +instructions[i][2] : registers[target_idx];
					if ((i += offset) >= 0 && i < instructions.length) {
						jump = true;
					} else {
						i -= offset;
					}
				}
				break;
			case "tgl":
				target_idx = i + (op === -1 ? +instructions[i][1] : registers[op]);
				if (target_idx >= 0 && target_idx < instructions.length) {
					const cmd = instructions[target_idx];
					if (cmd.length === 2) {
						cmd[0] = cmd[0] === "inc" ? "dec" : "inc";
					} else {
						cmd[0] = cmd[0] === "jnz" ? "cpy" : "jnz";
					}
				}
				break;
		}
		if (!jump) {
			i++;
		}
	}

	return registers[0];
};

