export type OpCode = "<" | ">";

export type ExtendedOpCode = ">=" | "<=";

export interface ReversedRule {
	oprand: string;
	opcode: ExtendedOpCode;
	op_num: number;
}

export interface ParsedRule {
	prerequisites: ReversedRule[];
	oprand: string;
	opcode: OpCode;
	op_num: number;
	result: string;
}

export interface Condition {
	oprand: string;
	opcode: OpCode | ExtendedOpCode;
	op_num: number;
}

export interface DirectRule {
	prerequisites: ReversedRule[];
	result: string;
}

export interface WorkflowNode {
	name: string;
	children: (ParsedRule|DirectRule)[];
}
