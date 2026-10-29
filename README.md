[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# python-utils-27

`python-utils-27` is a high-performance, low-latency desktop autoclicker built in Node.js for precise cursor automation. Designed for testing environments, gaming, and repetitive UI workflows, it delivers hardware-level mouse event simulation with minimal CPU overhead.

## Features

- **Sub-Millisecond Precision:** Executes click loops at intervals down to 1ms with optional micro-jitter randomization to mimic organic human input.
- **Global Hotkey Intercepts:** Uses system-level key listeners (`Ctrl+Shift+S` to start, `Ctrl+Shift+X` to terminate) that respond globally, even when running minimized.
- **Multi-Button & Action Support:** Configurable targeting for left, right, and middle clicks with support for single, double, and sustained hold-and-drag actions.
- **Coordinate Locking:** Lock execution to fixed screen coordinates or let the engine follow dynamic cursor movement in real time.

## Installation

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and native build tools installed.

```bash
git clone https://github.com/Developer/python-utils-27.git
cd python-utils-27
npm install
```

## Usage

### Programmatic API

```javascript
const AutoClicker = require('./src/index');

const clicker = new AutoClicker({
  interval: 50,       // Time between clicks in ms
  button: 'left',     // 'left', 'right', or 'middle'
  jitter: 3,          // +/- 3ms random delay variation
  maxClicks: 500      // Set to 0 for infinite execution
});

// Start listening for global hotkeys
clicker.initHotkeys();
```

### Command Line Interface

Run directly from your terminal with custom flags:

```bash
npm start -- --interval=100 --button=left --coords=1920,1080
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
Created by **Developer**.