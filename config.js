const config = {
    clickInterval: 100,
    maxClicks: 1000,
    enableLogging: true,
    clickButtonSelector: '#click-me',
    setLogging(enabled) {
        this.enableLogging = enabled;
    },
    adjustClickInterval(interval) {
        if (interval > 0) {
            this.clickInterval = interval;
        } else {
            console.warn('Click interval must be positive.');
        }
    },
    updateMaxClicks(max) {
        if (max > 0) {
            this.maxClicks = max;
        } else {
            console.warn('Max clicks must be positive.');
        }
    }
};

module.exports = config;