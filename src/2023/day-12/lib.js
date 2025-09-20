// Credit
// - https://old.reddit.com/r/adventofcode/comments/18ge41g/2023_day_12_solutions/ku9cxmv/
// - https://github.com/hb0nes/aoc_2023/blob/main/twelve_dp/src/main.rs
// @ts-check

/**
 * @param {string} line
 * @returns {number}
 */
export const count_arrangements = (line, part) => {
	let [str_l, str_r] = line.split(" ");

	/**
	 * @param {string} str
	 * @param {number} length
	 * @param {string} sep
	 */
	const repeat = (str, length, sep) => Array.from({ length }, () => str).join(sep);

	if (part === 2) {
		str_l = repeat(str_l, 5, "?");
		str_r = repeat(str_r, 5, ",");
	}

	const final_patterns = str_r.split(",").map(Number);

	const arr = str_l.split("");
	const question_idx = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === "?") {
			question_idx.push(i);
		}
	}

	const check = () => {
		let patterns = [];

		for (let i = 0; i < arr.length;) {
			if (arr[i] === ".") {
				i++;
				continue
			}

			let j = i + 1;
			while (j < arr.length && arr[j] === "#") {
				j++;
			}
			patterns.push(j - i);
			i = j;
		}

		const str = patterns.join(",");
		return str === str_r;
	};

	const check2 = () => {
		let patterns = [];

		for (let i = 0; i < arr.length;) {
			if (arr[i] === "?") {
				break;
			}

			if (arr[i] === ".") {
				i++;
				continue
			}

			let j = i + 1;
			while (j < arr.length && arr[j] === "#") {
				j++;
			}
			patterns.push(j - i);
			i = j;
		}

		// console.log(arr.join(""));
		// console.log(patterns, final_patterns);

		for (let i = 0, len = patterns.length; i < len; i++) {
			if (i === len - 1) {
				return patterns[i] <= final_patterns[i];
			}
			if (patterns[i] != final_patterns[i])
				return false;
		}

		return true;
	};

	let count = 0;

	/**
	 * @param {number} idx
	 */
	const dfs = (idx) => {
		if (idx === question_idx.length) {
			if (check()) {
				count++;
			}
			return;
		}

		const i = question_idx[idx];
		arr[i] = ".";
		if (check2())
			dfs(idx + 1);
		arr[i] = "?";

		arr[i] = "#";
		if (check2())
			dfs(idx + 1);
		arr[i] = "?";
	};

	dfs(0);

	return count;
};

/**
 * @param {string} line
 */
const parse_two = (line) => {
	const [str_l, str_r] = line.split(" ");

	/**
	 * @param {string} str
	 * @param {number} length
	 * @param {string} sep
	 */
	const repeat = (str, length, sep) => Array.from({ length }, () => str).join(sep);

	const springs = repeat(str_l, 5, "?");
	const groups = repeat(str_r, 5, ",").split(",").map(Number);

	return { springs, groups };
};

/**
 * @param {string} line
 */
export const solve_record_top = (line) => {
	const { springs, groups } = parse_two(line);

	/**
	 * @param {string} springs
	 * @param {number[]} groups
	 * @param {Map<string, number>} memo
	 * @returns {number}
	 */
	const solve = (springs, groups, memo) => {
		if (groups.length === 0) {
			return springs.includes("#") ? 0 : 1;
		}

		const key = springs + "|" + groups.join(",");
		let total = memo.get(key);
		if (total !== undefined) {
			return total;
		}
		total = 0;

		const need = groups.reduce((sum, g) => sum + g) + groups.length - 1;
		if (springs.length < need) {
			memo.set(key, 0);
			return 0;
		}

		if (springs[0] === ".") {
			total = solve(springs.slice(1), groups, memo);
			memo.set(key, total);
			return total;
		}

		const curr = groups[0];

		const seg = springs.slice(0, curr);
		const all_ok = [...seg].every(c => c !== ".");
		const not_blocked = springs.length === curr || springs[curr] !== "#";
		if (all_ok && not_blocked) {
			const next_start = Math.min(springs.length, curr + 1);
			total += solve(springs.slice(next_start), groups.slice(1), memo);
		}

		if (springs[0] !== "#") {
			total += solve(springs.slice(1), groups, memo);
		}

		memo.set(key, total);
		return total;
	};

	return solve(springs, groups, new Map());
};

/**
 * @param {string} line
 * @returns {number}
 */
export const solve_record_bottom = (line) => {
	const { springs, groups } = parse_two(line);

	const n = springs.length;
	const m = groups.length;

	const rows = n + groups[m - 1] + 1;
	const dp = Array.from({ length: rows }, () => Array(m).fill(0));

	let min_j = 0;

	outer: for (let i = 0; i < n; i++) {
		if (i > 0)
			dp[i - 1].fill(0);

		for (let j = 0; j < m; j++) {
			const curr_char = springs[i];

			if (j < min_j)
				continue;

			if (curr_char === "#" && j === 0) {
				min_j = 1;
			}

			if (curr_char === ".") {
				continue outer;
			}

			if (j > 0 && dp[i][j - 1] === 0)
				continue;

			const rem = groups.slice(j);
			const rem_needed = rem.reduce((s, x) => s + x, 0) + (rem.length - 1);
			if (rem_needed > n - i)
				continue;

			if (j === m - 1 && springs.slice(i + groups[j]).includes("#")) {
				continue;
			}

			const end_idx = Math.min(n, i + groups[j]);
			const segment = springs.slice(i, i + groups[j]);
			const all_valid = [...segment].every(c => c === "?" || c === "#");
			const next_char = springs[end_idx];
			if (!all_valid || next_char === "#")
				continue;

			const next_start_idx = Math.min(n, i + groups[j] + 1);
			const found = springs.indexOf("#", next_start_idx);
			const next_broken_idx = found >= 0 ? found : rows - 1;

			for (let k = next_start_idx; k <= next_broken_idx; k++) {
				dp[k][j] += j > 0 ? dp[i][j - 1] : 1;
			}
		}
	}

	return dp[rows - 1][m - 1];
};

/**
 * @param {string} data
 */
export const total_arrangements = (data, part = 1) => {
	return data.split("\n").reduce((sum, line, idx) => {
		return sum + (part === 1 ? count_arrangements(line, part) : solve_record_top(line))
	}, 0);
};
