/**
 * @typedef {'left' | 'right' | 'middle'} MouseButton
 * @typedef {'single' | 'double'} ClickType
 * 
 * @typedef {Object} AutoclickerConfig
 * @property {number} intervalMs - Delay between clicks in milliseconds.
 * @property {MouseButton} button - Target mouse button for click events.
 * @property {ClickType} clickType - Type of click action to perform.
 * @property {number} maxClicks - Maximum clicks allowed (0 for unlimited).
 * @property {string} hotkey - Key combination used to toggle clicking.
 */

/** @type {AutoclickerConfig} */
const DEFAULT_CONFIG = {
  intervalMs: 100,
  button: 'left',
  clickType: 'single',
  maxClicks: 0,
  hotkey: 'F6'
};

/**
 * Validates and normalizes raw user options into a complete configuration.
 *
 * @param {Partial<AutoclickerConfig>} [userOptions={}] - Partial user configuration overrides.
 * @returns {AutoclickerConfig} Fully resolved autoclicker configuration object.
 */
function createConfig(userOptions = {}) {
  const config = { ...DEFAULT_CONFIG, ...userOptions };

  if (typeof config.intervalMs !== 'number' || config.intervalMs < 1) {
    config.intervalMs = DEFAULT_CONFIG.intervalMs;
  }

  const validButtons = ['left', 'right', 'middle'];
  if (!validButtons.includes(config.button)) {
    config.button = 'left';
  }

  const validClickTypes = ['single', 'double'];
  if (!validClickTypes.includes(config.clickType)) {
    config.clickType = 'single';
  }

  if (typeof config.maxClicks !== 'number' || config.maxClicks < 0) {
    config.maxClicks = 0;
  }

  return config;
}

/**
 * Formats a configuration object into a short readable status line.
 *
 * @param {AutoclickerConfig} config - The configuration object to format.
 * @returns {string} Human-readable summary of settings.
 */
function formatConfigSummary(config) {
  const limitText = config.maxClicks > 0 ? `${config.maxClicks} clicks` : 'unlimited';
  return `Interval: ${config.intervalMs}ms | Button: ${config.button} (${config.clickType}) | Limit: ${limitText} | Key: ${config.hotkey}`;
}

module.exports = {
  DEFAULT_CONFIG,
  createConfig,
  formatConfigSummary
};