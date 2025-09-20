// @ts-check

/**
 * @param {string} line
 * @returns {number[]}
 */
// @ts-ignore
const parse_seeds = (line) => line.match(/\d+/g)?.map(Number);

/**
 * @param {string} section
 */
const _parse_mapper = (section) => {
	const lines = section.split("\n").slice(1);

	const mapper = lines.map(line => {
		const [dst, src, len] = line.split(" ").map(Number);
		const start = src;
		const end = src + len;
		return {
			start,
			end,
			fn: (x) => x + dst - src,
		};
	});

	return mapper;
};

/**
 * @param {string} section
 */
const apply_mapper1 = (section) => {
	const mapper = _parse_mapper(section);
	mapper.sort((a, b) => a.start - b.start);

	/**
	 * @param {number} x
	 */
	return (x) => {
		for (const m of mapper) {
			if (x >= m.start && x < m.end) {
				return m.fn(x);
			}
		}
		return x;
	};
};

/**
 * @param {string} section
 */
const apply_mapper2 = (section, ranges) => {
	const mapper = _parse_mapper(section);
	mapper.sort((a, b) => a.start - b.start);

	/**
	 * @param {[number, number][]} ranges
	 * @returns {[number, number][]}
	 */
	return (ranges) => {
		/** @type {[number, number][]} */
		const transformed_ranges = [];

		while (ranges.length > 0) {
			const [range_start, range_len] = ranges[ranges.length - 1];
			ranges.length--;
			const range_end = range_start + range_len;

			// case 1: fully included
			let applied = false;
			for (const m of mapper) {
				if (range_start >= m.start && range_end <= m.end) {
					applied = true;
					transformed_ranges.push([m.fn(range_start), range_len]);
					break;
				}
			}
			if (applied) {
				continue;
			}

			// case 2: partially included
			applied = false;
			for (const m of mapper) {
				if (range_start >= m.start && range_start < m.end) {
					applied = true;
					transformed_ranges.push([m.fn(range_start), m.end - range_start]);
					ranges.push([m.end, range_end - m.end]);
					break;
				}

				if (range_end > m.start && range_end <= m.end) {
					applied = true;
					transformed_ranges.push([m.fn(m.start), range_end - m.start]);
					ranges.push([range_start, m.start - range_start]);
					break;
				}
			}
			if (applied) {
				continue;
			}

			// case 3: mapper fully included in ranges
			applied = false;
			for (const m of mapper) {
				if (range_start <= m.start && m.end <= range_end) {
					applied = true;
					transformed_ranges.push([m.fn(m.start), m.end - m.start]);
					ranges.push([range_start, m.start - range_start]);
					ranges.push([m.end, range_end - m.end]);
					break;
				}
			}

			// case 4: otherwise, no mapper matches
			if (!applied) {
				transformed_ranges.push([range_start, range_len]);
			}
		}

		return transformed_ranges;
	};
};

/**
 * @param {string} data
 */
export const lowest_location = (data, part = 1) => {
	const sections = data.split("\n\n");

	const seeds = parse_seeds(sections[0]);

	let lowest = Number.MAX_SAFE_INTEGER;

	if (part === 1) {
		const mappers = sections.slice(1).map(apply_mapper1);
		for (let s of seeds) {
			for (let mapper of mappers) {
				s = mapper(s);
			}
			lowest = Math.min(lowest, s);
		}
	} else {
		const mappers = sections.slice(1).map(apply_mapper2);
		/** @type {[number, number][]} */
		let ranges = [];
		for (let i = 0; i < seeds.length; i += 2) {
			ranges.push([seeds[i], seeds[i + 1]]);
		}
		for (let mapper of mappers) {
			ranges = mapper(ranges);
		}
		for (let [range_start] of ranges) {
			lowest = Math.min(lowest, range_start);
		}
	}
	return lowest;
};
