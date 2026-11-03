const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  interval: 100,
  clickType: 'left',
  randomize: true,
  maxDuration: 60000
};

/**
 * Loads and merges user config with defaults
 * @param {string} configPath 
 * @returns {Object}
 */
function loadConfig(configPath) {
  try {
    if (!fs.existsSync(configPath)) {
      return { ...DEFAULT_CONFIG };
    }

    const rawData = fs.readFileSync(configPath, 'utf8');
    const userConfig = JSON.parse(rawData);

    return { ...DEFAULT_CONFIG, ...userConfig };
  } catch (error) {
    console.error('Failed to load configuration:', error.message);
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * Saves current settings to file
 * @param {string} configPath 
 * @param {Object} config 
 */
function saveConfig(configPath, config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Failed to save configuration:', error.message);
  }
}

module.exports = { loadConfig, saveConfig };