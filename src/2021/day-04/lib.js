import {
	rotate_tile,
} from "../../lib/matrix.js";

class BingoBoard {
	/**
	 * @param {string} config
	 */
	constructor(config) {
		/** @type {number[][]} */
		this.grid = config.split("\n").map(line => line.trim().split(/\s+/).map(Number));
		/** @type {(0|1)[][]} */
		this.marked = Array.from({ length: 5 }, () => Array(5).fill(0));
		this.step = 0;

		/** @type {Map<number, [number, number]>} */
		this.map = new Map();
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				const x = this.grid[i][j];
				if (this.map.has(x)) {
					console.log(`${x} is alreay set`);
				}
				this.map.set(x, [i, j]);
			}
		}
		this.last = -1;
	}

	is_finished() {
		let found = this.marked.some(row => row.every(x => x === 1));
		if (!found) {
			found = rotate_tile(this.marked, 1).some(row => row.every(x => x === 1));
		}
		return found;
	}

	/**
	 * @param {number[]} nums
	 */
	exec(nums) {
		while (this.step < nums.length && !this.is_finished()) {
			const x = nums[this.step++];
			if (this.map.has(x)) {
				const [i, j] = this.map.get(x);
				this.marked[i][j] = 1;
				this.last = x;
			}
		}
	}

	sum() {
		const nums = this.grid.flat();
		const marked = this.marked.flat();

		return nums.filter((x, idx) => marked[idx] !== 1).reduce((a, b) => a + b);
	}
}

/**
 * @param {string} data
 */
export const get_board = (data, part = 1) => {
	const arr = data.split("\n\n");
	const nums = arr[0].split(",").map(Number);

	const boards = arr.slice(1).map(data => new BingoBoard(data));
	let res1 = 0, res2 = 0, min_step = Number.MAX_SAFE_INTEGER, max_step = 0;

	boards.forEach((b, idx) => {
		b.exec(nums);
		if (b.is_finished()) {
			const sum = b.sum();
			if (min_step > b.step) {
				min_step = b.step;
				res1 = b.last * sum;
			}
			if (max_step < b.step) {
				max_step = b.step;
				res2 = b.last * sum;
			}
		}
	});

	return part === 1 ? res1 : res2;
};
