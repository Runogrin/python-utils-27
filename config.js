const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  interval: 100,
  duration: 5000,
  button: 'left',
  randomize: true
};

/**
 * Loads configuration from a local file or returns defaults
 * @param {string} configPath
 * @returns {Object}
 */
function loadConfig(configPath = './config.json') {
  try {
    if (fs.existsSync(configPath)) {
      const rawData = fs.readFileSync(configPath, 'utf8');
      const userConfig = JSON.parse(rawData);
      return { ...DEFAULT_CONFIG, ...userConfig };
    }
  } catch (error) {
    console.error('Error loading config, using defaults:', error.message);
  }
  
  return { ...DEFAULT_CONFIG };
}

module.exports = { loadConfig };