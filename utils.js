const robot = require('robotjs');

/**
 * Performs a safe autoclick action with edge case validation
 * @param {number} x - Target horizontal coordinate
 * @param {number} y - Target vertical coordinate
 * @param {object} bounds - Screen resolution limits
 */
function performClick(x, y, bounds = { width: 1920, height: 1080 }) {
  try {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('Coordinates must be numeric');
    }

    if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) {
      console.warn(`Click coordinate ${x},${y} is out of bounds`);
      return false;
    }

    robot.moveMouse(x, y);
    robot.mouseClick();
    return true;
  } catch (error) {
    console.error('Click execution failure:', error.message);
    return false;
  }
}

/**
 * Validates delay parameters for loop timing
 * @param {number} interval - Milliseconds
 */
function validateInterval(interval) {
  const minInterval = 50;
  const maxInterval = 60000;

  if (typeof interval !== 'number' || interval < minInterval || interval > maxInterval) {
    console.error('Invalid interval provided, reverting to safe default');
    return 500;
  }

  return interval;
}

module.exports = { performClick, validateInterval };