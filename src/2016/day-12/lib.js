/**
 * @param {"a"|"b"|"c"|"d"} c
 */
const get_idx = c => {
	const char_code = c.charCodeAt(0);
	return char_code >= 97 ? (char_code - 97) : -1;
};

/**
 * @param {string} data
 */
export const exec = (data, part = 1) => {
	const registers = new Int32Array(4);
	if (part === 2) {
		registers[2] = 1;
	}
	const instructions = data.split("\n").map(line => line.split(" "));
	for (let i = 0; i < instructions.length; ) {
		let jump = false;
		let op = get_idx(instructions[i][1]);
		switch (instructions[i][0]) {
			case "cpy":
				registers[get_idx(instructions[i][2])] = op === -1 ? +instructions[i][1] : registers[op];
				break;
			case "inc": registers[op]++; break;
			case "dec": registers[op]--; break;
			case "jnz":
				if ((op === -1 ? +instructions[i][1] : registers[op]) !== 0) {
					jump = true;
					i += Number(instructions[i][2]);
				}
				break;
		}
		if (!jump) {
			i++;
		}
	}

	return registers[0];
};

