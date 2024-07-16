const WorkingHours = require('../Model/WorkingHours');

class WorkingHoursCalculator {
    calculate(dateRange, hoursPerWeek) {
        const result = [];
        const days = dateRange.getDays();

        days.forEach(dayWorked => {
            let hoursWorked = hoursPerWeek / 5;
            if (dayWorked.getDay() === 0 || dayWorked.getDay() === 6) { // 0 = Sunday, 6 = Saturday
                // no work on weekends
                hoursWorked = 0;
            }

            result.push(new WorkingHours(dayWorked, hoursWorked));
        });

        return result;
    }
}

module.exports = WorkingHoursCalculator;
