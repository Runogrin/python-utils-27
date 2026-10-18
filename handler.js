/**
 * Handles sanitization and validation of autoclicker configuration
 * @param {Object} data - The raw input data from settings
 * @returns {Object|null} - Sanitized data or null if invalid
 */
function sanitizeConfig(data) {
  if (!data || typeof data !== 'object') return null;

  const sanitized = {
    interval: Math.max(10, parseInt(data.interval) || 100),
    clicksPerBurst: Math.max(1, parseInt(data.clicksPerBurst) || 1),
    randomization: Math.min(0.5, Math.max(0, parseFloat(data.randomization) || 0.05)),
    enabled: !!data.enabled
  };

  return sanitized;
}

/**
 * Formats click coordinates for browser automation injection
 * @param {number} x - Horizontal coordinate
 * @param {number} y - Vertical coordinate
 * @returns {Object} - Coordinate object
 */
function formatCoordinates(x, y) {
  return {
    x: Math.round(x),
    y: Math.round(y),
    timestamp: Date.now()
  };
}

module.exports = {
  sanitizeConfig,
  formatCoordinates
};