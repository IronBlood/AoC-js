export interface Valve {
	name: string;
	rate: number;
	children: string[];
}

export interface NValve {
	rate: number;
	children: number[];
}
