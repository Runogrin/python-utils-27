/**
 * Validates autoclicker configuration parameters
 * @param {Object} config 
 * @returns {boolean}
 */
function validateClickerConfig(config) {
  const { interval, duration, targetX, targetY } = config;
  return (
    typeof interval === 'number' && interval >= 10 &&
    typeof duration === 'number' && duration > 0 &&
    Number.isInteger(targetX) && Number.isInteger(targetY)
  );
}

/**
 * Formats click events into structured packet payloads
 * @param {number} x 
 * @param {number} y 
 * @returns {Object}
 */
function formatClickEvent(x, y) {
  return {
    timestamp: Date.now(),
    position: { x, y },
    event: 'mouse_click'
  };
}

/**
 * Normalizes input delay sequences for the executor
 * @param {Array<number>} delays 
 * @returns {Array<number>}
 */
function sanitizeDelays(delays) {
  return delays.filter(d => d > 0).map(d => Math.floor(d));
}

module.exports = {
  validateClickerConfig,
  formatClickEvent,
  sanitizeDelays
};