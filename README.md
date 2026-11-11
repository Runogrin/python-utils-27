# python-utils-27

A high-performance, cross-platform autoclicker built with Node.js and RobotJS. This tool provides precise mouse automation for repetitive tasks, testing, and productivity workflows.

## Features

*   **Configurable Interval Control:** Set millisecond-precise clicking speeds to match any application requirement.
*   **Smart Toggle System:** Use global keyboard shortcuts to start or stop automation instantly without switching windows.
*   **Multi-Button Support:** Select between left, right, or middle mouse button triggers with ease.
*   **Memory-Efficient Architecture:** Lightweight event loop implementation ensures minimal CPU impact during extended runtime.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Developer/python-utils-27.git
   cd python-utils-27
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

*(Note: RobotJS requires build tools installed on your system to compile native modules. See [robotjs.io](http://robotjs.io/) for OS-specific instructions.)*

## Usage

Run the autoclicker directly from your terminal:

```bash
node index.js --interval 100 --button left
```

### Options:
*   `--interval`: Delay between clicks in milliseconds (default: 500).
*   `--button`: Specify `left`, `right`, or `middle`.
*   `--toggle`: Set a custom key to enable/disable the clicker (default: `f6`).

To stop the process at any time, press `Ctrl + C` in your terminal.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.