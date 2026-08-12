// Core functionalities for the autoclicker

class AutoClicker {
    constructor(delay) {
        this.delay = delay || 1000; // default to 1000ms
        this.isActive = false;
        this.intervalId = null;
    }

    start() {
        if (this.isActive) return; // Prevent multiple activations
        this.isActive = true;
        this.intervalId = setInterval(() => this.click(), this.delay);
    }

    stop() {
        if (!this.isActive) return;
        clearInterval(this.intervalId);
        this.isActive = false;
    }

    click() {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        document.dispatchEvent(event);
    }

    setDelay(newDelay) {
        if (newDelay > 0) {
            this.stop(); // Stop previous interval
            this.delay = newDelay;
            if (this.isActive) {
                this.start(); // Restart with new delay
            }
        }
    }
}

// Usage example
const clicker = new AutoClicker(1000);

// Export for use
export default AutoClicker;
