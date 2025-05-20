/**
 * @param {string} str
 * @returns {string[]}
 */
const split_molecue = str => {
	const arr = [];
	for (let i = 0, len = str.length; i < len; ) {
		if (i + 1 < len && str.charCodeAt(i + 1) >= 97 && str.charCodeAt(i + 1) <= 122) {
			arr.push(str.slice(i, i + 2));
			i += 2;
		} else {
			arr.push(str[i++]);
		}
	}
	return arr;
};

/**
 * @param {string[]} cfg
 * @return {Map<string, string[]>}
 */
const gen_map = cfg => {
	/** @type {Map<string, string[]>} */
	const map = new Map();
	cfg.forEach(line => {
		const [s, t] = line.split(" => ");
		if (!map.has(s)) {
			map.set(s, [t]);
		} else {
			map.get(s).push(t);
		}
	});
	return map;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const possible_molecules = data => {
	const lines = data.split("\n");
	const target = lines[lines.length - 1], replacements = lines.slice(0, lines.length - 2);
	const map = gen_map(replacements);
	const elements = split_molecue(target);
	/** @type {Set<string>} */
	const set = new Set();

	for (let i = 0; i < elements.length; i++) {
		const curr = elements[i], candidates = map.get(curr);
		if (candidates?.length > 0) {
			for (let j = 0; j < candidates.length; j++) {
				elements[i] = candidates[j];
				set.add(elements.join(""));
			}
		}
		// restore
		elements[i] = curr;
	}

	return set.size;
};

/**
 * @template T
 * @param {T[]} array
 */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		// Generate a random index between 0 and i (inclusive)
		const randomIndex = Math.floor(Math.random() * (i + 1));

		// Swap the elements at i and randomIndex
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
	}
	return array;
}

/**
 * @param {string} data;
 */
export const reduce = data => {
	const [replacements, target] = data.split("\n\n");

	const reduce_map = replacements.split("\n").map(line => line.split(" => "));

	let mol = target, steps = 0;
	let counter = 0;

	while (mol != "e") {
		if (counter++ > 1000000)
			break;
		const prev = mol;
		for (const [f,t] of reduce_map) {
			if (mol.indexOf(t) < 0)
				continue;
			mol = mol.replace(t,f);
			steps++;
		}
		if (mol == prev) {
			mol = target;
			steps = 0;
			console.log("shuffled");
			reduce_map = shuffleArray(reduce_map);
		}
	}

	return steps;
};

