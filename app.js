const inquirer = require("inquirer");
const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

async function makeHTML() {
    try {
        inquirer
        .prompt([
            {
                type: "input",
                message:"What is the employee's name?"
                name:"username"
            },
            {
                type: "rawlist",
                message:"What role does this employee have?",
                choices: ["Manager", "Engineer", "Intern"],
                name: "role"
            },
            {
                type: "number",
                message: "What is this employee's id?",
                name: "id"
            },
        ])
        .then(function (response) {
            if (role === "Engineer") {
                try{
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "What is your github username?",
                                name = "github"
                            }
                        ])
                
            } else if (role === "Intern") {
                try{
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "What is the name of the school this intern attends?",
                                name = "school"
                            }
                        ])
                }

            } else if (role === "Manager") {
                try{
                    inquirer
                        .prompt([
                            {
                                type: "number",
                                message: "What is the office number of this manager?",
                                name = "officeNumber"
                            }
                        ])
                }

            }
        }
            .then(function (response) {
                
            })
        })
    }
}

// The project must generate a team.html page in the output directory, that displays a nicely formatted team roster. Each team member should display the following in no particular order:


// Name


// // Role


// ID


// Role-specific property (School, link to GitHub profile, or office number)