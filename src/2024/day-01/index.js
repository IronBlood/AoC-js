import { total_distance, total_similarity } from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const arr1 = [], arr2 = [];
	for (const line of content.split("\n")) {
		if (line && line.length > 0) {
			const arr = line.split("   ");
			if (arr.length != 2) {
				break;
			}

			arr1.push(+arr[0]);
			arr2.push(+arr[1]);
		}
	}

	console.log(total_distance(arr1, arr2));
	console.log(total_similarity(arr1, arr2));
}
