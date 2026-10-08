/**
 * Validates autoclicker coordinates and intervals
 * Prevents execution with invalid user inputs
 */
const validateCoordinates = (x, y) => {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('Coordinates must be numerical values');
  }
  if (x < 0 || y < 0) {
    throw new Error('Coordinates cannot be negative');
  }
  return { x, y };
};

/**
 * Safely parses delay inputs to avoid engine stalls
 */
const parseClickInterval = (interval) => {
  const parsed = parseInt(interval, 10);
  if (isNaN(parsed) || parsed < 50) {
    console.warn('Interval below 50ms detected; resetting to 50ms safety floor');
    return 50;
  }
  return parsed;
};

/**
 * Wrapper for coordinate operations with boundary protection
 */
const getSafeExecutionData = (x, y, interval) => {
  try {
    const coords = validateCoordinates(x, y);
    const delay = parseClickInterval(interval);
    return { ...coords, delay };
  } catch (error) {
    console.error('Validation failed during configuration:', error.message);
    return null;
  }
};

module.exports = { getSafeExecutionData };