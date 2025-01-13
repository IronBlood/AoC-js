/**
 * @param {string} data
 */
export const get_freq = (data) => {
	return data.split("\n").reduce((sum, line) => sum + Number(line), 0);
}

/**
 * @param {string} data
 */
export const get_freq_2 = (data) => {
	let freq = 0;
	const set = new Set();
	set.add(freq);
	const changes = data.split("\n").map(Number);
	while (true) {
		for (let c of changes) {
			freq += c;
			if (set.has(freq)) {
				return freq;
			}
			set.add(freq);
		}
	}
}

