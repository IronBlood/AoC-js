export interface NumberYellingMonkey {
	type: "number";
	value: number;
	has_humn: -1 | 0 | 1;
}

export interface MathOperationMonkey {
	type: "math";
	resolved: boolean;
	value: number;
	raw: string;
	has_humn: -1 | 0 | 1;
}

export type Monkey = NumberYellingMonkey | MathOperationMonkey;
