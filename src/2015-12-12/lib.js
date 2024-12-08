/**
 * @param {string} json_str
 */
export const sum_numbers = json_str => {
	const json = JSON.parse(json_str);
	let sum = 0;

	/**
	 * @param {number|array|string|object} jobj
	 */
	const dfs = jobj => {
		if (typeof jobj === "number") {
			sum += jobj;
		} else if (Array.isArray(jobj)) {
			for (let x of jobj) {
				dfs(x);
			}
		} else if (typeof jobj === "object" && jobj !== null) {
			Object.values(jobj).forEach(v => dfs(v));
		}
	};
	dfs(json);
	return sum;
};

/**
 * @param {string} json_str
 */
export const sum_numbers_exclude_red = json_str => {
	const dfs = data => {
		if (typeof data === "number") {
			return data;
		}
		if (Array.isArray(data)) {
			return data.reduce((sum, curr) => sum + dfs(curr), 0);
		}
		if (typeof data === "object" && data !== null) {
			const v = Object.values(data);
			if (v.includes("red")) {
				return 0;
			}
			return v.reduce((sum, curr) => sum + dfs(curr), 0);
		}
		return 0;
	};

	return dfs(JSON.parse(json_str));
};

