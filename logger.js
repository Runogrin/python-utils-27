const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logFile) {
        this.logFile = logFile || path.join(__dirname, 'app.log');
    }
    
    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}\n`;
        fs.appendFileSync(this.logFile, logMessage, 'utf8');
    }
    
    clear() {
        fs.writeFileSync(this.logFile, '', 'utf8');
    }
}

module.exports = new Logger();
