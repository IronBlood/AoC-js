export type Direction = ">" | "v" | "<" | "^";

/**
 * Tuple, [row, col, direction]
 */
export type Blizzard = [number, number, Direction];

export type BlizzardState = {
	arr: Blizzard[];
	set: (0 | 1)[];
}

export type MoveState = {
	position: [number, number];
	minutes: number;
	stage: number;
}
