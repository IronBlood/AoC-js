// @ts-check

/**
 * @typedef {import("./types").CrabCupsListNode} CrabCupsListNode
 */

class CrabCupsSimulator {
	/**
	 * @param {string} data
	 */
	constructor(data, part = 1) {
		// initialize nodes
		const nums = data.split("").map(Number);
		this.max = Math.max(...nums);
		if (part === 2) {
			while (this.max++ < 1000000) {
				nums.push(this.max);
			}
		}
		this.part = part;

		/** @type {(undefined|CrabCupsListNode)[]} */
		this.indexed_nodes = Array(10);
		/** @type {CrabCupsListNode[]} */
		// @ts-ignore
		this.nodes = nums.map(value => ({ value, picked: false }));
		for (let i = 0, len = this.nodes.length; i < len; i++) {
			const curr = this.nodes[i];
			const next_idx = (i + 1) % len;
			curr.next = this.nodes[next_idx];
			this.indexed_nodes[curr.value] = curr;
		}

		this.curr_node = this.nodes[0];
	}

	exec() {
		let ptr = this.curr_node.next;
		let pickup_count = 3;
		while (pickup_count-- > 0) {
			ptr.picked = true;
			ptr = ptr.next;
		}

		const picked_head = this.curr_node.next;
		const picked_tail = picked_head.next.next;

		// delete
		this.curr_node.next = picked_tail.next;

		const target = this.find_target();

		// insert
		picked_tail.next = target.next;
		target.next = picked_head;

		ptr = picked_head;
		pickup_count = 3;
		while (pickup_count-- > 0) {
			ptr.picked = false;
			ptr = ptr.next;
		}

		this.curr_node = this.curr_node.next;
	}

	serialize(idx = 1) {
		const node_start = this.indexed_nodes[idx];
		if (!node_start) {
			throw new Error("never");
		}
		let ptr = node_start.next;
		const arr = [];

		while (ptr !== node_start) {
			arr.push(ptr.value);
			ptr = ptr.next
		}

		return arr.join("");
	}

	/**
	 * @private
	 */
	find_target() {
		let target = this.curr_node.value - 1;
		let target_node;
		while ((target_node = this.indexed_nodes[target]) === undefined || target_node.picked) {
			if (target === 0)
				target = this.max;
			else
				target--;
		}
		return target_node;
	}

	part2() {
		const node_1 = this.indexed_nodes[1];
		if (!node_1) {
			throw new Error("never");
		}
		const a = node_1.next;
		const b = a.next;
		return a.value * b.value;
	}
}

/**
 * @param {string} data
 * @returns {number}
 */
export const get_label = (data, round = 100, part = 1) => {
	const sim = new CrabCupsSimulator(data, part);
	while (round-- > 0) {
		sim.exec();
	}
	return part === 1 ? +sim.serialize() : sim.part2();
};
