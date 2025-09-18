export type Position = [number, number];

export type Direction = "E" | "S" | "W" | "N";

export interface Tile {
	position: Position;
	farthest_tiles: Record<Direction, number>;
	borders: Record<Direction, number>;
};

export interface WallInfo {
	rows: (0 | 1)[];
	cols: (0 | 1)[];
}

export interface Graph extends WallInfo {
	tiles: Map<string, Tile>;
}

export type Instruction = number | "R" | "L";

export interface State {
	position: Position;
	direction: Direction;
}

export interface FaceAdj {
	id: number;
	adjs: Record<Direction, {
		id: number;
		edge: Direction;
		new_direction: Direction;
		reversed: boolean;
	}>;
}

export interface Neighbor3D {
	position: Position;
	direction: Direction;
}

export type Neighbors3D = Record<Direction, Neighbor3D>;
