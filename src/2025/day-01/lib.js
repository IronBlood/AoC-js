/**
 * @param {string} data
 * @returns {number}
 */
export const actual_passwd = (data, part = 1) => {
	let curr = 50;
	let count = 0;
	data.split("\n").forEach(line => {
		const delta = +line.substring(1);
		if (part === 1) {
			curr = line[0] === "L"
				? (curr - delta + 100)
				: (curr + delta);
			curr = (curr % 100 + 100) % 100;
			if (curr === 0)
				count++;
		} else {
			count += Math.trunc(delta / 100);

			const d = delta % 100;
			const next = line[0] === "L"
				? (curr - d)
				: (curr + d);

			if (curr !== 0) {
				if (line[0] === "L") {
					if (next <= 0) {
						count++;
					}
				} else {
					if (next >= 100) {
						count++;
					}
				}
			}

			curr = (next + 100) % 100;
		}
	});
	return count;
};
