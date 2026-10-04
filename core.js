const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Executes a function with exponential backoff for network operations
 * @param {Function} fn - The network operation to execute
 * @param {number} retries - Number of retry attempts
 * @param {number} backoff - Initial delay in milliseconds
 */
async function retryNetworkOp(fn, retries = 3, backoff = 1000) {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i === retries) break;

      const waitTime = backoff * Math.pow(2, i);
      console.warn(`Retry ${i + 1}/${retries} after ${waitTime}ms error: ${err.message}`);
      await delay(waitTime);
    }
  }

  throw lastError;
}

module.exports = { retryNetworkOp };