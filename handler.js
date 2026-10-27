/**
 * Main processing loop for python-utils-27 autoclicker.
 * Handles input validation and click execution.
 */

const MAX_CLICK_DELAY = 10000;
const MIN_CLICK_DELAY = 50;

function validateInput(settings) {
  if (!settings || typeof settings !== 'object') {
    throw new Error('Invalid configuration object');
  }

  if (typeof settings.interval !== 'number' || 
      settings.interval < MIN_CLICK_DELAY || 
      settings.interval > MAX_CLICK_DELAY) {
    throw new Error(`Interval must be between ${MIN_CLICK_DELAY} and ${MAX_CLICK_DELAY}ms`);
  }

  if (!Number.isInteger(settings.x) || !Number.isInteger(settings.y)) {
    throw new Error('Coordinates must be integers');
  }

  return true;
}

async function runAutoclicker(config) {
  try {
    validateInput(config);

    console.log(`Starting loop at (${config.x}, ${config.y})`);

    while (config.active) {
      // Simulate mouse click operation
      performClick(config.x, config.y);

      await new Promise(resolve => setTimeout(resolve, config.interval));
    }
  } catch (err) {
    console.error('Processing loop terminated:', err.message);
  }
}

function performClick(x, y) {
  // Implementation for python-utils-27 bridge
  process.stdout.write(`Click triggered at ${x}, ${y}\n`);
}

module.exports = { runAutoclicker };