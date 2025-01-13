import {
	get_checksum,
	get_common_letter,
} from "./lib.js";

describe("2018-12-02 p1", () => {
	const testcases = [
		[`abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`, 12],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_checksum(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-02 p2", () => {
	const testcases = [
	[`abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`, "fgij"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_common_letter(tc[0])).toBe(tc[1]);
		})
	}
});

