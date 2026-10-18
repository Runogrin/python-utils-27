# python-utils-27

A high-performance JavaScript-based autoclicker designed for rapid automation tasks. This utility leverages Node.js event loops to provide precise, low-latency clicking capabilities for desktop applications.

## Features

*   **Precision Timing:** Configure click intervals down to the millisecond using a non-blocking engine.
*   **Customizable Click Patterns:** Toggle between single-target clicking, burst modes, and randomized jitter intervals.
*   **Global Hotkey Support:** Bind start/stop functions to specific keyboard shortcuts for seamless integration during workflows.
*   **Smart Target Locking:** Automatically detect and lock onto specific screen coordinates or UI elements via pixel color matching.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended). Clone the repository and install the required dependencies:

```bash
git clone https://github.com/Developer/python-utils-27.git
cd python-utils-27
npm install
```

## Usage

You can launch the autoclicker by running the primary script. Customize the configuration in `config.json` before starting the execution:

```bash
# Basic start command
node index.js --interval 50 --button left
```

### Example Config (`config.json`)
```json
{
  "interval_ms": 100,
  "trigger_key": "F6",
  "randomize_delay": true,
  "max_clicks": 0
}
```

Once running, press your assigned `trigger_key` to activate the automation. Ensure you run your terminal with appropriate accessibility permissions (macOS/Windows) to allow the utility to control mouse events.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.