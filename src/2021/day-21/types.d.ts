export interface GameState {
	/** indices, the real position should be +1 */
	positions: number[];
	scores: number[];
	current_player: number;
	count: number;
}
