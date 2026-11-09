const DEFAULT_CONFIG = {
  clickInterval: 100, // interval between clicks in milliseconds
  button: 'left', // mouse button: 'left', 'right', or 'middle'
  clickType: 'single', // 'single' or 'double'
  repeatCount: 0, // 0 means repeat until stopped manually
  hotkey: 'F6', // global shortcut key to toggle autoclicker
  randomizeInterval: false, // adds small random delay variance
  jitterRange: 0 // random pixel offset for cursor position
};

/**
 * Loads and validates configuration options against default values.
 * @param {Object} userConfig - Custom configuration object
 * @returns {Object} Sanitized configuration object
 */
function loadConfig(userConfig = {}) {
  const config = { ...DEFAULT_CONFIG, ...userConfig };

  // Validate click interval (minimum 10ms)
  if (typeof config.clickInterval !== 'number' || config.clickInterval < 10) {
    config.clickInterval = DEFAULT_CONFIG.clickInterval;
  }

  // Validate mouse button choice
  const validButtons = ['left', 'right', 'middle'];
  if (!validButtons.includes(config.button)) {
    config.button = DEFAULT_CONFIG.button;
  }

  // Validate click type
  const validClickTypes = ['single', 'double'];
  if (!validClickTypes.includes(config.clickType)) {
    config.clickType = DEFAULT_CONFIG.clickType;
  }

  // Validate repeat count (non-negative integer)
  if (typeof config.repeatCount !== 'number' || config.repeatCount < 0) {
    config.repeatCount = DEFAULT_CONFIG.repeatCount;
  }

  // Validate jitter range
  if (typeof config.jitterRange !== 'number' || config.jitterRange < 0) {
    config.jitterRange = DEFAULT_CONFIG.jitterRange;
  }

  return config;
}

module.exports = {
  DEFAULT_CONFIG,
  loadConfig
};