import { lcm } from "../../lib/math.js";

const add = (a, b) => a + b;
const mul = (a, b) => a * b;

/**
 * @param {string} text
 * @returns {(x: number) => number}
 */
export const parse_operation = (text) => {
	const equation = text.split("= ")[1];

	const el = equation.split(" ");
	const opcode_is_add = el[1] === "+";

	return (x) => opcode_is_add
		? add(
			el[0] === "old" ? x : +el[0],
			el[2] === "old" ? x : +el[2],
		)
		: mul(
			el[0] === "old" ? x : +el[0],
			el[2] === "old" ? x : +el[2],
		);
};

/**
 * @param {string} text
 * @returns {{divisor: number; fn: (x: number) => boolean}}
 */
export const parse_test = (text) => {
	/** @type {number} */
	const divisor = +text.split(" ").pop();

	return {
		divisor,
		fn: (x) => (x % divisor) === 0,
	};
};

class Monkey {
	/**
	 * @param {string} text
	 */
	constructor(text) {
		const lines = text.split("\n");

		/** @type {string} */
		this.id = /\d+/.exec(lines[0])[0];
		/** @type {number[]} */
		this.curr = lines[1].split(": ")[1].split(", ").map(Number);

		this.operate = parse_operation(lines[2]);
		const { fn, divisor } = parse_test(lines[3]);
		this.divisor = divisor;
		this.test = fn;

		/** @type {string} */
		this.t_id = lines[4].split(" ").pop();
		/** @type {string} */
		this.f_id = lines[5].split(" ").pop();
		/** @type {Monkey?} */
		this.t_monkey = undefined;
		/** @type {Monkey?} */
		this.f_monkey = undefined;

		this.count = 0;
	}

	/**
	 * @param {Map<string, Monkey>} map
	 */
	resolve_tf_monkeys(map) {
		let m;

		m = map.get(this.t_id);
		if (!m) {
			throw new Error(`failed to resolve true monkey of ${this.id}`);
		}
		this.t_monkey = m;

		m = map.get(this.f_id);
		if (!m) {
			throw new Error(`failed to resolve false monkey of ${this.id}`);
		}
		this.f_monkey = m;
	}

	eval(x, part = 1) {
		for (let num of this.curr) {
			this.count++;
			num = part === 1
				? Math.trunc(this.operate(num) / x)
				: (this.operate(num) % x);
			const test = this.test(num);
			const next = test ? this.t_monkey : this.f_monkey;
			if (!next) {
				throw new Error(`unresolved monkey for ${this.id} - ${test}`);
			}
			next.curr.push(num);
		}
		this.curr.length = 0;
	}
}

/**
 * @param {Monkey[]} monkeys
 */
const serialize_state = (monkeys) => monkeys.map(m => m.curr.join(",")).join(";");

/**
 * @param {string} data
 */
export const level_business = (data, part = 1) => {
	/** @type {Map<string, Monkey>} */
	const map = new Map();
	const monkeys = data.split("\n\n").map(text => {
		const monkey = new Monkey(text);
		map.set(monkey.id, monkey);
		return monkey;
	});

	monkeys.forEach(m => m.resolve_tf_monkeys(map));
	const divisors = monkeys.map(m => m.divisor);
	const MOD = divisors.reduce((a, b) => lcm(a, b));

	let round = part === 1 ? 20 : 10000;
	const num = part === 1 ? 3 : MOD;

	while (round-- > 0) {
		monkeys.forEach(m => m.eval(num, part));
	}

	const arr = monkeys.map(m => m.count).sort((a, b) => b - a);
	return arr[0] * arr[1];
};
