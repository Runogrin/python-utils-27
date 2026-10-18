/**
 * Performs a validated click action for the autoclicker module
 * @param {number} x - Target x coordinate
 * @param {number} y - Target y coordinate
 */
function performClick(x, y) {
  try {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('Coordinates must be numeric values');
    }

    if (x < 0 || y < 0) {
      throw new RangeError('Coordinates cannot be negative');
    }

    // Simulated platform-specific click logic
    console.log(`Executing click at [${x}, ${y}]`);
    return { success: true, timestamp: Date.now() };
  } catch (error) {
    console.error(`Click failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Validates interval configuration for bot cycles
 * @param {number} ms - Delay in milliseconds
 */
function validateInterval(ms) {
  const MIN_DELAY = 50;
  
  if (!Number.isFinite(ms)) {
    throw new TypeError('Interval must be a finite number');
  }

  if (ms < MIN_DELAY) {
    console.warn(`Interval ${ms}ms too low, clamping to ${MIN_DELAY}ms`);
    return MIN_DELAY;
  }

  return ms;
}

module.exports = { performClick, validateInterval };