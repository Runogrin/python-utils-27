// Utility functions for general use

/**
 * Adds two numbers together.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(a: number, b: number): number {
    return a + b;
}

/**
 * Checks if a value is an array.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is an array, false otherwise.
 */
function isArray(value: any): value is Array<any> {
    return Array.isArray(value);
}

/**
 * Flattens an array of arrays.
 *
 * @param {Array<Array<T>>} array - The array to flatten.
 * @returns {Array<T>} A new flattened array.
 */
function flatten<T>(array: Array<Array<T>>): Array<T> {
    return array.reduce((acc, cur) => acc.concat(cur), []);
}

/**
 * Generates a unique identifier.
 *
 * @returns {string} A unique identifier string.
 */
function generateId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

export { add, isArray, flatten, generateId };