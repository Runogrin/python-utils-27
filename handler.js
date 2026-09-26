/**
 * Retries an asynchronous operation with exponential backoff.
 * Used for stabilizing network requests in the autoclicker.
 */
async function retryNetworkOperation(fn, retries = 3, delay = 1000) {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const backoff = delay * Math.pow(2, i);
      console.warn(`Attempt ${i + 1} failed, retrying in ${backoff}ms...`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }

  throw lastError;
}

/**
 * Wrapper for fetch operations with retry support
 */
async function safeFetch(url, options = {}) {
  return await retryNetworkOperation(async () => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response;
  });
}

module.exports = { retryNetworkOperation, safeFetch };