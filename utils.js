/**
 * Main processing loop for autoclicker input events.
 * Validates configuration parameters before executing mouse actions.
 */

function validateClickConfig(config) {
  if (!config || typeof config !== 'object') {
    return { valid: false, reason: 'Invalid configuration object' };
  }

  const { x, y, intervalMs, button, repeatCount } = config;

  if (typeof x !== 'number' || x < 0 || !Number.isInteger(x)) {
    return { valid: false, reason: 'X coordinate must be a non-negative integer' };
  }

  if (typeof y !== 'number' || y < 0 || !Number.isInteger(y)) {
    return { valid: false, reason: 'Y coordinate must be a non-negative integer' };
  }

  if (typeof intervalMs !== 'number' || intervalMs < 10 || intervalMs > 3600000) {
    return { valid: false, reason: 'Interval must be between 10ms and 3,600,000ms' };
  }

  const validButtons = ['left', 'right', 'middle'];
  if (!validButtons.includes(button)) {
    return { valid: false, reason: `Button must be one of: ${validButtons.join(', ')}` };
  }

  if (typeof repeatCount !== 'number' || repeatCount < 0) {
    return { valid: false, reason: 'Repeat count must be a non-negative number' };
  }

  return { valid: true };
}

function processClickQueue(queue, clickExecutor) {
  const results = { processed: 0, skipped: 0, errors: [] };

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const validation = validateClickConfig(item);

    if (!validation.valid) {
      results.skipped++;
      results.errors.push(`Item ${i}: ${validation.reason}`);
      continue;
    }

    try {
      clickExecutor(item);
      results.processed++;
    } catch (err) {
      results.errors.push(`Item ${i} execution error: ${err.message}`);
    }
  }

  return results;
}

module.exports = { validateClickConfig, processClickQueue };