export interface State {
	/** An array of 11 elements */
	hallway: (number|null)[];
	rooms: Array<(number|null)[]>;
}

export interface PQEntry {
	encoded_state: bigint;
	g: number;
	h: number;
}
