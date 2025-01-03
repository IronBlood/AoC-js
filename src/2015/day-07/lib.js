class GeneralGate {
	constructor(v) {
		/** @type {number?} */
		this.value = v;
	}
}

class SourceGate extends GeneralGate {
	/**
	 * @param {number} v
	 */
	constructor(v) {
		super(v);
	}

	/**
	 * @returns {number}
	 */
	get_value() {
		return this.value;
	}
}

class LogicGate extends GeneralGate {
	/**
	 * @param {string} opcode
	 * @param {(string|number)[]} oprands
	 */
	constructor(opcode, oprands) {
		super();
		/** @type {GeneralGate?} */
		this.inputA = undefined;
		/** @type {GeneralGate?} */
		this.inputB = undefined;
		/** @type {string} opcode */
		this.opcode = opcode;
		/** @type {(number|string)} oprands */
		this.oprands = oprands;
	}

	/**
	 * @param {Map<string|number, LogicGate|SourceGate>} gate_manager
	 */
	set_source(gate_manager) {
		this.inputA = gate_manager.get(this.oprands[0]);
		if (this.oprands.length > 1) {
			this.inputB = gate_manager.get(this.oprands[1]);
		}
	}

	get_value() {
		if (this.value === undefined) {
			switch (this.opcode) {
				case "": this.value = this.inputA.get_value(); break;
				case "NOT": this.value = (~this.inputA.get_value()) & 0xFFFF; break;
				case "AND": this.value = (this.inputA.get_value() & this.inputB.get_value()) & 0xFFFF; break;
				case "OR": this.value = (this.inputA.get_value() | this.inputB.get_value()) & 0xFFFF; break;
				case "LSHIFT": this.value = (this.inputA.get_value() << this.inputB.get_value()) & 0xFFFF; break;
				case "RSHIFT": this.value = (this.inputA.get_value() >>> this.inputB.get_value()) & 0xFFFF; break;
				default: console.log(this.opcode); break;
			}
		}
		return this.value;
	}
}

/**
 * @param {string} str
 * @returns {boolean}
 */
const is_number = (str) => {
	for (let i = 0; i < str.length; i++) {
		const c = str.charCodeAt(i);
		if (c < 48 || c > 57) return false;
	}
	return true;
};

/**
 * @typedef {Object} Expression
 * @property {string} key
 * @property {string?} opcode
 * @property {(string|number)[]} oprands
 */
/**
 * @param {string} cmd
 * @returns {Expression}
 */
const parse = (cmd) => {
	const [exp, key] = cmd.split(" -> ");

	// assign
	if (exp.indexOf(" ") == -1) {
		return {
			key,
			oprands: [is_number(exp) ? (+exp) : exp],
			opcode: "",
		};
	}

	// contains space(s)
	const arr = exp.split(" ");
	if (arr.length == 2) {
		return {
			key,
			oprands: [is_number(arr[1]) ? (+arr[1]) : arr[1]],
			opcode: "NOT"
		};
	}

	return {
		key,
		oprands: [
			is_number(arr[0]) ? (+arr[0]) : arr[0],
			is_number(arr[2]) ? (+arr[2]) : arr[2],
		],
		opcode: arr[1],
	};
};

/**
 * @param {string[]} commands
 * @returns {Map<string, number>}
 */
export const sim = (commands, part = 1) => {
	/** @type {SourceGate[]} */
	const source_gates = [];
	/** @type {Map<number|string, LogicGate|SourceGate>} */
	const gate_manager = new Map();

	commands.forEach(cmd => {
		const exp = parse(cmd);
		const node = new LogicGate(exp.opcode, exp.oprands);
		for (let o of exp.oprands) {
			if (typeof o === "number" && !gate_manager.has(o)) {
				const s = new SourceGate(o);
				source_gates.push(s);
				gate_manager.set(o, s);
			}
		}
		gate_manager.set(exp.key, node);
	});

	for (let g of gate_manager.values()) {
		if (g instanceof LogicGate) {
			g.set_source(gate_manager);
		}
	}

	if (part === 2) {
		const a = gate_manager.get("a").get_value();
		gate_manager.get("b").inputA = new SourceGate(a);
		for (let [k, v] of gate_manager.entries()) {
			if (typeof k === "string") {
				v.value = undefined;
			}
		}
	}

	const ans = new Map();
	for (let [k, v] of gate_manager.entries()) {
		if (typeof k === "string") {
			ans.set(k, v.get_value());
		}
	}
	return ans;
};

