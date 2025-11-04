import {
	disk_checksum,
	disk_checksum2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const runtime_comparison_enabled = !!process.env.ENABLE_RUNTIME_COMPARISON;
	if (runtime_comparison_enabled) {
		console.time("part 1 old");
		console.log(disk_checksum(content, 272));
		console.timeEnd("part 1 old");
		console.time("part 1 new");
		console.log(disk_checksum2(content, 272));
		console.timeEnd("part 1 new");

		console.time("part 2 old");
		console.log(disk_checksum(content, 35651584));
		console.timeEnd("part 2 old");
		console.time("part 2 new");
		console.log(disk_checksum2(content, 35651584));
		console.timeEnd("part 2 new");
	} else {
		console.log(disk_checksum2(content, 272));
		console.log(disk_checksum2(content, 35651584));
	}
}
