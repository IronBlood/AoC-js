/**
 * @param {Record<string, number>} r
 * @param {string} k
 */
const get_val = (r, k) => {
	return is_reg(k) ? (r[k] || (r[k] = 0)) : +k;
};

/**
 * @param {string} str
 */
const is_reg = (str) => /[a-z]/.test(str);

/**
 * @param {string} data
 */
export const exec = (data) => {
	/** @type {Record<string, number>} */
	const registers = {};

	const instructions = data.split("\n").map(line => line.split(" "));

	let play = -1;
	for (let i = 0; i < instructions.length;) {
		let should_jump = false;
		let should_break = false;
		const ins = instructions[i];
		let val = ins[2] ? get_val(registers, ins[2]) : 0;
		switch (ins[0]) {
			case "snd":
				play = get_val(registers, ins[1]);
				break;
			case "set": registers[ins[1]] = val; break;
			case "add": registers[ins[1]] = get_val(registers, ins[1]) + val; break;
			case "mul": registers[ins[1]] = get_val(registers, ins[1]) * val; break;
			case "mod": registers[ins[1]] = get_val(registers, ins[1]) % val; break;
			case "rcv":
				if (get_val(registers, ins[1]) != 0) {
					should_break = true;
				}
				break;
			case "jgz":
				if (get_val(registers, ins[1]) > 0) {
					should_jump = true;
					i += val;
				}
				break;
		}
		if (should_break) {
			break;
		}
		if (!should_jump) {
			i++;
		}
	}

	return play;
};

class Program {
	/**
	 * @param {number} id
	 * @param {string[][]} instructions
	 */
	constructor(id, instructions) {
		/** @private @type {number} */
		this._id = id;

		/** @private @type {Record<string, number>} */
		this.registers = {
			p: id,
		};

		/** @private @type {string[][]} */
		this.instructions = instructions;

		/** @private @type {number} program counter */
		this._pc = 0;

		/** @private @type {Program} */
		this._neighbor = null;

		/** @private @type {number} */
		this._sendcounter = 0;

		/** @private @type {number[]} */
		this._queue = []
	}

	get sendcounter() {
		return this._sendcounter;
	}

	set neighbor(p) {
		if (!(p instanceof Program) || this._neighbor instanceof Program || p._id === this._id) {
			throw new Error("");
		}
		this._neighbor = p;
	}

	/**
	 * @protected
	 * @param {number} x
	 */
	send(x) {
		if (this._neighbor instanceof Program) {
			this._neighbor._queue.push(x);
		}
	}

	exec() {
		if (this._pc < 0 || this._pc >= this.instructions.length)
			return false

		let should_jump = false;
		const ins = this.instructions[this._pc];

		let val = ins[2] ? get_val(this.registers, ins[2]) : 0;
		switch (ins[0]) {
			case "snd":
				this._sendcounter++;
				this.send(get_val(this.registers, ins[1]));
				break;
			case "set":
				this.registers[ins[1]] = val;
				break;
			case "add":
				this.registers[ins[1]] = get_val(this.registers, ins[1]) + val;
				break;
			case "mul":
				this.registers[ins[1]] = get_val(this.registers, ins[1]) * val;
				break;
			case "mod":
				this.registers[ins[1]] = get_val(this.registers, ins[1]) % val;
				break;
			case "rcv":
				if (this._queue.length === 0) {
					return false;
				} else {
					this.registers[ins[1]] = this._queue.shift();
				}
				break;
			case "jgz":
				if (get_val(this.registers, ins[1]) > 0) {
					should_jump = true;
					this._pc += val;
				}
				break;
		}

		if (!should_jump) {
			this._pc++;
		}

		return true;
	}
}

/**
 * @param {string} data
 */
export const exec2 = (data) => {
	const instructions = data.split("\n").map(line => line.split(" "));

	const [p0, p1] = [
		new Program(0, instructions),
		new Program(1, instructions),
	];

	p0.neighbor = p1;
	p1.neighbor = p0;

	let executed = false;
	do {
		executed = false;
		executed = p0.exec() || executed;
		executed = p1.exec() || executed;
	} while (executed)

	return p1.sendcounter;
}

