// Logger Utility for Error Handling
class Logger {
    constructor() {
        this.logs = [];
    }

    log(message) {
        const logEntry = this.formatLog(message);
        this.logs.push(logEntry);
        console.log(logEntry);
    }

    formatLog(message) {
        const timestamp = new Date().toISOString();
        return `${timestamp} - ${message}`;
    }

    error(message) {
        const errorMessage = this.formatLog(`ERROR: ${message}`);
        this.logs.push(errorMessage);
        console.error(errorMessage);
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}

// Usage example
const logger = new Logger();
logger.log('Application started.');
try {
    // Simulating an operation that may throw an error
    throw new Error('Something went wrong.');
} catch (err) {
    logger.error(err.message);
}
logger.log('Application finished.');

export default Logger;
