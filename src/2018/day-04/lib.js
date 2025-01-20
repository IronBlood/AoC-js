/**
 * @param {string} data
 */
export const get_most_asleep = (data, part = 1) => {
	const logs = data.split("\n").map(line => {
		const arr = line.split("] ");
		const time_txt  = arr[0].substring(1);
		const time_date = new Date(time_txt);

		const obj = {
			time_txt,
			time_date,
			asleep: -1,
			id: -1,
		};

		if (arr[1] === "wakes up") {
			obj.asleep = 0;
		} else if (arr[1] === "falls asleep") {
			obj.asleep = 1;
		} else {
			obj.id = +arr[1].split(" ")[1].substring(1);
		}

		return obj;
	});

	logs.sort((a, b) => a.time_date.getTime() - b.time_date.getTime());


	let curr_id = -1, /** @type {number[]} */curr_freq = [], longest = { id: -1, duration: -1 }, ptr = 0;
	/** @type {Map<number, number[]>} */
	let freq_map = new Map();
	/** @type {Map<number, number>} */
	let durations = new Map();

	while (ptr < logs.length) {
		if (logs[ptr].id != -1) {
			curr_id = logs[ptr].id;
			if (!freq_map.has(curr_id)) {
				curr_freq = Array(60).fill(0);
				freq_map.set(curr_id, curr_freq);
			} else {
				curr_freq = freq_map.get(curr_id);
			}
			ptr += 1;
			continue;
		}

		// handle duration
		const start = logs[ptr].time_date.getTime(), end = logs[ptr+1].time_date.getTime();
		const duration = (durations.get(curr_id) || 0) + ((end - start) / 60_000);
		durations.set(curr_id, duration);
		if (duration > longest.duration) {
			longest.duration = duration;
			longest.id = curr_id;
		}

		const [start_min, end_min] = [
			logs[ptr],
			logs[ptr+1],
		].map(x => Number(x.time_txt.split("00:")[1]));
		for (let i = start_min; i < end_min; i++) {
			curr_freq[i]++;
		}

		ptr += 2;
	}

	if (part === 1) {
		const freq = freq_map.get(longest.id);
		let max = -1, max_min = -1;
		for (let i = 0; i < freq.length; i++) {
			if (freq[i] > max) {
				max = freq[i];
				max_min = i;
			}
		}

		return max_min * longest.id;
	} else {
		let gid = -1, most = -1, min = -1;
		for (let [id, freq] of freq_map) {
			for (let i = 0; i < freq.length; i++) {
				if (freq[i] > most) {
					most = freq[i];
					min = i;
					gid = id;
				}
			}
		}
		return gid * min;
	}
};

