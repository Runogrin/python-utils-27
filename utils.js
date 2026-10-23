const robot = require('robotjs');

/**
 * Autoclicker core utility operations
 */
const AutoclickerUtils = {
  /**
   * Perform a click at the specified screen coordinates
   * @param {number} x 
   * @param {number} y 
   */
  performClick(x, y) {
    robot.moveMouse(x, y);
    robot.mouseClick('left');
  },

  /**
   * Validation for coordinate boundaries
   * @param {number} x 
   * @param {number} y 
   * @returns {boolean}
   */
  isValidCoordinate(x, y) {
    const { width, height } = robot.getScreenSize();
    return x >= 0 && x <= width && y >= 0 && y <= height;
  },

  /**
   * Sleep utility for interval control
   * @param {number} ms 
   */
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Format click logging metadata
   * @param {number} x 
   * @param {number} y 
   * @returns {string}
   */
  getLogTimestamp(x, y) {
    return `[${new Date().toISOString()}] Clicked at (${x}, ${y})`;
  }
};

module.exports = AutoclickerUtils;