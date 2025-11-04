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

/**
 * @param {(0|1)[]} arr
 * @returns {string}
 */
export const get_checksum2 = arr => {
	do {
		/** @type {typeof arr} */
		let next_arr = [];
		for (let i = 0; i < arr.length; i += 2) {
			next_arr.push(arr[i] === arr[i + 1] ? 1 : 0);
		}
		arr = next_arr;
	} while ((arr.length & 1) === 0)

	return arr.join("");
};

/**
 * @param {string|(0|1)[]} x
 */
export const dragon_curve2 = (x) => {
	/** @type {(0|1)[]} */
	let a;
	if (Array.isArray(x)) {
		a = x;
	} else {
		a = Array(x.length).fill(0);
		for (let i = 0; i < x.length; i++) {
			if (x[i] === "1") {
				a[i] = 1;
			}
		}
	}

	const len = a.length;
	a[len] = 0;

	for (let i = 0; i < len; i++) {
		// @ts-ignore
		a[i + len + 1] = 1 - a[len - 1 - i];
	}

	return a;
};

/**
 * @param {string} data
 * @param {number} disk_size
 * @returns {string}
 */
export const disk_checksum2 = (data, disk_size) => {
	/** @type {(0|1)[]|string} */
	let arr = data;
	do {
		arr = dragon_curve2(arr);
	} while (arr.length < disk_size);
	arr.length = disk_size;
	return get_checksum2(arr);
};
