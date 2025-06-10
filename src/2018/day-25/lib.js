/**
 * @param {number[]} a
 * @param {number[]} b
 */
const manhattan_distance = (a, b) => {
	let d = 0;
	for (let i = 0, len = a.length; i < len; i++) {
		d += Math.abs(a[i] - b[i]);
	}
	return d;
};

/**
 * @param {string} data
 */
export const count_constellations = (data) => {
	const arr = data.split("\n").map(line => line.split(",").map(Number));
	const length = arr.length;

	/** @type {number[][]} */
	const adj = Array.from({ length }, () => []);
	for (let i = 0; i < length - 1; i++) {
		for (let j = i + 1; j < length; j++) {
			if (manhattan_distance(arr[i], arr[j]) <= 3) {
				adj[i].push(j);
				adj[j].push(i);
			}
		}
	}

	/** @type {(0|1)[]} */
	const visited = Array(length).fill(0);
	let count = 0;
	let queue;
	for (let i = 0; i < length; i++) {
		if (visited[i])
			continue;

		count++;

		queue = [i];
		while (queue.length) {
			const next_queue = [];
			for (let x of queue) {
				if (visited[x])
					continue;

				visited[x] = 1;
				next_queue.push(...adj[x]);
			}
			queue = next_queue;
		}
	}

	return count;
};
