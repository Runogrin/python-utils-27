/**
 * Core processing loop for the autoclicker module.
 * Validates click configuration before execution.
 */

function validateClickParams(params) {
  if (!params || typeof params !== 'object') {
    return { valid: false, reason: 'Invalid parameters object' };
  }

  const { interval, clickCount, position, button } = params;

  if (typeof interval !== 'number' || interval < 10 || interval > 3600000) {
    return { valid: false, reason: 'Interval must be between 10ms and 3600000ms' };
  }

  if (typeof clickCount !== 'number' || clickCount < 0) {
    return { valid: false, reason: 'Click count must be a non-negative integer' };
  }

  if (button && !['left', 'right', 'middle'].includes(button)) {
    return { valid: false, reason: 'Button must be left, right, or middle' };
  }

  if (position) {
    if (typeof position.x !== 'number' || typeof position.y !== 'number') {
      return { valid: false, reason: 'Position x and y coordinates must be numbers' };
    }
    if (position.x < 0 || position.y < 0) {
      return { valid: false, reason: 'Position coordinates cannot be negative' };
    }
  }

  return { valid: true };
}

async function processClickLoop(config, emitClick) {
  const validation = validateClickParams(config);
  if (!validation.valid) {
    throw new Error(`Execution rejected: ${validation.reason}`);
  }

  const { interval, clickCount, position, button = 'left' } = config;
  let executedClicks = 0;

  while (clickCount === 0 || executedClicks < clickCount) {
    emitClick({ position, button, index: executedClicks + 1 });
    executedClicks++;

    if (clickCount > 0 && executedClicks >= clickCount) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  return { completed: true, totalClicks: executedClicks };
}

module.exports = { validateClickParams, processClickLoop };