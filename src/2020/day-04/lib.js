/**
 * @param {string} seg
 */
const check = (seg) => {
	const res = [
		"byr:",
		"iyr:",
		"eyr:",
		"hgt:",
		"hcl:",
		"ecl:",
		"pid:",
	].every(field => seg.indexOf(field) >= 0);

	return res ? 1 : 0;
};

/**
 * @param {string} seg
 */
const check_2 = (seg) => {
	const items = seg.split("\n").map(lines => lines.split(" ")).flat().map(line => line.split(":"));

	const re_year = /^\d{4}$/;

	let passed_checks = 0;
	for (const [k, v] of items) {
		if (k === "byr") {
			if (!re_year.test(v))
				return 0;

			const year = +v;
			if (year < 1920 || year > 2002)
				return 0;

			passed_checks++;
			continue;
		}

		if (k === "iyr") {
			if (!re_year.test(v))
				return 0;

			const year = +v;
			if (year < 2010 || year > 2020)
				return 0;

			passed_checks++;
			continue;
		}

		if (k === "eyr") {
			if (!re_year.test(v))
				return 0;

			const year = +v;
			if (year < 2020 || year > 2030)
				return 0;

			passed_checks++;
			continue;
		}

		if (k === "hgt") {
			const len = v.length,
				num = v.slice(0, len - 2),
				unit = v.slice(len - 2);
			if (unit === "cm") {
				if (!/^\d{3}$/.test(num))
					return 0;
				const height = +num;
				if (height < 150 || height > 193)
					return 0;
			} else if (unit === "in") {
				if (!/^\d{2}$/.test(num))
					return 0;
				const height = +num;
				if (height < 59 || height > 76)
					return 0;
			} else {
				return 0;
			}

			passed_checks++;
			continue;
		}

		if (k === "hcl") {
			if (!/^#[0-9a-f]{6}$/.test(v))
				return 0;

			passed_checks++;
			continue;
		}

		if (k === "ecl") {
			if (![
				"amb",
				"blu",
				"brn",
				"gry",
				"grn",
				"hzl",
				"oth",
			].includes(v))
				return 0;

			passed_checks++;
			continue;
		}

		if (k === "pid") {
			if (!/^[0-9]{9}$/.test(v))
				return 0;

			passed_checks++;
			continue;
		}
	}

	return passed_checks === 7 ? 1 : 0;
};

/**
 * @param {string} data
 */
export const count_passports = (data, part = 1) => {
	const fn = part === 1 ? check : check_2;
	return data.split("\n\n").reduce((sum, seg) => sum + fn(seg), 0);
};
