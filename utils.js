/**
 * Autoclicker processing loop with input validation
 * Validates click intervals and coordinate bounds
 */

const validateInput = (config) => {
  const { interval, x, y } = config;

  if (typeof interval !== 'number' || interval < 50) {
    throw new Error('Invalid interval: must be a number >= 50ms');
  }

  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0) {
    throw new Error('Invalid coordinates: must be non-negative integers');
  }

  return true;
};

const runClickerLoop = async (config, clickAction) => {
  try {
    validateInput(config);

    console.log(`Starting loop at (${config.x}, ${config.y})`);

    while (true) {
      await new Promise(resolve => setTimeout(resolve, config.interval));
      
      // Perform the click at validated coordinates
      clickAction(config.x, config.y);
    }
  } catch (err) {
    console.error(`Loop termination: ${err.message}`);
  }
};

module.exports = { runClickerLoop };