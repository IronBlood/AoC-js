/**
 * @param {string} content
 * @param {string} word
 */
export const count_word = (content, word) => {
	const grid = content.split("\n").map(line => line.split(""));
	const M = grid.length, N = grid[0].length;
	const directions = [
		[0, 1],  // Right
		[0, -1], // Left
		[1, 0],  // Down
		[-1, 0], // Up
		[1, 1],  // Diagonal down-right
		[-1, -1],// Diagonal up-left
		[1, -1], // Diagonal down-left
		[-1, 1], // Diagonal up-right
	];
	let count = 0;

	const is_in_bound = (x,y) => x>=0 && x<M && y>=0 && y<N;
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			for (let [dx, dy] of directions) {
				let k = 0;
				let x = i, y = j;
				while (k < word.length && is_in_bound(x,y) && grid[x][y] == word[k]) {
					x += dx;
					y += dy;
					k++;
				}
				if (k == word.length) {
					count++;
				}
			}
		}
	}

	return count;
};

/**
 * @param {string} content
 * @param {string} word
 */
export const count_x = (content) => {
	const grid = content.split("\n").map(line => line.split(""));
	const M = grid.length, N = grid[0].length;
	let count = 0;
	const is_in_bound = (x,y) => x>=0 && x<M && y>=0 && y<N;

	for (let i = 1; i < M - 1; i++) {
		for (let j = 1; j < N - 1; j++) {
			if (grid[i][j] == "A") {
				let t = i - 1,
					b = i + 1,
					l = j - 1,
					r = j + 1;
				const slash = `${grid[t][r]}${grid[b][l]}`,
					backslash = `${grid[t][l]}${grid[b][r]}`;
					if ((slash == "MS" || slash == "SM") && (backslash == "MS" || backslash == "SM"))
						count++;
			}
		}
	}

	return count;
};

