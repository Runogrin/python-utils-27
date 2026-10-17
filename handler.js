const robot = require('robotjs');

/**
 * Executes a click with input validation
 * and safe boundaries check
 */
function safeClick(x, y) {
  try {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('Coordinates must be numeric values');
    }

    const screenSize = robot.getScreenSize();

    if (x < 0 || y < 0 || x > screenSize.width || y > screenSize.height) {
      throw new Error(`Coordinates ${x}, ${y} out of screen bounds`);
    }

    robot.moveMouse(x, y);
    robot.mouseClick();
    return { success: true };

  } catch (err) {
    console.error(`Click execution failure: ${err.message}`);
    return { success: false, error: err.message };
  }
}

/**
 * Automated click loop with abort mechanism
 */
async function startClickLoop(x, y, interval) {
  if (interval < 50) {
    throw new Error('Interval below 50ms risks system instability');
  }

  let active = true;
  const timer = setInterval(() => {
    if (!active) clearInterval(timer);
    const result = safeClick(x, y);
    if (!result.success) active = false;
  }, interval);

  return () => { active = false; };
}

module.exports = { safeClick, startClickLoop };