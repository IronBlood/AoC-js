/**
 * @param {string} settings
 */
const parse_stacks = (settings) => {
	const lines = settings.split("\n");

	/** @type {string[][]} */
	const stacks = [[]];
	const indices = [0];

	const line_id = lines.pop();
	for (let i = 0; i < line_id.length; i++) {
		if (/\d/.test(line_id[i])) {
			indices.push(i);
			stacks.push([]);
		}
	}

	for (let l = lines.length - 1; l >= 0; l--) {
		for (let i = 1; i < indices.length; i++) {
			const idx = indices[i];
			if (/[A-Z]/.test(lines[l][idx])) {
				stacks[i].push(lines[l][idx]);
			}
		}
	}

	return stacks;
};

/**
 * @param {string[][]} stacks
 * @param {string} cmd
 */
const rearrange = (stacks, cmd, part = 1) => {
	const matches = /move (\d+) from (\d) to (\d)/.exec(cmd);
	let [num, s, t] = matches.slice(1).map(Number);

	if (part === 1) {
		while (num-- > 0) {
			if (stacks[s].length > 0) {
				stacks[t].push(stacks[s].pop());
			}
		}
	} else {
		const s_len = stacks[s].length;
		const x = stacks[s].slice(s_len - num);
		stacks[s].length = s_len - num;
		stacks[t].push(...x);
	}
};

/**
 * @param {string} data
 */
export const get_top_crates = (data, part = 1) => {
	const [settings, commands] = data.split("\n\n");
	const stacks = parse_stacks(settings);

	commands.split("\n").forEach(cmd => rearrange(stacks, cmd, part));

	return stacks
		.slice(1)
		.map(stack => (stack.length === 0)
			? ""
			: stack[stack.length - 1]
		)
		.join("");
}
