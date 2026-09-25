/**
 * Autoclicker data handler utility
 * Manages click patterns and execution intervals
 */

const validateConfig = (config) => {
  const defaults = {
    interval: 100,
    jitter: 10,
    iterations: 0
  };

  return { ...defaults, ...config };
};

const serializeClickData = (data) => {
  try {
    return JSON.stringify({
      ...data,
      timestamp: Date.now(),
      version: '2.7.0'
    });
  } catch (err) {
    console.error('Serialization failed:', err);
    return null;
  }
};

const calculateRandomInterval = (base, jitter) => {
  const variance = Math.random() * jitter;
  return Math.max(10, base + (Math.random() > 0.5 ? variance : -variance));
};

module.exports = {
  validateConfig,
  serializeClickData,
  calculateRandomInterval
};