/**
 * Core autoclicker utility functions for python-utils-27
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const clickElement = (selector) => {
  const el = document.querySelector(selector);
  if (el) {
    el.click();
    return true;
  }
  return false;
};

const humanizeDelay = (baseDelay, jitter = 100) => {
  return baseDelay + getRandomInt(-jitter, jitter);
};

const waitForElement = async (selector, timeout = 5000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (document.querySelector(selector)) return true;
    await sleep(200);
  }
  return false;
};

module.exports = {
  sleep,
  getRandomInt,
  clickElement,
  humanizeDelay,
  waitForElement
};