# python-utils-27

A high-performance, cross-platform autoclicker built with Node.js and RobotJS. This tool enables automated mouse interactions for repetitive tasks, testing, and gaming scenarios with minimal resource overhead.

## Features

*   **Configurable Interval Control:** Set millisecond-precise clicking speeds to match any workflow requirement.
*   **Customizable Keybinds:** Toggle the autoclicker on and off using global hotkeys, ensuring seamless integration with your active window.
*   **Mouse Tracking Automation:** Supports fixed-coordinate clicking or dynamic follow-the-cursor modes.
*   **Low-Latency Engine:** Built on native bindings for immediate input response without input lag.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Developer/python-utils-27.git
   cd python-utils-27
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

*(Note: Requires build tools for your OS to compile RobotJS native modules: `npm install --global --production windows-build-tools` on Windows or `xcode-select --install` on macOS.)*

## Usage

Start the clicker with your preferred configuration via the command line:

```bash
# Start clicking every 100ms
node index.js --interval 100
```

To run it in your own scripts:

```javascript
const autoclicker = require('./lib/clicker');

// Initialize with 50ms delay
autoclicker.start({ interval: 50 });

// Stop after 10 seconds
setTimeout(() => {
    autoclicker.stop();
}, 10000);
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.