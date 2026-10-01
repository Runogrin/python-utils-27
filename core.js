/**
 * Performs a network operation with exponential backoff.
 * @param {Function} fn - Async function to execute.
 * @param {number} retries - Number of retry attempts.
 * @param {number} delay - Initial delay in milliseconds.
 */
async function retryNetworkOperation(fn, retries = 3, delay = 1000) {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries) {
        const backoff = delay * Math.pow(2, i);
        console.warn(`Attempt ${i + 1} failed. Retrying in ${backoff}ms...`);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw new Error(`Operation failed after ${retries} retries: ${lastError.message}`);
}

/**
 * Wrapper to safely execute click actions over network.
 */
async function safeClick(actionFn) {
  return await retryNetworkOperation(actionFn, 3, 500);
}

module.exports = {
  retryNetworkOperation,
  safeClick
};