const { performance } = require('perf_hooks');

class ClickEngine {
  constructor(options = {}) {
    this.interval = options.interval || 100;
    this.active = false;
    this.clickCount = 0;
    this.timerId = null;
    this.lastClickTime = 0;
    this.targetHandler = options.handler || (() => {});
  }

  // Pre-calculate timing drift to maintain stable click frequency
  start() {
    if (this.active) return;
    this.active = true;
    this.lastClickTime = performance.now();
    this.scheduleNextClick();
  }

  stop() {
    this.active = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  scheduleNextClick() {
    if (!this.active) return;

    const now = performance.now();
    const elapsed = now - this.lastClickTime;
    const nextDelay = Math.max(0, this.interval - (elapsed - this.interval));

    this.timerId = setTimeout(() => {
      this.executeClick();
    }, nextDelay);
  }

  executeClick() {
    if (!this.active) return;
    
    this.lastClickTime = performance.now();
    this.targetHandler();
    this.clickCount++;

    this.scheduleNextClick();
  }

  getStats() {
    return {
      active: this.active,
      clickCount: this.clickCount,
      interval: this.interval
    };
  }
}

module.exports = ClickEngine;