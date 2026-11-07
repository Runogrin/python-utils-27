/**
 * Autoclicker Data Handler Module
 * Processes, validates, and formats click sequence profiles.
 */

class ClickProfileHandler {
  constructor(defaultOptions = {}) {
    this.defaultInterval = defaultOptions.defaultInterval || 100;
    this.maxClickRate = defaultOptions.maxClickRate || 1000;
  }

  /**
   * Validates and normalizes raw click action objects.
   * @param {Array<Object>} rawActions - List of user-configured click actions
   * @returns {Array<Object>} Sanitized click action array
   */
  processClickSequence(rawActions) {
    if (!Array.isArray(rawActions)) {
      throw new TypeError('Click sequence must be an array of action objects');
    }

    return rawActions.map((action, index) => {
      const x = Number.isInteger(action.x) && action.x >= 0 ? action.x : 0;
      const y = Number.isInteger(action.y) && action.y >= 0 ? action.y : 0;
      const button = ['left', 'right', 'middle'].includes(action.button) ? action.button : 'left';
      const interval = Math.max(10, Number(action.interval) || this.defaultInterval);
      const holdTime = Math.max(0, Number(action.holdTime) || 0);

      return {
        id: action.id || `click_${index}_${Date.now()}`,
        x,
        y,
        button,
        interval,
        holdTime,
        doubleClick: Boolean(action.doubleClick)
      };
    });
  }

  /**
   * Calculates total estimated duration for a click sequence profile.
   * @param {Array<Object>} sequence - Processed click sequence
   * @param {number} loopCount - Number of times sequence repeats
   * @returns {Object} Duration statistics in milliseconds
   */
  calculateSequenceStats(sequence, loopCount = 1) {
    if (!Array.isArray(sequence) || sequence.length === 0) {
      return { totalClicks: 0, totalDurationMs: 0 };
    }

    const singleLoopDuration = sequence.reduce((sum, item) => sum + item.interval + item.holdTime, 0);
    const loops = Math.max(1, loopCount);
    const totalClicks = sequence.length * loops;
    const totalDurationMs = singleLoopDuration * loops;

    return {
      totalClicks,
      totalDurationMs,
      avgIntervalMs: Math.round(singleLoopDuration / sequence.length),
      estimatedSeconds: (totalDurationMs / 1000).toFixed(2)
    };
  }
}

module.exports = { ClickProfileHandler };