// This module handles click events and autoclicker logic

/**
 * Represents an autoclicker handler.
 * This class manages the functionality of autoclicking operations.
 */
class AutoClickerHandler {
    /**
     * Initializes the autoclicker handler.
     * @param {HTMLElement} targetElement - The target element to autoclick.
     * @param {number} interval - Time interval between clicks in milliseconds.
     */
    constructor(targetElement, interval) {
        this.targetElement = targetElement;
        this.interval = interval;
        this.clickIntervalId = null;
    }

    /**
     * Starts autoclicking on the target element.
     */
    start() {
        if (!this.clickIntervalId) {
            this.clickIntervalId = setInterval(() => {
                this.targetElement.click();
            }, this.interval);
        }
    }

    /**
     * Stops autoclicking on the target element.
     */
    stop() {
        if (this.clickIntervalId) {
            clearInterval(this.clickIntervalId);
            this.clickIntervalId = null;
        }
    }

    /**
     * Updates the click interval for the autoclicker.
     * @param {number} newInterval - The new interval between clicks in milliseconds.
     */
    updateInterval(newInterval) {
        this.stop();
        this.interval = newInterval;
        this.start();
    }
}

// Example usage:
// const target = document.getElementById('click-target');
// const autoclicker = new AutoClickerHandler(target, 1000);
// autoclicker.start();
// autoclicker.updateInterval(500);
// autoclicker.stop();
