/**
 * @param {string} data
 */
export const get_pos = (data) => {
	let x = 0, y = 0;
	data.split("\n").forEach(line => {
		const [cmd, str_num] = line.split(" ");
		const num = +str_num;
		switch (cmd) {
			case "forward": y += num; break;
			case "up": x -= num; break;
			case "down": x += num; break;
		}
	});
	return x * y;
};

/**
 * @param {string} data
 */
export const get_pos2 = (data) => {
	let x = 0, y = 0, aim = 0;
	data.split("\n").forEach(line => {
		const [cmd, str_num] = line.split(" ");
		const num = +str_num;
		switch (cmd) {
			case "forward": y += num; x += num * aim; break;
			case "up": aim -= num; break;
			case "down": aim += num; break;
		}
	});
	return x * y;
};
