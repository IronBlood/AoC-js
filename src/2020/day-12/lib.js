const VECTORS = [
	[-1, 0], // N
	[0, 1],  // E
	[1, 0],  // S
	[0, -1], // W
];

/**
 * @param {string} data
 */
export const get_distance = (data) => {
	let pos = [0, 0];
	let dir = 1;

	data.split("\n").forEach(line => {
		const cmd = line[0], num = +line.substring(1);

		if (["L", "R"].includes(cmd)) {
			if ((num % 90) !== 0) {
				throw new Error(`unexpected degree ${num}`);
			}

			const offset = (cmd === "R" ? +num : -num) / 90;

			dir = (dir + offset + 4) % 4;
			return;
		}

		let v = VECTORS[dir];
		switch (cmd) {
			case "N": v = VECTORS[0]; break;
			case "E": v = VECTORS[1]; break;
			case "S": v = VECTORS[2]; break;
			case "W": v = VECTORS[3]; break;
		}

		pos[0] += num * v[0];
		pos[1] += num * v[1];
	});

	return Math.abs(pos[0]) + Math.abs(pos[1]);
};

/**
 * @param {string} data
 */
export const get_distance_2 = (data) => {
	let waypoint = [1, 10], pos = [0, 0];

	data.split("\n").forEach(line => {
		const cmd = line[0], num = +line.substring(1);

		if (["L", "R"].includes(cmd)) {
			const [x, y] = waypoint;

			if ((num % 90) !== 0) {
				throw new Error(`unexpected degree ${num}`);
			}

			let offset = (cmd === "R" ? +num : -num) / 90 % 4;
			if (offset < 0) {
				offset += 4;
			}

			switch (offset) {
				case 1: waypoint = [-y, x]; break;
				case 2: waypoint = [-x, -y]; break;
				case 3: waypoint = [y, -x]; break;
			}
			return;
		}

		switch (cmd) {
			case "N": waypoint[0] += num; break;
			case "E": waypoint[1] += num; break;
			case "S": waypoint[0] -= num; break;
			case "W": waypoint[1] -= num; break;
			case "F":
				pos[0] += waypoint[0] * num;
				pos[1] += waypoint[1] * num;
				break;
		}
	});

	return Math.abs(pos[0]) + Math.abs(pos[1]);
};
