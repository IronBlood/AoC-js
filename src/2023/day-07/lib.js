// @ts-check

/**
 * @readonly
 * @enum {number}
 */
const HandType = {
	INVALID: -1,
	HIGH_CARD: 0,
	ONE_PAIR: 1,
	TWO_PAIR: 2,
	THREE_OF_A_KIND: 3,
	FULL_HOUSE: 4,
	FOUR_OF_A_KIND: 5,
	FIVE_OF_A_KIND: 6,
};

const CARD1 = "23456789TJQKA";
const CARD2 = "J23456789TQKA";

const EMPTY_HAND = Object.fromEntries(CARD1.split("").map(key => [key, 0]));

/**
 * @param {string} line
 */
const parse_card = (line, part = 1) => {
	const [card, num] = line.split(" ");
	const bid = +num;
	const hand = Object.assign({}, EMPTY_HAND);
	for (let i = 0; i < card.length; i++) {
		hand[card[i]]++;
	}

	const entries = Object.entries(hand).filter(x => x[1] > 0);

	let type = HandType.INVALID;
	switch (entries.length) {
		case 5:
			type = HandType.HIGH_CARD;
			break;
		case 4:
			type = HandType.ONE_PAIR;
			break;
		case 3:
			type = entries.some(x => x[1] === 2)
				? HandType.TWO_PAIR
				: HandType.THREE_OF_A_KIND;
			break;
		case 2:
			type = entries.some(x => x[1] === 2)
				? HandType.FULL_HOUSE
				: HandType.FOUR_OF_A_KIND;
			break;
		case 1:
			type = HandType.FIVE_OF_A_KIND;
			break;
	}

	if (part === 2 && hand["J"] > 0) {
		switch (type) {
			case HandType.HIGH_CARD:
				type = HandType.ONE_PAIR;
				break;
			case HandType.ONE_PAIR:
				type = HandType.THREE_OF_A_KIND;
				break;
			case HandType.TWO_PAIR:
				type = hand["J"] === 1
					? HandType.FULL_HOUSE
					: HandType.FOUR_OF_A_KIND;
				break;
			case HandType.FULL_HOUSE:
				type = HandType.FIVE_OF_A_KIND;
				break;
			case HandType.THREE_OF_A_KIND:
				type = HandType.FOUR_OF_A_KIND;
				break;
			case HandType.FOUR_OF_A_KIND:
				type = HandType.FIVE_OF_A_KIND;
				break;
		}
	}

	return {
		type,
		bid,
		card,
	}
};

/**
 * @param {string} a
 * @param {string} b
 */
const cmp_card = (a, b, part = 1) => {
	const CARD = part === 1 ? CARD1 : CARD2;

	for (let i = 0; i < 5; i++) {
		const idx_a = CARD.indexOf(a[i]), idx_b = CARD.indexOf(b[i]);
		if (idx_a === idx_b)
			continue;
		return idx_a - idx_b;
	}

	return 0;
};

/**
 * @param {string} data
 */
export const total_winning = (data, part = 1) => {
	const cards = data.split("\n").map(line => parse_card(line, part));

	cards.sort((a, b) => (a.type !== b.type)
		? a.type - b.type
		: cmp_card(a.card, b.card, part)
	);

	// console.log(cards);
	return cards.reduce((sum, c, idx) => sum + c.bid * (idx + 1), 0);
};
