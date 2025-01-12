/**
 * @param {string} data
 */
export const find_pairs = (data, part = 1) => {
	let [a, b] = data.split("\n").map(line => {
		const arr = line.split(" ");
		return +arr[arr.length - 1];
	});

	const F_A = 16807, F_B = 48271, MOD = 0x7fffffff;

	let count = 0, loop = 0;

	if (part === 1) {
		do {
			a = (a * F_A) % MOD;
			b = (b * F_B) % MOD;
			if ((a & 0xffff) === (b & 0xffff)) {
				count++;
			}
		} while (loop++ < 40_000_000)
	} else {
		do {
			do {
				a = (a * F_A) % MOD;
			} while ((a & 0x3) != 0)

			do {
				b = (b * F_B) % MOD;
			} while ((b & 0x7) != 0)

			if ((a & 0xffff) === (b & 0xffff)) {
				count++;
			}
		} while (loop++ < 5_000_000)
	}

	return count;
};

