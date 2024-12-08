/**
 * @param {number} id
 */
export const count_presents_by_houseid = (id) => {
	let sum = 0;
	for (let i = 1; i <= Math.sqrt(id); i++) {
		if (id % i === 0) {
			sum += i;
			if (i * i != id)
				sum += id / i;
		}
	}
	return 10 * sum;
};

/**
 * @param {number} id
 */
export const count_presents_by_houseid2 = (id) => {
	let sum = 0;
	for (let i = 1; i <= Math.sqrt(id); i++) {
		if (id % i === 0) {
			if (i * 50 >= id)
				sum += i;
			const other = id / i;
			if (other !== i && other * 50 >= id)
				sum += other;
		}
	}
	return 11 * sum;
};

