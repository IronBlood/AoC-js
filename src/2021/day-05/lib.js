/**
 * @param {number} x
 */
const normalize = x => x === 0 ? 0 : (x / Math.abs(x));

class Line {
	/**
	 * @param {number} x1
	 * @param {number} y1
	 * @param {number} x2
	 * @param {number} y2
	 */
	constructor(x1, y1, x2, y2) {
		/** @type {number} */
		this.x1 = x1;
		/** @type {number} */
		this.y1 = y1;
		/** @type {number} */
		this.x2 = x2;
		/** @type {number} */
		this.y2 = y2;
	}

	is_horizontal() {
		return this.x1 === this.x2;
	}

	is_vertical() {
		return this.y1 === this.y2;
	}

	get_vector() {
		const dx = this.x2 - this.x1;
		const dy = this.y2 - this.y1;

		return [dx, dy].map(normalize);
	}
}

/**
 * @param {string}
 * @returns {Line}
 */
const parse_cordinates = str => {
	const m = /^(\d+),(\d+) -> (\d+),(\d+)$/.exec(str);
	if (!m) {
		throw new Error(`Invalid format ${str}`);
	}

	const [x1, y1, x2, y2] = m.slice(1).map(Number);
	return new Line(x1, y1, x2, y2);
};

/**
 * @param {string} data
 */
export const count_overlapped_points = (data, part = 1) => {
	const lines = data.split("\n").map(parse_cordinates);

	let min_x = Number.MAX_SAFE_INTEGER,
		min_y = Number.MAX_SAFE_INTEGER,
		max_x = Number.MIN_SAFE_INTEGER,
		max_y = Number.MIN_SAFE_INTEGER;

	lines.forEach(line => {
		for (const x of [line.x1, line.x2]) {
			min_x = Math.min(min_x, x);
			max_x = Math.max(max_x, x);
		}

		for (const y of [line.y1, line.y2]) {
			min_y = Math.min(min_y, y);
			max_y = Math.max(max_y, y);
		}
	});

	const X = max_x - min_x + 1,
		Y = max_y - min_y + 1;

	/** @type {number[][]} */
	const grid = Array.from({ length: X }, () => Array(Y).fill(0));

	lines.forEach(line => {
		if (line.is_horizontal()) {
			for (let y = Math.min(line.y1, line.y2); y <= Math.max(line.y1, line.y2); y++) {
				grid[line.x1 - min_x][y - min_y]++;
			}
		} else if (line.is_vertical()) {
			for (let x = Math.min(line.x1, line.x2); x <= Math.max(line.x1, line.x2); x++) {
				grid[x - min_x][line.y1 - min_y]++;
			}
		} else {
			if (part === 2) {
				const [dx, dy] = line.get_vector();
				const dir = dx * dy;
				if (dir === 1) {
					for (let x = Math.min(line.x1, line.x2), y = Math.min(line.y1, line.y2); x <= Math.max(line.x1, line.x2) && y <= Math.max(line.y1, line.y2); x++, y++) {
						grid[x - min_x][y - min_y]++;
					}
				} else {
					for (let x = Math.min(line.x1, line.x2), y = Math.max(line.y1, line.y2); x <= Math.max(line.x1, line.x2) && y >= Math.min(line.y1, line.y2); x++, y--) {
						grid[x - min_x][y - min_y]++;
					}
				}
			}
		}
	});

	return grid.flat().filter(x => x >= 2).length;
}

