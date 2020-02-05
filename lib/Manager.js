const Employee = require("./Employee.js");

class Manager {
    constructor(officeNumber) {
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;