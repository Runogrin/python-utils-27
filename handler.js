/**
 * Mouse event handler for the autoclicker module
 * provides low-level simulation of input events
 */

const robot = require('robotjs');

/**
 * Performs a click at the specified screen coordinates
 * @param {number} x 
 * @param {number} y 
 */
function performClick(x, y) {
    robot.moveMouse(x, y);
    robot.mouseClick();
}

/**
 * Executes a rapid sequence of clicks
 * @param {number} count 
 * @param {number} intervalMs 
 */
async function performBurst(count, intervalMs) {
    for (let i = 0; i < count; i++) {
        robot.mouseClick();
        await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
}

/**
 * Helper to safely exit the click loop
 * @param {boolean} condition 
 */
function checkAbortCondition(condition) {
    if (condition) {
        process.exit(0);
    }
}

module.exports = {
    performClick,
    performBurst,
    checkAbortCondition
};