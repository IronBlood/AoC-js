class Directory {
	/**
	 * @param {string} name
	 * @param {Directory?} parent
	 */
	constructor(name, parent) {
		/** @type {string} */
		this.name = name;
		/** @type {Directory?} */
		this.parent = parent;

		/** @type {Directory[]} */
		this.subdirectories = [];
		/** @type {File[]} */
		this.files = [];

		/** @type {number} -1 means unsolved */
		this.size = -1;
	}
}

class File {
	/**
	 * @param {string} name
	 * @param {Directory} parent
	 * @param {number} size
	 */
	constructor(name, parent, size) {
		/** @type {string} name */
		this.name = name;
		/** @type {Directory} */
		this.parent = parent;
		/** @type {number} */
		this.size = size;
	}
}

/**
 * @param {string[]} lines
 */
const build_dir_tree = (lines) => {
	/** @type {Map<string, Directory>} */
	const map = new Map();

	/** @type {Directory?} */
	let current_working_directory = null;

	let line_idx = 0;
	const lines_len = lines.length;

	/**
	 * @param {string} name
	 */
	const mkdir = (name) => {
		const path = current_working_directory
			? (current_working_directory.name === "/"
				? `/${name}`
				: `${current_working_directory.name}/${name}`
			)
			: name;

		if (!map.has(path)) {
			const dir = new Directory(path, current_working_directory);
			map.set(path, dir);

			if (current_working_directory) {
				current_working_directory.subdirectories.push(dir);
			}
		}

		return path;
	};

	/**
	 * @param {string} name
	 * @param {number} size
	 */
	const mkfile = (name, size) => {
		const file = new File(name, current_working_directory, size);
		current_working_directory.files.push(file);
	};

	/**
	 * @param {string} cmd
	 */
	const change_working_directory = (cmd) => {
		const name = /^\$ cd (.*)$/.exec(cmd)[1];
		if (name === "..") {
			current_working_directory = current_working_directory.parent;
			return;
		}

		const path = mkdir(name);

		current_working_directory = map.get(path);
		if (!current_working_directory) {
			throw new Error(`failed to create Directory`);
		}
	};

	const read_dir = () => {
		let line;
		while (line_idx < lines_len && !(line = lines[line_idx]).startsWith("$")) {
			line_idx++;
			if (line.startsWith("dir ")) {
				const name = line.substring(4);
				const path = mkdir(name);
			} else {
				const [str_size, name] = line.split(" ");
				const size = +str_size;

				mkfile(name, size);
			}
		}
	};

	while (line_idx < lines_len) {
		const line = lines[line_idx++];
		if (line.startsWith("$ cd")) {
			change_working_directory(line);
		} else if (line === "$ ls") {
			read_dir();
		} else {
			throw new Error(`shouldn't handle line ${line} here`);
		}
	}

	return map;
};

/**
 * @param {Directory?} dir
 */
const resolve_dir_size = (dir) => {
	if (!dir) {
		return 0;
	}

	if (dir.size < 0) {
		dir.size = 0
			+ dir.files.reduce((sum, curr) => sum + curr.size, 0)
			+ dir.subdirectories.reduce((sum, curr) => sum + resolve_dir_size(curr), 0);
	}

	return dir.size;
};

/**
 * @param {string} data
 */
export const sum_dir = (data) => {
	const dirs = build_dir_tree(data.split("\n"));
	const root = dirs.get("/");
	if (!root) {
		throw new Error("root not found");
	}

	resolve_dir_size(root);

	let sum = 0;
	for (const dir of dirs.values()) {
		if (dir.size === -1) {
			throw new Error(`dir ${dir.name} hasn't been resolved`);
		}
		if (dir.size <= 100_000) {
			sum += dir.size;
		}
	}
	return sum;
};

/**
 * @param {string} data
 */
export const find_dir_to_delete = (data) => {
	const dirs = build_dir_tree(data.split("\n"));
	const root = dirs.get("/");
	if (!root) {
		throw new Error("root not found");
	}

	resolve_dir_size(root);

	const used_size = root.size;
	const free_size = 70_000_000 - used_size;
	const target = 30_000_000 - free_size;

	let min = Number.MAX_SAFE_INTEGER;
	for (const dir of dirs.values()) {
		if (dir.size >= target) {
			min = Math.min(min, dir.size);
		}
	}
	return min;
};
