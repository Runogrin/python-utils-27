/**
 * Retries an asynchronous function with exponential backoff.
 * Useful for stable network operations in the autoclicker.
 */
async function retryOperation(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = i === retries - 1;
      if (isLastAttempt) throw error;

      const backoff = delay * Math.pow(2, i);
      console.warn(`Attempt ${i + 1} failed. Retrying in ${backoff}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
}

/**
 * Helper for standardized fetch calls with retry logic
 */
async function fetchWithRetry(url, options = {}) {
  return await retryOperation(() => 
    fetch(url, options).then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
  );
}

module.exports = { retryOperation, fetchWithRetry };