const validateInput = (config) => {
  if (typeof config.interval !== 'number' || config.interval < 50) {
    throw new Error('Interval must be a number >= 50ms');
  }
  if (typeof config.clicks !== 'number' || config.clicks <= 0) {
    throw new Error('Click count must be a positive integer');
  }
};

/**
 * Main processing loop for the autoclicker
 */
async function startClicking(config) {
  try {
    validateInput(config);
  } catch (err) {
    console.error('Validation failed:', err.message);
    return;
  }

  let remaining = config.clicks;
  
  console.log(`Starting ${remaining} clicks...`);

  while (remaining > 0) {
    // Simulate mouse event emission
    console.log(`Executing click. Remaining: ${--remaining}`);
    
    await new Promise(resolve => setTimeout(resolve, config.interval));
  }

  console.log('Task completed successfully');
}

module.exports = { startClicking };