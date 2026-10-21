/**
 * Autoclicker Logger Utility
 * Standardized console outputs for session tracking
 */

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

class Logger {
  constructor(prefix = '[python-utils-27]') {
    this.prefix = prefix;
  }

  _format(level, message) {
    const timestamp = new Date().toISOString();
    return `${timestamp} ${this.prefix} [${level}] ${message}`;
  }

  info(message) {
    console.log(this._format(LOG_LEVELS.INFO, message));
  }

  warn(message) {
    console.warn(this._format(LOG_LEVELS.WARN, message));
  }

  error(message, error = null) {
    const msg = error ? `${message}: ${error.message}` : message;
    console.error(this._format(LOG_LEVELS.ERROR, msg));
  }
}

module.exports = new Logger();