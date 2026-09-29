const fs = require('fs');
const path = require('path');

/**
 * default configuration for autoclicker
 */
const DEFAULT_CONFIG = {
  interval: 100,
  clicks: 10,
  button: 'left',
  randomize: false
};

/**
 * loads config from json file or returns defaults
 * @param {string} filePath 
 */
function loadConfig(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(fileContent) };
    }
  } catch (err) {
    console.error('failed to load config, using defaults:', err.message);
  }
  return { ...DEFAULT_CONFIG };
}

module.exports = { loadConfig };