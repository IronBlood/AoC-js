/**
 * TODO can be optimised
 * @param {number} len
 * @param {number} k
 */
export const generate_transform = (len, k) => {
	const transform = Array(len + 1);
	const base = [0, 1, 0, -1];

	for (let i = 0, idx = 0; i < transform.length; i += k) {
		for (let j = 0; j < k && i + j < transform.length; j++) {
			transform[i + j] = base[idx];
		}
		idx = (idx + 1) % 4;
	}

	return transform.slice(1);
};

/**
 * @param {number[]} seq
 */
const fft = (seq) => {
	const next = Array(seq.length);

	for (let i = 0; i < seq.length; i++) {
		const transform = generate_transform(seq.length, i + 1);
		next[i] = Math.abs(seq.reduce((s, curr, idx) => s + curr * transform[idx], 0)) % 10;
	}

	return next;
};

/**
 * @param {string} input
 */
export const first_eight_digit = (input, phases = 100) => {
	let seq = input.split("").map(Number);

	while (phases-- > 0) {
		seq = fft(seq);
	}

	return seq.slice(0, 8).join("");
}

/**
 * @param {number[]} seq
 * @param {number} phases
 * @param {number} offset
 */
const fft_tail = (seq, phases, offset) => {
	// only keep the tail from offset onwards
	seq = seq.slice(offset);

	while (phases-- > 0) {
		// build it in-place, backwards
		for (let i = seq.length - 2; i >= 0; i--) {
			seq[i] = (seq[i] + seq[i + 1]) % 10;
		}
	}

	return seq.slice(0, 8).join("");
};

/**
 * @param {string} input
 */
export const get_msg = (input) => {
	const offset = Number(input.slice(0, 7));
	const full = input.repeat(10000).split("").map(Number);
	return fft_tail(full, 100, offset);
};
