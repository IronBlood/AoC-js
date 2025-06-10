/**
 * @param {string} data
 */
export const closest_intersection = (data, part = 1) => {
	/** @type {Map<string, number>} */
	const seen = new Map();
	const lines = data.split("\n");

	const directions = {
		R: [0, 1],
		L: [0, -1],
		U: [-1, 0],
		D: [1, 0],
	};

	let x = 0, y = 0, steps = 0;
	lines[0].split(",").forEach(cmd => {
		const [dx, dy] = directions[cmd[0]];
		let step = +cmd.substring(1);
		while (step-- > 0) {
			x += dx;
			y += dy;
			steps++;
			const str = `${x},${y}`;
			seen.set(str, steps);
		}
	});

	let closest = Number.MAX_SAFE_INTEGER, fewest_steps = Number.MAX_SAFE_INTEGER;
	x = 0;
	y = 0;
	steps = 0;
	lines[1].split(",").forEach(cmd => {
		const [dx, dy] = directions[cmd[0]];
		let step = +cmd.substring(1);
		while (step-- > 0) {
			x += dx;
			y += dy;
			steps++;
			const str = `${x},${y}`;
			if (seen.has(str)) {
				closest = Math.min(closest, Math.abs(x) + Math.abs(y));
				fewest_steps = Math.min(fewest_steps, seen.get(str) + steps);
			}
		}
	});
	return part === 1 ? closest : fewest_steps;
};
