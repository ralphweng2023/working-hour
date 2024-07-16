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
