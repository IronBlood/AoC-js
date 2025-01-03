/**
 * @param {string} data
 * @param {string} targeting
 */
export const find_aunt_sue = (data, targeting, part = 1) => {
	const lines = data.split("\n");
	/** @type {Map<string, number>} */
	const map = new Map();
	targeting.split("\n").forEach(item => {
		const [id, num] = item.split(": ");
		map.set(id, +num);
	});

	const candidate = [];
	const regex = /^Sue (\d+): (.+)$/;
	for (let line of lines) {
		const match = line.match(regex);
		const id = +match[1];
		const attr = match[2]
			.split(", ")
			.map(seg => seg.split(": "))
			.reduce((obj, [key, value]) => {
				obj[key] = +value;
				return obj;
			}, {});
		let found = true;
		for (let key of Object.keys(attr)) {
			if (part === 1) {
				if (map.has(key) && map.get(key) !== attr[key]) {
					found = false;
					break;
				}
			} else {
				if (map.has(key)) {
					const value = map.get(key);
					if (key == "cats" || key == "trees") {
						if (attr[key] <= value) {
							found = false;
							break;
						}
					} else if (key == "pomeranians" || key == "goldfish") {
						if (attr[key] >= value) {
							found = false;
							break;
						}
					} else if (attr[key] != value) {
						found = false;
						break;
					}
				}
			}
		}
		if (found) {
			candidate.push({ id, attr });
		}
	}
	return candidate.length === 1 ? candidate[0].id : null;
};

