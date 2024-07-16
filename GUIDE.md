Let's create a detailed learning guide for someone new to Domain-Driven Design (DDD) based on the structure and content we've discussed.

### DDD Learning Guide

## Introduction to Domain-Driven Design (DDD)

Domain-Driven Design (DDD) is an approach to software development that emphasizes collaboration between technical experts and domain experts to solve complex business problems. The goal is to create a shared understanding of the domain and design software that reflects the intricacies of the business.

## Project Overview

The `Working Hour Calculator` project is designed to calculate the working hours of employees over a specified date range. The project is organized using DDD principles and adheres to SOLID principles to ensure a clean, maintainable, and scalable codebase.

### Directory Structure

```
/working-hour
|-- /src
|   |-- /Application
|   |   |-- CalculateWorkingHoursService.js
|   |   |-- DTO
|   |       |-- WorkingHoursDTO.js
|   |   |-- Formatter
|   |       |-- IFormatter.js
|   |       |-- JsonFormatter.js
|   |   |-- Calculator
|   |       |-- ICalculator.js
|   |       |-- SumCalculator.js
|   |-- /Domain
|   |   |-- /Model
|   |   |   |-- Employee.js
|   |   |   |-- WorkingHours.js
|   |   |-- /Repository
|   |   |   |-- IWorkingHoursRepository.js
|   |   |-- /Service
|   |       |-- WorkingHoursCalculator.js
|   |       |-- ValueObject
|   |           |-- DateRange.js
|   |-- /Infrastructure
|   |   |-- /Repository
|   |       |-- WorkingHoursRepository.js
|-- /tests
|   |-- WorkingHoursCalculator.test.js
|-- main.js
|-- package.json
|-- package-lock.json
```

### Understanding the Structure

#### 1. `src/Application`

This layer contains application services, DTOs (Data Transfer Objects), formatters, and calculators. The application layer is responsible for orchestrating business operations and does not contain any domain logic.

- **CalculateWorkingHoursService.js**: Orchestrates the calculation and formatting of working hours.
- **DTO/WorkingHoursDTO.js**: Represents the data structure used to transfer working hours data between layers.
- **Formatter/IFormatter.js**: Interface for formatters.
- **Formatter/JsonFormatter.js**: Implementation of the formatter that outputs data in JSON format.
- **Calculator/ICalculator.js**: Interface for calculators.
- **Calculator/SumCalculator.js**: Implementation of the calculator that calculates the sum of working hours.

#### 2. `src/Domain`

This layer contains the core business logic, including domain models, repositories, and value objects. The domain layer is the heart of the application and contains rules and logic specific to the business.

- **Model/Employee.js**: Represents an employee.
- **Model/WorkingHours.js**: Represents the working hours for a specific date.
- **Repository/IWorkingHoursRepository.js**: Interface for the working hours repository.
- **Service/WorkingHoursCalculator.js**: Domain service that calculates working hours for a given date range.
- **Service/ValueObject/DateRange.js**: Value object representing a date range.

#### 3. `src/Infrastructure`

This layer contains implementations of repository interfaces and other infrastructure-related code. The infrastructure layer handles data storage, retrieval, and other technical concerns.

- **Repository/WorkingHoursRepository.js**: In-memory implementation of the working hours repository interface.

#### 4. `tests`

This folder contains test cases for the application. Testing ensures that the application behaves as expected and helps to maintain code quality.

- **WorkingHoursCalculator.test.js**: Test cases for the `WorkingHoursCalculator` domain service.

### Step-by-Step Guide to Understanding the Code

#### Step 1: Explore the Domain Layer

Start by understanding the core business logic in the domain layer.

1. **Employee.js**:
    ```javascript
    class Employee {
        constructor(id, name) {
            if (!id || !name) {
                throw new Error('Employee must have an id and a name.');
            }
            this.id = id;
            this.name = name;
        }

        getId() {
            return this.id;
        }

        getName() {
            return this.name;
        }
    }

    module.exports = Employee;
    ```

2. **WorkingHours.js**:
    ```javascript
    class WorkingHours {
        constructor(date, hours) {
            if (!(date instanceof Date)) {
                throw new Error('Date must be a valid Date object.');
            }
            if (typeof hours !== 'number' || hours < 0) {
                throw new Error('Hours must be a non-negative number.');
            }
            this.date = date;
            this.hours = hours;
        }

        getDate() {
            return this.date;
        }

        getHours() {
            return this.hours;
        }
    }

    module.exports = WorkingHours;
    ```

3. **DateRange.js**:
    ```javascript
    class DateRange {
        constructor(startDate, endDate) {
            if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
                throw new Error('Start date and end date must be valid Date objects.');
            }
            if (startDate > endDate) {
                throw new Error('Start date must be before or equal to end date.');
            }
            this.startDate = startDate;
            this.endDate = endDate;
        }

        getDays() {
            const days = [];
            for (let date = new Date(this.startDate); date <= this.endDate; date.setDate(date.getDate() + 1)) {
                days.push(new Date(date));
            }
            return days;
        }
    }

    module.exports = DateRange;
    ```

4. **WorkingHoursCalculator.js**:
    ```javascript
    const WorkingHours = require('../Model/WorkingHours');

    class WorkingHoursCalculator {
        calculate(dateRange, hoursPerWeek) {
            const result = [];
            const days = dateRange.getDays();

            days.forEach(dayWorked => {
                let hoursWorked = hoursPerWeek / 5;
                if (dayWorked.getDay() === 0 || dayWorked.getDay() === 6) { // 0 = Sunday, 6 = Saturday
                    hoursWorked = 0;
                }

                result.push(new WorkingHours(dayWorked, hoursWorked));
            });

            return result;
        }
    }

    module.exports = WorkingHoursCalculator;
    ```

#### Step 2: Explore the Application Layer

Understand how the application layer orchestrates business operations.

1. **CalculateWorkingHoursService.js**:
    ```javascript
    const WorkingHoursCalculator = require('../Domain/Service/WorkingHoursCalculator');
    const WorkingHoursDTO = require('./DTO/WorkingHoursDTO');
    const DateRange = require('../Domain/Service/ValueObject/DateRange');

    class CalculateWorkingHoursService {
        constructor(workingHoursRepository, calculator = null, formatter = null) {
            this.workingHoursRepository = workingHoursRepository;
            this.calculator = calculator;
            this.formatter = formatter;
        }

        calculate(startDate, endDate, hoursPerWeek) {
            const dateRange = new DateRange(new Date(startDate), new Date(endDate));
            const workingHoursCalculator = new WorkingHoursCalculator();
            const workingHours = workingHoursCalculator.calculate(dateRange, hoursPerWeek);
            const workingHoursDTOs = workingHours.map(wh => new WorkingHoursDTO(wh.date, wh.hours));

            if (this.calculator) {
                const calculatedResult = this.calculator.calculate(workingHoursDTOs);
                return calculatedResult;
            } else if (this.formatter) {
                return this.formatter.format(workingHoursDTOs);
            } else {
                throw new Error('No valid calculator or formatter provided.');
            }
        }
    }

    module.exports = CalculateWorkingHoursService;
    ```

2. **WorkingHoursDTO.js**:
    ```javascript
    class WorkingHoursDTO {
        constructor(date, hours) {
            this.date = date;
            this.hours = hours;
        }

        getDate() {
            return this.date;
        }

        getHours() {
            return this.hours;
        }
    }

    module.exports = WorkingHoursDTO;
    ```

3. **IFormatter.js**:
    ```javascript
    class IFormatter {
        format(data) {
            throw new Error('Method not implemented.');
        }
    }

    module.exports = IFormatter;
    ```

4. **JsonFormatter.js**:
    ```javascript
    const IFormatter = require('./IFormatter');

    class JsonFormatter extends IFormatter {
        format(data) {
            return JSON.stringify(data, null, 2); // Pretty print with 2-space indentation
        }
    }

    module.exports = JsonFormatter;
    ```

5. **ICalculator.js**:
    ```javascript
    class ICalculator {
        calculate(workingHoursDTOs) {
            throw new Error('Method not implemented.');
        }
    }

    module.exports = ICalculator;
    ```

6. **SumCalculator.js**:
    ```javascript
    const ICalculator = require('./ICalculator');

    class SumCalculator extends ICalculator {
        calculate(workingHoursDTOs) {
            return workingHoursDTOs.reduce((sum, dto) => sum + dto.hours, 0);
        }
    }

    module.exports = SumCalculator;
    ```

#### Step 3: Explore the Infrastructure Layer

Learn how the infrastructure layer handles data storage and retrieval.

1. **WorkingHoursRepository.js**:
    ```javascript


const IWorkingHoursRepository = require('../../Domain/Repository/IWorkingHoursRepository');

    class WorkingHoursRepository extends IWorkingHoursRepository {
        constructor() {
            super();
            this.data = new Map();
        }

        save(workingHours) {
            this.data.set(workingHours.getDate().toISOString(), workingHours);
        }

        findByDate(date) {
            return this.data.get(date.toISOString());
        }
    }

    module.exports = WorkingHoursRepository;
    ```

#### Step 4: Explore the Tests

Understand how to write test cases for the application.

1. **WorkingHoursCalculator.test.js**:
    ```javascript
    const assert = require('assert');
    const WorkingHoursCalculator = require('../src/Domain/Service/WorkingHoursCalculator');
    const DateRange = require('../src/Domain/Service/ValueObject/DateRange');

    describe('WorkingHoursCalculator', function() {
        it('should calculate working hours correctly', function() {
            const dateRange = new DateRange(new Date('2020-12-20'), new Date('2020-12-26'));
            const calculator = new WorkingHoursCalculator();
            const result = calculator.calculate(dateRange, 40);

            assert.strictEqual(result.length, 7);
            assert.strictEqual(result[0].getHours(), 0); // Sunday
            assert.strictEqual(result[1].getHours(), 8); // Monday
            assert.strictEqual(result[2].getHours(), 8); // Tuesday
            assert.strictEqual(result[3].getHours(), 8); // Wednesday
            assert.strictEqual(result[4].getHours(), 8); // Thursday
            assert.strictEqual(result[5].getHours(), 8); // Friday
            assert.strictEqual(result[6].getHours(), 0); // Saturday
        });
    });
    ```

### Running the Application

To run the application, use the following command:

```bash
node src/main.js <startDate> <endDate> <hoursPerWeek> <format>
```

For example:
- To get the working hours as a JSON format:
    ```bash
    node src/main.js 2020-12-20 2020-12-26 40 json
    ```

- To get the total sum of working hours:
    ```bash
    node src/main.js 2020-12-20 2020-12-26 40 sum
    ```

### Conclusion

By following this guide and exploring each layer of the application, you will gain a solid understanding of how to apply Domain-Driven Design (DDD) principles in a real-world project. Remember to keep the domain logic in the domain layer, orchestrate business operations in the application layer, and handle data storage and retrieval in the infrastructure layer. Happy learning!