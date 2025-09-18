// @ts-check

/**
 * @typedef {[number, number]} Position
 * @typedef {"LEFT"|"RIGHT"|"DOWN"} VectorKeys
 */

/**
 * @readonly
 * @type {Record<VectorKeys, Position>}
 */
const Vectors = {
	LEFT: [0, -1],
	RIGHT: [0, 1],
	DOWN: [-1, 0],
};

/**
 * @abstract
 */
class BaseBlock {
	/**
	 * @param {Position} initial_position
	 */
	constructor(initial_position) {
		/** @protected @type {Position} */
		this.bottom_left = initial_position;
		/** @protected @type {Position[]} relative positions */
		this.tiles = [];
	}

	/**
	 * @public
	 * This function returns the positions of each tile if the whole block moves left
	 */
	pseudo_move_left() {
		return this._psuedo_move(Vectors.LEFT);
	}

	/**
	 * @public
	 * This function returns the positions of each tile if the whole block moves right
	 */
	pseudo_move_right() {
		return this._psuedo_move(Vectors.RIGHT);
	}

	/**
	 * @public
	 * This function returns the positions of each tile if the whole block moves down
	 */
	pseudo_move_down() {
		return this._psuedo_move(Vectors.DOWN);
	}

	/**
	 * @private
	 * @param {Position} vector
	 * @returns {Position[]}
	 */
	_psuedo_move(vector) {
		const x = this.bottom_left[0] + vector[0];
		const y = this.bottom_left[1] + vector[1];

		return this.tiles.map(([dx, dy]) => [x + dx, y + dy]);
	}

	move_left() {
		this._move(Vectors.LEFT);
	}

	move_right() {
		this._move(Vectors.RIGHT);
	}

	move_down() {
		this._move(Vectors.DOWN);
	}

	/**
	 * @private
	 * @param {Position} vector
	 */
	_move(vector) {
		this.bottom_left[0] += vector[0];
		this.bottom_left[1] += vector[1];
	}

	get_tiles() {
		const [x, y] = this.bottom_left;
		return this.tiles.map(([dx, dy]) => [x + dx, y + dy]);
	}
}

/**
 * The block of shape
 * ####
 */
export class BlockMinus extends BaseBlock {
	/**
	 * @param {Position} initial_position
	 */
	constructor(initial_position) {
		super(initial_position);

		this.tiles.push([0, 0]);
		this.tiles.push([0, 1]);
		this.tiles.push([0, 2]);
		this.tiles.push([0, 3]);
	}
}

/**
 * The block of shape
 * .#.
 * ###
 * .#.
 */
export class BlockPlus extends BaseBlock {
	/**
	 * @param {Position} initial_position
	 */
	constructor(initial_position) {
		super(initial_position);

		this.tiles.push([0, 1]);
		this.tiles.push([1, 0]);
		this.tiles.push([1, 1]);
		this.tiles.push([1, 2]);
		this.tiles.push([2, 1]);
	}
}

/**
 * The Block of shape
 * ..#
 * ..#
 * ###
 */
export class BlockL extends BaseBlock {
	/**
	 * @param {Position} initial_position
	 */
	constructor(initial_position) {
		super(initial_position);

		this.tiles.push([0, 0]);
		this.tiles.push([0, 1]);
		this.tiles.push([0, 2]);
		this.tiles.push([1, 2]);
		this.tiles.push([2, 2]);
	}
}

/**
 * The block of shape
 * #
 * #
 * #
 * #
 */
export class BlockPipe extends BaseBlock {
	/**
	 * @param {Position} initial_position
	 */
	constructor(initial_position) {
		super(initial_position);

		this.tiles.push([0, 0]);
		this.tiles.push([1, 0]);
		this.tiles.push([2, 0]);
		this.tiles.push([3, 0]);
	}
}

/**
 * The block of shape
 * ##
 * ##
 */
export class BlockSquare extends BaseBlock {
	/**
	 * @param {Position} initial_position
	 */
	constructor(initial_position) {
		super(initial_position);

		this.tiles.push([0, 0]);
		this.tiles.push([0, 1]);
		this.tiles.push([1, 0]);
		this.tiles.push([1, 1]);
	}
}
