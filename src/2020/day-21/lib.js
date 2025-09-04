// Credit: https://www.reddit.com/r/adventofcode/comments/khaiyk/2020_day_21_solutions/gi0f1ya/
// @ts-check

/**
 * @typedef {import("./types").Food} Food
 */

/**
 * @param {string} line
 * @returns {Food}
 */
export const parse_line = (line) => {
	const re = /^([\w ]+) \(contains ([\w, ]+)\)$/;
	const m = re.exec(line);
	if (!m || m.length < 3) {
		throw new Error(`Wrong format ${line}`);
	}

	return {
		ingredients: m[1].split(" "),
		allergens: m[2].split(", "),
	}
};

/**
 * @param {Food[]} foods
 */
const build_uniques = (foods) => {
	/** @type {Set<string>} */
	const allergen_set = new Set();
	foods.forEach(({allergens}) =>
		allergens.forEach(a => allergen_set.add(a)));

	/** @type {Map<string, Set<string>>} */
	const uniques = new Map();
	for (const allergen of allergen_set) {
		const candidates = foods.filter(f => f.allergens.includes(allergen));

		const intersection = new Set(candidates[0].ingredients);
		for (const other of candidates.slice(0)) {
			intersection.forEach(ing => {
				if (!other.ingredients.includes(ing)) {
					intersection.delete(ing);
				}
			});
		}

		uniques.set(allergen, intersection);
	}

	// console.log(uniques);
	return uniques;
};

/**
 * @param {string} data
 */
export const solve21 = (data) => {
	const foods = data.split("\n").map(parse_line);
	const uniques = build_uniques(foods);

	/** @type {[string, string][]} pairs of allergen and ingredient */
	const resolved = [];
	while (uniques.size > 0) {
		for (const [allergen, set] of uniques) {
			if (set.size === 1) {
				const ingredient = Array.from(set)[0];
				resolved.push([allergen, ingredient]);
				uniques.delete(allergen);

				for (const other of uniques.values()) {
					other.delete(ingredient);
				}

				// in each while-loop, we only handle one set
				break;
			}
		}
	}

	resolved.sort((a, b) => a[0].localeCompare(b[0]));
	// All ingredients that contain allergens
	const dangerous_arr = resolved.map(([_, ingredient]) => ingredient);
	const dangerous_set = new Set(dangerous_arr);
	let safe_count = 0;
	foods.forEach(f => {
		f.ingredients.forEach(i => {
			if (!dangerous_set.has(i)) {
				safe_count++;
			}
		});
	});

	const dangerous_list = dangerous_arr.join(",");
	return [safe_count, dangerous_list];
};
