/**
 * A function to remove comments from batch script
 *
 * using a bash syntax, all text after a `#` in a line
 * will be ignored
 *
 * @param {string} batch
 */
export const helper_remove_comments = (batch) => {
	const lines = batch.split("\n").map(line => {
		let idx = -1;
		if ((idx = line.indexOf("#")) >= 0) {
			line = line.substring(0, idx);
		}
		return line.trim();
	}).filter(line => line.length > 0);

	return lines.join("\n");
};

/**
 * @template T
 * @param {T[]} candidates
 * @returns {T[][]}
 */
export const helper_generate_combo = (candidates) => {
	/** @type {T[][]} */
	const combos = [];

	/**
	 * @param {number} idx
	 * @param {T[]} stack
	 */
	const dfs = (idx, stack) => {
		for (let i = idx + 1; i < candidates.length; i++) {
			stack.push(candidates[i]);
			combos.push([...stack]);
			dfs(i, stack);
			stack.pop();
		}
	};

	dfs(-1, []);
	return combos;
};
