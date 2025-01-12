/**
 * @param {string} str
 */
const get_heights = (str) => {
	/** @type {number[]} */
	const ans = Array(5).fill(0);
	const arr = str.split("\n");
	for (let i = 1; i <= 5; i++) {
		for (let j = 0; j < 5; j++) {
			if (arr[i][j] === "#") {
				ans[j]++;
			}
		}
	}
	return ans;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const find_pairs = (data) => {
	const sections = data.split("\n\n");
	const locks = [], keys = [];
	sections.forEach(x => {
		if (x[0] === "#") {
			locks.push(x);
		} else {
			keys.push(x);
		}
	});

	const h_locks = locks.map(get_heights), h_keys = keys.map(get_heights);
	let count = 0;
	h_locks.forEach(lock => {
		h_keys.forEach(key => {
			let match = true;
			for (let i = 0; i < 5; i++) {
				if (lock[i] + key[i] > 5) {
					match = false;
					break;
				}
			}
			if (match)
				count++;
		});
	});
	return count;
};

