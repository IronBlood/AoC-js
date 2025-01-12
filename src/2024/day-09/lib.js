/**
 * @param {string} data
 */
export const compact_and_get_checksum1 = (data) => {
	let total_blocks = 0;
	for (let i = 0; i < data.length; i++) {
		total_blocks += +data[i];
	}
	/** @type {number[]} */
	const disk = Array(total_blocks).fill(-1);
	let id = 0;
	// Initialize disk array with file IDs
	for (let i = 0, idx = 0; i < data.length; i++) {
		const block_size = +data[i];
		if (i & 1) {
			idx += block_size;
		} else {
			for (let j = 0; j < block_size; j++) {
				disk[idx++] = id;
			}
			id++;
		}
	}

	let i = 0, j = disk.length - 1;
	while (i < j) {
		while (i < j && disk[i] != -1) i++;
		while (i < j && disk[j] == -1) j--;
		if (i < j) {
			disk[i++] = disk[j];
			disk[j--] = -1;
		}
	}

	return disk.reduce((checksum, block, index) => block === -1 ? checksum : checksum + block * index, 0);
};

/**
 * @param {string} data
 */
export const compact_and_get_checksum2 = data => {
	let total_blocks = 0;
	for (let i = 0; i < data.length; i++) {
		total_blocks += +data[i];
	}
	const disk = Array(total_blocks).fill(-1);
	let id = 0;

	/**
	 * @type {{ idx: number; block_size: number; }[]} array of starting idx and block size
	 */
	const free_blocks = [];
	/**
	 * @type {{ id: number; idx: number; block_size: number }[]} array of id, starting idx and block size
	 */
	const file_blocks = []

	for (let i = 0, idx = 0; i < data.length; i++) {
		const block_size = +data[i];
		if (i & 1) {
			if (block_size > 0) {
				free_blocks.push({
					idx,
					block_size,
				});
			}
			idx += block_size;
		} else {
			file_blocks.push( { id, idx, block_size });
			for (let j = 0; j < block_size; j++) {
				disk[idx++] = id;
			}
			id++;
		}
	}

	for (let i = file_blocks.length - 1; i >= 0; i--) {
		const file = file_blocks[i];
		for (let j = 0; j < free_blocks.length; j++) {
			const free = free_blocks[j];
			if (free.block_size >= file.block_size && free.idx < file.idx) {
				for (let i = 0; i < file.block_size; i++) {
					disk[free.idx + i] = file.id;
					disk[file.idx + i] = -1;
				}

				free.idx += file.block_size;
				free.block_size -= file.block_size;
				if (free.block_size === 0) {
					free_blocks.splice(j, 1);
				}
				break;
			}
		}
	}

	return disk.reduce((checksum, block, index) => block === -1 ? checksum : checksum + block * index, 0);
};

