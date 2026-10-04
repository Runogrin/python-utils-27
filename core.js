const config = {
  interval: 100,
  running: false,
};

/**
 * Performs the click action at the given coordinates
 */
function performClick(x, y) {
  if (!config.running) return;
  console.log(`Clicking at: ${x}, ${y}`);
  // Simulating native click event
}

/**
 * Orchestrates the autoclicker main loop
 */
function startAutomation(x, y) {
  if (config.running) return;
  config.running = true;
  
  const loop = setInterval(() => {
    if (!config.running) {
      clearInterval(loop);
      return;
    }
    performClick(x, y);
  }, config.interval);
}

/**
 * Terminates active automation processes
 */
function stopAutomation() {
  config.running = false;
  console.log('Automation halted successfully');
}

module.exports = {
  startAutomation,
  stopAutomation,
  config
};