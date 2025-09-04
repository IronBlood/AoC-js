/**
 * @param {string} data
 */
const get_instructions = (data) => data.split("\n").map(line => {
	const [ins, num] = line.split(" ");
	return { ins, offset: +num };
});

/**
 * @param {ReturnType<typeof get_instructions>} instructions
 */
const run = (instructions) => {
	const visited = Array(instructions.length).fill(0);

	let ip = 0, acc = 0;

	while (ip < visited.length && !visited[ip]) {
		visited[ip] = 1;

		const { ins, offset } = instructions[ip];
		switch (ins) {
			case "jmp": ip += offset; break;
			case "acc": acc += offset;
			default: ip++; break;
		}
	}

	return {
		terminated: ip === visited.length,
		acc,
	};
};

/**
 * @param {string} data
 */
export const get_acc = (data, part = 1) => {
	const instructions = get_instructions(data);

	if (part === 1)
		return run(instructions).acc;

	for (let i = 0; i < instructions.length; i++) {
		const { ins } = instructions[i];
		if (ins === "acc")
			continue;

		const replacement = ins === "nop" ? "jmp" : "nop";
		instructions[i].ins = replacement;

		const res = run(instructions);
		if (res.terminated)
			return res.acc;

		instructions[i].ins = ins;
	}

	return -1;
};
