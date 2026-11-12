const fs = require('fs');
const path = require('path');

/**
 * default settings for the autoclicker
 */
const defaults = {
  interval: 100,
  clicks: -1,
  button: 'left',
  randomize: false
};

/**
 * loads configuration from json file or returns defaults
 * @param {string} filePath 
 * @returns {Object}
 */
function loadConfig(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const userConfig = JSON.parse(data);
      return { ...defaults, ...userConfig };
    }
  } catch (error) {
    console.error('Failed to parse config, using defaults:', error.message);
  }
  
  return { ...defaults };
}

module.exports = { loadConfig };