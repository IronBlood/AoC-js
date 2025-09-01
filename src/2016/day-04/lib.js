/**
 * @param {string} str
 * @returns {0|1}
 */
export const is_real_room = str => {
	/** @type {Map<string, number>} */
	const map = new Map();
	for (let i = 0; i < str.lastIndexOf("-"); i++) {
		const c = str[i];
		if (c == "-") {
			// c = -52, str[i] == "-"
			continue;
		}
		map.set(c, (map.get(c) || 0) + 1);
	}
	/** @type {{ char: string; code: number; count: number }[]} */
	const arr = [];
	for (const [k, v] of map.entries()) {
		arr.push({
			char: k,
			code: k.charCodeAt(0),
			count: v,
		});
	}
	arr.sort((a, b) => {
		return a.count === b.count
			? (a.code - b.code)
			: (b.count - a.count);
	});

	for (let i = str.length - 6, j = 0; j < 5; i++, j++) {
		if (str[i] !== arr[j].char)
			return 0;
	}

	return 1;
};

/**
 * @param {string} data
 */
export const count_real_rooms = data => {
	return data.split("\n").reduce((sum, line) => {
		if (is_real_room(line) === 1) {
			const sector_id = Number(line.substring(
				line.lastIndexOf("-") + 1,
				line.lastIndexOf("[")
			));
			return sum + sector_id;
		} else {
			return sum;
		}
	}, 0);
};

const encoder = new TextEncoder(),
	decoder = new TextDecoder();

/**
 * @param {string} str be careful, should not include "[xxxxx]"
 */
export const decrypt = str => {
	const arr = str.split("-");
	const num = (+arr[arr.length - 1]) % 26;
	arr.length = 3;
	return arr.map(s => {
		const buf = encoder.encode(s);
		for (let i = 0; i < buf.length; i++) {
			buf[i] = 97 + (buf[i] - 97 + num) % 26;
		}
		return decoder.decode(buf);
	}).join(" ");
};

/**
 * @param {string} data
 */
export const find_storage = data => {
	const candidates = data.split("\n").filter(line => is_real_room(line) === 1);
	for (let line of candidates) {
		const str = line.substring(0, line.lastIndexOf("["));
		const msg = decrypt(str);
		if (msg === "northpole object storage") {
			return str.substring(str.lastIndexOf("-") + 1);
		}
	}
};

