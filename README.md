# python-utils-27

A high-performance JavaScript-based autoclicker designed for rapid automation and task efficiency. This utility provides a streamlined, non-blocking interface to simulate mouse events with customizable intervals and trigger patterns.

## Features

*   **Configurable CPS:** Dynamically adjust clicks per second via a real-time slider or command-line arguments.
*   **Targeted Coordinates:** Precise X/Y coordinate support to lock the autoclicker onto specific UI elements.
*   **Intelligent Toggle:** Seamless start/stop functionality using global hotkeys that remain active while the application is minimized.
*   **Humanization Engine:** Randomized click-delay patterns to bypass simple anti-automation detection scripts.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

```bash
# Clone the repository
git clone https://github.com/Developer/python-utils-27.git

# Navigate to the project directory
cd python-utils-27

# Install dependencies
npm install

# Build the automation wrapper
npm run build
```

## Basic Usage

Run the utility directly from your terminal by specifying the target interval (in milliseconds).

```bash
# Perform a click every 100ms
node index.js --interval 100 --x 500 --y 500
```

To enable the interactive UI mode for visual control, run:

```bash
npm start
```

Once running, press `F6` to toggle clicking and `F7` to terminate the process.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.