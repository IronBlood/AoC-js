# AoC-js

[![Coverage Status](https://coveralls.io/repos/github/IronBlood/AoC-js/badge.svg?branch=main)](https://coveralls.io/github/IronBlood/AoC-js?branch=main)

## How to Use

I use [`pnpm`](https://pnpm.io/). Other package managers like `npm` or `yarn` should work as well.

Here're the dependencies that will be installed when running `pnpm i`:

- [canvas](https://www.npmjs.com/package/canvas): sometimes it's easier to generate a graph and then solve the puzzle manually then fully implement an algorithm.
- [dotenv](https://www.npmjs.com/package/dotenv): save my cookie from https://adventofcode.com/ so that I can fetch and save inputs.
- [@datastructures-js/priority-queue](https://www.npmjs.com/package/@datastructures-js/priority-queue): an implementation of `PriorityQueue` and other useful data structures, used with Dijkstra and A-star algorithms.
- [jest](https://www.npmjs.com/package/jest): a testing framework, the unit tests are generated from descriptions of each day.

> `canvas` needs pre-built binaries. `pnpm approve-builds` is needed after the installation of `canvas`.

To run a unit test for a day, e.g. Dec 1, 2015:

```bash
pnpm test src/2015/day-01
```

To run a solution for a day, the `input.txt` file should be placed in the same folder of the implementation, e.g. `src/2015/day-01/input.txt`, then run the following command:

```bash
node index.js 2015-01
```

If you've set your cookie in `.env` as well, you can also run:

```bash
node index.js 2015-01 s
```

to fetch and save the input automatically. Checkout [`index.js`](./src/index.js] for details.

At the moment there're three puzzles related to MD5 hashing but requires a bit long time to finish running:

- [2015 Day 4: The Ideal Stocking Stuffer](https://adventofcode.com/2015/day/4)
- [2016 Day 5: How About a Nice Game of Chess?](https://adventofcode.com/2016/day/5)
- [2016 Day 14: One-Time Pad](https://adventofcode.com/2016/day/14)

To skip unit tests of them when running all tests of a year or even the full project, set the environment variable `SKIP_MD5` like this:

```bash
SKIP_MD5=1 pnpm test src/2015
```

## My Other Translations

I also used AoC to explore other languages:

- [AoC-lua](https://github.com/IronBlood/AoC-lua): only contains solutions for 2015. The purpose was to learn Lua.
- [AoC-java](https://github.com/IronBlood/AoC-java): only contains solutions for 2016 (WIP). The project was to try out new features from Java 8 and later versions.
