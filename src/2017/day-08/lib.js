/**
 * @param {Record<string, number>} mem
 * @param {string} key
 */
const get_val = (mem, key) => {
	return mem[key] || (mem[key] = 0);
};

/**
 * @param {string} data
 */
export const exec = (data, part = 1) => {
	/** @type {Record<string, number>} */
	const mem = {};

	let max = 0;
	data.split("\n").forEach(line => {
		const [ins, cond] = line.split(" if ");
		const [t, opcode, str_oprand] = ins.split(" ");
		const [s, cmp, str_cmp] = cond.split(" ");

		// initialize
		get_val(mem, t);
		const src_val = get_val(mem, s);

		let evaluated_cond = false;
		const val_cmp = +str_cmp;
		const val_oprand = +str_oprand;
		switch (cmp) {
			case ">": evaluated_cond = (src_val > val_cmp); break;
			case "<": evaluated_cond = (src_val < val_cmp); break;
			case ">=": evaluated_cond = (src_val >= val_cmp); break;
			case "<=": evaluated_cond = (src_val <= val_cmp); break;
			case "==": evaluated_cond = (src_val == val_cmp); break;
			case "!=": evaluated_cond = (src_val != val_cmp); break;
		}
		if (evaluated_cond) {
			switch (opcode) {
				case "inc": mem[t] += val_oprand; break;
				case "dec": mem[t] -= val_oprand; break;
			}
			max = Math.max(max, mem[t]);
		}
	});

	return part === 1
		? Math.max(...Object.values(mem))
		: max;
}

