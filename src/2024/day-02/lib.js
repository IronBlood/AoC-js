/**
 * @param {number[]} arr
 */
const _is_safe = (arr) => {
	const increasing = arr[0] < arr[1];
	for (let i = 0; i < arr.length - 1; i++) {
		const delta = increasing ? (arr[i + 1] - arr[i]) : (arr[i] - arr[i + 1]);
		if (delta < 1 || delta > 3)
			return false;
	}
	return true;
};

/**
 * @param {string} str
 */
export const is_safe = (str) => {
	const arr = str.split(" ").map(x => +x);
	return _is_safe(arr);
};

/**
 * @param {string} str
 */
export const is_safe2 = (str) => {
	const arr = str.split(" ").map(x => +x);

	if (_is_safe(arr)) return true;

	for (let i = 0; i < arr.length; i++) {
		const tmp = arr.slice(0, i).concat(arr.slice(i + 1));
		if (_is_safe(tmp))
			return true;
	}
	return false;
};

