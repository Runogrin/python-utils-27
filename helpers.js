/**
 * Optimized event batching for autoclicker inputs
 * Uses requestAnimationFrame to prevent main thread blocking
 */

let pendingEvents = [];
let isProcessing = false;

export const queueClickEvent = (x, y) => {
  pendingEvents.push({ x, y, timestamp: Date.now() });
  if (!isProcessing) {
    requestAnimationFrame(flushClickEvents);
    isProcessing = true;
  }
};

const flushClickEvents = () => {
  const batch = [...pendingEvents];
  pendingEvents = [];
  isProcessing = false;

  // Execute clicks in batch to reduce context switching
  batch.forEach(event => {
    triggerNativeClick(event.x, event.y);
  });
};

const triggerNativeClick = (x, y) => {
  const element = document.elementFromPoint(x, y);
  if (element) {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    });
    element.dispatchEvent(event);
  }
};

export const calculateInterval = (baseDelay, jitter) => {
  return baseDelay + Math.floor(Math.random() * jitter);
};