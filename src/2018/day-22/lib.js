const re_depth = /^depth: (\d+)$/m, re_target = /^target: (\d+),(\d+)$/m;
const TYPE_ROCKY = 0, TYPE_WET = 1, TYPE_NARROW = 2;

/**
 * @param {string} input
 */
function parse(input) {
	let match;

	const halt = () => {
		console.error("wrong format");
		process.exit(1);
	};

	match = re_depth.exec(input);
	if (!match || match.length < 2) {
		halt();
	}
	let depth = +match[1];

	match = re_target.exec(input);
	if (!match || match.length < 3) {
		halt();
	}
	let [x, y] = match.slice(1).map(Number);

	return { depth, x, y };
}

/**
 * @param {number} num
 */
function convert_number_to_type(num) {
	switch (num) {
		case TYPE_ROCKY: return "."; // rocky
		case TYPE_WET: return "="; // wet
		case TYPE_NARROW: return "|"; // narrow
	}
	return " "; // shouldn't be here
}

/**
 * @param {number[][]} risk_levels
 */
function beautiful_dump(risk_levels) {
	console.log(risk_levels.map(row => row.map(convert_number_to_type).join("")).join("\n"));
}

/**
 * @param {string} input
 */
function get_risk_levels(input, margin = 0) {
	const { depth, x, y } = parse(input);
	const MOD = 20183;

	// skip check of ratio
	const Y = y + margin;
	const X = x + margin;

	/** @type {number[][]} */
	const erosion_level = Array.from({ length: Y + 1 }, () => Array(X + 1).fill(0));
	erosion_level[0][0] = depth % MOD;
	erosion_level[y][x] = depth % MOD;

	for (let i = 1; i <= Y; i++) {
		erosion_level[i][0] = (i * 48271 + depth) % MOD;
	}
	for (let i = 1; i <= X; i++) {
		erosion_level[0][i] = (i * 16807 + depth) % MOD;
	}
	for (let i = 1; i <= Y; i++) {
		for (let j = 1; j <= X; j++) {
			if (i === y && j === x)
				continue;
			erosion_level[i][j] = (erosion_level[i - 1][j] * erosion_level[i][j - 1] + depth) % MOD;
		}
	}
	erosion_level[y][x] = (0 + depth) % MOD;

	/** @type {number[][]} */
	const risk_levels = Array.from({ length: Y + 1 }, () => Array(X + 1));
	for (let i = 0; i <= Y; i++) {
		for (let j = 0; j <= X; j++) {
			risk_levels[i][j] = erosion_level[i][j] % 3;
		}
	}
	return {
		risk_levels,
		depth,
		x,
		y,
	};
}

/**
 * @param {string} input
 */
export function total_risk(input) {
	const { risk_levels } = get_risk_levels(input);
	return risk_levels.reduce((sum, row) => sum + row.reduce((s, col) => s + col, 0), 0);
}

/**
 * @readonly
 * @enum {number}
 */
const Equipment = {
	NONE: 0,
	GEAR: 1,
	TORC: 2,
};

/**
 * @typedef {Object} TravelState
 * @property {{x: number; y: number}} position
 * @property {Equipment} equipment
 * @property {number} time_elapsed
 */

/**
 * @param {string} input
 */
export function fewest_minutes(input) {
	const { risk_levels, x, y } = get_risk_levels(input, 100 /* assume 100 is big enough? */);
	const Y = risk_levels.length, X = risk_levels[0].length;
	/** @type {number[][][]} */
	const visited = Array.from({
		length: Y,
	}, () => Array.from({
		length: X,
	}, () => Array(3).fill(Number.MAX_SAFE_INTEGER)));

	/** @type {TravelState[]} */
	let queue = [
		{
			position: { x: 0, y: 0 },
			time_elapsed: 0,
			equipment: Equipment.TORC,
		},
	];

	const in_grid = (x, y) => x >= 0 && y >= 0 && x < X && y < Y;

	/**
	 * @param {number} risk_level
	 * @param {Equipment} equipment
	 */
	const valid_equipment = (risk_level, equipment) => {
		if (risk_level === TYPE_ROCKY && equipment === Equipment.NONE)
			return false;
		if (risk_level === TYPE_WET && equipment === Equipment.TORC)
			return false;
		if (risk_level === TYPE_NARROW && equipment === Equipment.GEAR)
			return false;
		return true;
	};

	const DIRS = [0, 1, 0, -1, 0];

	const EQUIPMENTS = [
		Equipment.NONE,
		Equipment.GEAR,
		Equipment.TORC,
	];

	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (let state of queue) {
			const { x: u, y: v } = state.position;
			if (state.time_elapsed >= visited[v][u][state.equipment])
				continue;
			visited[v][u][state.equipment] = state.time_elapsed;

			for (let i = 0; i < 4; i++) {
				const nx = u + DIRS[i], ny = v + DIRS[i + 1];
				if (!in_grid(nx, ny) || !valid_equipment(risk_levels[ny][nx], state.equipment))
					continue;
				next_queue.push({
					position: { x: nx, y: ny },
					time_elapsed: state.time_elapsed + 1,
					equipment: state.equipment,
				});
			}

			for (let equipment of EQUIPMENTS) {
				if (equipment === state.equipment || !valid_equipment(risk_levels[v][u], equipment))
					continue;
				next_queue.push({
					position: { x: u, y: v },
					time_elapsed: state.time_elapsed + 7,
					equipment,
				});
			}
		}

		queue = next_queue;
	}

	const times = visited[y][x];
	return Math.min(times[Equipment.TORC], 7 + Math.min(times[Equipment.NONE], times[Equipment.GEAR]));
}
