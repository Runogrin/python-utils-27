/**
 * Manages autoclicker coordinate data and click intervals.
 */
class ClickManager {
  constructor() {
    this.registry = new Map();
  }

  /**
   * Adds a new click target with coordinate mapping.
   */
  registerTarget(id, x, y, interval) {
    if (interval < 50) throw new Error('Interval too low');
    this.registry.set(id, { x, y, interval, active: true });
  }

  /**
   * Serializes current state for local storage persistence.
   */
  exportConfiguration() {
    return JSON.stringify(Object.fromEntries(this.registry));
  }

  /**
   * Clears all registered click targets.
   */
  reset() {
    this.registry.clear();
  }

  /**
   * Validates coordinate bounds for simulated clicks.
   */
  validateBounds(width, height) {
    for (const [id, data] of this.registry) {
      if (data.x > width || data.y > height) {
        console.warn(`Target ${id} is out of display bounds`);
        return false;
      }
    }
    return true;
  }
}

module.exports = new ClickManager();