const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  interval: 100,
  clicks: 1000,
  button: 'left',
  randomize: false
};

/**
 * Loads configuration from a JSON file, merging with defaults.
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
    console.error('Failed to load config, using defaults:', err.message);
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * Persists current configuration to disk.
 * @param {string} configPath 
 * @param {Object} config 
 */
function saveConfig(configPath, config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (err) {
    console.error('Failed to save config:', err.message);
  }
}

module.exports = { loadConfig, saveConfig };