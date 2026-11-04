/**
 * Represents a click coordinate on the screen
 * @typedef {Object} ClickPoint
 * @property {number} x
 * @property {number} y
 */

/**
 * Configuration for the autoclicker interval
 * @typedef {Object} ClickConfig
 * @property {number} delay
 * @property {boolean} active
 */

/**
 * Performs an automated click at the specified position
 * @param {ClickPoint} point
 * @param {ClickConfig} config
 * @returns {void}
 */
function performClick(point, config) {
  if (!config.active) return;

  try {
    // Simulates low-level system mouse input
    console.log(`Clicking at ${point.x}, ${point.y}`);
  } catch (error) {
    console.error('Click execution failed', error);
  }
}

/**
 * Initializes the click sequence loop
 * @param {ClickPoint} point
 * @param {number} interval
 * @returns {NodeJS.Timeout}
 */
function startAutomation(point, interval) {
  const config = { delay: interval, active: true };
  return setInterval(() => performClick(point, config), interval);
}

module.exports = { performClick, startAutomation };