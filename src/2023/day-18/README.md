There're three version of implementations for the `dig_cubes` in [lib.js](./lib.js):

1. `dig_cubes`: flood-fill on a grid, works for part 1 only.
2. `dig_cubes3`: shoelace + Pick's theorem.
3. `dig_cubes2`: offset-polygon method. I initially had only the shoelace hit, so I tracked corner offsets instead of centers. It computes the interior area (excluding the border) and the total area (including the border) and returns the larger value. Inspired by [Day 10: Pipe Maze](https://adventofcode.com/2023/day/10). Kept as a reference.

Links:

- Shoelace Theorem on [WikiPedia](https://en.wikipedia.org/wiki/Shoelace_formula) and [Art of Problem Solving](https://artofproblemsolving.com/wiki/index.php/Shoelace_Theorem)
- Pick's Theorem on [WikiPedia](https://en.wikipedia.org/wiki/Pick%27s_theorem) and [Art of Problem Solving](https://artofproblemsolving.com/wiki/index.php/Pick%27s_Theorem)
- Georg Alexander Pick on [WikiPedia](https://en.wikipedia.org/wiki/Georg_Alexander_Pick)
- Discussions on Reddit: [megathreads](https://old.reddit.com/18l0qtr), [about Pick's theorem](https://www.reddit.com/r/adventofcode/comments/18lg2we/2023_day_18_why_1_instead_of_1/) and [another alternative algorithm](https://www.reddit.com/r/adventofcode/comments/18l6tlj/2023_day_18_developed_my_own_algorithm/)
