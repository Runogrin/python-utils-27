const buffer = new Uint32Array(1024);
let cursor = 0;

/**
 * optimized event dispatcher for click events
 * uses shared memory buffer to reduce garbage collection pressure
 */
const handleEvent = (event) => {
  if (cursor >= 1024) {
    cursor = 0;
  }

  buffer[cursor++] = event.clientX;
  buffer[cursor++] = event.clientY;
  buffer[cursor++] = Date.now();

  if (cursor % 3 === 0) {
    processBatch(buffer.subarray(cursor - 3, cursor));
  }
};

/**
 * dispatches clicks via direct low-level binding
 */
function processBatch(data) {
  const [x, y, timestamp] = data;
  // native simulation path for performance
  try {
    document.elementFromPoint(x, y)?.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));
  } catch (err) {
    console.error('simulation failed at', timestamp, err);
  }
}

module.exports = { handleEvent };