class PlanckNode {
	/**
	 * @param {PlanckNode?} next
	 */
	constructor(next) {
		/** @type {number} */
		this.x = 0;
		/** @type {number} */
		this.y = 0;
		/** @type {PlanckNode?} */
		this.next = next;
	}

	/**
	 * @param {number} dx
	 * @param {number} dy
	 */
	move(dx, dy) {
		this.x += dx;
		this.y += dy;

		if (this.next) {
			dx = this.x - this.next.x;
			dy = this.y - this.next.y;

			if (Math.abs(dx) <= 1 && Math.abs(dy) <=1) {
				// do nothing
				return;
			} else {
				dx = dx === 0 ? 0 : (dx / Math.abs(dx));
				dy = dy === 0 ? 0 : (dy / Math.abs(dy));
				this.next.move(dx, dy);
			}
		}
	}
}

/**
 * @param {string} data
 */
export const count_tail_positions = (data, part = 1) => {
	let node_count = part === 1 ? 1 : 9;

	const tail = new PlanckNode();

	let curr = tail;
	while (node_count-- > 0) {
		curr = new PlanckNode(curr);
	}

	const head = curr;

	/** @type {Set<string>} */
	const set = new Set();
	const reg_tail_pos = () => set.add(`${tail.x},${tail.y}`);

	/** @type {Record<string, [number, number]>} */
	const DIRECTIONS = {
		U: [-1, 0],
		D: [1, 0],
		R: [0, 1],
		L: [0, -1],
	};

	reg_tail_pos();
	data.split("\n").forEach(line => {
		const [d, n] = line.split(" ");
		let steps = +n;
		const dir = DIRECTIONS[d];
		if (!dir) {
			throw new Error(`unknown direction ${d}`);
		}

		const [dx, dy] = dir;

		while (steps-- > 0) {
			head.move(dx, dy);
			reg_tail_pos();
		}
	});
	return set.size;
};
