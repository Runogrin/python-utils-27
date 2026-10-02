/**
 * Processes and validates click event configurations for the autoclicker module.
 */

function sanitizeClickConfig(config = {}) {
  const defaultConfig = {
    cps: 10,
    durationMs: 0,
    randomJitterMs: 5,
    mouseButton: 'left',
    hotkey: 'F6',
    maxClicks: 0
  };

  const merged = { ...defaultConfig, ...config };

  // Ensure CPS is within safe operational bounds (0.1 to 1000)
  merged.cps = Math.max(0.1, Math.min(Number(merged.cps) || 10, 1000));
  
  // Calculate base interval delay in milliseconds
  merged.intervalMs = Math.round(1000 / merged.cps);

  // Normalize jitter so it doesn't exceed half the click interval
  const maxJitter = Math.floor(merged.intervalMs / 2);
  merged.randomJitterMs = Math.max(0, Math.min(Number(merged.randomJitterMs) || 0, maxJitter));

  // Validate mouse button type
  const validButtons = ['left', 'right', 'middle'];
  if (!validButtons.includes(merged.mouseButton)) {
    merged.mouseButton = 'left';
  }

  // Ensure non-negative bounds for numerical limits
  merged.durationMs = Math.max(0, Number(merged.durationMs) || 0);
  merged.maxClicks = Math.max(0, Number(merged.maxClicks) || 0);

  return merged;
}

function calculateNextClickDelay(intervalMs, jitterMs) {
  if (!jitterMs) return intervalMs;
  const variation = (Math.random() * 2 - 1) * jitterMs;
  return Math.max(1, Math.round(intervalMs + variation));
}

function formatClickStats(totalClicks, elapsedTimeMs) {
  const seconds = elapsedTimeMs / 1000;
  const actualCps = seconds > 0 ? (totalClicks / seconds).toFixed(2) : '0.00';
  return {
    totalClicks,
    elapsedMs: elapsedTimeMs,
    averageCps: Number(actualCps)
  };
}

module.exports = {
  sanitizeClickConfig,
  calculateNextClickDelay,
  formatClickStats
};