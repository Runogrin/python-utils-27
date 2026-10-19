/**
 * Mouse and timing helper utilities for autoclicker
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const validateCoordinates = (x, y) => {
  const isNumber = (val) => typeof val === 'number' && !isNaN(val);
  return isNumber(x) && isNumber(y) && x >= 0 && y >= 0;
};

const getClickJitter = (base, variance) => {
  const jitter = getRandomInt(-variance, variance);
  return Math.max(0, base + jitter);
};

const formatTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
};

module.exports = {
  sleep,
  getRandomInt,
  validateCoordinates,
  getClickJitter,
  formatTimestamp
};