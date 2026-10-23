/**
 * Performs an asynchronous delay to simulate user input gaps.
 * @param {number} ms - The duration in milliseconds to pause.
 * @returns {Promise<void>}
 */
export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculates a randomized coordinate offset for click evasion.
 * @param {number} base - The base target coordinate.
 * @param {number} variance - Maximum pixels to shift the click.
 * @returns {number} The randomized target coordinate.
 */
export function getRandomOffset(base, variance) {
  const shift = Math.floor(Math.random() * (variance * 2 + 1)) - variance;
  return base + shift;
}

/**
 * Formats a timestamp for logging autoclicker actions.
 * @returns {string} ISO format timestamp string.
 */
export function getFormattedTimestamp() {
  return new Date().toISOString();
}

/**
 * Validates if the target coordinates are within screen bounds.
 * @param {number} x - Target x coordinate.
 * @param {number} y - Target y coordinate.
 * @param {object} bounds - Screen width and height object.
 * @returns {boolean} True if coordinates are valid.
 */
export function isValidPosition(x, y, bounds) {
  return x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;
}