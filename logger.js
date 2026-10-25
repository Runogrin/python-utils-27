/**
 * Log levels available for the autoclicker module.
 * @typedef {'debug' | 'info' | 'warn' | 'error'} LogLevel
 */

/**
 * Options for configuring the AutoclickLogger instance.
 * @typedef {Object} LoggerOptions
 * @property {LogLevel} [minLevel='info'] - Minimum level of logs to output.
 * @property {boolean} [includeTimestamp=true] - Whether to include timestamp in outputs.
 * @property {string} [prefix='[AutoClicker]'] - Prefix tag for all log outputs.
 */

class AutoclickLogger {
  /**
   * Creates a logger instance for tracking autoclicker events and errors.
   * @param {LoggerOptions} [options={}] - Configuration options for the logger.
   */
  constructor(options = {}) {
    const { minLevel = 'info', includeTimestamp = true, prefix = '[AutoClicker]' } = options;

    /** @type {Record<LogLevel, number>} */
    this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
    this.minLevel = minLevel;
    this.includeTimestamp = includeTimestamp;
    this.prefix = prefix;
  }

  /**
   * Formats a log message with optional timestamp and configured prefix.
   * @private
   * @param {LogLevel} level - Severity level of the log message.
   * @param {string} message - Primary log message content.
   * @returns {string} Formatted log string.
   */
  _format(level, message) {
    const timeStr = this.includeTimestamp ? `[${new Date().toISOString()}] ` : '';
    return `${timeStr}${this.prefix} [${level.toUpperCase()}]: ${message}`;
  }

  /**
   * Determines if the specified level should be logged based on minLevel.
   * @private
   * @param {LogLevel} level - The target log level.
   * @returns {boolean} True if log level meets or exceeds minLevel.
   */
  _shouldLog(level) {
    return this.levels[level] >= this.levels[this.minLevel];
  }

  /**
   * Logs a message at the specified log level.
   * @param {LogLevel} level - Severity level.
   * @param {string} message - Message text to record.
   * @param {Record<string, any>} [meta] - Optional metadata object.
   */
  log(level, message, meta) {
    if (!this._shouldLog(level)) return;

    const formatted = this._format(level, message);
    const logFn = level === 'debug' ? console.log : console[level] || console.log;

    if (meta && Object.keys(meta).length > 0) {
      logFn(formatted, meta);
    } else {
      logFn(formatted);
    }
  }

  /**
   * Logs click action execution details.
   * @param {number} x - Target X coordinate.
   * @param {number} y - Target Y coordinate.
   * @param {number} intervalMs - Delay in milliseconds before click.
   */
  logClick(x, y, intervalMs) {
    this.log('info', `Click executed at (${x}, ${y})`, { intervalMs });
  }
}

module.exports = { AutoclickLogger };