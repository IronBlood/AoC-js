class Bag {
	/**
	 * @param {string} name
	 * @param {string[]} [children]
	 */
	constructor(name, children = []) {
		/** @type {string} */
		this.name = name;
		/** @type {string[]} */
		this.children = children;
	}
}

/**
 * @param {string} data
 */
export const num_outer_bags_for_shiny_gold = (data) => {
	/** @type {Map<string, Bag>} */
	const map_bags = new Map();
	data.split("\n").forEach(line => {
	/**
	 * Captures the container bag color at the start of the line
	 * (e.g., "light red" in "light red bags contain...")
	 */
	const container_bag_pattern = /^(.+)\ bags contain/;

	/**
	 * Captures each child bag color in the content list (e.g., "bright white", "muted yellow")
	 * Assumes the format "1 bright white bag" or "2 muted yellow bags", ignoring punctuation.
	 */
	const contained_bag_paggern = /\d+ ([^0-9\.\,]+) bag(s?)[\,\.]/g;

		let match = container_bag_pattern.exec(line);
		const container = match[1];

		const children = [];
		while ((match = contained_bag_paggern.exec(line))) {
			children.push(match[1]);
		}

		if (map_bags.has(container)) {
			console.log(`duplicated ${container}`);
		}

		map_bags.set(container, new Bag(container, children));
	});

	let
		/** @type {Set<string>} */ visited = new Set(),
		/** @type {Set<string>} */ skipped = new Set(),
		/** @type {Set<string>} */ contained = new Set();

	const TARGET = "shiny gold";

	/**
	 * @param {string} name
	 */
	const dfs = (name, skipping = false) => {
		if (!skipping) {
			if (name === TARGET)
				return true;
		}

		if (skipped.has(name)) {
			if (!visited.has(name)) {
				visited.add(name);
				const bag = map_bags.get(name);
				for (const child of bag.children) {
					skipped.add(child);
					dfs(child);
				}
			}
			return false;
		}

		if (contained.has(name)) {
			return true;
		}

		if (visited.has(name)) {
			return false;
		}
		visited.add(name);

		for (const child of map_bags.get(name).children) {
			if (dfs(child)) {
				contained.add(name);
				return true;
			}
		}
		skipped.add(name);
		return false;
	};

	skipped.add(TARGET);
	dfs(TARGET, true);

	for (const name of map_bags.keys()) {
		dfs(name);
	}

	return contained.size;
};

/**
 * @typedef {Object} ChildBag
 * @property {string} name
 * @property {number} count
 *
 * @param {string} data
 */
export const count_total_bags_inside_shiny_gold = (data) => {
	/** @type {Map<string, ChildBag[]>} */
	const map_bags = new Map();
	data.split("\n").forEach(line => {
	/**
	 * Captures the container bag color at the start of the line
	 * (e.g., "light red" in "light red bags contain...")
	 */
	const container_bag_pattern = /^(.+)\ bags contain/;

	/**
	 * Captures each child bag color in the content list (e.g., "bright white", "muted yellow")
	 * Assumes the format "1 bright white bag" or "2 muted yellow bags", ignoring punctuation.
	 */
	const contained_bag_paggern = /(\d+) ([^0-9\.\,]+) bag(s?)[\,\.]/g;

		let match = container_bag_pattern.exec(line);
		const container = match[1];

		/** @type {ChildBag[]} */
		const children = [];
		while ((match = contained_bag_paggern.exec(line))) {
			children.push({
				count: +match[1],
				name: match[2],
			});
		}

		if (map_bags.has(container)) {
			console.log(`duplicated ${container}`);
		}

		map_bags.set(container, children);
	});

	/**
	 * @param {string} name
	 */
	const dfs_count_bags = (name) => {
		let count = 1;
		for (const child of map_bags.get(name)) {
			count += child.count * dfs_count_bags(child.name);
		}
		return count;
	};

	return dfs_count_bags("shiny gold") - 1;
};
