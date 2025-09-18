/**
 * @param {string} line
 */
const check_contain = (line) => {
	const [
		[a1, a2],
		[b1, b2],
	] = line.split(",").map(seg => seg.split("-").map(Number));

	return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && a2 <= b2);
};

/**
 * @param {string} line
 */
const check_overlap = (line) => {
	const [
		[a1, a2],
		[b1, b2],
	] = line.split(",").map(seg => seg.split("-").map(Number));

	const res = !(a2 < b1 || b2 < a1);
	return res;
};

/**
 * @param {string} data
 */
export const count_fully_contain = (data) => {
	return data.split("\n").filter(check_contain).length;
};

/**
 * @param {string} data
 */
export const count_overlap = (data) => {
	return data.split("\n").filter(check_overlap).length;
};
