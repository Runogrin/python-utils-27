// Default configuration values
const defaultConfig = {
    clickInterval: 100,
    maxClicks: 100,
    repeat: false,
    randomize: false
};

// Function to load configuration from a given object
function loadConfig(userConfig) {
    return { ...defaultConfig, ...userConfig };
}

// Exported function to get the configuration
module.exports = {
    loadConfig,
    defaultConfig
};
