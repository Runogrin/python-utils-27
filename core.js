// Core functionality for the autoclicker
class AutoClicker {
    constructor(clickInterval) {
        this.clickInterval = clickInterval;
        this.intervalId = null;
    }

    start() {
        if (this.intervalId === null) {
            this.intervalId = setInterval(() => this.performClick(), this.clickInterval);
            console.log('AutoClicker started');
        }
    }

    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('AutoClicker stopped');
        }
    }

    performClick() {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        if (element) {
            element.dispatchEvent(event);
            console.log('Click performed');
        } else {
            console.log('No element found to click');
        }
    }
}

// Usage
const clicker = new AutoClicker(1000); // Click every second
// clicker.start(); // Uncomment to start clicking
// clicker.stop(); // Uncomment to stop clicking
