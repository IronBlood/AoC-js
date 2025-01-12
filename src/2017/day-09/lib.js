/**
 * @param {string} data
 * @returns {number}
 */
export const evaluate = (data, part = 1) => {
	let score = 0, curr_depth = 0, is_in_garbage = false, is_canceled = false, garbage_count = 0;

	for (let i = 0; i < data.length; i++) {
		if (is_canceled) {
			is_canceled = false;
			continue;
		}

		const c = data[i];
		if (c === "!") {
			is_canceled = true;
			continue;
		}

		if (!is_in_garbage && c === "<") {
			is_in_garbage = true;
			continue;
		}

		if (is_in_garbage) {
			if (c === ">") {
				is_in_garbage = false;
			} else {
				garbage_count++;
			}
			continue;
		}

		if (c === "{") {
			score += ++curr_depth;
		}
		if (c === "}") {
			curr_depth--;
		}
	}

	return part === 1 ? score : garbage_count;
};

