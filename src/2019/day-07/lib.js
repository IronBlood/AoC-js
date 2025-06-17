import { IntcodeVM } from "../common/IntcodeVM.js";

/**
 * @param {number} length
 */
export const get_seqs = (length, offset = 0) => {
	/** @type {(0|1)[]} */
	const seen = Array(length).fill(0);

	/** @type {number[][]} */
	const seq = [];

	/**
	 * @param {number[]} stack
	 */
	const dfs = (stack) => {
		if (stack.length === length) {
			seq.push(stack.map(x => x + offset));
			return;
		}

		for (let i = 0; i < length; i++) {
			if (seen[i])
				continue;

			seen[i] = 1;
			stack.push(i);
			dfs(stack);
			stack.pop();
			seen[i] = 0;
		}
	};

	dfs([]);
	return seq;
};

/**
 * @param {string} data
 */
export const get_highest_signal = (data) => {
	let highest = Number.MIN_SAFE_INTEGER;
	const AMP_LEN = 5;

	const integers = data.split(",").map(Number);
	const seqs = get_seqs(AMP_LEN);

	for (const seq of seqs) {
		const amps = seq.map((x, idx) => {
			const vm = new IntcodeVM(integers);
			vm.push_input(x);
			if (idx === 0)
				vm.push_input(0);
			return vm;
		});

		let valid = true;
		for (let i = 0; i < AMP_LEN; i++) {
			const vm = amps[i];
			vm.run();
			const out = vm.output[vm.output.length - 1];

			if (i < AMP_LEN - 1) {
				amps[i + 1].push_input(out);
			} else {
				highest = Math.max(highest, out);
			}
		}
	}

	return highest;
};

export const get_highest_signal2 = (data) => {
	const program = data.split(",").map(Number);
	const phaseSettings = get_seqs(5, 5);
	let best = -Infinity;

	for (const phases of phaseSettings) {
		// create one amp per phase
		const amps = phases.map(phase => {
			const vm = new IntcodeVM(program);
			vm.push_input(phase);
			return vm;
		});

		let signal = 0, lastOutput = 0;

		// round-robin until E halts
		let idx = 0;
		while (true) {
			const { output, halted } = amps[idx].run_until_output(signal);
			if (output !== undefined) {
				signal = output;
				if (idx === amps.length - 1)
					lastOutput = output;
			}
			if (halted && idx === amps.length - 1) {
				best = Math.max(best, lastOutput);
				break;
			}
			idx = (idx + 1) % amps.length;
		}
	}

	return best;
};
