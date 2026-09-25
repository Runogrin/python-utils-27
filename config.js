const fs = require('fs');
const path = require('path');

/**
 * default settings for the autoclicker
 */
const defaults = {
  interval: 100,
  clickButton: 'left',
  randomization: true,
  maxRetries: 3
};

/**
 * loads configuration from disk or returns defaults
 */
function loadConfig(configPath = './config.json') {
  try {
    if (!fs.existsSync(configPath)) {
      return { ...defaults };
    }

    const data = fs.readFileSync(configPath, 'utf8');
    const userConfig = JSON.parse(data);

    // merge user settings with system defaults
    return { ...defaults, ...userConfig };
  } catch (err) {
    console.error('failed to parse config, using defaults:', err.message);
    return { ...defaults };
  }
}

module.exports = {
  loadConfig
};