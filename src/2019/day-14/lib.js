// @ts-check
/**
 * @typedef {import("./types").Recipe} Recipe
 * @typedef {import("./types").RecipeN} RecipeN
 */

const NAME_ORE = "ORE";
const NAME_FUEL = "FUEL";

const ID_ORE = 0;
const ID_FUEL = 1;
/**
 * @param {string} str
 * @returns {Recipe}
 */
export const parse_recipe = (str) => {
	const re = /\d+ [A-Z]+/g;
	/** @type {Array<import("./types").Ingredient>} */
	const aux = [];
	let match;
	while ((match = re.exec(str))) {
		const [count, name] = match[0].split(" ");
		aux.push({ count: +count, name });
	}

	if (aux.length === 0) {
		throw new Error(`invalid formula: ${str}`);
	}
	// the target
	const { count: output, name } = aux[aux.length - 1];
	aux.length--;

	return {
		name,
		output,
		ingredients: aux,
	};
};

/**
 * @param {string} name
 * @param {Map<string, Recipe>} recipes
 * @param {Map<string, number>} storage
 * @param {number} [n]
 */
export const produce_x = (name, recipes, storage, n = 1) => {
	if (name === NAME_ORE) {
		const val = (storage.get(name) || 0) + n;
		storage.set(name, val);
		return;
	}

	// check whether we have built some
	let curr = storage.get(name) || 0;
	if (curr < n) {
		const diff = n - curr;
		const recipe = recipes.get(name);
		const k = Math.ceil(diff / recipe.output);

		for (const x of recipe.ingredients) {
			produce_x(x.name, recipes, storage, k * x.count);
		}

		curr += k * recipe.output;
	}
	curr -= n;
	storage.set(name, curr);
};

/**
 * @param {number} id
 * @param {RecipeN[]} recipes
 * @param {number[]} storage
 * @param {number} [n]
 */
export const produce_n = (id, recipes, storage, n = 1) => {
	// ORE
	if (id === ID_ORE) {
		storage[ID_ORE] += n;
		return;
	}

	let curr = storage[id];
	if (curr < n) {
		const diff = n - curr;
		const recipe = recipes[id];
		let k = Math.ceil(diff / recipe.output);

		for (const x of recipe.ingredients) {
			produce_n(x.id, recipes, storage, k * x.count);
		}

		curr += k * recipe.output;
	}
	curr -= n;
	storage[id] = curr;
};

/**
 * @param {string} data
 */
const build_recipes = (data) => {
	const lines = data.split("\n");
	const raw_recipes = lines.map(parse_recipe);

	const map_name_to_id = new Map([
		[NAME_ORE, ID_ORE],
		[NAME_FUEL, ID_FUEL],
	]);

	/**
	 * @param {string} name
	 */
	const check_name = (name) => {
		if (!map_name_to_id.has(name)) {
			map_name_to_id.set(name, map_name_to_id.size);
		}
	};

	raw_recipes.forEach(r => {
		check_name(r.name);
		r.ingredients.forEach(i => check_name(i.name));
	});

	/** @type {RecipeN[]} */
	const recipes = Array(map_name_to_id.size).fill(undefined);
	raw_recipes.forEach(r => {
		const id = map_name_to_id.get(r.name);
		const recipe = {
			id,
			output: r.output,
			ingredients: r.ingredients.map(i => ({
				id: map_name_to_id.get(i.name),
				count: i.count,
			})),
		};

		recipes[id] = recipe;
	});

	return recipes;
};

/**
 * @param {string} data
 */
export const calc_ores = (data) => {
	/** @type {Map<string, Recipe>} */
	const recipes = new Map();
	data.split("\n").forEach(line => {
		const recipe = parse_recipe(line);
		recipes.set(recipe.name, recipe);
	});

	/** @type {Map<string, number>} */
	const storage = new Map();
	produce_x(NAME_FUEL, recipes, storage);

	return storage.get(NAME_ORE);
};

/**
 * @param {string} data
 */
export const calc_ores_N = (data) => {
	const recipes = build_recipes(data);

	/** @type {number[]} */
	const storage = Array(recipes.length).fill(0);

	produce_n(ID_FUEL, recipes, storage);

	return storage[ID_ORE];
};

/**
 * @param {string} data
 * @returns {number}
 */
export const max_fuel = (data) => {
	/** @type {Map<string, Recipe>} */
	const recipes = new Map();
	data.split("\n").forEach(line => {
		const recipe = parse_recipe(line);
		recipes.set(recipe.name, recipe);
	});

	/**
	 * @param {number} fuel
	 */
	const ore_needed = (fuel) => {
		const storage = new Map();
		produce_x(NAME_FUEL, recipes, storage, fuel);
		return storage.get(NAME_ORE);
	};

	const MAX_ORE = 1_000_000_000_000;
	let low_fuel = 1;
	let high_fuel = 1;
	while (ore_needed(high_fuel) <= MAX_ORE) {
		high_fuel *= 2;
	}

	low_fuel = high_fuel / 2;

	while (low_fuel < high_fuel - 1) {
		const mid = Math.floor((low_fuel + high_fuel) / 2);
		if (ore_needed(mid) <= MAX_ORE) {
			low_fuel = mid;
		} else {
			high_fuel = mid;
		}
	}
	return low_fuel;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const max_fuel_N = (data) => {
	const recipes = build_recipes(data);

	/**
	 * @param {number} fuel
	 */
	const ore_needed = (fuel) => {
		const storage = Array(recipes.length).fill(0);
		produce_n(ID_FUEL, recipes, storage, fuel);
		return storage[ID_ORE];
	};

	const MAX_ORE = 1_000_000_000_000;
	let low_fuel = 1;
	let high_fuel = 1;
	while (ore_needed(high_fuel) <= MAX_ORE) {
		high_fuel *= 2;
	}

	low_fuel = high_fuel / 2;

	while (low_fuel < high_fuel - 1) {
		const mid = Math.floor((low_fuel + high_fuel) / 2);
		if (ore_needed(mid) <= MAX_ORE) {
			low_fuel = mid;
		} else {
			high_fuel = mid;
		}
	}
	return low_fuel;
};
