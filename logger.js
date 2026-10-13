/**
 * Logging utility for python-utils-27
 * Handles errors with process safety and state validation
 */

const logError = (error, context = 'default') => {
  if (!error) return;

  const timestamp = new Date().toISOString();
  const message = error instanceof Error ? error.message : String(error);

  const errorPayload = {
    timestamp,
    context,
    message,
    stack: error instanceof Error ? error.stack : null
  };

  console.error(`[${timestamp}] [${context}] ERROR:`, message);

  return errorPayload;
};

const validateInput = (input, type) => {
  if (typeof input !== type) {
    throw new TypeError(`Invalid input: expected ${type}, got ${typeof input}`);
  }
  return true;
};

const safeExecution = (fn, context) => {
  try {
    return fn();
  } catch (err) {
    logError(err, context);
    return null;
  }
};

module.exports = { logError, validateInput, safeExecution };