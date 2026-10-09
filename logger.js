/**
 * Autoclicker Logger Module
 * Provides formatted console output for events
 */

const LOG_LEVELS = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

class Logger {
  constructor(debugMode = false) {
    this.debugMode = debugMode;
  }

  _format(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  info(message) {
    console.log(this._format(LOG_LEVELS.INFO, message));
  }

  error(message, error = '') {
    console.error(this._format(LOG_LEVELS.ERROR, message), error);
  }

  debug(message) {
    if (this.debugMode) {
      console.debug(this._format(LOG_LEVELS.DEBUG, message));
    }
  }
}

module.exports = new Logger(process.env.DEBUG === 'true');