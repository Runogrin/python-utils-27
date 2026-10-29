/**
 * Validates and sanitizes autoclicker timing configuration
 * @param {Object} data - Raw timing configuration input
 * @returns {Object|null} Sanitized configuration or null if invalid
 */
const validateClickConfig = (data) => {
  const MIN_DELAY = 10;
  const MAX_DELAY = 60000;

  if (!data || typeof data !== 'object') return null;

  const interval = parseInt(data.interval, 10);
  const jitter = parseInt(data.jitter, 10) || 0;

  if (isNaN(interval) || interval < MIN_DELAY || interval > MAX_DELAY) {
    return null;
  }

  return {
    interval: interval,
    jitter: Math.max(0, jitter),
    timestamp: Date.now()
  };
};

/**
 * Calculates dynamic delay with optional jitter
 * @param {number} base - Base interval in ms
 * @param {number} jitter - Randomization range in ms
 * @returns {number} Final timeout value
 */
const getDynamicInterval = (base, jitter) => {
  const offset = Math.floor(Math.random() * jitter);
  return base + offset;
};

module.exports = {
  validateClickConfig,
  getDynamicInterval
};