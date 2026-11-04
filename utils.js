/**
 * Safety and validation utilities for autoclicker operations.
 */

class AutoClickerError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AutoClickerError';
    this.code = code;
  }
}

/**
 * Validates click coordinates against target screen bounds.
 */
function validateCoordinates(x, y, bounds = { width: 1920, height: 1080 }) {
  if (typeof x !== 'number' || typeof y !== 'number' || Number.isNaN(x) || Number.isNaN(y)) {
    throw new AutoClickerError('Coordinates must be valid finite numbers', 'ERR_INVALID_COORDS');
  }

  if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) {
    throw new AutoClickerError(
      `Coordinates (${x}, ${y}) out of screen bounds [${bounds.width}x${bounds.height}]`,
      'ERR_OUT_OF_BOUNDS'
    );
  }

  return true;
}

/**
 * Safely executes a click callback with bounds and rate-limit error handling.
 */
function safeExecuteClick(clickFn, config = {}) {
  const { x, y, minIntervalMs = 10, intervalMs = 100 } = config;

  try {
    if (typeof clickFn !== 'function') {
      throw new AutoClickerError('Target action must be a callable function', 'ERR_INVALID_CALLBACK');
    }

    if (intervalMs < minIntervalMs) {
      throw new AutoClickerError(
        `Click interval ${intervalMs}ms violates safety floor of ${minIntervalMs}ms`,
        'ERR_INTERVAL_TOO_LOW'
      );
    }

    if (x !== undefined && y !== undefined) {
      validateCoordinates(x, y, config.bounds);
    }

    return { success: true, result: clickFn(x, y) };
  } catch (err) {
    const errorDetails = err instanceof AutoClickerError 
      ? err 
      : new AutoClickerError(err.message, 'ERR_UNKNOWN');
    
    return {
      success: false,
      error: {
        message: errorDetails.message,
        code: errorDetails.code,
        timestamp: Date.now()
      }
    };
  }
}

module.exports = {
  AutoClickerError,
  validateCoordinates,
  safeExecuteClick
};