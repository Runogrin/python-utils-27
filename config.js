/**
 * Configuration and input validation for autoclicker loop
 */

const validateSettings = (settings) => {
  const errors = [];

  if (typeof settings.interval !== 'number' || settings.interval < 50) {
    errors.push('Interval must be a number >= 50ms');
  }

  if (typeof settings.button !== 'string' || !['left', 'right'].includes(settings.button)) {
    errors.push('Button must be either left or right');
  }

  if (!Number.isInteger(settings.iterations) || settings.iterations < 0) {
    errors.push('Iterations must be a non-negative integer');
  }

  return { valid: errors.length === 0, errors };
};

const runProcessingLoop = (settings) => {
  const validation = validateSettings(settings);
  
  if (!validation.valid) {
    console.error('Validation failed:', validation.errors.join(', '));
    return false;
  }

  console.log('Starting autoclicker with settings:', settings);
  
  let count = 0;
  const intervalId = setInterval(() => {
    if (settings.iterations > 0 && count >= settings.iterations) {
      clearInterval(intervalId);
      return;
    }
    
    // Simulate core click functionality
    console.log(`Click action executed: ${count + 1}`);
    count++;
  }, settings.interval);

  return true;
};

module.exports = { validateSettings, runProcessingLoop };