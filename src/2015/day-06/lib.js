/**
 * @param {string} xy
 */
const xy_helper = xy => xy.split(",").map(Number);

/**
 * @param {string} cmd
 * @returns {[number[], number[], number]}
 */
export const parse = (cmd) => {
	const arr = cmd.split(" ");
	if (arr.length == 4) {
		// toggle a,b through c,d
		return [xy_helper(arr[1]), xy_helper(arr[3]), 2];
	}
	return [xy_helper(arr[2]), xy_helper(arr[4]), arr[1] == "on" ? 1 : 0];
};

