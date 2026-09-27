/**
 * Configuration settings for the python-utils-27 autoclicker module
 * @typedef {Object} ClickConfig
 * @property {number} interval - Delay between clicks in milliseconds
 * @property {number} duration - Maximum runtime in seconds
 * @property {boolean} randomized - Whether to introduce jitter
 */

/**
 * Default settings for the autoclicker execution
 * @type {ClickConfig}
 */
const defaultConfig = {
  interval: 500,
  duration: 60,
  randomized: true
};

/**
 * Validates the provided configuration object
 * @param {ClickConfig} config - The configuration to validate
 * @returns {boolean} True if config is valid
 */
function validateConfig(config) {
  return (
    typeof config.interval === 'number' && config.interval > 0 &&
    typeof config.duration === 'number' && config.duration >= 0 &&
    typeof config.randomized === 'boolean'
  );
}

/**
 * Merges user settings with default configuration
 * @param {Partial<ClickConfig>} userConfig - Overrides for default settings
 * @returns {ClickConfig} The merged active configuration
 */
function getActiveConfig(userConfig) {
  const activeConfig = { ...defaultConfig, ...userConfig };
  if (!validateConfig(activeConfig)) {
    throw new Error('Invalid configuration parameters provided');
  }
  return activeConfig;
}

module.exports = { defaultConfig, getActiveConfig };