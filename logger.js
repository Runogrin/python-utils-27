const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'autoclicker.log');

/**
 * Logs events to a local file with timestamps.
 * @param {string} level - Severity level (INFO, WARN, ERROR).
 * @param {string} message - Description of the event.
 */
function log(level, message) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] [${level}] ${message}\n`;

  process.stdout.write(formattedMessage);

  fs.appendFile(LOG_FILE, formattedMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}

module.exports = {
  info: (msg) => log('INFO', msg),
  warn: (msg) => log('WARN', msg),
  error: (msg) => log('ERROR', msg)
};