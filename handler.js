/**
 * Executes a network operation with exponential backoff.
 * @param {Function} fn - Async function to execute.
 * @param {number} retries - Max retry attempts.
 * @param {number} delay - Initial delay in milliseconds.
 */
async function withRetry(fn, retries = 3, delay = 1000) {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i === retries) break;

      // Exponential backoff calculation
      const backoff = delay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }

  throw lastError;
}

/**
 * Handles auto-clicker network requests with fault tolerance.
 */
async function handleNetworkRequest(requestTask) {
  try {
    return await withRetry(async () => {
      const response = await requestTask();
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response;
    });
  } catch (error) {
    console.error('Request failed after max retries:', error.message);
    throw error;
  }
}

module.exports = { withRetry, handleNetworkRequest };