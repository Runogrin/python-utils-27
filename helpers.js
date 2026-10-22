/**
 * Helper utilities for auto-clicker timing and screen coordinate management.
 */

// Stores active timing instances to ensure proper cleanup
const activeIntervals = new Set();

/**
 * Validates screen coordinates to ensure they fall within screen bounds.
 * @param {number} x - Horizontal coordinate
 * @param {number} y - Vertical coordinate
 * @param {Object} bounds - Screen width and height bounds
 * @returns {boolean} True if coordinates are valid
 */
function isValidCoordinate(x, y, bounds = { width: 1920, height: 1080 }) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    return false;
  }
  return x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;
}

/**
 * Calculates a randomized delay with jitter to simulate human clicks.
 * @param {number} baseDelay - Base delay in milliseconds
 * @param {number} jitterRatio - Variance percentage (0.0 to 1.0)
 * @returns {number} Calculated delay in milliseconds
 */
function calculateJitteredDelay(baseDelay, jitterRatio = 0.1) {
  const safeDelay = Math.max(10, baseDelay);
  const variance = safeDelay * Math.min(1, Math.max(0, jitterRatio));
  const offset = (Math.random() * 2 - 1) * variance;
  return Math.round(safeDelay + offset);
}

/**
 * Registers a tracked interval for controlled execution and safe cleanup.
 * @param {Function} callback - Task to execute periodically
 * @param {number} intervalMs - Execution period in milliseconds
 * @returns {number} The interval ID
 */
function registerManagedInterval(callback, intervalMs) {
  const intervalId = setInterval(callback, Math.max(1, intervalMs));
  activeIntervals.add(intervalId);
  return intervalId;
}

/**
 * Clears a specific managed interval and removes it from tracking.
 * @param {number} intervalId - Interval ID to clear
 */
function clearManagedInterval(intervalId) {
  if (activeIntervals.has(intervalId)) {
    clearInterval(intervalId);
    activeIntervals.delete(intervalId);
  }
}

/**
 * Stops all active intervals registered in the application state.
 */
function cleanupAllIntervals() {
  for (const intervalId of activeIntervals) {
    clearInterval(intervalId);
  }
  activeIntervals.clear();
}

module.exports = {
  isValidCoordinate,
  calculateJitteredDelay,
  registerManagedInterval,
  clearManagedInterval,
  cleanupAllIntervals
};