// @ts-check

/**
 * @typedef {import("./types").DblListNode} DblListNode
 */

/**
 * @param {number} idx
 * @param {number} len
 */
const get_prev = (idx, len) => (idx + len - 1) % len;

/**
 * @param {number} idx
 * @param {number} len
 */
const get_next = (idx, len) => (idx + 1) % len;

/**
 * @param {DblListNode} node
 */
const del_node = (node) => {
	node.prev.next = node.next;
	node.next.prev = node.prev;

	// @ts-ignore
	node.next = node.prev = null;
};

/**
 * @param {DblListNode} node
 * @param {number} len
 */
const move = (node, len) => {
	let count = node.val % (len - 1);

	if (count === 0)
		return;

	let ptr = node;
	if (count < 0) {
		while (count++ !== 0) {
			ptr = ptr.prev;
		}
	} else {
		while (count-- !== 0) {
			ptr = ptr.next;
		}

		if (ptr === node) {
			return;
		}
	}

	if (ptr === node) {
		return;
	}

	del_node(node);

	if (node.val < 0) {
		node.prev = ptr.prev;
		ptr.prev.next = node;
		node.next = ptr;
		ptr.prev = node;
	} else {
		node.prev = ptr;
		node.next = ptr.next;
		ptr.next.prev = node;
		ptr.next = node;
	}
};

/**
 * @param {string} data
 */
export const three_sum = (data, part = 1) => {
	const nums = data.split("\n").map(Number);

	if (part === 2) {
		for (let i = 0; i < nums.length; i++) {
			nums[i] *= 811589153;
		}
	}

	/** @type {DblListNode?} */
	let zero_node;

	/** @type {DblListNode[]} */
	// @ts-ignore
	const raw_nodes = nums.map(val => ({ val }));

	let loop = part === 1 ? 1 : 10;

	for (let i = 0, len = raw_nodes.length; i < len; i++) {
		const node = raw_nodes[i];
		node.prev = raw_nodes[get_prev(i, len)];
		node.next = raw_nodes[get_next(i, len)];

		if (node.val === 0) {
			zero_node = node;
		}
	}

	while (loop-- > 0) {
		raw_nodes.forEach(node => move(node, raw_nodes.length));
	}

	// @ts-ignore
	let ptr = zero_node;
	let res = 0;

	for (let i = 0; i < 3; i++) {
		let count = 1000;
		while (count-- > 0) {
			// @ts-ignore
			ptr = ptr.next;
		}
		// @ts-ignore
		res += ptr.val;
	}

	return res;
}
