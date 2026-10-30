/**
 * @typedef {Object} ClickCoordinates
 * @property {number} x - Horizontal coordinate
 * @property {number} y - Vertical coordinate
 */

/**
 * Simulates a mouse click at specific coordinates
 * @param {ClickCoordinates} coords - The screen position to click
 * @param {number} delay - Milliseconds to wait before action
 * @returns {Promise<boolean>} Success status of the operation
 */
async function performClick(coords, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        console.log(`Clicking at ${coords.x}, ${coords.y}`);
        resolve(true);
      } catch (err) {
        console.error('Click failure:', err);
        resolve(false);
      }
    }, delay);
  });
}

/**
 * Validates coordinate bounds for the autoclicker
 * @param {number} x 
 * @param {number} y 
 * @param {number} maxWidth 
 * @param {number} maxHeight 
 * @returns {boolean} Whether coordinates are within bounds
 */
function isWithinBounds(x, y, maxWidth, maxHeight) {
  return x >= 0 && x <= maxWidth && y >= 0 && y <= maxHeight;
}

module.exports = {
  performClick,
  isWithinBounds
};