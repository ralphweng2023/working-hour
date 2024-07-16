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
