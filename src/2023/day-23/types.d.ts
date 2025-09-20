export type DirectionChars = "^" | ">" | "v" | "<";

export interface WarpPoint {
	x: number;
	y: number;
	oneway: boolean;
	directions: DirectionChars[];
	dead_end: boolean;
}
