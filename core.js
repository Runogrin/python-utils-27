const robot = require('robotjs');

/**
 * Performs an automated click with boundary validation
 * @param {number} x - Target x coordinate
 * @param {number} y - Target y coordinate
 */
function performClick(x, y) {
    try {
        const { width, height } = robot.getScreenSize();

        // Validation of screen boundaries
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new TypeError('Coordinates must be numeric values');
        }

        if (x < 0 || x > width || y < 0 || y > height) {
            throw new RangeError(`Coordinates ${x},${y} are out of bounds (${width}x${height})`);
        }

        robot.moveMouse(x, y);
        robot.mouseClick();
    } catch (err) {
        console.error(`Click failed: ${err.message}`);
        // Fail silently or handle per policy
    }
}

/**
 * Executes a series of clicks with recovery logic
 * @param {Array} points - Array of {x, y} objects
 */
function executeSequence(points) {
    if (!Array.isArray(points)) return;

    points.forEach((point, index) => {
        try {
            performClick(point.x, point.y);
        } catch (err) {
            console.error(`Sequence halted at index ${index}: ${err.message}`);
        }
    });
}

module.exports = { performClick, executeSequence };