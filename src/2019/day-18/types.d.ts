export interface State {
	steps: number;
	char: string;
	keys: number;
}

export interface FourState {
	steps: number;
	chars: string[];
	keys: number;
}

export interface GraphEntry {
	/** extra info for debugging, not used */
	position: [number, number];
	/** steps from this entry to another */
	neighbors: Record<string, number>;
}

export type Graph = Record<string, GraphEntry>
