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
