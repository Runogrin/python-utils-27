/**
 * Validates and sanitizes autoclicker input configuration
 * @param {Object} data - Raw settings object
 * @returns {Object} Cleaned configuration object
 */
function sanitizeClickConfig(data) {
  const defaults = {
    interval: 100,
    button: 'left',
    iterations: 1
  };

  return {
    interval: Math.max(10, parseInt(data.interval) || defaults.interval),
    button: ['left', 'right', 'middle'].includes(data.button) ? data.button : defaults.button,
    iterations: Math.max(0, parseInt(data.iterations) || defaults.iterations)
  };
}

/**
 * Formats click delay duration for human readability
 * @param {number} ms - Delay in milliseconds
 * @returns {string} Formatted duration string
 */
function formatDelay(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Calculates the estimated time to completion
 * @param {number} count - Total iterations
 * @param {number} delay - Delay per click
 * @returns {number} Time in milliseconds
 */
function getEstimatedDuration(count, delay) {
  if (count <= 0) return 0;
  return count * delay;
}

module.exports = {
  sanitizeClickConfig,
  formatDelay,
  getEstimatedDuration
};