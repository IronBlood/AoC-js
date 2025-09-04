/**
 * @param {string} line
 * @param {number[]} set_1s
 * @param {number[]} set_0s
 */
const parse_mask = (line, set_1s, set_0s) => {
	set_1s.length = 0;
	set_0s.length = 0;

	const str_mask = line.split(" = ")[1];

	for (let i = 0, len = str_mask.length; i < len; i++) {
		const c = str_mask[len - 1 - i];
		if (c === "1") {
			set_1s.push(BigInt(i));
		} else if (c === "0") {
			set_0s.push(BigInt(i));
		}
	}
};

/**
 * @param {number | bigint} val
 * @param {number[]} set_1s
 * @param {number[]} set_0s
 */
const update_val = (val, set_1s, set_0s) => {
	val = BigInt(val);

	for (const idx of set_1s) {
		val |= (1n << idx);
	}
	for (const idx of set_0s) {
		val &= ~(1n << idx);
	}
	return val;
};

/**
 * @param {string} data
 */
export const get_sum = (data) => {
	/** @type {number[]} */
	const set_1s = [];
	/** @type {number[]} */
	const set_0s = [];
	/** @type {Map<number, bigint>} */
	const mem = new Map();

	for (const line of data.split("\n")) {
		if (line.startsWith("mask")) {
			parse_mask(line, set_1s, set_0s);
		} else {
			const re = /^mem\[(\d+)\] = (\d+)$/;
			const [pos, val] = re.exec(line).slice(1).map(Number);
			mem.set(pos, update_val(val, set_1s, set_0s));
		}
	}

	let sum = 0n;
	for (const v of mem.values()) {
		sum += v;
	}
	return sum;
};

/**
 * @param {("0"|"1")[]} arr
 */
const parse_bigint = (arr) => {
	let res = 0n;
	for (let i = 0, len = arr.length; i < len; i++) {
		res |= BigInt(arr[len - 1 - i]) << BigInt(i);
	}
	return res;
};

/**
 * @param {("0"|"1"|"X")[]} mask
 */
const get_pos_X = (mask) => {
	const pos_X = [];
	for (let i = 0; i < mask.length; i++) {
		if (mask[i] === "X") {
			pos_X.push(i);
		}
	}
	return pos_X;
};

/**
 * @param {number} addr
 * @param {("0"|"1"|"X")[]} mask
 */
const apply_mask = (addr, mask) => {
	const len = mask.length;
	const str_addr = addr.toString(2).padStart(len, "0");
	const arr_addr = str_addr.split("");

	for (let i = 0; i < len; i++) {
		if (mask[i] === "0")
			continue;
		arr_addr[i] = mask[i];
	}

	return arr_addr;
};

/**
 * @param {("0"|"1"|"X")[]} addr
 * @param {number[]} pos_X
 */
const get_all_addresses = (addr, pos_X) => {
	/** @type {bigint[]} */
	const addresses = [];

	/**
	 * @param {number} idx
	 */
	const dfs = (idx) => {
		if (idx === pos_X.length) {
			addresses.push(parse_bigint(addr))
			return;
		}

		addr[pos_X[idx]] = "0";
		dfs(idx + 1);
		addr[pos_X[idx]] = "1";
		dfs(idx + 1);
	};

	dfs(0);

	return addresses;
};

/**
 * @param {string} data
 */
export const get_sum2 = (data) => {
	/** @type {string[]} */
	let mask;
	/** @type {number[]} */
	const pos_X = [];
	/** @type {Map<number, bigint>} */
	const mem = new Map();

	for (const line of data.split("\n")) {
		if (line.startsWith("mask")) {
			mask = line.split(" = ")[1].split("");
			pos_X.length = 0;
			for (let i = 0, len = mask.length; i < len; i++) {
				if (mask[i] === "X") {
					pos_X.push(i);
				}
			}
		} else {
			const re = /^mem\[(\d+)\] = (\d+)$/;
			const [pos, val] = re.exec(line).slice(1).map(Number);
			const addresses = get_all_addresses(apply_mask(pos, mask), pos_X);

			for (const addr of addresses) {
				mem.set(addr, val);
			}
		}
	}

	let sum = 0;
	for (const v of mem.values()) {
		sum += v;
	}
	return sum;
};
