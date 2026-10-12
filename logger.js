const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'autoclicker.log');

/**
 * Logs messages with robust error handling for disk failures
 */
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] [${level}] ${message}\n`;

  try {
    if (typeof message !== 'string') {
      throw new Error('Log message must be a string');
    }

    fs.appendFileSync(LOG_FILE, entry, 'utf8');
  } catch (err) {
    // Graceful fallback if filesystem is locked or read-only
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Logger failure: ${err.message}`);
    }
    
    // Attempt to fallback to stderr if writing fails
    process.stderr.write(`Fallback log: ${entry}`);
  }
}

/**
 * Wrapper for handling asynchronous process crashes
 */
function setupErrorHandling() {
  process.on('uncaughtException', (err) => {
    log(`Uncaught Exception: ${err.message}`, 'FATAL');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    log(`Unhandled Rejection: ${reason}`, 'ERROR');
  });
}

module.exports = { log, setupErrorHandling };