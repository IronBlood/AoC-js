import {
	rotate_left,
} from "../../lib/array.js";

/**
 * @param {string} data
 * @param {string} input
 * @returns {string}
 */
export const scramble = (data, input) => {
	let arr = input.split("");
	const instructions = data.split("\n");

	instructions.forEach(ins => {
		const cmd = ins.split(" ");
		if (ins.startsWith("swap position")) {
			let x = +cmd[2], y = +cmd[5];
			const tmp = arr[x];
			arr[x] = arr[y];
			arr[y] = tmp;
		} else if (ins.startsWith("swap letter")) {
			let x = arr.indexOf(cmd[2]), y = arr.indexOf(cmd[5]);
			arr[x] = cmd[5];
			arr[y] = cmd[2];
		} else if (cmd[0] === "rotate") {
			if (cmd[1] === "left" || cmd[1] === "right") {
				let x = +cmd[2];
				x %= arr.length;
				if (cmd[1] === "right")
					x = arr.length - x;
				rotate_left(arr, x);
			} else {
				let idx = arr.indexOf(cmd[cmd.length - 1]);
				let count = 1 + idx + (idx >= 4 ? 1 : 0);
				count %= arr.length;
				count = arr.length - count;
				rotate_left(arr, count);
			}
		} else if (ins.startsWith("reverse")) {
			let x = +cmd[2], y = +cmd[4];
			arr = [...arr.slice(0, x), ...arr.slice(x, y+1).reverse(), ...arr.slice(y+1)];
		} else if (ins.startsWith("move")) {
			let x = +cmd[2], y = +cmd[5];
			if (x === y)
				return;
			let tmp = arr[x];
			arr.splice(x, 1);
			arr.splice(y, 0, tmp);
		}
	});

	return arr.join("");
};

/**
 * @param {string} data
 * @param {string} input
 * @returns {string}
 */
export const unscramble = (data, input) => {
	let arr = input.split("");
	const instructions = data.split("\n").reverse();

	instructions.forEach(ins => {
		const cmd = ins.split(" ");
		if (ins.startsWith("move")) {
			let x = +cmd[2], y = +cmd[5];
			if (x === y)
				return;
			let tmp = arr[y];
			arr.splice(y, 1);
			arr.splice(x, 0, tmp);
		} else if (ins.startsWith("reverse")) {
			let x = +cmd[2], y = +cmd[4];
			arr = [...arr.slice(0, x), ...arr.slice(x, y+1).reverse(), ...arr.slice(y+1)];
		} else if (cmd[0] === "rotate") {
			if (cmd[1] === "left" || cmd[1] === "right") {
				let x = +cmd[2];
				x %= arr.length;
				if (cmd[1] === "left")
					x = arr.length - x;
				rotate_left(arr, x);
			} else {
				const char = cmd[cmd.length - 1];
				const str = arr.join("");
				const dup = arr.slice();
				for (let i = 0; i < arr.length; i++) {
					rotate_left(dup, 1);
					let idx = dup.indexOf(char);
					let count = (1 + idx + (idx >= 4 ? 1 : 0)) % arr.length;
					count = arr.length - count;
					const tmp = dup.slice();
					rotate_left(tmp, count);
					if (tmp.join("") === str) {
						arr = dup;
						break;
					}
				}
			}
		} else if (ins.startsWith("swap letter")) {
			let x = arr.indexOf(cmd[2]), y = arr.indexOf(cmd[5]);
			arr[x] = cmd[5];
			arr[y] = cmd[2];
		} else if (ins.startsWith("swap position")) {
			let x = +cmd[2], y = +cmd[5];
			const tmp = arr[x];
			arr[x] = arr[y];
			arr[y] = tmp;
		}
	});

	return arr.join("");
};

