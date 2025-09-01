import {
	count_triangles,
	count_triangles_by_column,
} from "./lib.js";

export function main(content) {
	console.log(count_triangles(content));
	console.log(count_triangles_by_column(content));
}
