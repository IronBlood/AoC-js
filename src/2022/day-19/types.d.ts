export interface Blueprint {
	id: number;
	recipes: number[][];
	max_needed: number[];
}

export interface State {
	remain: number;
	robots: number[];
	resources: number[];
}
