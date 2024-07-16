const ICalculator = require('./ICalculator');

class SumCalculator extends ICalculator {
    calculate(workingHoursDTOs) {
        return workingHoursDTOs.reduce((sum, dto) => sum + dto.hours, 0);
    }
}

module.exports = SumCalculator;
