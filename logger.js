const fs = require('fs');
const path = require('path');

/**
 * Simple rotating logger for autoclicker sessions
 * Keeps log files under a size threshold
 */
class Logger {
  constructor(filePath = 'autoclicker.log', maxSize = 1024 * 1024) {
    this.filePath = filePath;
    this.maxSize = maxSize;
  }

  _rotate() {
    if (fs.existsSync(this.filePath)) {
      const stats = fs.statSync(this.filePath);
      if (stats.size > this.maxSize) {
        const backupPath = `${this.filePath}.old`;
        fs.copyFileSync(this.filePath, backupPath);
        fs.writeFileSync(this.filePath, '');
      }
    }
  }

  log(message) {
    this._rotate();
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    
    console.log(entry.trim());
    fs.appendFileSync(this.filePath, entry);
  }
}

module.exports = new Logger();