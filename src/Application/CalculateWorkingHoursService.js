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
