/**
 * Autoclicker utility module for python-utils-27
 */

const click = (element) => {
  if (!element) return false;
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  return element.dispatchEvent(event);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getRandomInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const validateElement = (selector) => {
  const el = document.querySelector(selector);
  return el ? el : null;
};

/**
 * Orchestrates sequential clicks with jitter for bypass
 */
async function performAutomatedClicks(selectors, delayRange) {
  for (const selector of selectors) {
    const target = validateElement(selector);
    if (target) {
      click(target);
      const wait = getRandomInterval(delayRange.min, delayRange.max);
      await sleep(wait);
    }
  }
}

export { click, sleep, getRandomInterval, performAutomatedClicks };