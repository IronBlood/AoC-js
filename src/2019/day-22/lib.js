/**
 * initial a deck of card in factory order
 * @param {number} total
 */
export const build_deck = (total) => {
	return Array.from({ length: total }, (_,idx) => idx);
};

/**
 * @template T
 * @param {T[]} arr
 * @param {number} i
 * @param {number} j
 */
const exchange = (arr, i, j) => {
	const x = arr[i];
	arr[i] = arr[j];
	arr[j] = x;
};

/**
 * @template T
 * @param {T[]} arr
 * @param {number} i
 * @param {number} j
 */
const reverse = (arr, i, j = arr.length - 1) => {
	while (i < j) {
		exchange(arr, i++, j--);
	}
};

/**
 * @param {number[]} deck
 * @param {string} cmd
 * @returns {number[]}
 */
export const transform = (deck, cmd) => {
	if (cmd.startsWith("deal into")) {
		return deck.reverse();
	}

	if (cmd.startsWith("cut")) {
		let pivot = (+cmd.split(" ")[1]) % deck.length;
		if (pivot <= 0) {
			pivot += deck.length;
		}

		reverse(deck, 0, pivot - 1);
		reverse(deck, pivot);
		return deck.reverse();
	}

	if (cmd.startsWith("deal with increment")) {
		const length = deck.length;
		const inc = (+cmd.split(" ")[3]) % length;
		const arr = Array(length);

		for (let i = 0, j = 0; i < length;) {
			arr[j] = deck[i++];
			j = (j + inc) % length;
		}

		return arr;
	}

	throw new Error(`Unknow command: ${cmd}`);
};

/**
 * @param {string} data
 */
export const find_2019 = (data) => {
	let deck = build_deck(10007);
	data.split("\n").forEach(line => {
		deck = transform(deck, line);
	});

	return deck.findIndex(x => x === 2019);
};

/**
 * @param {bigint} x
 * @param {bigint} N
 */
const mod = (x, N) => {
	const r = x % N;
	return r < 0n ? r + N : r;
};

/**
 * @param {bigint} a
 * @param {bigint} b
 * @param {bigint} M
 * @param {bigint} N
 */
const power_affine = (a, b, M, N) => {
	let a_res = 1n, b_res = 0n;
	let a_cur = mod(a, N), b_cur = mod(b, N);

	while (M > 0n) {
		if (M & 1n) {
			a_res = mod(a_cur * a_res, N);
			b_res = mod(a_cur * b_res + b_cur, N);
		}

		const next_a = mod(a_cur * a_cur, N);
		const next_b = mod(a_cur * b_cur + b_cur, N);

		a_cur = next_a;
		b_cur = next_b;

		M >>= 1n;
	}

	return [a_res, b_res];
}

/**
 * @param {string} data
 * @param {number | bigint} N
 * @param {number | bigint} iteration
 * @returns {bigint}
 */
const get_params = (data, N, iteration = 1) => {
	let a = 1n, b = 0n;
	N = BigInt(N);
	iteration = BigInt(iteration);
	data.split("\n").forEach(cmd => {
		if (cmd.startsWith("deal into")) {
			a = mod(-a, N);
			b = mod(-b - 1n, N);
			return;
		}

		if (cmd.startsWith("cut")) {
			const k = BigInt(cmd.split(" ")[1]);
			b = mod(b - k, N);
			return;
		}

		if (cmd.startsWith("deal with increment")) {
			const inc = BigInt(cmd.split(" ")[3]);
			a = mod(a * inc, N);
			b = mod(b * inc, N);
		}
	});

	return power_affine(a, b, iteration, N);
};

/**
 * @param {string} data
 * @param {number | bigint} N
 * @param {number | bigint} target
 * @param {number | bigint} iteration
 * @returns {bigint}
 */
export const find_x = (data, N, target, iteration = 1) => {
	N = BigInt(N);
	const [a, b] = get_params(data, N, iteration);
	return mod(a * BigInt(target) + b, N);
};

/**
 * Compute the modular inverse of `a` modulo `m`, i.e. find x such that
 *    a·x ≡ 1 (mod m)
 *
 * @param {bigint} a
 * @param {bigint} m
 * @returns {bigint}
 */
function mod_inv(a, m) {
	// extended GCD: returns [g, x, y] with a·x + b·y = g = gcd(a,b)
	const egcd = (a, b) => {
		if (b === 0n) return [a, 1n, 0n];
		const [g, x1, y1] = egcd(b, a % b);
		return [g, y1, x1 - (a / b) * y1];
	};

	const [g, x] = egcd((a % m + m) % m, m);
	if (g !== 1n) {
		throw new Error(`mod_inv: inverse does not exist for ${a} mod ${m}`);
	}
	// x might be negative, so normalize into [0..m)
	return (x % m + m) % m;
}

/**
 * @param {string} data
 * @param {number | bigint} N
 * @param {number | bigint} target
 * @param {number | bigint} iteration
 * @returns {bigint}
 */
export const reverse_x = (data, N, target, iteration = 1) => {
	const [a, b] = get_params(data, N, iteration);
	const inv_a = mod_inv(a, N);
	return mod(inv_a * (BigInt(target) - b), N);
};
