// Credit Nathanfenner https://www.reddit.com/r/adventofcode/comments/a6wpup/comment/ebys4h0/

/**
 * @param {string} data
 */
export const count_tiles = (data) => {
	const lines = data.split("\n");
	let min_x = Number.MAX_SAFE_INTEGER,
		min_y = Number.MAX_SAFE_INTEGER,
		max_x = Number.MIN_SAFE_INTEGER,
		max_y = Number.MIN_SAFE_INTEGER;

	/** @type {number[][][]} */
	const vectors = [];

	lines.forEach(line => {
		const arr = line.split(", ");
		let num = +arr[0].split("=")[1];
		let range = arr[1].split("=")[1].split("..").map(Number);
		if (line[0] === "x") {
			min_x = Math.min(min_x, num);
			max_x = Math.max(max_x, num);

			min_y = Math.min(min_y, range[0]);
			max_y = Math.max(max_y, range[1]);
			vectors.push([
				[num, range[0]],
				[num, range[1]],
			]);
		} else {
			min_y = Math.min(min_y, num);
			max_y = Math.max(max_y, num);

			min_x = Math.min(min_x, range[0]);
			max_x = Math.max(max_x, range[1]);

			vectors.push([
				[range[0], num],
				[range[1], num],
			]);
		}
	});

	const base_x = min_x - 1, len_x = max_x + 2 - base_x;

	/** @type {string[][]} */
	const grid = Array.from({ length: max_y + 1 }, () => Array(len_x).fill("."));
	vectors.forEach(([start, end]) => {
		for (let i = start[0]; i <= end[0]; i++) {
			for (let j = start[1]; j <= end[1]; j++) {
				grid[j][i - base_x] = "#";
			}
		}
	});
	grid[0][500-base_x] = "|";

	const DIRS = [
		[1, 0],
		[0, 1],
		//[-1, 0],
		[0, -1],
	];

	/** @type {[number, number][]} */
	const update_check = [];
	update_check.push([0, 500-base_x]);

	/**
	 * @param {[number, number]} pos
	 */
	const in_grid = (pos) => {
		const [y, x] = pos;
		return y >= 0 && y <= max_y && x >= 0 && x < len_x;
	};

	/**
	 * @param {[number, number]} pos
	 * @param {string} v
	 */
	const set_square = (pos, v) => {
		const [y, x] = pos;
		if (!in_grid(pos) || grid[y][x] === "#") {
			return;
		}

		if (grid[y][x] !== v) {
			for (let [dy, dx] of DIRS) {
				update_check.push([y + dy, x + dx]);
			}
			update_check.push(pos);
		}
		grid[y][x] = v;
	};

	/** @type {[number, number]} */
	const down = [1, 0];
	/** @type {[number, number]} */
	const left = [0, -1];
	/** @type {[number, number]} */
	const right = [0, 1];

	/**
	 * @param {[number, number]} pos
	 * @param {[number, number]} vec
	 * @returns {[number, number]}
	 */
	const go_x = (pos, vec) => [pos[0] + vec[0], pos[1] + vec[1]];

	while (update_check.length > 0) {
		/** @type {[number, number]} */
		const at = update_check.pop();
		if (!in_grid(at))
			continue;
		const [y, x] = at;
		if (grid[y][x] === "#")
			continue;

		let cell_down = go_x(at, down);
		if (grid[y][x] === "|" && in_grid(cell_down) && grid[cell_down[0]][cell_down[1]] === ".") {
			set_square(cell_down, "|");
		}
		if (grid[y][x] === "|") {
			let supported = true;
			for (let bx = x; bx >= 1; bx--) {
				if (in_grid([y, bx]) && grid[y][bx] === "#")
					break;
				if (!in_grid([y+1, bx]) || grid[y+1][bx] === ".") {
					supported = false;
					break;
				}
				if (grid[y+1][bx] !== "#" && grid[y+1][bx] !== "~") {
					supported = false;
					break;
				}
			}
			for (let bx = x; bx < len_x - 1; bx++) {
				if (in_grid([y, bx]) && grid[y][bx] === "#")
					break;
				if (!in_grid([y+1, bx]) || grid[y+1][bx] === ".") {
					supported = false;
					break;
				}
				if (grid[y+1][bx] !== "#" && grid[y+1][bx] !== "~") {
					supported = false;
					break;
				}
			}
			if (supported) {
				set_square(at, "~");
			}
		}

		if (grid[y][x] === "|" && in_grid([y + 1, x]) && (grid[y+1][x] === "~" || grid[y+1][x] === "#")) {
			set_square(go_x(at, left), "|");
			set_square(go_x(at, right), "|");
		}

		if (grid[y][x] === "~") {
			set_square(go_x(at, left), "~");
			set_square(go_x(at, right), "~");
		}
	}

	//console.error(grid.map(row => row.map(x => x === "." ? " " : x).join("")).join("\n"));

	let tot = 0, wat = 0;
	for (let i = min_y; i <= max_y; i++) {
		grid[i].forEach(cell => {
			if (cell === "~" || cell === "|") tot++;
			if (cell === "~") wat++;
		});
	}

	return { tot, wat };
};

