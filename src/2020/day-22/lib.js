// @ts-check

/**
 * @param {string} data
 */
const parse_deck = (data) => {
	return data.split("\n").slice(1).map(Number);
}

class Simulator {
	/**
	 * @param {number[]} deck1
	 * @param {number[]} deck2
	 */
	constructor(deck1, deck2) {
		/** @type {number[]} */
		this.deck1 = deck1;
		/** @type {number[]} */
		this.deck2 = deck2;
	}

	is_finished() {
		return this.deck1.length === 0 || this.deck2.length === 0;
	}

	exec() {
		const a = this.deck1[0];
		const b = this.deck2[0];

		this.deck1 = this.deck1.slice(1);
		this.deck2 = this.deck2.slice(1);

		if (a > b) {
			this.deck1.push(a, b);
		} else {
			this.deck2.push(b, a);
		}
	}

	final_deck() {
		return this.deck1.length > 0 ? this.deck1 : this.deck2;
	}
}

/**
 * @param {string} data
 */
export const winner_score = (data, part = 1) => {
	const [deck1, deck2] = data.split("\n\n").map(parse_deck);
	const simulator = part === 1 ? new Simulator(deck1, deck2) : new Simulator2(deck1, deck2);

	while (!simulator.is_finished()) {
		simulator.exec();
	}

	const winner_deck = simulator.final_deck();

	return winner_deck.reverse().reduce((sum, curr, idx) => sum + curr * (idx + 1), 0);
}

let game_id = 0;
class Simulator2 {
	/**
	 * @param {number[]} deck1
	 * @param {number[]} deck2
	 */
	constructor(deck1, deck2) {
		this.game_id = game_id++;
		// console.log(`Game created, ${this.game_id}`);
		/** @type {number[]} */
		this.deck1 = deck1;
		/** @type {number[]} */
		this.deck2 = deck2;
		/** @private @type {Set<string>} */
		this.seen = new Set();
	}

	is_finished() {
		return this.deck1.length === 0 || this.deck2.length === 0;
	}

	exec() {
		if (this.has_seen()) {
			if (this.deck1.length === 0) {
				throw new Error("TODO");
			}
			this.deck2.length = 0;
			return;
		}

		const a = this.deck1[0];
		const b = this.deck2[0];

		this.deck1 = this.deck1.slice(1),
		this.deck2 = this.deck2.slice(1)

		if (this.deck1.length >= a && this.deck2.length >= b) {
			const sub_game = new Simulator2(
				this.deck1.slice(0, a),
				this.deck2.slice(0, b),
			);
			while (!sub_game.is_finished()) {
				sub_game.exec();
			}
			if (sub_game.deck1.length) {
				this.deck1.push(a, b);
			} else {
				this.deck2.push(b, a);
			}
		} else {
			if (a > b) {
				this.deck1.push(a, b);
			} else {
				this.deck2.push(b, a);
			}
		}
	}

	/**
	 * @private
	 */
	serialize_decks() {
		return [
			this.deck1,
			this.deck2,
		].map(d => d.join(",")).join("|");
	}

	/**
	 * @private
	 */
	has_seen() {
		const key = this.serialize_decks();
		if (this.seen.has(key))
			return true;
		this.seen.add(key);
		return false;
	}

	final_deck() {
		return this.deck1.length > 0 ? this.deck1 : this.deck2;
	}
}
