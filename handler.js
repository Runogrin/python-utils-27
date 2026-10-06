/**
 * Handles user input and ensures click parameters remain valid
 */
const validateClickParams = (params) => {
  if (!params || typeof params !== 'object') {
    throw new Error('invalid click configuration object');
  }

  const { x, y, interval } = params;

  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('coordinates must be numeric values');
  }

  if (typeof interval !== 'number' || interval < 10) {
    throw new Error('interval must be at least 10ms');
  }

  return true;
};

export const executeClickSafe = async (robot, params) => {
  try {
    validateClickParams(params);
    await robot.moveMouse(params.x, params.y);
    await robot.mouseClick();
    return { success: true };
  } catch (err) {
    console.error(`[Autoclicker Error]: ${err.message}`);
    return { 
      success: false, 
      error: err.message, 
      timestamp: Date.now() 
    };
  }
};

export const handleProcessCleanup = (intervalId) => {
  try {
    if (intervalId) clearInterval(intervalId);
  } catch (err) {
    console.error('failed to clear process interval', err);
  }
};