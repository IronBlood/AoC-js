/**
 * @param {string} str
 * @returns {number}
 */
export const count_houses = (str) => {
	const pos = [0,0], set = new Set();
	set.add("0,0");
	for (let i = 0; i < str.length; i++) {
		switch (str[i]) {
			case "^": pos[0]++; break;
			case "v": pos[0]--; break;
			case ">": pos[1]++; break;
			case "<": pos[1]--; break;
		}
		set.add(pos.join(","));
	}
	return set.size;
};

/**
 * @param {string} str
 * @returns {number}
 */
export const count_houses_with_robo = (str) => {
	const set = new Set();
	const pos_santa = [0,0], pos_robo = [0,0];
	set.add("0,0");
	for (let i = 0; i < str.length; i += 2) {
		for (const [pos, c] of [[pos_santa, str[i]], [pos_robo, str[i+1]]]) {
			switch (c) {
				case "^": pos[0]++; break;
				case "v": pos[0]--; break;
				case ">": pos[1]++; break;
				case "<": pos[1]--; break;
			}
			set.add(pos.join(","));
		}
	}
	return set.size;
};

