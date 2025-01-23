/**
 * @param {string} data
 */
export const correct_order = (data) => {
	let id = 0;

	/** @type {Map<string, number>} */
	const map_letter_to_id = new Map();
	/** @type {Map<number, string>} */
	const map_id_to_letter = new Map();

	const letters = data.split("\n").map(line => {
		const arr = line.split(" ");
		return [arr[1], arr[7]];
	});

	letters.forEach(pairs => {
		pairs.forEach(s => {
			if (!map_letter_to_id.has(s)) {
				map_letter_to_id.set(s, id);
				map_id_to_letter.set(id, s);
				id++;
			}
		});
	});

	/** @type {number} */
	let flags = Array(id).fill(0);
	letters.forEach(pairs => {
		const [from, to] = pairs.map(x => map_letter_to_id.get(x));
		flags[to] |= 1 << from;
	});

	const order = [];
	let candidates = [];

	const helper_c = (x) => map_id_to_letter.get(x).charCodeAt(0);

	// TODO refactor
	while (order.length !== id) {
		candidates.length = 0;
		for (let i = 0; i < id; i++) {
			if (flags[i] === 0 && !order.includes(i)) {
				candidates.push(i);
			}
		}

		candidates.sort((a, b) => helper_c(a) - helper_c(b));

		let x = candidates[0];
		order.push(x);
		const flag = 1 << x;
		for (let i = 0; i < id; i++) {
			if (flags[i] & flag) {
				flags[i] &= ~flag;
			}
		}
	}

	return order.map(x => map_id_to_letter.get(x)).join("");
};

/**
 * @param {string} data
 * @param {number} worker
 * @param {number} extra_duration
 * @returns {number}
 */
export const count_seconds = (data, worker, extra_duration) => {
	let id = 0;

	/** @type {Map<string, number>} */
	const map_letter_to_id = new Map();
	/** @type {Map<number, string>} */
	const map_id_to_letter = new Map();

	const letters = data.split("\n").map(line => {
		const arr = line.split(" ");
		return [arr[1], arr[7]];
	});

	letters.forEach(pairs => {
		pairs.forEach(s => {
			if (!map_letter_to_id.has(s)) {
				map_letter_to_id.set(s, id);
				map_id_to_letter.set(id, s);
				id++;
			}
		});
	});

	/** @type {number} */
	let flags = Array(id).fill(0);
	letters.forEach(pairs => {
		const [from, to] = pairs.map(x => map_letter_to_id.get(x));
		flags[to] |= 1 << from;
	});

	const order = [];

	/** @type {{id: number; char: string}[]} */
	let candidates = [];

	/** @type {(null|{duration: number; letter: string; id: number})[]} */
	let threads = Array(worker).fill(null);

	let elapsed = 0; // seconds

	/**
	 * @param {number} id
	 */
	const in_queue = (id) => {
		for (let w of threads) {
			if (w?.id === id)
				return true;
		}
		return false;
	};

	while (true) {
		// check status
		let available_thread = 0;
		for (let i = 0; i < worker; i++) {
			let thread = threads[i];
			if (thread === null) {
				available_thread++;
				continue;
			}

			if (thread.duration === 1) {
				order.push(thread.id);
				const flag = 1 << thread.id;
				for (let j = 0; j < id; j++) {
					if (flags[j] & flag) {
						flags[j] &= ~flag;
					}
				}
				threads[i] = null;
				available_thread++;
			} else {
				thread.duration--;
			}
		}

		if (order.length === id) {
			break;
		}

		// clean up for each second
		candidates.length = 0;

		// get available tasks
		if (available_thread > 0) {
			for (let i = 0; i < id; i++) {
				if (flags[i] === 0 && !order.includes(i) && !in_queue(i)) {
					candidates.push({id: i, char: map_id_to_letter.get(i)});
				}
			}

			candidates.sort((a, b) => a.char.charCodeAt(0) - b.char.charCodeAt(0));

			for (let i = 0, k = 0; i < worker && k < Math.min(available_thread, candidates.length); i++) {
				if (threads[i] !== null)
					continue;
				threads[i] = {
					letter: candidates[k].char,
					id: candidates[k].id,
					duration: candidates[k].char.charCodeAt(0) - 64 + extra_duration,
				}
				k++;
			}
		}

		elapsed++;
	}

	return elapsed;
};

