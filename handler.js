class ClickHandler {
  constructor(config = {}) {
    this.maxRetries = config.maxRetries || 3;
    this.screenBounds = config.screenBounds || { width: 1920, height: 1080 };
  }

  validateCoordinates(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new TypeError(`Coordinates must be numbers. Received x: ${typeof x}, y: ${typeof y}`);
    }
    if (Number.isNaN(x) || Number.isNaN(y)) {
      throw new Error('Coordinates cannot be NaN');
    }
    if (x < 0 || y < 0 || x > this.screenBounds.width || y > this.screenBounds.height) {
      throw new RangeError(`Coordinates (${x}, ${y}) are out of screen bounds (${this.screenBounds.width}x${this.screenBounds.height})`);
    }
  }

  validateInterval(interval) {
    if (typeof interval !== 'number' || Number.isNaN(interval)) {
      throw new TypeError('Click interval must be a valid number');
    }
    if (interval < 10) {
      throw new RangeError('Click interval must be at least 10ms to prevent system lockup');
    }
  }

  safeExecuteClick(clickFn, target) {
    try {
      if (typeof clickFn !== 'function') {
        throw new TypeError('Executor parameter must be a valid function');
      }
      if (!target || typeof target !== 'object') {
        throw new Error('Target position object is required');
      }

      this.validateCoordinates(target.x, target.y);
      if (target.interval !== undefined) {
        this.validateInterval(target.interval);
      }

      const result = clickFn(target.x, target.y);
      return { success: true, result };
    } catch (err) {
      return {
        success: false,
        error: err.message,
        type: err.name,
        timestamp: Date.now()
      };
    }
  }
}

module.exports = ClickHandler;