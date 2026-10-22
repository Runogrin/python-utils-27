/**
 * Performs a click action at the specified screen coordinates.
 * @param {number} x - Horizontal coordinate on screen.
 * @param {number} y - Vertical coordinate on screen.
 * @returns {Promise<boolean>} True if action succeeded.
 */
export async function performClick(x, y) {
  try {
    if (typeof x !== 'number' || typeof y !== 'number') {
      return false;
    }
    // Simulate system-level mouse down and up events
    await window.api.send('click', { x, y });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Pauses execution for a specified duration in milliseconds.
 * @param {number} ms - Delay duration in milliseconds.
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates a random integer within a closed interval.
 * @param {number} min - Minimum possible value.
 * @param {number} max - Maximum possible value.
 * @returns {number} Random integer between min and max.
 */
export function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}