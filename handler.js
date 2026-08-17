function clickElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.click();
    } else {
        console.error('Element not found:', selector);
    }
}

function setClickInterval(selector, interval) {
    return setInterval(() => {
        clickElement(selector);
    }, interval);
}

function clearClickInterval(intervalId) {
    clearInterval(intervalId);
}

function simulateDoubleClick(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const evt = new MouseEvent('dblclick', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(evt);
    } else {
        console.error('Element not found for double click:', selector);
    }
}

// Exporting the functions for external use
export { clickElement, setClickInterval, clearClickInterval, simulateDoubleClick };