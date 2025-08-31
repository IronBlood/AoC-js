/**
 * Get the greatest common divisor of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/**
 * Get the least common multiple of a and b
 * @param {number} a
 * @param {number} b
 */
export const lcm = (a, b) => a * b / gcd(a, b);
