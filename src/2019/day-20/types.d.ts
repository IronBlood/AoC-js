export type Location = [number, number];

export interface WarpPoint {
	name: string;
	locations: Location[];
}

export interface Grid {
	G: string[][];
	WPs: WarpPoint[];
	boundaries: {
		/** inner top    */
		it: number;
		/** inner left   */
		il: number;
		/** inner right  */
		ir: number;
		/** inner bottom */
		ib: number;
	};
}

export interface StatedPosition {
	location: Location;
	/** starting from 0 */
	depth: number;
	steps: number;
}
