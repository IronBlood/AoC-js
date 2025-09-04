/**
 * @param {string} rules
 */
const get_raw_rules = (rules) => {
	/** @type {Map<string, string>} */
	const map = new Map();

	rules.split("\n").forEach(line => {
		const [id, rule] = line.split(": ");
		map.set(id, rule);
	});

	return map;
};

/**
 * @param {string[][]} rules
 * @returns {string[]}
 */
export const flat_sub_rules = (rules) => {
	const res = [];

	/**
	 * @param {string} str
	 * @param {number} idx
	 */
	const dfs = (str, idx) => {
		if (idx === rules.length) {
			res.push(str);
			return;
		}

		for (const x of rules[idx]) {
			dfs(str + x, idx + 1);
		}
	}

	dfs("", 0);

	return res;
};

/**
 * @param {string} data
 */
export const count_messages = (data, part = 1) => {
	const [rules, messages] = data.split("\n\n");

	const map_raw_rules = get_raw_rules(rules);

	/** @type {Map<string, string[]>} */
	const map_parsed_rules = new Map();

	/**
	 * @param {string} id
	 * @returns {string[]}
	 */
	const dfs = (id) => {
		if (map_parsed_rules.has(id))
			return map_parsed_rules.get(id);

		const nums = map_raw_rules.get(id).split(" | ");
		const parsed_rules = nums.map(x => {
			let match;
			if ((match = /^"([a-z]+)"$/.exec(x))) {
				return [match[1]];
			} else {
				const sub_rules = x.split(" ").map(id => dfs(id));
				return flat_sub_rules(sub_rules);
			}
		}).flat();

		map_parsed_rules.set(id, parsed_rules);
		return parsed_rules;
	};

	const zero_rules = dfs("0");

	if (part === 1) {
		const set = new Set(zero_rules);
		return messages.split("\n").reduce((sum, line) => sum + (set.has(line) ? 1 : 0), 0);
	} else {
		// 0: 8 11
		// 8: 42 | 42 8
		// 11: 42 31 | 42 11 31
		// HACK 0: (?:42)+ (?:42){n} (?:31){n}
		const rule_42 = dfs("42");
		const rule_31 = dfs("31");

		const A = `(?:${rule_42.join("|")})`;
		const B = `(?:${rule_31.join("|")})`;

		let sum = 0;
		const lines = messages.split("\n");

		for (const line of lines) {
			for (let n = 1; n <= 5; n++) {
				const pattern = new RegExp(`^${A}+${A}{${n}}${B}{${n}}$`);
				if (pattern.test(line)) {
					sum++;
					break;
				}
			}
		}

		return sum;
	}
};
