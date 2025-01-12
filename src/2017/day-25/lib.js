class Tape {
	constructor() {
		/** @private @type {(0|1)[]} */
		this._buffer = [0, 0, 0];
		/** @private @type {number} */
		this._idx = 1;
	};

	/**
	 * @private
	 */
	enlarge() {
		const len = this._buffer.length;
		/** @type {typeof this._buffer} */
		const new_buffer = Array(3 * len).fill(0);
		for (let i = 0; i < len; i++) {
			new_buffer[len + i] = this._buffer[i];
		}

		this._buffer = new_buffer;
		this._idx += len;
	}

	/**
	 * @public
	 * @param {(-1|1)} dir
	 */
	move(dir) {
		this._idx += dir;
		if (this._idx < 0 || this._idx === this._buffer.length) {
			this.enlarge();
		}
	}

	/**
	 * @public
	 * @param {(0|1)} val
	 */
	set_val(val) {
		this._buffer[this._idx] = val;
	}

	/**
	 * @public
	 */
	get_val() {
		return this._buffer[this._idx];
	}

	/**
	 * @public
	 */
	checksum() {
		return this._buffer.reduce((s, c) => s + c, 0);
	}
}

/**
 * @param {string} data
 */
export const checksum = (data) => {
	let tmp = data.split("\n\n");

	const states_str = tmp.slice(1);
	tmp = tmp[0].split("\n");

	let iterations = +tmp[1].match(/\d+/)[0];
	tmp = tmp[0].split(" ");
	const begin_state = tmp[tmp.length - 1][0];

	const states = states_str.map(str => {
		tmp = str.split("\n");
		const id = tmp[0].split(" ")[2][0];

		const str_conditions = [
			tmp.slice(2, 5),
			tmp.slice(6),
		];

		const conditions = str_conditions.map(cfg => {
			/** @type {(0|1)} */
			const next_value = +cfg[0].trim().split(" ")[4][0];
			const next_move = cfg[1].endsWith("right.") ? 1 : -1;
			const next_state = cfg[2].trim().split(" ")[4][0];
			return {
				next_value,
				next_move,
				next_state,
			};
		});

		return { id, conditions };
	});

	/** @type {Map<string, typeof states[0]>} */
	const state_map = new Map();
	states.forEach(s => state_map.set(s.id, s));

	let state = state_map.get(begin_state);
	const tape = new Tape();

	while (iterations-- > 0) {
		const condition = state.conditions[tape.get_val()];
		tape.set_val(condition.next_value);
		tape.move(condition.next_move);
		state = state_map.get(condition.next_state);
	}

	return tape.checksum();
};

