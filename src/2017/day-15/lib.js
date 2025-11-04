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

/**
 * Credit ChatGPT
 * 16807 and 48271 can be found in the page
 * https://en.wikipedia.org/wiki/Lehmer_random_number_generator
 * @param {string} data
 */
export const find_pairs2 = (data, part = 1) => {
	let [a, b] = data.split("\n").map(line => +line.split(" ").pop());

	const MOD = 0x7fffffff;

	/**
	 * @param {number} x
	 */
	const next_a = (x) => {
		// 127773 = Math.floor(MOD / 16807)
		// 2836 = MOD - 127773 * 16807
		const q = 127773, r = 2836;
		let n = 16807 * (x % q) - r * ((x / q) | 0);
		return n > 0 ? n : (n + MOD);
	};

	/**
	 * @param {number} x
	 */
	const next_b = (x) => {
		// 44488 = Math.floor(MOD / 48271)
		// 3399 = MOD - 44488 * 48271
		const q = 44488, r = 3399;
		let n = 48271 * (x % q) - r * ((x / q) | 0);
		return n > 0 ? n : (n + MOD);
	};

	let count = 0;

	if (part === 1) {
		for (let i = 0; i < 40_000_000; i++) {
			a = next_a(a);
			b = next_b(b);
			if ((a & 0xffff) === (b & 0xffff)) {
				count++;
			}
		}
	} else {
		for (let i = 0; i < 5_000_000; i++) {
			do { a = next_a(a); } while ((a & 3) !== 0);
			do { b = next_b(b); } while ((b & 7) !== 0);
			if ((a & 0xffff) === (b & 0xffff)) {
				count++;
			}
		}
	}

	return count;
};
