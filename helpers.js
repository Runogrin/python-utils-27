// Function to validate input for autoclicker settings
function validateSettings(settings) {
    if (typeof settings !== 'object' || settings === null) {
        throw new Error('Invalid settings: must be an object');
    }
    if (typeof settings.interval !== 'number' || settings.interval <= 0) {
        throw new Error('Invalid interval: must be a positive number');
    }
    if (typeof settings.clicks !== 'number' || settings.clicks < 0) {
        throw new Error('Invalid clicks: must be a non-negative number');
    }
}

// Function to safely perform clicks
function performClick(element, settings) {
    try {
        validateSettings(settings);
        for (let i = 0; i < settings.clicks; i++) {
            if (element) {
                element.click();
            } else {
                throw new Error('Element not found for clicking');
            }
            if (i < settings.clicks - 1) {
                setTimeout(() => {}, settings.interval);
            }
        }
    } catch (error) {
        console.error('Error during clicking:', error);
    }
}

// Export the utility functions
module.exports = { validateSettings, performClick };