const fs = require('fs');
const path = require('path');

/**
 * default configuration for autoclicker
 */
const DEFAULT_CONFIG = {
  interval: 100,
  button: 'left',
  maxClicks: 0,
  autoStart: false
};

/**
 * loads json config with fallback to defaults
 * @param {string} filePath 
 * @returns {Object}
 */
function loadConfig(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return { ...DEFAULT_CONFIG };
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const userConfig = JSON.parse(rawData);

    // merge defaults with provided keys
    return { ...DEFAULT_CONFIG, ...userConfig };
  } catch (error) {
    console.error('configuration parse error, using defaults:', error.message);
    return { ...DEFAULT_CONFIG };
  }
}

module.exports = { loadConfig };