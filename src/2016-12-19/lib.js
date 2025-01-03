/**
 * @param {number} num
 * @returns {number}
 */
export const get_all = (num) => {
	const arr = Array.from({ length: num }, (_, k) => ({ count: 1, id: k + 1 }));

	let i = 0;
	while (arr[i].count != num) {
		let j = (i + 1) % num;
		while (arr[j].count === 0) {
			j = (j + 1) % num;
		}
		if ((arr[i].count += arr[j].count) === num) {
			return arr[i].id;
		}
		arr[j].count = 0;
		j = (j + 1) % num;
		while (arr[j].count === 0) {
			j = (j + 1) % num;
		}
		i = j;
	}
	return i;
};

/**
 * 1528.28s user 1.05s system 99% cpu 25:34.24 total
 * @param {number} num
 */
export const get_all_2_naive = (num) => {
	let arr = Array.from({ length: num }, (_, k) => k + 1);
	let i = 0;
	while (arr.length > 1) {
		const target = (i + (arr.length >> 1)) % arr.length;
		arr.splice(target, 1);
		if (target < i) {
			if (i === arr.length) i = 0;
		} else {
			i = (i + 1) % arr.length;
		}
	}
	return arr[0];
};

/**
 * @typedef {Object} DoubleLinkedListNode
 * @property {number} id
 * @property {DoubleLinedListNode} prev
 * @property {DoubleLinedListNode} next
 */

/**
 * 1.09s user 0.38s system 119% cpu 1.236 total
 * @param {number} num
 */
export const get_all_2_linkedlist = (num) => {
	/** @type {DoubleLinkedListNode[]} */
	let arr = Array.from({ length: num }, (_, k) => ({ id: k + 1, prev: null, next: null }));
	arr.forEach((node, idx) => {
		let prev = (idx - 1 + num) % num, next = (idx + 1) % num;
		node.prev = arr[prev];
		node.next = arr[next];
	});

	let ptr_idx = num >> 1, tick = num % 2;
	let ptr = arr[ptr_idx];
	while (num-- > 1) {
		ptr.prev.next = ptr.next;
		ptr.next.prev = ptr.prev;
		if (++tick === 2) {
			tick = 0;
			ptr = ptr.next.next;
		} else {
			ptr = ptr.next;
		}
	}
	return ptr.id;
};

