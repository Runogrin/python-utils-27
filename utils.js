/**
 * Validates and sanitizes autoclicker configuration objects.
 * Ensures intervals and delay settings fall within safe bounds.
 */
const validateClickConfig = (config) => {
  const MIN_INTERVAL = 50;
  const MAX_INTERVAL = 60000;

  if (!config || typeof config !== 'object') {
    throw new Error('Invalid configuration object');
  }

  const sanitized = {
    interval: Math.max(MIN_INTERVAL, Math.min(MAX_INTERVAL, config.interval || 100)),
    button: ['left', 'right', 'middle'].includes(config.button) ? config.button : 'left',
    repeat: typeof config.repeat === 'boolean' ? config.repeat : true
  };

  return sanitized;
};

/**
 * Formats click sequence data for output stream.
 */
const formatClickEvent = (x, y, timestamp = Date.now()) => {
  return JSON.stringify({
    coordinates: { x, y },
    ts: timestamp,
    action: 'click'
  });
};

/**
 * Throttles execution rate to prevent UI thread blocking.
 */
const createThrottledExecutor = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
};

module.exports = {
  validateClickConfig,
  formatClickEvent,
  createThrottledExecutor
};