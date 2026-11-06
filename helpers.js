/**
 * Executes a function with exponential backoff for network resilience
 * @param {Function} fn - The asynchronous function to retry
 * @param {number} retries - Maximum number of attempts
 * @param {number} delay - Initial delay in milliseconds
 */
async function withRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    console.warn(`Operation failed, retrying in ${delay}ms... Attempts left: ${retries}`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return withRetry(fn, retries - 1, delay * 2);
  }
}

/**
 * Wrapper for fetch requests with automatic retry logic
 */
async function fetchWithRetry(url, options = {}, retries = 3) {
  return withRetry(async () => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response;
  }, retries);
}

module.exports = {
  withRetry,
  fetchWithRetry
};