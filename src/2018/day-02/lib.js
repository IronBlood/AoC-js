/**
 * @param {string} data
 */
export const get_checksum = (data) => {
	const count = data.split("\n").reduce((sum, line) => {
		if (!/^[a-z]+$/.test(line))
			throw new Error("invalid input");

		/** @type {number[]} */
		const map = Array(26).fill(0);
		for (let i = 0; i < line.length; i++) {
			map[line.charCodeAt(i) - 97]++;
		}

		if (map.some(x => x === 2)) {
			sum.twice++;
		}
		if (map.some(x => x === 3)) {
			sum.triple++;
		}

		return sum;
	}, { twice: 0, triple: 0 });

	return count.twice * count.triple;
};

/**
 * @param {string} data
 */
export const get_common_letter = (data) => {
	const ids = data.split("\n");

	/** @type {Map<number, string[][]} */
	const map = new Map();
	for (let i = 0; i < ids.length - 1; i++) {
		for (let j = i + 1; j < ids.length; j++) {
			let diff = 0;
			const x = ids[i], y = ids[j];
			for (let k = 0; k < x.length; k++) {
				if (x[k] !== y[k])
					diff++;
			}
			if (!map.has(diff)) {
				map.set(diff, []);
			}
			map.get(diff).push([x, y]);
		}
	}

	const min = Math.min(...map.keys());
	if (map.get(min).length > 1) {
		console.log(map.get(min));
	}

	const [x, y] = map.get(min)[0];
	let str = "";
	for (let i = 0; i < x.length; i++) {
		if (x[i] === y[i]) {
			str += x[i];
		}
	}
	return str;
};

