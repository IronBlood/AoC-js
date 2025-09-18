const SHAPES = {
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3,
};

/**
 * @param {string} line
 */
const get_score1 = (line) => {
	const [a, x] = line.split(" ").map(shape => {
		// ROCK
		if (shape === "A" || shape === "X") {
			return SHAPES.ROCK;
		}
		if (shape === "B" || shape === "Y") {
			return SHAPES.PAPER;
		}
		return SHAPES.SCISSORS;
	});

	let score = 0;
	switch (x) {
		case SHAPES.ROCK: score += 1; break;
		case SHAPES.PAPER: score += 2; break;
		case SHAPES.SCISSORS: score += 3; break;
	}

	if (a === x) {
		// draw
		score += 3;
	} else if (
		(a === SHAPES.ROCK && x === SHAPES.PAPER) ||
		(a === SHAPES.PAPER && x === SHAPES.SCISSORS) ||
		(a === SHAPES.SCISSORS && x === SHAPES.ROCK)
	) {
		score += 6;
	}

	return score;
};

/**
 * @param {string} line
 */
const get_score2 = (line) => {
	const [a, x] = line.split(" ");

	let shape = SHAPES.ROCK;
	switch (a) {
		case "B": shape = SHAPES.PAPER; break;
		case "C": shape = SHAPES.SCISSORS; break;
	}

	let score = 0;
	switch (x) {
		case "Y": score += 3; break;
		case "Z": score += 6; break;
	}

	let seek = shape;
	if (x === "X") {
		// to lose
		switch (shape) {
			case SHAPES.PAPER: seek = SHAPES.ROCK; break;
			case SHAPES.ROCK: seek = SHAPES.SCISSORS; break;
			case SHAPES.SCISSORS: seek = SHAPES.PAPER; break;
		}
	} else if (x === "Z") {
		// to win
		switch (shape) {
			case SHAPES.PAPER: seek = SHAPES.SCISSORS; break;
			case SHAPES.ROCK: seek = SHAPES.PAPER; break;
			case SHAPES.SCISSORS: seek = SHAPES.ROCK; break;
		}
	}

	return score + seek;
};

/**
 * @param {string} data
 */
export const total_score = (data, part = 1) => {
	const get_score = part === 1 ? get_score1 : get_score2;
	return data
		.split("\n")
		.map(get_score)
		.reduce((a, b) => a + b);
};
