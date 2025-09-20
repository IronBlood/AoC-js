export interface Cube {
	x: number;
	y: number;
	z: number;
};

export interface Brick {
	id: number;
	cubes: Cube[];
	l_x: number;
	l_y: number;
	l_z: number;
	h_x: number;
	h_y: number;
	h_z: number;
}
