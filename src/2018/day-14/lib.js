class LListNode {
	/**
	 * @param {number} val
	 * @param {null|LListNode} next
	 */
	constructor(val, next = null) {
		/** @public @type {number} */
		this.val = val;
		/** @public @type {LListNode} */
		this.next = next;
	}
}

/**
 * NOTE There's no need to use linked list, but wasn't
 * sure whether linked list was necessory in part 2 or
 * not, so I didn't refactor it, but for part 2, I used
 * a simpler data structure.
 * @param {string|number} data
 */
export const get_score = (data) => {
	let idx = typeof data === "string" ? +data : data;
	let min_length = idx + 10;

	let recipes = [3, 7].map(x => new LListNode(x));
	let [ptr_0, ptr_1] = recipes;
	ptr_0.next = ptr_1;
	ptr_1.next = ptr_0;
	let len = 2;

	while (recipes.length < min_length) {
		const val = ptr_0.val + ptr_1.val;
		if (val < 10) {
			const node = new LListNode(val, recipes[0]);
			recipes[len-1].next = node;
			recipes[len++] = node;
		} else {
			const low = val % 10, high = (val - low) / 10;
			const n_low = new LListNode(low, recipes[0]),
				n_high = new LListNode(high, n_low);
			recipes[len-1].next = n_high;
			recipes[len++] = n_high;
			recipes[len++] = n_low;
		}

		let next_move = ptr_0.val + 1;
		while (next_move-- > 0) {
			ptr_0 = ptr_0.next;
		}
		next_move = ptr_1.val + 1;
		while (next_move-- > 0) {
			ptr_1 = ptr_1.next;
		}
	}

	return recipes.slice(idx, idx + 10).map(x => x.val).join("");
};

/**
 * @param {string} data
 * @returns {number}
 */
export const first_appear = (data) => {
	let str = [3, 7], n = data.length;

	let idx = 0, ptr_0 = 0, ptr_1 = 1, found = false;

	while (true) {
		const num_0 = +str[ptr_0],
			num_1 = +str[ptr_1];
		const sum = num_0 + num_1;
		if (sum < 10) {
			str.push(sum);
		} else {
			str.push(1);
			str.push(sum - 10);
		}

		ptr_0 = (ptr_0 + num_0 + 1) % str.length;
		ptr_1 = (ptr_1 + num_1 + 1) % str.length;

		while (idx + n <= str.length) {
			const slice = str.slice(idx, idx + n).join("");
			if (slice === data) {
				found = true;
				break;
			}
			idx++;
		}

		if (found) {
			break;
		}
	}

	return idx;
};

