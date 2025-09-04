class Range {
	/**
	 *
	 * @param {string} setting format "min-max"
	 */
	constructor(setting) {
		const [min, max] = setting.split('-').map(Number);
		this.min = min;
		this.max = max;
	}

	check(value) {
		return value >= this.min && value <= this.max;
	}
}

/**
 *
 * @param {string} data
 * @returns
 */
const build_ranges = (data) => {
	const ranges = [];
	const lines = data.split('\n');
	for (const line of lines) {
		const re = /\d+-\d+/g;
		let match;
		while ((match = re.exec(line)) !== null) {
			ranges.push(new Range(match[0]));
		}
	}
	return ranges;
};

/**
 *
 * @param {string} data
 */
export const get_error_rate = (data) => {
	const segments = data.split('\n\n');

	const ranges = build_ranges(segments[0]);

	const tickets = segments[2].split('\n').slice(1).map(line => line.split(',').map(Number));
	let errorRate = 0;
	for (const ticket of tickets) {
		for (const value of ticket) {
			if (!ranges.some(range => range.check(value))) {
				errorRate += value;
			}
		}
	}
	return errorRate;
};

class Range2 {
	/**
	 *
	 * @param {string} name
	 * @param {string[]} settings format ["min-max", "min-max"]
	 */
	constructor(name, settings) {
		this.name = name;
		this.ranges = settings.map(setting => {
			const [min, max] = setting.split('-').map(Number);
			return { min, max };
		});
	}

	check(value) {
		return this.ranges.some(range => value >= range.min && value <= range.max);
	}
}

const build_ranges2 = (data) => {
	const ranges = [];
	const lines = data.split('\n');
	for (const line of lines) {
		const re = /^([a-z\s]+):\s*(\d+-\d+)\s*or\s*(\d+-\d+)/;
		const match = re.exec(line);
		if (match) {
			const name = match[1];
			const settings = [match[2], match[3]];
			ranges.push(new Range2(name, settings));
		}
	}
	return ranges;
};

/**
 *
 * @param {string} data
 */
export const check_my_ticket = (data) => {
	const segments = data.split('\n\n');

	const ranges = build_ranges2(segments[0]);

	const valid_tickets = segments[2]
		.split('\n')
		.slice(1)
		.map(line => line.split(',').map(Number))
		.filter(ticket =>
			ticket.every(value => ranges.some(range => range.check(value)))
		);

	const col_len = valid_tickets[0].length;
	/** @type {string[][]} */
	const columns = Array.from({ length: col_len }, () => []);
	for (let col = 0; col < col_len; col++) {
		for (const range of ranges) {
			let valid = true;
			for (let i = 0; i < valid_tickets.length; i++) {
				if (!range.check(valid_tickets[i][col])) {
					valid = false;
					break;
				}
			}
			if (valid) {
				columns[col].push(range.name);
			}
		}
	}

	/** @type {Map<number, string>} */
	const confirmed_map = new Map();

	const sorted_columns = columns.map((names, idx) => ({ names, idx })).sort((a, b) => (a.names.length - b.names.length));
	for (let i = 0; i < sorted_columns.length; i++) {
		const { names, idx } = sorted_columns[i];
		if (names.length === 1) {
			const name = names[0];
			confirmed_map.set(idx, name);
			for (let j = i + 1; j < sorted_columns.length; j++) {
				sorted_columns[j].names = sorted_columns[j].names.filter(n => n !== name);
			}
		}
	}

	const my_ticket = segments[1].split('\n')[1].split(',').map(Number);
	let res = 1;
	for (let i = 0; i < my_ticket.length; i++) {
		const name = confirmed_map.get(i);
		if (name && name.startsWith('departure')) {
			res *= my_ticket[i];
		}
	}
	return res;
};
