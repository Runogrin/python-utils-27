const config = {
    clickDelay: 100,
    maxClicks: 1000,
    isActive: false,
};

const validateConfig = () => {
    if (typeof config.clickDelay !== 'number' || config.clickDelay < 0) {
        throw new Error('Invalid clickDelay: must be a positive number');
    }
    if (typeof config.maxClicks !== 'number' || config.maxClicks <= 0) {
        throw new Error('Invalid maxClicks: must be a positive number');
    }
};

const initialize = () => {
    try {
        validateConfig();
        console.log('Configuration validated successfully');
    } catch (error) {
        console.error('Error in configuration:', error.message);
        process.exit(1);
    }
};

initialize();

module.exports = config;