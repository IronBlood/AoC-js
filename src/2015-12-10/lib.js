/**
 * @param {string} num
 * @returns {string}
 */
export const look_and_say = num => {
	let sb = "";
	let i = 0;
	while (i < num.length) {
		let j = i + 1;
		while (j < num.length && num[j] == num[i])
			j++;
		sb += `${j-i}${num[i]}`;
		i = j;
	}
	return sb;
};

