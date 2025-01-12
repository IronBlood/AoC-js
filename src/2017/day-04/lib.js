/**
 * @param {string} data
 * @returns {number}
 */
export const count_valid_passphrases = (data, part = 1) => {
	return data.split("\n").reduce((sum, line) => {
		const arr = line.split(" ");
		if (part === 1) {
			const set = new Set(arr);
			return sum + (arr.length === set.size ? 1 : 0);
		} else {
			const set = new Set();
			for (let i = 0; i < arr.length; i++) {
				const freq = Array(26).fill(0);
				const w = arr[i];
				for (let j = 0; j < w.length; j++) {
					freq[w.charCodeAt(j) - 97]++;
				}
				const key = freq.join(",");
				if (set.has(key))
					return sum;
				set.add(key);
			}
			return sum + 1;
		}
	}, 0);
};

