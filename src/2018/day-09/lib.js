class DblLinkedNode {
	/**
	 * @param {number} val
	 */
	constructor(val) {
		/** @type {number} */
		this.val = val;
		/** @type {DblLinkedNode} */
		this.prev = null;
		/** @type {DblLinkedNode} */
		this.next = null;
	}
}

/**
 * @param {string} data
 * @returns {number}
 */
export const highest_score = (data, part = 1) => {
	const matches = data.match(/\d+/g);
	let [players, points] = [...matches].map(Number);

	if (part === 2) {
		points *= 100;
	}

	/** @type {number[]} */
	const scores = Array(players).fill(0);

	let curr = new DblLinkedNode(0);
	curr.next = curr;
	curr.prev = curr;

	for (let i = 1; i <= points; i++) {
		if (i % 23 === 0) {
			const id = (i-1) % players;
			scores[id] += i;

			let count = 7;
			while (count-- > 0) {
				curr = curr.prev;
			}
			scores[id] += curr.val;
			curr.prev.next = curr.next;
			curr.next.prev = curr.prev;
			curr.prev = null;
			const next = curr.next;
			curr.next = null;
			curr = next;
			continue;
		}

		const node = new DblLinkedNode(i);
		curr = curr.next;

		node.next = curr.next;
		curr.next.prev = node;
		node.prev = curr;
		curr.next = node;
		curr = node;
	}

	return Math.max(...scores);
};

