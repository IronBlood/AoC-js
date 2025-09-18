export class Pair {
	/**
	 * @param {Pair|number} left
	 * @param {Pair|number} right
	 * @param {Pair?} parent
	 */
	constructor(left, right, parent = null) {
		/** @type {Pair|number} */
		this.left = left;
		/** @type {Pair|number} */
		this.right = right;
		/** @type {Pair?} */
		this.parent = parent;

		if (left instanceof Pair)
			left.parent = this;
		if (right instanceof Pair)
			right.parent = this;
	}
}

/**
 * @param {string} str
 */
export const parse_snail = (str) => {
	let idx = 0;

	/** @returns {number|Pair} */
	const walk = () => {
		if (str[idx] === "[") {
			// skip "["
			idx++;

			const left = walk();

			// skip ","
			idx++;

			const right = walk();

			// skip "]"
			idx++;

			return new Pair(left, right);
		} else {
			let num = 0;
			while (/\d/.test(str[idx])) {
				num = num * 10 + (+str[idx++]);
			}
			return num;
		}
	};

	return walk();
};

/**
 * @param {Pair} root
 * @returns {boolean}
 */
const explode = (root) => {
	const leaves = [];
	/**
	 * @param {Pair|number} node
	 * @param {Pair?} parent
	 * @param {"left"|"right"|null} side
	 */
	const collect = (node, parent, side) => {
		if (node instanceof Pair) {
			collect(node.left, node, "left");
			collect(node.right, node, "right");
		} else {
			leaves.push({ parent, side });
		}
	};
	collect(root, null, null);

	let target = null;

	/**
	 * @param {Pair} node
	 * @param {number} depth
	 */
	const dfs = (node, depth) => {
		if (!(node instanceof Pair) || target)
			return;

		if (
			depth >= 4 &&
			typeof node.left === "number" &&
			typeof node.right === "number"
		) {
			target = node;
			return;
		}

		dfs(node.left, depth + 1);
		dfs(node.right, depth + 1);
	};
	dfs(root, 0);

	// nothing to explode
	if (!target)
		return false;

	const left_idx = leaves.findIndex(l => l.parent === target && l.side === "left");
	const right_idx = leaves.findIndex(l => l.parent === target && l.side === "right");

	if (left_idx > 0) {
		const nb = leaves[left_idx - 1];
		nb.parent[nb.side] += target.left;
	}
	if (right_idx < leaves.length - 1) {
		const nb = leaves[right_idx + 1];
		nb.parent[nb.side] += target.right;
	}

	const p = target.parent;
	if (!p)
		throw new Error("Can't explode the root pair");

	if (p.left === target)
		p.left = 0;
	else
		p.right = 0;

	return true;
};

/**
 * @param {Pair} root
 * @returns {boolean}
 */
const split = (root) => {
	let did_split = false;

	/**
	 * @param {Pair|number} node
	 * @param {Pair?} parent
	 * @param {"left"|"right"|null} side
	 */
	const dfs = (node, parent, side) => {
		if (did_split)
			return;

		if (node instanceof Pair) {
			dfs(node.left, node, "left");
			dfs(node.right, node, "right");
		} else if (typeof node === "number" && node >= 10) {
			const left_val = Math.floor(node / 2);
			const right_val = Math.ceil(node / 2);
			const new_pair = new Pair(left_val, right_val, parent);

			if (side === "left")
				parent.left = new_pair;
			else
				parent.right = new_pair;

			did_split = true;
		}
	};

	dfs(root, null, null);

	return did_split;
};

/**
 * @param {Pair} root
 */
const reduce = (root) => {
	while (explode(root) || split(root)) {
	}
};

/**
 * @param {Pair|number} a
 * @param {Pair|number} b
 */
const add = (a, b) => {
	const result = new Pair(a, b);

	a instanceof Pair || (a = result.left = new Pair(a, a, result));
	b instanceof Pair || (b = result.right = new Pair(b, b, result));

	a.parent = result;
	b.parent = result;

	reduce(result);
	return result;
};

/**
 * @param {Pair|number} node
 * @returns {number}
 */
const magnitude = (node) => {
	if (typeof node === "number")
		return node;
	return 3 * magnitude(node.left) + 2 * magnitude(node.right);
};

/**
 * @param {string} data
 */
export const final_sum = (data) => {
	const lines = data.split("\n").map(parse_snail);
	return magnitude(lines.reduce((acc, curr) => add(acc, curr)));
};

/**
 * @param {string} data
 */
export const max_sum = (data) => {
	let max = Number.MIN_SAFE_INTEGER;

	const lines = data.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const x = lines[i];
		for (let j = i; j < lines.length; j++) {
			const y = lines[j];
			max = Math.max(
				max,
				magnitude(add(parse_snail(x), parse_snail(y))),
				magnitude(add(parse_snail(y), parse_snail(x)))
			);
		}
	}

	return max;
};
