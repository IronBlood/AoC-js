// @ts-check

/**
 * @template T
 * @param   {T[]}    arr
 * @param   {number} len size of each combination
 * @returns {T[][]}
 */
export const combinations = (arr, len) => {
	if (len === 0)
		return [[]];

	const result = [];
	for (let i = 0; i <= arr.length - len; i++) {
		for (const sub_combination of combinations(arr.slice(i + 1), len - 1)) {
			result.push([arr[i], ...sub_combination]);
		}
	}
	return result;
};

/**
 * @template T
 * @param {T[]} arr
 * @returns {T[][]}
 */
export const all_subsets = (arr, with_empty_set = false) => {
	let result = with_empty_set ? [[]] : [[arr[0]]];

	for (let i = with_empty_set ? 0 : 1; i < arr.length; i++) {
		const valve = arr[i];
		const new_result = result.map(left => left.slice());
		for (const left of result) {
			new_result.push([...left, valve]);
		}

		result = new_result;
	}

	return result;
};

/**
 * @template T
 * @param {T[]} arr
 * @param {T[][]} subsets
 */
export const zip_with_complement = (arr, subsets) => {
	return subsets.map(left => {
		const left_set = new Set(left);
		const right = arr.filter(v => !left_set.has(v));
		return [left, right];
	});
};
