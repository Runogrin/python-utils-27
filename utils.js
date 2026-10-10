/**
 * Core autoclicker utility module
 * Implements high-precision event throttling
 */

const CLICK_BUFFER_SIZE = 1000;
const eventQueue = new Array(CLICK_BUFFER_SIZE);
let queuePointer = 0;

/**
 * Throttled event processing to minimize CPU overhead
 */
function processEventQueue(clickAction) {
  if (queuePointer === 0) return;

  // Process batch to reduce context switching
  for (let i = 0; i < queuePointer; i++) {
    clickAction(eventQueue[i]);
  }

  queuePointer = 0;
}

/**
 * Optimized event registration
 */
function enqueueEvent(event) {
  if (queuePointer < CLICK_BUFFER_SIZE) {
    eventQueue[queuePointer++] = event;
  }
}

/**
 * Execution loop with requestAnimationFrame for frame synchronization
 */
function startEventLoop(callback) {
  const loop = () => {
    processEventQueue(callback);
    requestAnimationFrame(loop);
  };
  
  requestAnimationFrame(loop);
}

module.exports = {
  enqueueEvent,
  startEventLoop
};