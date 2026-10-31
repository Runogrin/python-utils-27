/**
 * Configuration manager for python-utils-27
 * Handles validation and safe defaults for autoclicker settings
 */

const DEFAULT_CONFIG = {
  interval: 100,
  maxClicks: 1000,
  retryLimit: 3
};

/**
 * Validates and sanitizes user-provided settings
 * @param {Object} userConfig 
 * @returns {Object} validated configuration
 */
function validateConfig(userConfig) {
  try {
    if (!userConfig || typeof userConfig !== 'object') {
      throw new Error('Invalid config object provided');
    }

    const config = { ...DEFAULT_CONFIG, ...userConfig };

    // Edge case: Ensure interval is positive and within hardware limits
    if (typeof config.interval !== 'number' || config.interval < 10) {
      console.warn('Interval below safe threshold, resetting to 100ms');
      config.interval = 100;
    }

    // Edge case: Prevent negative click counts
    if (config.maxClicks < 0) {
      config.maxClicks = 0;
    }

    return config;
  } catch (error) {
    console.error('Config validation failed:', error.message);
    return DEFAULT_CONFIG;
  }
}

module.exports = {
  validateConfig,
  DEFAULT_CONFIG
};