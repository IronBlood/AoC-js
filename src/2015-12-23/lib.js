/**
 * @param {string} data
 */
export const sim = (data, part = 0) => {
	const instructions = data.split("\n");
	const registers = Array(2).fill(0);
	if (part === 1)
		registers[0] = 1;

	for (let i = 0; i < instructions.length;) {
		const instruction = instructions[i];
		const code = instruction.slice(0, 3);
		let oprands = instruction.slice(4).split(", ");
		let idx;
		switch (code) {
			case "hlf":
				idx = oprands[0] === "a" ? 0 : 1;
				registers[idx] = registers[idx] >>> 1;
				break;
			case "tpl":
				idx = oprands[0] === "a" ? 0 : 1;
				registers[idx] *= 3;
				break;
			case "inc":
				idx = oprands[0] === "a" ? 0 : 1;
				registers[idx]++;
				break;
			case "jmp":
				i += Number(oprands[0]);
				continue;
			case "jie":
				idx = oprands[0] === "a" ? 0 : 1;
				if ((registers[idx] & 1) === 0) {
					i += Number(oprands[1]);
					continue;
				}
				break;
			case "jio":
				idx = oprands[0] === "a" ? 0 : 1;
				if (registers[idx] === 1) {
					i += Number(oprands[1]);
					continue;
				}
				break;
		}
		i++;
	}

	return registers;
};

