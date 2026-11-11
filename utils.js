/**
 * Autoclicker core utilities for python-utils-27
 */

const validateClickCoordinates = (x, y) => {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('Coordinates must be valid numbers');
  }
  if (x < 0 || y < 0) {
    throw new Error('Coordinates cannot be negative');
  }
};

const safeClickExecution = async (clickFn, x, y) => {
  try {
    validateClickCoordinates(x, y);
    return await clickFn(x, y);
  } catch (error) {
    console.error(`Click execution failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const delayExecution = (ms) => {
  if (!Number.isInteger(ms) || ms < 0) {
    console.warn('Invalid delay duration, defaulting to 100ms');
    ms = 100;
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
  validateClickCoordinates,
  safeClickExecution,
  delayExecution
};