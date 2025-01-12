/**
 * @param {Record<string, number>} r
 * @param {string} k
 */
const get_val = (r, k) => {
	return is_reg(k) ? (r[k] || (r[k] = 0)) : +k;
};

/**
 * @param {string} str
 */
const is_reg = (str) => /[a-z]/.test(str);

/**
 * @param {string} data
 */
export const exec = (data, part = 1) => {
	/** @type {Record<string, number>} */
	const registers = {};
	"abcdefgh".split("").forEach(x => registers[x] = 0);
	if (part === 2) {
		registers["a"] = 1;
	}

	const instructions = data.split("\n").map(line => line.split(" "));

	let count_mul = 0;
	for (let i = 0; i < instructions.length;) {
		let should_jump = false;
		const ins = instructions[i];
		switch (ins[0]) {
			case "set": registers[ins[1]] = get_val(registers, ins[2]); break;
			case "sub": registers[ins[1]] = get_val(registers, ins[1]) - get_val(registers, ins[2]); break;
			case "mul": count_mul++; registers[ins[1]] = get_val(registers, ins[1]) * get_val(registers, ins[2]); break;
			case "jnz":
				if (get_val(registers, ins[1]) != 0) {
					should_jump = true;
					i += get_val(registers, ins[2]);
				}
				break;
		}
		if (!should_jump) {
			i++;
		}
	}

	return part === 1 ? count_mul : registers["h"];
};

/**
 * @param {string} data
 */
export const exec2 = (data) => {
	let b = (+data.split("\n")[0].split(" ")[2]) * 100 + 100000, c = b + 17000, count = 0;
	while (b <= c) {
		for (let i = 2; i * i <= b; i++) {
			if (b % i === 0) {
				count++;
				break;
			}
		}
		b += 17;
	}
	return count;
}

