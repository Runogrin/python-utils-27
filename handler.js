/**
 * Handles validation and normalization of autoclicker configuration data.
 */

const validateClickData = (data) => {
  const defaults = {
    interval: 100, // milliseconds
    x: 0,
    y: 0,
    enabled: false
  };

  if (!data || typeof data !== 'object') {
    return defaults;
  }

  return {
    interval: Math.max(10, parseInt(data.interval) || defaults.interval),
    x: parseInt(data.x) || defaults.x,
    y: parseInt(data.y) || defaults.y,
    enabled: !!data.enabled
  };
};

/**
 * Formats click coordinates for processing engines.
 */
const formatClickPayload = (clickData) => {
  const validated = validateClickData(clickData);
  
  return JSON.stringify({
    ts: Date.now(),
    coordinates: { x: validated.x, y: validated.y },
    delay: validated.interval,
    active: validated.enabled
  });
};

module.exports = {
  validateClickData,
  formatClickPayload
};