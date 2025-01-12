/**
 * A simple implementation of linked list
 */
class LinkedNode {
	/** @param {number} val */
	constructor(val) {
		/** @type {number} */
		this.val = val;
		/** @type {LinkedNode?} */
		this.next = null;
	}
}

/**
 * @param {number} step
 */
export const get_value = (step) => {
	const dummy = new LinkedNode(-1);
	const node_0 = new LinkedNode(0);
	dummy.next = node_0;
	node_0.next = node_0;

	let ptr = node_0, count = 2017, hop = 0, num = 1;
	while (count-- > 0) {
		hop = step;
		while (hop-- > 0) {
			ptr = ptr.next;
		}
		const node = new LinkedNode(num++);
		node.next = ptr.next;
		ptr.next = node;
		ptr = ptr.next;
	}

	ptr = node_0;
	while (ptr.val != 2017) {
		ptr = ptr.next;
	}
	return ptr.next.val;
};

/**
 * @param {number} step
 */
export const after_zero = (step, total_count = 50_000_000) => {
	let len = 1, curr_idx = 0;
	let prev = -1;
	while (total_count-- > 0) {
		curr_idx = (curr_idx + step) % len + 1;
		if (curr_idx === 1) {
			prev = len;
		}
		len++;
	}
	return prev;
};

