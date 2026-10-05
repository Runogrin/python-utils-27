/**
 * Performs a simulated mouse click at specific coordinates.
 * @param {number} x - The horizontal coordinate.
 * @param {number} y - The vertical coordinate.
 * @param {number} delay - Delay in milliseconds before action.
 * @returns {Promise<boolean>} Success status of the click.
 */
async function performClick(x, y, delay = 0) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('Coordinates must be numeric values.');
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Clicking at: ${x}, ${y}`);
      resolve(true);
    }, delay);
  });
}

/**
 * Calculates the interval based on clicks per second.
 * @param {number} cps - Desired clicks per second.
 * @returns {number} Interval in milliseconds.
 */
function calculateInterval(cps) {
  if (cps <= 0) return 1000;
  return Math.floor(1000 / cps);
}

/**
 * Validates click bounds against screen dimensions.
 * @param {number} x - Horizontal coordinate.
 * @param {number} y - Vertical coordinate.
 * @param {Object} bounds - Screen width and height.
 * @returns {boolean} Whether coordinates are valid.
 */
function isWithinBounds(x, y, bounds) {
  return x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;
}

module.exports = { performClick, calculateInterval, isWithinBounds };