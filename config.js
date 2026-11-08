const fs = require('fs');
const path = require('path');

/**
 * default configuration for autoclicker
 */
const DEFAULT_CONFIG = {
  interval: 100,
  clicksPerBurst: 1,
  button: 'left',
  randomizeDelay: true
};

/**
 * loads json config from file system
 * merges with defaults if file missing
 */
function loadConfig(configPath) {
  try {
    if (!fs.existsSync(configPath)) {
      return { ...DEFAULT_CONFIG };
    }

    const rawData = fs.readFileSync(configPath, 'utf8');
    const userConfig = JSON.parse(rawData);

    return {
      ...DEFAULT_CONFIG,
      ...userConfig
    };
  } catch (error) {
    console.error('failed to parse config, using defaults:', error.message);
    return { ...DEFAULT_CONFIG };
  }
}

module.exports = { loadConfig, DEFAULT_CONFIG };