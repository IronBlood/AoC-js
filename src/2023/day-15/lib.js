// @ts-check

/**
 * @param {string} str
 * @returns {number}
 */
export const hash = (str) => {
	let curr = 0;
	for (let i = 0; i < str.length; i++) {
		curr = (curr + str.charCodeAt(i)) * 17 % 256;
	}
	return curr;
};

/**
 * @param {string} str
 * @returns {number}
 */
export const sum_hash = (str) => {
	return str.split(",").map(hash).reduce((a, b) => a + b);
};

/**
 * @param {string} str
 */
export const focusing_power = (str) => {
	/** @type {{ label: string; num: number }[][]} */
	const boxes = Array.from({ length: 256 }, () => []);

	str.split(",").forEach(s => {
		if (/[a-z]+=\d+/.test(s)) {
			const [label, num_str] = s.split("=");
			const num = +num_str;
			const idx = hash(label);
			const len_idx = boxes[idx].findIndex(x => x.label === label);
			if (len_idx >= 0) {
				boxes[idx][len_idx].num = num;
			} else {
				boxes[idx].push({ label, num });
			}
		} else {
			const label = s.substring(0, s.length - 1);
			const idx = hash(label);
			const len_idx = boxes[idx].findIndex(x => x.label === label);
			if (len_idx >= 0) {
				boxes[idx].splice(len_idx, 1);
			}
		}
	});

	// console.log(boxes[0], boxes[3]);
	return boxes.reduce((sum, box, box_idx) =>
		sum + box.reduce((box_sum, len, len_idx) =>
			box_sum + (box_idx + 1) * len.num * (len_idx + 1),
	0), 0);
};
