/**
 * Dynamic backpack-style allocation with on-the-fly calculations.
 * @param {number[]} teaspoons      Current allocation of teaspoons.
 * @param {number}   remaining      Remaining teaspoons to allocate.
 * @param {number}   currIngredient Current ingredient index.
 * @param {number}   numIngredients Total number of ingredients.
 * @param {function} calculateScore Callback to calculate and compare scores.
 */
const backtracking = (teaspoons, remaining, currIngredient, numIngredients, calculateScore) => {
	if (currIngredient === numIngredients - 1) {
		// Base case: Last ingredient gets all remaining teaspoons
		teaspoons[currIngredient] = remaining;
		calculateScore(teaspoons);
		return;
	}

	// Distribute teaspoons to the current ingredient
	for (let i = 1; i <= remaining - (numIngredients - currIngredient - 1); i++) {
		teaspoons[currIngredient] = i;
		backtracking(teaspoons, remaining - i, currIngredient + 1, numIngredients, calculateScore);
	}
};

/**
 * @param {[number, number, number, number][]} recipes
 * @param {number[]} teaspoons
 */
const calculate_scores = (recipes, teaspoons) => {
	const arr = Array(4).fill(0);
	for (let i = 0; i < teaspoons.length; i++) {
		for (let j = 0; j < 4; j++) {
			arr[j] += recipes[i][j] * teaspoons[i];
		}
	}
	let m = 1;
	for (let i = 0; i < 4; i++) {
		if ((m *= arr[i]) <= 0) return 0;
	}
	return m;
};

/**
 * @param {string[]} recipes
 * @returns {number}
 */
export const make_a_cookie = recipes => {
	const parsed_recipes = recipes.map(x => {
		const arr = x.split(", ");
		return [
			Number(arr[0].split(" ")[2]),
			Number(arr[1].split(" ")[1]),
			Number(arr[2].split(" ")[1]),
			Number(arr[3].split(" ")[1]),
		];
	});
	let max = 0;
	backtracking(Array(parsed_recipes.length).fill(0), 100, 0, parsed_recipes.length, (teaspoons) => {
		max = Math.max(max, calculate_scores(parsed_recipes, teaspoons));
	});
	return max;
};

/**
 * @param {[number, number, number, number, number][]} recipes
 * @param {number[]} teaspoons
 */
const calculate_calorie = (recipes, teaspoons) => {
	return teaspoons.reduce((sum, curr, idx) => sum + curr * recipes[idx][4], 0);
};

/**
 * @param {string[]} recipes
 * @param {number} total_calorie
 * @returns {number}
 */
export const make_a_cookie_with_fixed_calorie = (recipes, total_calorie) => {
	const parsed_recipes = recipes.map(x => {
		const arr = x.split(", ");
		return [
			Number(arr[0].split(" ")[2]),
			Number(arr[1].split(" ")[1]),
			Number(arr[2].split(" ")[1]),
			Number(arr[3].split(" ")[1]),
			Number(arr[4].split(" ")[1]),
		];
	});
	let max = 0;
	backtracking(Array(parsed_recipes.length).fill(0), 100, 0, parsed_recipes.length, (teaspoons) => {
		if (calculate_calorie(parsed_recipes, teaspoons) == total_calorie)
			max = Math.max(max, calculate_scores(parsed_recipes, teaspoons));
	});
	return max;
};

