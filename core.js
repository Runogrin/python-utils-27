/**
 * @typedef {Object} ClickConfig
 * @property {number} interval - Delay in ms
 * @property {number} duration - Max duration in ms
 */

/**
 * Executes a simulated click event at coordinates
 * @param {number} x - Horizontal position
 * @param {number} y - Vertical position
 * @returns {void}
 */
function simulateClick(x, y) {
  const element = document.elementFromPoint(x, y);
  if (element) {
    element.click();
  }
}

/**
 * Runs an autoclicker loop with interval enforcement
 * @param {number} x - Horizontal coordinate
 * @param {number} y - Vertical coordinate
 * @param {ClickConfig} config - Execution configuration
 * @returns {number} Interval identifier
 */
function startAutoclicker(x, y, config) {
  const startTime = Date.now();

  const intervalId = setInterval(() => {
    if (Date.now() - startTime > config.duration) {
      clearInterval(intervalId);
      return;
    }
    simulateClick(x, y);
  }, config.interval);

  return intervalId;
}

export { simulateClick, startAutoclicker };