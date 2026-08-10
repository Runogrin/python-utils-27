# python-utils-27

A robust collection of utility functions designed to simplify common operations in Python projects. Whether you're handling data processing, string manipulation, or file I/O, python-utils-27 provides essential tools to enhance productivity and code efficiency.

## Features

- **Data Handling Functions**: Effortlessly read, write, and manipulate CSV and JSON files with built-in methods tailored for common use cases.
- **String Manipulation Tools**: Simplify text processing with a suite of functions that support common tasks such as formatting, cleaning, and transformation.
- **Date and Time Utilities**: Work with date and time more effectively, featuring functions for parsing, formatting, and calculating time differences.
- **Enhanced Error Handling**: Implement sophisticated error handling with custom exceptions that provide more informative feedback during runtime.

## Installation

To get started with python-utils-27, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/Developer/python-utils-27.git
cd python-utils-27
pip install -r requirements.txt
```

## Basic Usage Example

Here’s a quick example of how to use `python-utils-27` in your project:

```python
from utils import file_ops, string_utils, date_utils

# Reading a JSON file
data = file_ops.read_json('data/sample.json')

# Transforming strings
cleaned_text = string_utils.clean_text("    Hello, World!   ")

# Formatting the current date
formatted_date = date_utils.format_date("2023-10-01", format="%B %d, %Y")

print(cleaned_text)  # Output: "Hello, World!"
print(formatted_date)  # Output: "October 01, 2023"
```

## License

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.