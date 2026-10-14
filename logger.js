const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'autoclicker.log');
const MAX_SIZE = 1024 * 1024 * 5; // 5MB

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

/**
 * Logs messages with basic file rotation logic
 * @param {string} message 
 */
function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;

    if (fs.existsSync(LOG_FILE) && fs.statSync(LOG_FILE).size > MAX_SIZE) {
        const backup = LOG_FILE + '.old';
        if (fs.existsSync(backup)) fs.unlinkSync(backup);
        fs.renameSync(LOG_FILE, backup);
    }

    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

module.exports = { log };