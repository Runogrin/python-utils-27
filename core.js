/**
 * Autoclicker sequence data handler for parsing and validating action queues.
 */

class ClickSequenceHandler {
  constructor(defaultConfig = {}) {
    this.minInterval = defaultConfig.minInterval || 10;
    this.maxInterval = defaultConfig.maxInterval || 10000;
    this.defaultButton = defaultConfig.defaultButton || 'left';
  }

  validateClickPoint(point) {
    if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') {
      throw new Error('Invalid coordinate format: x and y must be numbers');
    }
    return {
      x: Math.round(point.x),
      y: Math.round(point.y),
      button: ['left', 'right', 'middle'].includes(point.button) ? point.button : this.defaultButton
    };
  }

  parseSequence(rawSequence) {
    if (!Array.isArray(rawSequence)) {
      throw new TypeError('Click sequence must be an array of event objects');
    }

    return rawSequence.map((item, index) => {
      const point = this.validateClickPoint(item);
      const rawDelay = typeof item.delay === 'number' ? item.delay : 100;
      const delay = Math.min(Math.max(rawDelay, this.minInterval), this.maxInterval);

      return {
        id: index + 1,
        ...point,
        delay,
        holdDuration: item.holdDuration || 0
      };
    });
  }

  calculateTotalDuration(sequence) {
    return sequence.reduce((total, step) => total + step.delay + step.holdDuration, 0);
  }
}

module.exports = { ClickSequenceHandler };