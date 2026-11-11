const fs = require('fs');
const path = require('path');

/**
 * Simple file-based logger with rotation support
 * Keeps a single backup file to prevent disk exhaustion
 */
const logFile = path.join(__dirname, 'autoclicker.log');
const backupFile = path.join(__dirname, 'autoclicker.log.old');
const MAX_SIZE = 1024 * 512; // 512KB limit

function rotateLogs() {
    if (fs.existsSync(logFile) && fs.statSync(logFile).size > MAX_SIZE) {
        if (fs.existsSync(backupFile)) fs.unlinkSync(backupFile);
        fs.renameSync(logFile, backupFile);
    }
}

function logger(message) {
    rotateLogs();
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    
    fs.appendFileSync(logFile, entry);
    console.log(entry.trim());
}

module.exports = { logger };