/**
 * Use dynamic programming to check
 * - whether it's possbile if part === 1
 * - how many ways
 * @param   {string}      pattern
 * @param   {Set<string>} towels
 * @returns {number} return 0 or 1 if part === 1, otherwise how many ways
 */
const check = (pattern, towels, part = 1) => {
	const dp = Array(pattern.length + 1).fill(0);
	dp[0] = 1;
	for (let i = 0; i < pattern.length; i++) {
		for (let j = i; j >= 0; j--) {
			const str = pattern.slice(j, i+1);
			if (towels.has(str) && dp[j] > 0) {
				dp[i+1] += dp[j];
			}
		}
	}
	return part === 1 ? (dp[pattern.length] > 0 ? 1 : 0 ) : dp[pattern.length];
};

/**
 * @param {string} data
 */
export const possible_patterns = (data) => {
	const [towels, patterns] = data.split("\n\n");
	const towel_set = new Set(towels.split(", "));
	return patterns.split("\n").reduce((sum, p) => sum + check(p, towel_set), 0);
};

/**
 * @param {string} data
 */
export const total_ways = (data) => {
	const [towels, patterns] = data.split("\n\n");
	const towel_set = new Set(towels.split(", "));
	return patterns.split("\n").reduce((sum, p) => sum + check(p, towel_set, 2), 0);
};

