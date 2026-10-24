/**
 * Core autoclicker execution module
 */
const performanceBuffer = new Float64Array(1000);
let bufferIndex = 0;

/**
 * Execution loop with optimized task scheduling
 */
function executeClick(target, interval) {
  const now = performance.now();

  // Cache timing data for drift compensation
  performanceBuffer[bufferIndex % 1000] = now;
  bufferIndex++;

  // RequestAnimationFrame allows for browser-synced execution
  // instead of high-frequency setInterval drifting
  const request = requestAnimationFrame(() => {
    try {
      target.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));
    } catch (err) {
      console.error('Click injection failure:', err);
    }
  });

  return request;
}

/**
 * Batch update to clear stale references
 */
function clearExecution(id) {
  cancelAnimationFrame(id);
}

module.exports = { executeClick, clearExecution };