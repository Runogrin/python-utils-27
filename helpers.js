/**
 * Helper functions for python-utils-27 autoclicker operations
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const validateCoordinates = (x, y) => {
  return typeof x === 'number' && typeof y === 'number' && x >= 0 && y >= 0;
};

const formatTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
};

const throttleAction = (callback, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return callback(...args);
    }
  };
};

module.exports = {
  sleep,
  getRandomInt,
  validateCoordinates,
  formatTimestamp,
  throttleAction
};