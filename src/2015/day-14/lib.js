/**
 * @typedef {Object} Reindeer
 * @property {number} speed
 * @property {number} last seconds that a reindeer can fly
 * @property {number} rest seconds that a reindeer must take before next flying cycle
 */

/**
 * @param {Reindeer} reindeer
 * @param {number} seconds
 * @returns {number}
 */
const get_distance = (reindeer, seconds) => {
	const cycle = (seconds / (reindeer.last + reindeer.rest)) | 0;
	let distance = cycle * reindeer.speed * reindeer.last;
	const remain = seconds - cycle * (reindeer.last + reindeer.rest);
	distance += Math.min(remain, reindeer.last) * reindeer.speed;
	return distance;
};

/**
 * @param {string[]} data
 * @param {number} seconds
 */
export const farthest = (data, seconds) => {
	let farthest = 0;
	data.forEach(d => {
		const arr = d.split(" ");
		const speed = +arr[3],
			last = +arr[6],
			rest = +arr[13];
		farthest = Math.max(farthest, get_distance({ speed, last, rest }, seconds));
	});
	return farthest;
};

/**
 * @param {string[]} data
 * @param {number} seconds
 */
export const most_points = (data, seconds) => {
	const reindeers = data.map(d => {
		const arr = d.split(" ");
		const speed = +arr[3],
			last = +arr[6],
			rest = +arr[13];
		return { speed, last, rest };
	});

	const scores = Array(reindeers.length).fill(0);
	for (let i = 1; i <= seconds; i++) {
		const distances = reindeers.map(d => get_distance(d, i));
		const f = Math.max(...distances);
		for (let j = 0; j < scores.length; j++) {
			if (distances[j] === f) {
				scores[j]++;
			}
		}
	}
	return Math.max(...scores);
};

