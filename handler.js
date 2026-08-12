const fetch = require('node-fetch');

const DEFAULT_RETRIES = 3;
const DEFAULT_DELAY = 1000;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options = {}, retries = DEFAULT_RETRIES, delayTime = DEFAULT_DELAY) {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed: ${error.message}`);
            if (attempts < retries) {
                await delay(delayTime);
            } else {
                throw new Error('Max retries reached.');
            }
        }
    }
}

module.exports = { fetchWithRetry };