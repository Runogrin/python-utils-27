/**
 * Utility functions for autoclicker data validation and sequence processing.
 */

/**
 * Validates individual click coordinate and timing configuration.
 * @param {Object} config - Click configuration object.
 * @returns {Object} Normalized configuration with defaults.
 */
function normalizeClickConfig(config = {}) {
  const x = Number.isFinite(config.x) ? Math.max(0, Math.floor(config.x)) : 0;
  const y = Number.isFinite(config.y) ? Math.max(0, Math.floor(config.y)) : 0;
  const interval = Number.isFinite(config.interval) && config.interval >= 10 ? Math.floor(config.interval) : 100;
  const button = ['left', 'right', 'middle'].includes(config.button) ? config.button : 'left';
  const clickType = ['single', 'double'].includes(config.clickType) ? config.clickType : 'single';

  return { x, y, interval, button, clickType };
}

/**
 * Parses and sanitizes a sequence of click points for batch execution.
 * @param {Array} sequence - Array of raw click data objects.
 * @returns {Array} Array of sanitized click config objects.
 */
function parseClickSequence(sequence) {
  if (!Array.isArray(sequence)) {
    return [];
  }

  return sequence
    .filter(item => item && typeof item === 'object')
    .map(item => normalizeClickConfig(item));
}

/**
 * Calculates total duration of a click sequence in milliseconds.
 * @param {Array} sequence - Array of click configurations.
 * @returns {number} Total duration in milliseconds.
 */
function calculateSequenceDuration(sequence) {
  const parsed = parseClickSequence(sequence);
  return parsed.reduce((total, item) => total + item.interval, 0);
}

/**
 * Formats millisecond duration into a human-readable time string.
 * @param {number} ms - Duration in milliseconds.
 * @returns {string} Formatted duration (e.g., "1m 15s 250ms").
 */
function formatDuration(ms) {
  if (typeof ms !== 'number' || ms < 0 || !Number.isFinite(ms)) {
    return '0ms';
  }

  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const remainingMs = Math.floor(ms % 1000);

  const parts = [];
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  if (remainingMs > 0 || parts.length === 0) parts.push(`${remainingMs}ms`);

  return parts.join(' ');
}

module.exports = {
  normalizeClickConfig,
  parseClickSequence,
  calculateSequenceDuration,
  formatDuration
};