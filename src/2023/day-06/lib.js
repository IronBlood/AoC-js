/**
 * @param {number} time
 * @param {number} distance
 */
export const winning_ways = (time, distance) => {
	const d = Math.sqrt(time * time - 4 * distance);
	let x1 = (time - d) / 2;
	let x2 = (time + d) / 2;
	let t;

	if (x1 === (t = Math.ceil(x1))) {
		x1++
	} else {
		x1 = t;
	}

	if (x2 === (t = Math.floor(x2))) {
		x2--;
	} else {
		x2 = t;
	}

	return x2 - x1 + 1;
};

/**
 * @param {string} data
 */
export const mul = (data) => {
	const [times, distances] = data.split("\n").map(line => line.match(/\d+/g).map(Number));
	// console.log(times, distances);

	let res = 1;
	for (let i = 0; i < times.length; i++) {
		res *= winning_ways(times[i], distances[i]);
	}
	return res;
};

/**
 * @param {string} data
 */
export const mul2 = (data) => {
	const [time, distance] = data.split("\n").map(line => +line.match(/\d/g).slice().join(""));

	return winning_ways(time, distance);
};
