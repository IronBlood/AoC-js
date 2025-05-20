/**
 * @param {number[]} containers
 * @param {number} total
 */
export const fill_containers = (containers, total) => {
	containers.sort((a, b) => a - b);
	let ans = 0;

	/**
	 * @param {number}   curr
	 * @param {number}   remain
	 */
	const backtracking = (curr, remain) => {
		if (remain < 0) {
			return;
		}
		if (remain == 0) {
			ans++;
			return;
		}
		for (let j = curr + 1; j < containers.length; j++) {
			backtracking(j, remain - containers[j]);
		}
	};

	backtracking(-1, total);

	return ans;
};

/**
 * @param {number[]} containers
 * @param {number} total
 */
export const minimum = (containers, total) => {
	containers.sort((a,b) => b - a);
	let ans = containers.length;

	/**
	 * @param {number[]} stack
	 * @param {number}   curr
	 * @param {number}   remain
	 */
	const backtracking = (stack, curr, remain) => {
		if (remain < 0) return;
		if (remain == 0) {
			ans = Math.min(ans, stack.length);
			return;
		}
		for (let j = curr + 1; j < containers.length; j++) {
			stack.push(j);
			backtracking(stack, j, remain - containers[j]);
			stack.pop();
		}
	};

	backtracking([], -1, total);

	return ans;
};

