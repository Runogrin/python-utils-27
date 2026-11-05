/**
 * Helper functions for python-utils-27 autoclicker operations
 */

// Generate a random integer within a range
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Execute a function with a randomized delay to simulate human jitter
const sleepWithJitter = (baseDelay, jitter = 50) => {
  const delay = baseDelay + getRandomInt(-jitter, jitter);
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, delay)));
};

// Format coordinates into a standardized position object
const createPosition = (x, y) => ({ x: Math.round(x), y: Math.round(y) });

// Validate coordinate boundaries against screen dimensions
const isWithinBounds = (pos, width, height) => {
  return pos.x >= 0 && pos.x <= width && pos.y >= 0 && pos.y <= height;
};

// Format timestamps for logger integration
const getTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
};

module.exports = {
  getRandomInt,
  sleepWithJitter,
  createPosition,
  isWithinBounds,
  getTimestamp
};