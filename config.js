/**
 * @typedef {Object} ClickConfig
 * @property {number} interval - Delay in milliseconds between clicks
 * @property {number} duration - Maximum running time in milliseconds
 * @property {boolean} randomized - Whether to jitter the click timing
 */

/**
 * Default autoclicker configuration parameters
 * @type {ClickConfig}
 */
const defaultConfig = {
  interval: 100,
  duration: 60000,
  randomized: true
};

/**
 * Merges user overrides with default settings
 * @param {Partial<ClickConfig>} overrides - User provided settings
 * @returns {ClickConfig} - The finalized configuration object
 */
function getConfiguration(overrides = {}) {
  return {
    ...defaultConfig,
    ...overrides
  };
}

module.exports = {
  defaultConfig,
  getConfiguration
};