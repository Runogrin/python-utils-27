const fs = require('fs');
const path = require('path');

class Logger {
  constructor(options = {}) {
    this.logDir = options.logDir || path.join(__dirname, 'logs');
    this.maxFileSize = options.maxFileSize || 1024 * 1024; // 1 MB limit
    this.maxFiles = options.maxFiles || 5;
    this.currentLogPath = path.join(this.logDir, 'autoclicker.log');

    this._ensureDirectory();
  }

  _ensureDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  _rotateLogs() {
    if (!fs.existsSync(this.currentLogPath)) return;

    const stats = fs.statSync(this.currentLogPath);
    if (stats.size < this.maxFileSize) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const sourcePath = `${this.currentLogPath}.${i}`;
      const targetPath = `${this.currentLogPath}.${i + 1}`;

      if (fs.existsSync(sourcePath)) {
        if (i === this.maxFiles - 1) {
          fs.unlinkSync(sourcePath);
        } else {
          fs.renameSync(sourcePath, targetPath);
        }
      }
    }

    fs.renameSync(this.currentLogPath, `${this.currentLogPath}.1`);
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;

    console.log(formattedMessage.trim());

    try {
      this._rotateLogs();
      fs.appendFileSync(this.currentLogPath, formattedMessage, 'utf8');
    } catch (err) {
      console.error(`Failed to write to log file: ${err.message}`);
    }
  }

  info(message) { this.log('info', message); }
  warn(message) { this.log('warn', message); }
  error(message) { this.log('error', message); }
  debug(message) { this.log('debug', message); }
}

module.exports = Logger;