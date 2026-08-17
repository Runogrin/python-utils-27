// Helper function to simulate a click at specified coordinates
function simulateClick(x, y) {
    const element = document.elementFromPoint(x, y);
    if (element) {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
    }
}

// Helper function to set a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to generate random coordinates within the viewport
function getRandomCoordinates() {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    return { x, y };
}

// Helper function to enable autoclicker
async function autoClicker(clicks, interval) {
    for (let i = 0; i < clicks; i++) {
        const { x, y } = getRandomCoordinates();
        simulateClick(x, y);
        await delay(interval);
    }
}

// Expose the helper functions
export { simulateClick, delay, getRandomCoordinates, autoClicker };