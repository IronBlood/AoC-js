const PADDING = 3;
const CONVERGE_THRESHOLD = 10;

class Pot {
	/**
	 * @param {string} initial_state
	 * @param {string[][]} patterns
	 */
	constructor(initial_state, patterns) {
		/** @private @type {Map<string, string>} */
		this.patterns = new Map();
		patterns.forEach(([from, to]) => this.patterns.set(from, to));
		/** @private @type {string[]} */
		this.state = Array(initial_state.length + PADDING * 2).fill(".");
		/** @private */
		this.left = -PADDING;
		for (let i = 0; i < initial_state.length; i++) {
			this.state[i + PADDING] = initial_state[i];
		}

		/** @private @type {Map<string, string>} */
		this.seen = new Map();
	}

	count() {
		let sum = 0;
		for (let i = 0; i < this.state.length; i++) {
			if (this.state[i] === "#") {
				sum += (this.left + i);
			}
		}
		return sum;
	}

	pots() {
		return this.state.reduce((s, c) => s + (c === "#" ? 1 : 0), 0);
	}

	gen() {
		this.left -= PADDING;
		const next_state = Array(this.state.length + PADDING * 2).fill(".");
		for (let i = 0; i < this.state.length - 4; i++) {
			const slice = this.state.slice(i, i + 5).join("");
			if (this.patterns.has(slice)) {
				next_state[i + PADDING + 2] = this.patterns.get(slice);
			}
		}
		this.state = next_state;
	}
}

/**
 * @param {string} data
 */
export const all_pots = (data, part = 1) => {
	const tmp = data.split("\n\n");
	const initial_state = tmp[0].split(": ")[1];
	const patterns = tmp[1].split("\n").map(line => line.split(" => "));

	const pot = new Pot(initial_state, patterns);

	let iterations = part === 1 ? 20 : 50000000000;
	let prev_sum = 0;
	const diffs = new Map();
	while (iterations-- > 0) {
		pot.gen();

		const curr_sum = pot.count();
		const diff = curr_sum - prev_sum;

		diffs.set(diff, (diffs.get(diff) || 0) + 1);
		if (diffs.get(diff) > CONVERGE_THRESHOLD) {
			return curr_sum + diff * iterations;
		}

		prev_sum = curr_sum;
	}
	return pot.count();
};

