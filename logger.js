/**
 * @typedef {Object} LogEntry
 * @property {string} level - Log level severity
 * @property {string} message - Human readable message
 * @property {number} timestamp - Unix epoch time
 */

/**
 * Logs events to console for autoclicker tracking
 * @param {string} level - Severity level (info, warn, error)
 * @param {string} message - Event description
 * @returns {LogEntry}
 */
function log(level, message) {
  const entry = {
    level,
    message,
    timestamp: Date.now()
  };

  const formatted = `[${new Date(entry.timestamp).toISOString()}] [${level.toUpperCase()}]: ${message}`;
  
  if (level === 'error') {
    console.error(formatted);
  } else if (level === 'warn') {
    console.warn(formatted);
  } else {
    console.log(formatted);
  }

  return entry;
}

/**
 * Formats click action details for logging
 * @param {number} x - Horizontal coordinate
 * @param {number} y - Vertical coordinate
 * @returns {string}
 */
function formatClickEvent(x, y) {
  return `Action: Click at coordinates (${x}, ${y})`;
}

module.exports = { log, formatClickEvent };