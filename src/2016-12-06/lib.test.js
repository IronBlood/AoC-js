import {
	get_message,
} from "./lib.js";

describe("2016-12-06", () => {
	const testcases = [
		[`eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`, "easter"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_message(tc[0])).toBe(tc[1]);
		})
	}
});

