// Configuration settings for the AutoClicker

/**
 * Represents the configuration for the autoclicker.
 * @typedef {Object} AutoClickerConfig
 * @property {number} clickInterval - Interval between clicks in milliseconds.
 * @property {number} maxClicks - Maximum number of clicks to perform.
 * @property {boolean} randomize - Whether to randomize the click interval.
 */

/**
 * Load configuration settings for the autoclicker.
 * @returns {AutoClickerConfig} The configuration settings.
 */
function loadConfig() {
    return {  
        clickInterval: 100,
        maxClicks: 1000,
        randomize: true
    };
}

/**
 * Validate the configuration settings.
 * @param {AutoClickerConfig} config - The configuration settings to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateConfig(config) {
    const { clickInterval, maxClicks, randomize } = config;
    if (typeof clickInterval !== 'number' || clickInterval <= 0) {
        return false;
    }
    if (typeof maxClicks !== 'number' || maxClicks <= 0) {
        return false;
    }
    if (typeof randomize !== 'boolean') {
        return false;
    }
    return true;
}

module.exports = { loadConfig, validateConfig };