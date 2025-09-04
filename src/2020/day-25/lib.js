// @ts-check

const SUBJECT_NUMBER = 7;
const MOD = 20201227;

/**
 * @param {number} num
 * @returns {number}
 */
const get_loop_size = (num) => {
	let value = 1, loop = 0;
	while (value !== num) {
		value *= SUBJECT_NUMBER;
		value %= MOD;
		loop++;
	}
	return loop;
};

/**
 * @param {number} pub
 * @param {number} loop
 * @returns {number}
 */
const calc_encryption_key = (pub, loop) => {
	let value = 1;
	while (loop-- > 0) {
		value *= pub;
		value %= MOD;
	}
	return value;
};

/**
 * @param {string} data
 */
export const get_encryption_key = (data) => {
	const pubkeys = data.split("\n").map(Number);
	const [card_pub, door_pub] = pubkeys;
	const loop_sizes = pubkeys.map(get_loop_size);
	const [card_ls, door_ls] = loop_sizes;
	const en1 = calc_encryption_key(door_pub, card_ls);
	const en2 = calc_encryption_key(card_pub, door_ls);
	if (en1 !== en2) {
		throw new Error("TODO");
	}
	return en1;
};
