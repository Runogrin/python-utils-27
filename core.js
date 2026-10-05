const { performance } = require('perf_hooks');

class HighPrecisionClicker {
  constructor(options = {}) {
    this.intervalMs = options.intervalMs || 100;
    this.maxClicks = options.maxClicks || Infinity;
    this.clickCount = 0;
    this.isRunning = false;
    this._timerId = null;
    this._lastTick = 0;
  }

  // Optimized loop using high-resolution performance timers to prevent time drift
  start(callback) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.clickCount = 0;
    this._lastTick = performance.now();

    const tick = () => {
      if (!this.isRunning || this.clickCount >= this.maxClicks) {
        this.stop();
        return;
      }

      const now = performance.now();
      const elapsed = now - this._lastTick;

      if (elapsed >= this.intervalMs) {
        // Adjust last tick time to compensate for execution lag
        this._lastTick = now - (elapsed % this.intervalMs);
        this.clickCount++;
        
        callback({
          id: this.clickCount,
          timestamp: now
        });
      }

      // Use setImmediate for sub-millisecond check granularity
      this._timerId = setImmediate(tick);
    };

    this._timerId = setImmediate(tick);
  }

  stop() {
    this.isRunning = false;
    if (this._timerId) {
      clearImmediate(this._timerId);
      this._timerId = null;
    }
  }

  updateInterval(newIntervalMs) {
    if (typeof newIntervalMs === 'number' && newIntervalMs > 0) {
      this.intervalMs = newIntervalMs;
    }
  }
}

module.exports = HighPrecisionClicker;