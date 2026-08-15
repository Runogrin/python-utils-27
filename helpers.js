// Utility functions for handling autoclicker data

/**
 * Converts a duration string to milliseconds.
 * @param {string} duration - The duration string (e.g., '2s', '500ms').
 * @returns {number} - Duration in milliseconds.
 */
function durationToMilliseconds(duration) {
    const timeUnits = { s: 1000, ms: 1 };
    const match = duration.match(/(\d+)([sm])/);
    if (!match) throw new Error('Invalid duration format');
    const [, value, unit] = match;
    return parseInt(value) * timeUnits[unit];
}

/**
 * Generates clicks data based on provided parameters.
 * @param {number} count - Number of clicks to generate.
 * @param {number} interval - Interval between clicks in milliseconds.
 * @returns {Array} - Array of click objects with timestamp.
 */
function generateClickData(count, interval) {
    const clicks = [];
    const now = Date.now();
    for (let i = 0; i < count; i++) {
        clicks.push({ timestamp: now + i * interval });
    }
    return clicks;
}

/**
 * Validates the click data for required fields.
 * @param {Array} clickData - Array of click objects.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateClickData(clickData) {
    return clickData.every(click => click.hasOwnProperty('timestamp'));
}

// Exporting utility functions for external use
module.exports = {
    durationToMilliseconds,
    generateClickData,
    validateClickData
};