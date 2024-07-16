// src/Infrastructure/Repository/WorkingHoursRepository.js

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
