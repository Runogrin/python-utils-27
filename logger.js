const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logFile) {
        this.logFilePath = path.join(__dirname, logFile);
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}\n`;
        fs.appendFile(this.logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Failed to write to log file:', err);
            }
        });
    }

    clear() {
        fs.writeFile(this.logFilePath, '', (err) => {
            if (err) {
                console.error('Failed to clear log file:', err);
            }
        });
    }
}

module.exports = Logger;
