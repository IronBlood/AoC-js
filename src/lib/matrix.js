/**
 * Rotate clockwise
 * 1 - 90 right, 2 - 180, 3 - 270
 * @template T
 * @param {T[][]} tile
 * @param {1|2|3} n
 */
export const rotate_tile = (tile, n) => {
	const h = tile.length, w = tile[0].length;

	/** @type {typeof tile} */
	const new_tile = n === 2
		? Array.from({ length: h }, () => Array(w))
		: Array.from({ length: w }, () => Array(h));

	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
			switch (n) {
				case 1: new_tile[j][h-1-i] = tile[i][j]; break;
				case 2: new_tile[h-1-i][w-1-j] = tile[i][j]; break;
				case 3: new_tile[w-1-j][i] = tile[i][j]; break;
			}
		}
	}

	return new_tile;
}

/**
 * @template T
 * @param {T[][]} tile
 */
export const flip_w_tile = (tile) => {
	return tile.map(x => x.slice().reverse());
}
