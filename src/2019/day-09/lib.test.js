import { describe, it, expect } from '@jest/globals';
import {
	IntcodeVM,
} from "../common/IntcodeVM.js";

describe("2019-12-09 p1-ut_vm_run", () => {
	const testcases = [
		[[109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99], [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]],
		[[104,1125899906842624,99], [1125899906842624]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const vm = new IntcodeVM(tc[0]);
			vm.run();
			expect(vm.output).toStrictEqual(tc[1]);
		});
	}
});
