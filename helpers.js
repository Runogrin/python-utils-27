/**
 * Executes a function with exponential backoff retries
 * @param {Function} fn - The function returning a promise
 * @param {number} retries - Number of retry attempts
 * @param {number} delay - Initial delay in ms
 */
async function withRetry(fn, retries = 3, delay = 1000) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < retries) {
        const backoff = delay * Math.pow(2, attempt);
        console.warn(`Attempt ${attempt + 1} failed, retrying in ${backoff}ms...`);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError;
}

module.exports = { withRetry };