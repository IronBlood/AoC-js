/**
 * @param {string|string[]} str
 */
export const get_checksum = str => {
	do {
		let next_str = "";
		for (let i = 0; i < str.length; i += 2) {
			next_str += (str[i] === str[i+1]) ? "1" : "0";
		}
		str = next_str;
	} while ((str.length & 1) === 0)

	return str;
};

/**
 * @param {string|string[]} x
 */
export const dragon_curve = (x) => {
	let a = Array.isArray(x) ? x : x.split("");
	let b = a.slice().reverse().map(c => c === "0" ? "1" : "0");
	return [...a, "0", ...b];
};

/**
 * @param {string} data
 * @param {number} disk_size
 * @returns {string}
 */
export const disk_checksum = (data, disk_size) => {
	let arr = data.split("");
	do {
		arr = dragon_curve(arr);
	} while (arr.length < disk_size);
	arr.length = disk_size;
	return get_checksum(arr);
};

