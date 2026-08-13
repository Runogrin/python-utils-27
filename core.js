// Click coordinates for the autoclicker
const clickCoordinates = { x: 0, y: 0 };

// Function to simulate mouse click
function simulateClick(x, y) {
    const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: x,
        clientY: y
    });
    const element = document.elementFromPoint(x, y);
    if (element) {
        element.dispatchEvent(clickEvent);
    }
}

// Function to start autoclicking
function startAutoclick(delay, clicks) {
    let clickCount = 0;
    const intervalId = setInterval(() => {
        if (clickCount < clicks) {
            simulateClick(clickCoordinates.x, clickCoordinates.y);
            clickCount++;
        } else {
            clearInterval(intervalId);
        }
    }, delay);
}

// Function to set click coordinates
function setClickCoordinates(x, y) {
    clickCoordinates.x = x;
    clickCoordinates.y = y;
}

// Exporting functions for external use
export { simulateClick, startAutoclick, setClickCoordinates };