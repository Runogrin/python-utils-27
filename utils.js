/**
 * Performs an asynchronous operation with exponential backoff.
 * Designed for network-dependent autoclicker tasks.
 */
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt + 1} failed: ${error.message}`);
      
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
      }
    }
  }

  throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
}

/**
 * Wrapper for network calls to ensure robustness in unstable environments.
 */
async function fetchWithRetry(url, options = {}) {
  return retryOperation(async () => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  });
}

module.exports = { retryOperation, fetchWithRetry };