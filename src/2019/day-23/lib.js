import {
	IntcodeVM,
	STEP_EVENT,
} from "../common/IntcodeVM.js";

/**
 * @param {string} data
 */
export const get_y = (data) => {
	const program = data.split(",").map(Number);

	const vms = Array.from({ length: 50 }, (_, idx) => {
		const vm = new IntcodeVM(program);
		vm.push_input(idx);
		return vm;
	});

	while (true) {
		for (const vm of vms) {
			if (vm.halted)
				continue;

			const step = vm.run_until_event();
			const output = vm.output;
			switch (step.type) {
				case STEP_EVENT.INPUT_NEEDED:
					// means no data in the queue
					vm.push_input(-1);
					break;
				case STEP_EVENT.OUTPUT:
					output.push(step.value);

					if (output.length === 3) {
						if (output[0] === 255) {
							return output[2];
						}

						if (output[0] < 0 || output[0] >= 50) {
							throw new Error(`invalid address ${output[0]}`);
						}

						const [ id, x, y ] = output;
						const dst = vms[id];
						dst.push_input(x);
						dst.push_input(y);

						// clear buffer
						output.length = 0;
					}

					break;
			}
		}
	}
};

/**
 * @param {string} data
 */
export const get_y2 = (data) => {
	const program = data.split(",").map(Number);

	const vms = Array.from({ length: 50 }, (_, idx) => {
		const vm = new IntcodeVM(program);
		vm.push_input(idx);
		return vm;
	});

	const NAT = [null, null];
	let prev_y = -1;

	while (true) {
		/** @type {Map<number, IntcodeVM>} */
		const waiting_list = new Map();

		for (let i = 0; i < 50; i++) {
			const vm = vms[i], output = vm.output;
			if (vm.halted)
				continue;

			const step = vm.run_until_event();
			switch (step.type) {
				case STEP_EVENT.INPUT_NEEDED:
					waiting_list.set(i, vm);
					break;
				case STEP_EVENT.OUTPUT:
					output.push(step.value);

					if (output.length === 3) {
						const [id, x, y] = output;
						output.length = 0;

						if (id === 255) {
							NAT[0] = x;
							NAT[1] = y;
						} else {
							if (id < 0 || id >= 50) {
								throw new Error(`invalid address ${id}`);
							}

							const dst = vms[id];
							dst.push_input(x);
							dst.push_input(y);
						}
					}
					break;
			}
		}

		let count = 0;
		for (const [id, vm] of waiting_list) {
			if (vm.input_queue.length > 0)
				continue;

			count++;
			if (id !== 0)
				vm.push_input(-1);
		}

		// let's handle vms[0]
		const vm0 = vms[0];
		if (count === 50) {
			const [curr_x, curr_y] = NAT;

			if (curr_x === null || curr_y === null) {
				// initial case
				vm0.push_input(-1);
			} else {

				// found the answer
				if (curr_y === prev_y)
					return curr_y;

				prev_y = curr_y;
				vm0.push_input(curr_x);
				vm0.push_input(curr_y);
			}
		} else if (waiting_list.has(0) && vm0.input_queue.length === 0) {
			// which means 0 was skipped when counting
			// but not all computers are waiting
			vm0.push_input(-1);
		}
	}
};
