/**
 * @fileoverview Logger module for tracking autoclicker activity and performance.
 */

/**
 * @typedef {'INFO' | 'WARN' | 'ERROR' | 'DEBUG'} LogLevel
 */

/**
 * @typedef {Object} LogEntry
 * @property {string} timestamp - ISO format timestamp of log event.
 * @property {LogLevel} level - Severity level of the log.
 * @property {string} message - Core log message.
 * @property {Record<string, unknown>} [metadata] - Additional contextual data.
 */

class Logger {
  /**
   * Initializes a new Logger instance.
   * @param {LogLevel} [minLevel='INFO'] - Minimum log level threshold to output.
   */
  constructor(minLevel = 'INFO') {
    /** @type {LogLevel} */
    this.minLevel = minLevel;

    /** @type {LogEntry[]} */
    this.logs = [];

    /** @type {Record<LogLevel, number>} */
    this.levelWeights = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
  }

  /**
   * Emits a log entry if it meets the configured severity threshold.
   * @param {LogLevel} level - Severity level of entry.
   * @param {string} message - Primary event text.
   * @param {Record<string, unknown>} [metadata={}] - Optional metadata object.
   * @returns {LogEntry | null} Recorded entry or null if filtered.
   */
  log(level, message, metadata = {}) {
    if (this.levelWeights[level] < this.levelWeights[this.minLevel]) {
      return null;
    }

    /** @type {LogEntry} */
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata
    };

    this.logs.push(entry);
    const metaStr = Object.keys(metadata).length ? JSON.stringify(metadata) : '';
    console.log(`[${entry.timestamp}] [${level}] ${message} ${metaStr}`.trim());

    return entry;
  }

  /**
   * Records an autoclick execution event.
   * @param {number} x - Target screen X coordinate.
   * @param {number} y - Target screen Y coordinate.
   * @param {number} interval - Click interval in milliseconds.
   * @returns {LogEntry | null} Recorded log entry.
   */
  logClick(x, y, interval) {
    return this.log('DEBUG', 'Click executed', { x, y, interval });
  }

  /**
   * Clears accumulated in-memory logs.
   * @returns {void}
   */
  clear() {
    this.logs = [];
  }
}

module.exports = { Logger };