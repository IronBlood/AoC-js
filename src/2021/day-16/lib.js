/**
 * @param {string} str
 * @param {number} idx
 * @param {number} len
 */
const parse_value = (str, idx, len) => {
	return Number.parseInt(str.substring(idx, idx + len), 2);
};

/**
 * @param {string} str
 * @param {number} idx
 */
const parse_literal_segment = (str, idx) => {
	const sub = str.substring(idx, idx + 5);
	const last = sub[0] === "0";
	const digits = sub.substring(1);

	return { last, digits };
};

/**
 * @param {string} data
 */
export const get_value_from_packet = (data, part = 1) => {
	const message_bin = data
		.split("")
		.map(c => Number
			.parseInt(c, 16)
			.toString(2)
			.padStart(4, "0"))
		.join("");

	let sum = 0;
	let idx = 0;

	/**
	 * @typedef {{ value: number; len: number }} ParseResult
	 * @typedef {{ values: number[]; len: number }} ParseResults
	 */

	/**
	 * @param {number} base
	 * @returns {ParseResult}
	 */
	const parse_packet = (base) => {
		const version = parse_value(message_bin, base, 3);
		const type = parse_value(message_bin, base + 3, 3);

		sum += version;

		if (type === 4) {
			const res = parse_literal_packet(base + 6);
			res.len += 6;
			return res;
		} else {
			const sub_type = message_bin[base + 6];
			let { len, values } = (sub_type === "0" ? parse_sub0(base + 7) : parse_sub1(base + 7));
			len += 7;

			let value = -1;
			switch (type) {
				case 0: value = values.reduce((a, b) => a + b); break;
				case 1: value = values.reduce((a, b) => a * b); break;
				case 2: value = Math.min(...values); break;
				case 3: value = Math.max(...values); break;
				case 5: value = (values[0] > values[1]) ? 1 : 0; break;
				case 6: value = (values[0] < values[1]) ? 1 : 0; break;
				case 7: value = (values[0] === values[1]) ? 1 : 0; break;
				default: throw new Error(`Unknown type ${type}`);
			}

			return { value, len };
		}
	};

	/**
	 * @param {number} base
	 * @returns {ParseResult}
	 */
	const parse_literal_packet = (base) => {
		const content_builder = [];
		let offset = 0;
		while (true) {
			const { last, digits } = parse_literal_segment(message_bin, base + offset);
			offset += 5;
			content_builder.push(digits);
			if (last) {
				break;
			}
		}
		return {
			value: Number.parseInt(content_builder.join(""), 2),
			len: offset,
		};
	};

	/**
	 * @param {number} base
	 * @returns {ParseResults}
	 */
	const parse_sub0 = (base) => {
		const total_len = parse_value(message_bin, base, 15);
		const values = [];
		let len = 0;
		while (len < total_len) {
			const res = parse_packet(base + 15 + len);
			len += res.len;
			values.push(res.value);
		}
		if (len !== total_len) {
			console.log(`wrong format at ${base}`);
		}
		return {
			values,
			len: len + 15,
		};
	};

	/**
	 * @param {number} base
	 * @returns {ParseResults}
	 */
	const parse_sub1 = (base) => {
		let count = parse_value(message_bin, base, 11);
		let len = 0;
		const values = [];
		while (count-- > 0) {
			const res = parse_packet(base + 11 + len);
			len += res.len;
			values.push(res.value);
		}
		return {
			len: len + 11,
			values,
		};
	};

	let res;
	while (idx < message_bin.length) {
		if (message_bin.length - idx < 8)
			break;
		res = parse_packet(idx);
		idx += res.len;
	}

	return part === 1 ? sum : res.value;
};
