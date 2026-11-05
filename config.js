const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  interval: 100,
  button: 'left',
  repeat: 0,
  randomize: false
};

/**
 * Loads configuration from a local JSON file with fallback defaults
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
  } catch (err) {
    console.error('Config load failed, using defaults:', err.message);
    return { ...DEFAULT_CONFIG };
  }
}

module.exports = { loadConfig, DEFAULT_CONFIG };