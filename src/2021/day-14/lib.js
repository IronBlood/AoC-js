/**
 * @param {string} data
 */
export const get_substraction = (data, steps = 10) => {
	const [template, insertions] = data.split("\n\n");

	/** @type {Map<string, string[]>} */
	const transforms = new Map();
	insertions.split("\n").forEach(line => {
		const [ab, c] = line.split(" -> ");
		const a = ab[0], b = ab[1];
		transforms.set(ab, [a+c, c+b]);
	});

	/** @type {Map<string, number>} */
	let segments = new Map();
	for (let i = 0; i < template.length - 1; i++) {
		const s = template.substring(i, i + 2);
		segments.set(s, (segments.get(s) || 0) + 1);
	}

	while (steps-- > 0) {
		/** @type {typeof segments} */
		let next_segments = new Map();

		for (const [seg, count] of segments) {
			const next = transforms.get(seg);
			if (!next) {
				next_segments.set(seg, count);
			} else {
				next.forEach(x => {
					next_segments.set(x, (next_segments.get(x) || 0) + count);
				});
			}
		}
		segments = next_segments;
	}

	/** @type {Record<string, number>} */
	const elements = Object.create(null);
	for (const [key, v] of segments) {
		[key[0], key[1]].forEach(x => {
			elements[x] = elements[x] || 0;
			elements[x] += v;
		});
	}

	// since every element in other places is counted twice
	[template[0], template[template.length-1]].forEach(x => {
		elements[x]++;
	});

	let min = Number.MAX_SAFE_INTEGER, max = 0;
	for (const v of Object.values(elements)) {
		min = Math.min(min, v);
		max = Math.max(max, v);
	}

	return (max - min) / 2;
};
