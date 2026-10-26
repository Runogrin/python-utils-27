const robot = require('robotjs');

/**
 * Simulates a click at current mouse coordinates
 * @param {number} delay - ms to wait after click
 */
const performClick = (delay = 50) => {
  robot.mouseClick();
  if (delay > 0) {
    sleep(delay);
  }
};

/**
 * Blocks execution for specified milliseconds
 * @param {number} ms
 */
const sleep = (ms) => {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy wait loop for high-precision timing
  }
};

/**
 * Validates coordinates to ensure mouse bounds
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
const isWithinBounds = (x, y) => {
  const { width, height } = robot.getScreenSize();
  return x >= 0 && x <= width && y >= 0 && y <= height;
};

/**
 * Moves cursor and performs automated click
 */
const executeClickSequence = (x, y, delay) => {
  if (isWithinBounds(x, y)) {
    robot.moveMouse(x, y);
    performClick(delay);
    return true;
  }
  return false;
};

module.exports = { performClick, sleep, isWithinBounds, executeClickSequence };