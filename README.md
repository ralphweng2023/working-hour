# Working Hour Calculator

## Introduction

The Working Hour Calculator is a Node.js application designed to calculate the working hours of employees over a specified date range. The application uses Domain-Driven Design (DDD) principles and adheres to SOLID principles to ensure a clean, maintainable, and scalable codebase.

## Installation

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd working-hour
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

To run the application, use the following command:

```bash
node src/main.js <startDate> <endDate> <hoursPerWeek> <format>

Parameters
startDate: The start date of the calculation period (e.g., 2020-12-20).
endDate: The end date of the calculation period (e.g., 2020-12-26).
hoursPerWeek: The number of hours worked per week (e.g., 40).
format: The output format. Use json for JSON formatted output or sum for the total sum of hours.
```

## Example Commands
JSON Output:

```
node src/main.js 2020-12-20 2020-12-26 40 json
```

Expected output:
```angular2html
[
  {"date":"2020-12-20T00:00:00.000Z","hours":0},
  {"date":"2020-12-21T00:00:00.000Z","hours":8},
  {"date":"2020-12-22T00:00:00.000Z","hours":8},
  {"date":"2020-12-23T00:00:00.000Z","hours":8},
  {"date":"2020-12-24T00:00:00.000Z","hours":8},
  {"date":"2020-12-25T00:00:00.000Z","hours":8},
  {"date":"2020-12-26T00:00:00.000Z","hours":0}
]

```

