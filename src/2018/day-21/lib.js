/**
 * @typedef {(state: number[], op1: number, op2: number, op3: number) => void} Operation
 */

/**
 * @type {Record<string, Operation>}
 */
const OPERATIONS = {
	addr: (state, op1, op2, op3) => (state[op3] = state[op1] + state[op2]),
	addi: (state, op1, op2, op3) => (state[op3] = state[op1] + op2),
	mulr: (state, op1, op2, op3) => (state[op3] = state[op1] * state[op2]),
	muli: (state, op1, op2, op3) => (state[op3] = state[op1] * op2),
	banr: (state, op1, op2, op3) => (state[op3] = state[op1] & state[op2]),
	bani: (state, op1, op2, op3) => (state[op3] = state[op1] & op2),
	borr: (state, op1, op2, op3) => (state[op3] = state[op1] | state[op2]),
	bori: (state, op1, op2, op3) => (state[op3] = state[op1] | op2),
	setr: (state, op1, op2, op3) => (state[op3] = state[op1]),
	seti: (state, op1, op2, op3) => (state[op3] = op1),
	gtir: (state, op1, op2, op3) => (state[op3] = op1 > state[op2] ? 1 : 0),
	gtri: (state, op1, op2, op3) => (state[op3] = state[op1] > op2 ? 1 : 0),
	gtrr: (state, op1, op2, op3) => (state[op3] = state[op1] > state[op2] ? 1 : 0),
	eqir: (state, op1, op2, op3) => (state[op3] = op1 === state[op2] ? 1 : 0),
	eqri: (state, op1, op2, op3) => (state[op3] = state[op1] === op2 ? 1 : 0),
	eqrr: (state, op1, op2, op3) => (state[op3] = state[op1] === state[op2] ? 1 : 0)
};

/**
 * @param {string} data
 */
function parse_program(data) {
	const regex_ip = /#ip (\d+)/;
	const regex_instr = /([a-z]+) (\d+) (\d+) (\d+)/;
	const lines = data.split("\n");

	let ip_reg = +regex_ip.exec(lines[0])[1];

	/** @type {{ opname: string; op1: number; op2: number; op3: number }[]} */
	let program = [];
	for (let i = 1; i < lines.length; i++) {
		let match = regex_instr.exec(lines[i]);
		let [opname, op1, op2, op3] = match.slice(1).map((t, idx) => idx > 0 ? +t : t);
		program.push({ opname, op1, op2, op3 });
	}
	return { program, ip_reg };
}

/**
 * @param {string} content
 */
export function run(content, optimized = false, initial_state = [0, 0, 0, 0, 0, 0], initial_ip = 0) {
	const TARGET_IP = 28;

	let target_register_history = [];
	let data = {
		state: [ ...initial_state ],
		ip: initial_ip,
		part1: null,
		part2: null,
	};
	const { program, ip_reg } = parse_program(content);

	if (!optimized) {
		while (data.ip < program.length) {
			data.state[ip_reg] = data.ip;
			let {
				opname,
				op1,
				op2,
				op3,
			} = program[data.ip];
			if (data.ip === TARGET_IP) {
				let target_value = data.state[op1];
				if (target_register_history.indexOf(target_value) > -1) {
					break;
				}
				target_register_history.push(target_value);
			}

			OPERATIONS[opname](data.state, op1, op2, op3);
			data.ip = data.state[ip_reg];
			data.ip++;
		}
	} else {
		const a = program[7].op1, b = program[11].op2;
		run_optimized({
			history: target_register_history,
			a,
			b,
		});
	}

	data.part1 = target_register_history[0];
	data.part2 = target_register_history[target_register_history.length - 1];

	return data;
}

/**
 * Manually decoded
 * @param {{ history: number[]; a: number; b: number; }}
 */
const run_optimized = ({ history, a, b }) => {
	let r4 = 0, r5 = 0;

	do {
		r4 = r5 | 0x10000;
		r5 = a;

		while (1) {
			r5 = (((r5 + (r4 & 0xFF)) & 0xFFFFFF) * b) & 0xFFFFFF;

			if (256 > r4) {
				break;
			}
			r4 >>= 8;
		}
		if (history.indexOf(r5) >= 0) {
			break;
		}
		history.push(r5);
	} while (r5 != 0);
}
