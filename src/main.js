// src/main.js

const process = require('process');
const CalculateWorkingHoursService = require('./Application/CalculateWorkingHoursService');
const WorkingHoursRepository = require('./Infrastructure/Repository/WorkingHoursRepository');
const JsonFormatter = require('./Application/Formatter/JsonFormatter');
const SumCalculator = require('./Application/Calculator/SumCalculator');

const repository = new WorkingHoursRepository();

function calculateWorkingHours(startDate, endDate, hoursPerWeek, format) {
    let calculator = null;
    let formatter = null;

    switch (format) {
        case 'json':
            formatter = new JsonFormatter();
            break;
        case 'sum':
            calculator = new SumCalculator();
            break;
        default:
            console.error('Invalid format. Use "json" or "sum".');
            process.exit(1);
    }

    const service = new CalculateWorkingHoursService(repository, calculator, formatter);
    const result = service.calculate(startDate, endDate, hoursPerWeek);
    console.log(result);
}

const [,, startDate, endDate, hoursPerWeek, format] = process.argv;

if (!startDate || !endDate || !hoursPerWeek || !format) {
    console.error('Usage: node src/main.js <startDate> <endDate> <hoursPerWeek> <format>');
    process.exit(1);
}

calculateWorkingHours(startDate, endDate, hoursPerWeek, format);
