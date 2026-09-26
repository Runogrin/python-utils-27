const fs = require('fs');
const path = require('path');

/**
 * default configuration for the autoclicker
 */
const defaults = {
  interval: 100,
  duration: 5000,
  button: 'left',
  randomization: true
};

/**
 * loads configuration from a json file or returns defaults
 */
function loadConfig(configPath) {
  try {
    if (fs.existsSync(configPath)) {
      const rawData = fs.readFileSync(configPath, 'utf8');
      const userConfig = JSON.parse(rawData);
      return { ...defaults, ...userConfig };
    }
  } catch (err) {
    console.error('Error loading config, using defaults:', err.message);
  }
  return { ...defaults };
}

module.exports = { loadConfig };