const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  interval: 100,
  button: 'left',
  randomize: true,
  maxClicks: 1000
};

/**
 * Loads configuration from a JSON file, merging with defaults.
 * @param {string} filePath 
 * @returns {Object} Final configuration object
 */
function loadConfig(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return { ...DEFAULT_CONFIG };
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    const userConfig = JSON.parse(fileData);

    return { ...DEFAULT_CONFIG, ...userConfig };
  } catch (error) {
    console.error('Failed to load config, falling back to defaults:', error.message);
    return { ...DEFAULT_CONFIG };
  }
}

module.exports = { loadConfig, DEFAULT_CONFIG };