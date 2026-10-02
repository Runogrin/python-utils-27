const fs = require('fs');
const path = require('path');

const LOG_DIR = './logs';
const LOG_FILE = path.join(LOG_DIR, 'app.log');
const MAX_SIZE = 1024 * 1024 * 5; // 5MB limit

/**
 * Ensures log directory exists and manages file rotation
 */
function rotateLogs() {
    if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);
    
    if (fs.existsSync(LOG_FILE)) {
        const stats = fs.statSync(LOG_FILE);
        if (stats.size >= MAX_SIZE) {
            const timestamp = Date.now();
            fs.renameSync(LOG_FILE, path.join(LOG_DIR, `app-${timestamp}.log`));
        }
    }
}

/**
 * Standardized logging with automatic rotation
 */
function logger(message, level = 'INFO') {
    rotateLogs();
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    
    process.stdout.write(logEntry);
    fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
}

module.exports = { logger };