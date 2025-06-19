/**
 * @readonly
 * @enum {string}
 */
export const STEP_EVENT = {
	OUTPUT:       "output",
	INPUT_NEEDED: "input_needed",
	HALTED:       "halted",
	CONTINUE:     "continue",
};

/**
 * @typedef {Object} PauseTypeNoValue
 * @property {STEP_EVENT.INPUT_NEEDED | STEP_EVENT.HALTED} type
 * @typedef {Object} PauseTypeWithValue
 * @property {STEP_EVENT.OUTPUT} type
 * @property {number} value
 */

/**
 * @readonly
 * @enum {number}
 */
const MODE = {
	POSITION:  0,
	IMMEDIATE: 1,
	RELATIVE:  2,
};

/**
 * Get the parameter mode for the nth parameter of an Intcode instruction
 * @param {number} instruction The full instruction word
 * @param {1|2|3} param_idx Which parameter to inspect (1-based)
 * @returns {MODE} The parameter mode (POSITION, IMMEDIATE, or RELATIVE)
 */
const get_mode = (instruction, param_idx) => {
	if (![1, 2, 3].includes(param_idx)) {
		throw new Error(`invalid param_idx ${param_idx}, must be 1, 2, or 3`);
	}

	let divisor = 10 ** (param_idx + 1);
	const mode = Math.trunc(instruction / divisor) % 10;
	if (![MODE.POSITION, MODE.IMMEDIATE, MODE.RELATIVE].includes(mode)) {
		throw new Error(`Unknown mode ${mode} in instruction ${instruction}`);
	}
	return mode;
};

/**
 * @param {number[]} arr
 * @param {number} idx
 */
const extend_length = (arr, idx) => {
	const original_len = arr.length;
	if (idx < original_len)
		return arr;

	arr.length = idx + 1;
	arr.fill(0, original_len);
	return arr;
};

export class IntcodeVM {
	/**
	 * @param {number[]} program - initial memory state
	 * @param {[number, number]} [noun_verb] - option [noun, verb] to set at position 1 and 2
	 */
	constructor(program, noun_verb) {
		/** @type {number[]} */
		this.memory = [...program];

		if (Array.isArray(noun_verb) && noun_verb.length === 2) {
			if (noun_verb.every(Number.isInteger)) {
				this.memory[1] = noun_verb[0];
				this.memory[2] = noun_verb[1];
			}
		}

		/** @type {number} instruction pointer */
		this.ip = 0;

		/** @type {boolean} */
		this.halted = false;

		/** @type {number} base ptr */
		this.base = 0;

		/** @type {number[]} */
		this.input_queue = [];

		/** @type {number[]} */
		this.output = [];
	}

	clone() {
		const vm = new IntcodeVM(this.memory);
		vm.ip          = this.ip;
		vm.halted      = this.halted;
		vm.base        = this.base;
		vm.input_queue = this.input_queue.slice();
		vm.output      = this.output.slice();
		return vm;
	}

	/**
	 * Execute exactly one Intcode instruction at the current IP
	 * @private
	 * @returns {{ type: STEP_EVENT.OUTPUT; value: number; } | { type: STEP_EVENT.INPUT_NEEDED } | { type: STEP_EVENT.HALTED } | { type: STEP_EVENT.CONTINUE }}
	 */
	_step() {
		const instruction = this.get_memory(this.ip);
		const opcode = instruction % 100;

		switch (opcode) {
			case 99:
				this.halted = true;
				return { type: STEP_EVENT.HALTED };
			case 1: {
				const mode_param1 = get_mode(instruction, 1),
					mode_param2 = get_mode(instruction, 2),
					mode_output = get_mode(instruction, 3);

				const param1 = this.read_param(this.ip + 1, mode_param1),
				param2 = this.read_param(this.ip + 2, mode_param2);

				const value = param1 + param2;

				this.write_param(this.ip + 3, value, mode_output);
				this.ip += 4;
				return { type: STEP_EVENT.CONTINUE };
			}
			case 2: {
				const mode_param1 = get_mode(instruction, 1),
					mode_param2 = get_mode(instruction, 2),
					mode_output = get_mode(instruction, 3);

				const param1 = this.read_param(this.ip + 1, mode_param1),
				param2 = this.read_param(this.ip + 2, mode_param2);

				const value = param1 * param2;

				this.write_param(this.ip + 3, value, mode_output);
				this.ip += 4;
				return { type: STEP_EVENT.CONTINUE };
			}
			case 3: {
				if (this.input_queue.length === 0) {
					return { type: STEP_EVENT.INPUT_NEEDED };
				}

				const mode = get_mode(instruction, 1);
				const input_val = this.input_queue.shift();

				this.write_param(this.ip + 1, input_val, mode);
				this.ip += 2;
				return { type: STEP_EVENT.CONTINUE };
			}
			case 4: {
				const mode = get_mode(instruction, 1);
				const value = this.read_param(this.ip + 1, mode);
				this.ip += 2;
				return { type: STEP_EVENT.OUTPUT, value };
			}
			case 5: {
				const mode_param1 = get_mode(instruction, 1),
					mode_param2 = get_mode(instruction, 2);
				const param1 = this.read_param(this.ip + 1, mode_param1),
					param2 = this.read_param(this.ip + 2, mode_param2);

				if (param1 !== 0) {
					this.ip = param2;
				} else {
					this.ip += 3;
				}
				return { type: STEP_EVENT.CONTINUE };
			}
			case 6: {
				const mode_param1 = get_mode(instruction, 1),
					mode_param2 = get_mode(instruction, 2);
				const param1 = this.read_param(this.ip + 1, mode_param1),
					param2 = this.read_param(this.ip + 2, mode_param2);

				if (param1 === 0) {
					this.ip = param2;
				} else {
					this.ip += 3;
				}
				return { type: STEP_EVENT.CONTINUE };
			}
			case 7: {
				const mode_param1 = get_mode(instruction, 1),
					mode_param2 = get_mode(instruction, 2),
					mode_output = get_mode(instruction, 3);
				const param1 = this.read_param(this.ip + 1, mode_param1),
					param2 = this.read_param(this.ip + 2, mode_param2);

				const value = param1 < param2 ? 1 : 0;
				this.write_param(this.ip + 3, value, mode_output);
				this.ip += 4;
				return { type: STEP_EVENT.CONTINUE };
			}
			case 8: {
				const mode_param1 = get_mode(instruction, 1),
					mode_param2 = get_mode(instruction, 2),
					mode_output = get_mode(instruction, 3);
				const param1 = this.read_param(this.ip + 1, mode_param1),
					param2 = this.read_param(this.ip + 2, mode_param2);

				const value = param1 === param2 ? 1 : 0;
				this.write_param(this.ip + 3, value, mode_output);
				this.ip += 4;
				return { type: STEP_EVENT.CONTINUE };
			}
			case 9: {
				const mode_param1 = get_mode(instruction, 1);
				const value = this.read_param(this.ip + 1, mode_param1);
				this.base += value;
				this.ip += 2;
				return { type: STEP_EVENT.CONTINUE };
			}
			default:
				throw new Error(`Invalid opcode ${opcode} at address ${this.ip}`);
		}
	}

	/**
	 * Runs the program until a halt opcode (99) is encountered
	 */
	run() {
		let res;
		do {
			res = this._step();
			if (res.type === STEP_EVENT.OUTPUT) {
				this.output.push(res.value);
			}
		} while (res.type !== STEP_EVENT.HALTED);
	}

	/**
	 * @param {number} input_signal
	 */
	run_until_output(input_signal) {
		if (this.halted) {
			return { halted: true };
		}

		this.push_input(input_signal);
		/** @type {ReturnType<typeof this._step>} */
		let res;
		do {
			res = this._step();
			if (res.type === STEP_EVENT.OUTPUT) {
				return { output: res.value, halted: false };
			}
		} while (res.type !== STEP_EVENT.HALTED);

		return { halted: true };
	}

	/**
	 * This is a thin wrapper of _step.
	 * @returns {{ type: STEP_EVENT.OUTPUT; value: number; } | { type: STEP_EVENT.INPUT_NEEDED } | { type: STEP_EVENT.HALTED }}
	 */
	run_until_event() {
		if (this.halted) {
			return { type: STEP_EVENT.HALTED };
		}

		/** @type {ReturnType<typeof this._step>} */
		let res;
		do {
			res = this._step();
		} while (res.type === STEP_EVENT.CONTINUE)

		return res;
	}

	/**
	 * @param {number} ptr
	 */
	get_memory(ptr) {
		extend_length(this.memory, ptr);
		return this.memory[ptr];
	}

	/**
	 * @param {number} ptr
	 * @param {MODE} mode
	 */
	read_param(ptr, mode) {
		const x = this.get_memory(ptr);

		switch (mode) {
			case MODE.POSITION:
				return this.get_memory(x);
			case MODE.IMMEDIATE:
				return x;
			case MODE.RELATIVE:
				return this.get_memory(this.base + x);
			default:
				throw new Error(`bad mode ${mode}`);
		}
	}

	/**
	 * @param {number} ptr
	 * @param {number} value
	 * @param {MODE} mode
	 */
	write_param(ptr, value, mode) {
		ptr = this.get_memory(ptr);
		switch (mode) {
			case MODE.POSITION: {
				// Do nothing
				break;
			}
			case MODE.RELATIVE: {
				ptr += this.base;
				break;
			}
			default:
				throw new Error(`invalid mode ${mode}, should be 0 or 2`);
		}

		extend_length(this.memory, ptr);
		this.memory[ptr] = value;
	}

	/**
	 * @param {number} value
	 */
	push_input(value) {
		this.input_queue.push(value);
	}
}
