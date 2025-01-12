/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
export const total_distance = (arr1, arr2) => {
	const sort_fn = (a, b) => a - b;
	arr1.sort(sort_fn);
	arr2.sort(sort_fn);
	let result = 0;
	for (let i = 0, n = arr1.length; i < n; i++) {
		result += Math.abs(arr1[i] - arr2[i]);
	}
	return result;
};

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
export const total_similarity = (arr1, arr2) => {
	/** @type {Map<number, number>} */
	const map2 = new Map();
	arr2.forEach(x => map2.set(x, (map2.get(x) || 0) + 1));
	return arr1.reduce((sum, curr) => sum + curr * (map2.get(curr) || 0), 0);
}

