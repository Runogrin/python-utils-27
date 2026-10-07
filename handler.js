const eventQueue = [];
const MAX_BATCH_SIZE = 50;
let processing = false;

/**
 * Optimized event batching to minimize main thread blocking
 * in the autoclicker core loop.
 */
async function processBatch() {
  if (processing || eventQueue.length === 0) return;
  processing = true;

  const batch = eventQueue.splice(0, MAX_BATCH_SIZE);
  
  try {
    batch.forEach(event => {
      if (typeof event.action === 'function') {
        event.action(event.payload);
      }
    });
  } catch (err) {
    console.error('Batch processing error:', err);
  } finally {
    processing = false;
    if (eventQueue.length > 0) {
      setImmediate(processBatch);
    }
  }
}

function enqueueEvent(action, payload) {
  eventQueue.push({ action, payload });
  if (!processing) {
    processBatch();
  }
}

module.exports = { enqueueEvent };