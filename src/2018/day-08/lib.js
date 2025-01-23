/**
 * @param {string} data
 * @returns {number}
 */
export const sum_metadata = (data) => {
	const numbers = data.split(" ").map(Number);
	let sum = 0;

	/**
	 * @param {number} h_idx
	 * @returns {number}
	 */
	const walk = (h_idx) => {
		const h_children = numbers[h_idx],
			h_metadata = numbers[h_idx + 1];

		let off_set = 2;
		for (let i = 0; i < h_children; i++) {
			let child_idx = h_idx + off_set;
			off_set += walk(child_idx);
		}
		for (let i = 0; i < h_metadata; i++) {
			sum += numbers[h_idx + off_set + i];
		}
		return off_set + h_metadata;
	};

	walk(0);

	return sum;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const root_value = (data) => {
	const numbers = data.split(" ").map(Number);

	/**
	 * @param {number} h_idx
	 * @returns {{val: number; offset: number}}
	 */
	const walk = (h_idx) => {
		const h_children = numbers[h_idx],
			h_metadata = numbers[h_idx + 1];

		let children = [];
		let sum = 0;

		let off_set = 2;
		for (let i = 0; i < h_children; i++) {
			let child_idx = h_idx + off_set;
			const c = walk(child_idx);
			off_set += c.offset;
			children.push(c.val);
		}

		if (h_children === 0) {
			for (let i = 0; i < h_metadata; i++) {
				sum += numbers[h_idx + off_set + i];
			}
		} else {
			for (let i = 0; i < h_metadata; i++) {
				let c_idx = numbers[h_idx + off_set + i];
				if (c_idx > 0 && c_idx <= h_children) {
					sum += children[c_idx - 1];
				}
			}
		}

		return {
			offset: off_set + h_metadata,
			val: sum,
		};
	};

	return walk(0).val;
};

