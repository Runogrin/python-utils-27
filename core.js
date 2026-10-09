class PrecisionClicker {
  constructor(clickCallback, intervalMs = 100) {
    this.clickCallback = clickCallback;
    this.interval = intervalMs;
    this.isRunning = false;
    this.expected = 0;
    this.timeoutId = null;
  }

  setInterval(intervalMs) {
    // Ensure minimum interval is safe to prevent infinite rapid loops
    this.interval = Math.max(1, intervalMs);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.expected = performance.now() + this.interval;
    this.timeoutId = setTimeout(() => this._tick(), this.interval);
  }

  stop() {
    this.isRunning = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  _tick() {
    if (!this.isRunning) return;

    // Fire-and-forget execution to prevent blocking the scheduler
    this.clickCallback();

    // Calculate precise drift and compute dynamically adjusted interval
    const drift = performance.now() - this.expected;
    this.expected += this.interval;
    const nextDelay = Math.max(0, this.interval - drift);

    this.timeoutId = setTimeout(() => this._tick(), nextDelay);
  }
}

module.exports = PrecisionClicker;