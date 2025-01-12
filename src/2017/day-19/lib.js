/**
 * @param {string} data
 */
export const get_letters = (data, part = 1) => {
	/** @type {[number, number]} */
	let start_pos;
	const lines = data.split("\n");
	for (let j = 0; j < lines[0].length; j++) {
		if (lines[0][j] === "|") {
			start_pos = [0, j];
			break;
		}
	}

	let letters = [];

	let ptr = {
		pos: start_pos,
		dir: [1, 0],
	};

	let steps = 0;

	/**
	 * @param {string[]} lines
	 * @param {[number, number]} pos
	 */
	const is_in_grid = (lines, pos) => {
		const [x, y] = pos;
		return x >= 0 && y >= 0 && x < lines.length && y < lines[x].length;
	};

	while (true) {
		const { pos: [x, y], dir: [u, v] } = ptr;

		if (!is_in_grid(lines, ptr.pos) || lines[x][y] === " ") {
			break;
		}

		steps++;

		// take a turn
		if (lines[x][y] === "+") {
			const candidate_dirs = u === 0
				? [ [-1, 0], [1, 0] ]
				: [ [0, -1], [0, 1] ];

			for (let [nu, nv] of candidate_dirs) {
				const nx = x + nu, ny = y + nv;
				if (is_in_grid(lines, [nx, ny]) && lines[nx][ny] !== " ") {
					ptr = {
						pos: [nx, ny],
						dir: [nu, nv],
					};
					break;
				}
			}
			continue;
		}

		// otherwise go straight and collect letters
		if (/[A-Za-z]/.test(lines[x][y])) {
			letters.push(lines[x][y]);
		}
		ptr = {
			pos: [x+u, y+v],
			dir: [u, v],
		};
	}

	return part === 1 ? letters.join("") : steps;
};

