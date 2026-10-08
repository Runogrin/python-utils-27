const fs = require('fs');
const path = require('path');

class AutoClickerLogger {
  constructor(options = {}) {
    this.logDir = options.logDir || path.join(__dirname, 'logs');
    this.maxSizeBytes = options.maxSizeBytes || 1024 * 1024;
    this.maxFiles = options.maxFiles || 3;
    this.currentLogFile = path.join(this.logDir, 'autoclicker.log');

    this.ensureDirectoryExists();
  }

  ensureDirectoryExists() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  rotateLogsIfNeeded() {
    if (!fs.existsSync(this.currentLogFile)) return;

    const stats = fs.statSync(this.currentLogFile);
    if (stats.size < this.maxSizeBytes) return;

    const oldestLog = path.join(this.logDir, `autoclicker.${this.maxFiles}.log`);
    if (fs.existsSync(oldestLog)) {
      fs.unlinkSync(oldestLog);
    }

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const currentFile = path.join(this.logDir, `autoclicker.${i}.log`);
      const nextFile = path.join(this.logDir, `autoclicker.${i + 1}.log`);
      if (fs.existsSync(currentFile)) {
        fs.renameSync(currentFile, nextFile);
      }
    }

    fs.renameSync(this.currentLogFile, path.join(this.logDir, 'autoclicker.1.log'));
  }

  log(level, message) {
    this.rotateLogsIfNeeded();
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

    console.log(entry.trim());
    fs.appendFileSync(this.currentLogFile, entry, 'utf8');
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }
}

module.exports = AutoClickerLogger;