/**
 * @template {T}
 * @param {T[]} arr
 * @param {number} start_idx
 * @param {number} count
 */
const swap = (arr, start_idx, count) => {
	let end_idx = (start_idx + count - 1) % arr.length;
	while (count > 0) {
		count -= 2;
		const tmp = arr[start_idx];
		arr[start_idx++] = arr[end_idx];
		arr[end_idx--] = tmp;
		if (start_idx === arr.length)
			start_idx = 0;
		if (end_idx < 0)
			end_idx = arr.length - 1;
	}
};

/**
 * @param {string} data
 * @param {number} size
 */
export const get_checksum = (data, size) => {
	const nums = Array.from({ length: size }, (_,idx) => idx);

	const ins = data.split(",").map(Number);
	for (let i = 0, idx = 0; i < ins.length; i++) {
		const el = ins[i];
		swap(nums, idx, el);
		idx = (idx + i + el) % size;
	}

	return nums[0] * nums[1];
};

const HEX = "0123456789abcdef".split("");

/**
 * @param {number} num
 */
const num_to_hex = (num) => HEX[Math.floor(num / 16)] + HEX[num % 16];

/**
 * @param {number[]} nums
 */
export const hex_nums = (nums) => nums.map(num_to_hex).join("");

/**
 * @param {number[]} nums
 */
export const get_dense_hash = (nums) => {
	const dense = [];
	for (let i = 0; i < nums.length; i += 16) {
		let x = nums[i];
		for (let j = 1; j < 16; j++) {
			x ^= nums[i+j];
		}
		dense.push(x);
	}
	return dense;
};

/**
 * @param {string} data
 * @returns {string}
 */
export const hash = (data) => {
	/** @type {number[]} */
	const lengths = [];
	for (let i = 0; i < data.length; i++) {
		lengths.push(data.charCodeAt(i));
	}
	lengths.push(17, 31, 73, 47, 23);

	const nums = Array.from({ length: 256 }, (_,idx) => idx);
	let idx = 0, skip = 0;
	for (let k = 0; k < 64; k++) {
		for (let i = 0; i < lengths.length; i++) {
			swap(nums, idx, lengths[i]);
			idx = (idx + skip + lengths[i]) % 256;
			skip++;
		}
	}

	return hex_nums(get_dense_hash(nums));
}

