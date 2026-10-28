/**
 * Mouse event simulation and timing helpers
 * for python-utils-27 automation tasks
 */

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const clickAt = (robot, x, y) => {
  robot.moveMouse(x, y);
  robot.mouseClick();
};

const clickWithVariance = async (robot, x, y, variance = 5) => {
  const targetX = x + getRandomInt(-variance, variance);
  const targetY = y + getRandomInt(-variance, variance);
  
  robot.moveMouseSmooth(targetX, targetY);
  await sleep(getRandomInt(50, 150));
  robot.mouseClick();
};

const isRunningInsideScreen = (x, y, screenSize) => {
  return x >= 0 && x <= screenSize.width && y >= 0 && y <= screenSize.height;
};

module.exports = {
  getRandomInt,
  sleep,
  clickAt,
  clickWithVariance,
  isRunningInsideScreen
};