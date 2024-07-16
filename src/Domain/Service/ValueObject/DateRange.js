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
