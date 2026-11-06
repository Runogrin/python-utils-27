/**
 * @typedef {Object} Point
 * @property {number} x - The horizontal coordinate.
 * @property {number} y - The vertical coordinate.
 */

/**
 * @typedef {Object} ScreenBounds
 * @property {number} minX - Minimum X bound.
 * @property {number} minY - Minimum Y bound.
 * @property {number} maxX - Maximum X bound.
 * @property {number} maxY - Maximum Y bound.
 */

/**
 * Calculates interval with random jitter applied for human-like clicking.
 *
 * @param {number} baseIntervalMs - Base interval in milliseconds.
 * @param {number} [jitterPercentage=10] - Max variance percentage (0-100).
 * @returns {number} The randomized interval in milliseconds.
 */
function getRandomizedInterval(baseIntervalMs, jitterPercentage = 10) {
  const variance = baseIntervalMs * (jitterPercentage / 100);
  const offset = (Math.random() * 2 - 1) * variance;
  return Math.max(1, Math.round(baseIntervalMs + offset));
}

/**
 * Checks if target point is within given screen boundaries.
 *
 * @param {Point} point - Target coordinate object.
 * @param {ScreenBounds} bounds - Permissible screen region.
 * @returns {boolean} True if point is inside bounds.
 */
function isWithinBounds(point, bounds) {
  if (!point || !bounds) return false;
  return (
    point.x >= bounds.minX &&
    point.x <= bounds.maxX &&
    point.y >= bounds.minY &&
    point.y <= bounds.maxY
  );
}

/**
 * Converts desired Clicks Per Second (CPS) into millisecond interval.
 *
 * @param {number} cps - Target clicks per second.
 * @returns {number} Equivalent delay between clicks in milliseconds.
 */
function cpsToInterval(cps) {
  if (cps <= 0) return 1000;
  return Math.round(1000 / cps);
}

module.exports = {
  getRandomizedInterval,
  isWithinBounds,
  cpsToInterval
};