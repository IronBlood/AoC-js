/**
 * @param {string} text
 * @returns {Uint8Array}
 */
const _text_to_uint8array = text => {
	const arr = new Uint8Array(8);
	for (let i = 0; i < 8; i++) {
		arr[i] = text.charCodeAt(i) - 97;
	}
	return arr;
};

/**
 * @param {Uint8Array} arr
 * @returns {string}
 */
const _uint8array_to_text = arr => {
	arr = arr.slice();
	for (let i = 0; i < 8; i++) {
		arr[i] += 97;
	}
	return new TextDecoder().decode(arr);
};

/**
 * @param {Uint8Array} arr
 */
const _is_valid = arr => {
	let flag_inc_3 = false;
	for (let i = 0; i < 8 - 2; i++) {
		if (arr[i] + 1 === arr[i + 1] && arr[i] + 2 === arr[i + 2]) {
			flag_inc_3 = true;
			break;
		}
	}
	if (!flag_inc_3)
		return false;

	// second pass: i - 8, l - 11, o - 14
	for (let i = 0; i < 8; i++) {
		if (arr[i] == 8 || arr[i] == 11 || arr[i] == 14) {
			return false;
		}
	}

	let same_count = 0;
	for (let i = 0; i < 7; i++) {
		if (arr[i] == arr[i+1]) {
			same_count++;
			i++;
		}
	}

	return same_count >= 2;
};

/**
 * @param {Uint8Array} arr
 */
const _gen = arr => {
	// first pass: i - 8, l - 11, o - 14
	let has_ilo = false;
	for (let i = 0; i < 8; i++) {
		if (arr[i] == 8 || arr[i] == 11 || arr[i] == 14) {
			has_ilo = true;
			arr[i]++;
			for (let j = i + 1; j < 8; j++) {
				arr[j] = 0;
			}
			break;
		}
	}
	if (has_ilo)
		return;

	let carry = 1;
	for (let i = 7; i >= 0; i--) {
		arr[i] += carry;
		carry = arr[i] == 26 ? 1 : 0;
		arr[i] %= 26;
		if (arr[i] == 8 || arr[i] == 11 || arr[i] == 14) {
			arr[i]++;
			break;
		}
		if (carry == 0) {
			break;
		}
	}
};

/**
 * @param {string} text
 * @returns {boolean}
 */
export const is_valid = text => {
	const arr = _text_to_uint8array(text);
	return _is_valid(arr);
};

/**
 * @param {string} text
 * @returns {string}
 */
export const gen_next = text => {
	const arr = _text_to_uint8array(text);
	do {
		_gen(arr);
	} while (!_is_valid(arr))
	return _uint8array_to_text(arr);
};

