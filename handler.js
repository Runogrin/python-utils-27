const validateInput = (input) => {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Input must be a non-null object');
  }

  const { x, y, delay, clicks } = input;

  if (typeof x !== 'number' || !Number.isFinite(x) || x < 0) {
    throw new Error('x must be a non-negative finite number');
  }

  if (typeof y !== 'number' || !Number.isFinite(y) || y < 0) {
    throw new Error('y must be a non-negative finite number');
  }

  if (typeof delay !== 'number' || !Number.isFinite(delay) || delay <= 0) {
    throw new Error('delay must be a positive finite number');
  }

  if (typeof clicks !== 'number' || !Number.isFinite(clicks) || clicks <= 0 || !Number.isInteger(clicks)) {
    throw new Error('clicks must be a positive integer');
  }

  return true;
};

const simulateClick = (x, y) => {
  // In a real autoclicker, this would interact with the system
  // For this utility, we log the action
  console.log(`Performing click at coordinates (${x}, ${y})`);
};

const mainProcessingLoop = (inputQueue) => {
  if (!Array.isArray(inputQueue)) {
    console.error('Input queue must be an array');
    return;
  }

  console.log('Starting main processing loop with input validation');

  for (let i = 0; i < inputQueue.length; i++) {
    const currentInput = inputQueue[i];
    try {
      validateInput(currentInput);
      // Valid input, process the clicks
      for (let c = 0; c < currentInput.clicks; c++) {
        simulateClick(currentInput.x, currentInput.y);
        // Simulate delay without actual blocking
        // In production, use setTimeout or async
      }

      console.log(`Processed ${currentInput.clicks} clicks for input ${i}`);
    } catch (err) {
      console.error(`Invalid input at index ${i}: ${err.message}`);
      // Skip invalid inputs
    }
  }

  console.log('Main processing loop completed');
};

// Demonstration with sample data
const queue = [
  { x: 150, y: 250, delay: 500, clicks: 3 },
  { x: 300, y: 100, delay: 200, clicks: 5 },
  { x: 'invalid', y: 400, delay: 100, clicks: 2 },
  { x: 50, y: 50, delay: -10, clicks: 1 }
];

mainProcessingLoop(queue);