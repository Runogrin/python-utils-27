const fs = require('fs');

/**
 * Loads configuration from a local JSON file
 * Handles missing file, invalid syntax, and schema mismatches
 */
function loadConfig(path) {
  try {
    if (!fs.existsSync(path)) {
      throw new Error(`config file not found at ${path}`);
    }

    const data = fs.readFileSync(path, 'utf8');
    const config = JSON.parse(data);

    if (typeof config.interval !== 'number' || config.interval < 0) {
      throw new Error('invalid interval: must be a positive number');
    }

    return {
      interval: config.interval,
      duration: config.duration || 0,
      active: !!config.active
    };
  } catch (err) {
    console.error('config loading failure:', err.message);
    return {
      interval: 1000,
      duration: 0,
      active: false
    };
  }
}

module.exports = { loadConfig };