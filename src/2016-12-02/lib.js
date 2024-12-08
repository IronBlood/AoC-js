const keypad1 = [
	"123",
	"456",
	"789",
];

/**
 * @param {string} data
 * @returns {string}
 */
export const get_code = data => {
	let x = 1, y = 1;
	return data.split("\n").map(line => {
		const n = line.length;
		for (let i = 0; i < n; i++) {
			switch (line[i]) {
				case "U": x = Math.max(x - 1, 0); break;
				case "D": x = Math.min(x + 1, 2); break;
				case "L": y = Math.max(y - 1, 0); break;
				case "R": y = Math.min(y + 1, 2); break;
			}
		}
		return keypad1[x][y];
	}).join("");
};

const keypad2 = [
	"..1..",
	".234.",
	"56789",
	".ABC.",
	"..D..",
];

/**
 * @param {string} data
 * @returns {string}
 */
export const get_code2 = data => {
	let x = 2, y = 0;
	return data.split("\n").map(line => {
		const n = line.length;
		let nx = x, ny = y;
		for (let i = 0; i < n; i++) {
			switch (line[i]) {
				case "U": nx = Math.max(nx - 1, 0); break;
				case "D": nx = Math.min(nx + 1, 4); break;
				case "L": ny = Math.max(ny - 1, 0); break;
				case "R": ny = Math.min(ny + 1, 4); break;
			}
			if (keypad2[nx][ny] !== ".") {
				x = nx;
				y = ny;
			} else {
				nx = x;
				ny = y;
			}
		}
		return keypad2[x][y];
	}).join("");
};

