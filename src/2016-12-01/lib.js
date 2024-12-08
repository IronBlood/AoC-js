/**
 * @param {string} commands
 * @returns {number}
 */
export const count_blocks = (commands) => {
	let direction = [0, 1, 0, -1, 0];
	let i = 0;
	let x = 0, y = 0;
	commands.split(", ").forEach(cmd => {
		const turn = cmd[0] === "R" ? 1 : -1, distance = +cmd.substring(1);
		i = (i + turn + 4) % 4;

		x += distance * direction[i];
		y += distance * direction[i + 1];
	});
	return Math.abs(x) + Math.abs(y);
};

/**
 * @param {string} commands
 * @returns {number}
 */
export const count_blocks_HQ = (commands) => {
	let direction = [0, 1, 0, -1, 0];
	let i = 0;
	let pos = [0, 0];
	const visited = new Set();
	let first = null;

	visited.add(pos.join(","));
	commands.split(", ").forEach(cmd => {
		const turn = cmd[0] === "R" ? 1 : -1, distance = +cmd.substring(1);
		i = (i + turn + 4) % 4;

		for (let steps = 0; steps < distance; steps++) {
			pos[0] += direction[i];
			pos[1] += direction[i + 1];
			const str = pos.join(",");
			if (visited.has(str) && first == null) {
				first = [...pos];
			}
			visited.add(str);
		}
	});

	return Math.abs(first[0]) + Math.abs(first[1]);
};

