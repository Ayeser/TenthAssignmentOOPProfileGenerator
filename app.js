const inquirer = require("inquirer");
const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");

var managerCards = [];
var engineerCards = [];
var internCards = [];

function createStartOfHTML() {
    //create start of file
}

function collectTeamInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's name?",
                name: "username"
            },
            {
                type: "list",
                message: "What role does this employee have?",
                choices: ["Manager", "Engineer", "Intern"],
                name: "role"
            },
            {
                type: "number",
                message: "What is this employee's id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is this employee's email address?",
                name: "email"
            }
        ])
        .then(function (response) {
            if(response.role === "Manager"){
                inquirer.prompt([{type:"number", message:"What is this manager's office number?", name: "officeNumber"}])
                .then(function (res) {
                    console.log("Manager " + response.username + " is now entered into the system.");
                    managerCards.push(new Manager(response.username, response.id, response.email, res.officeNumber));
                    console.log(managerCards);
                    askIfMoreEmployees();
                })
            }

            if(response.role === "Engineer"){
                inquirer.prompt([{type:"input", message:"What is this engineer's github?", name: "github"}])
                .then(function (res) {
                    console.log("Engineer " + response.username + " is now entered into the system.");
                    engineerCards.push(new Engineer(response.username, response.id, response.email, res.github));
                    askIfMoreEmployees();
                })
            }

            if (response.role === "Intern") {
                inquirer.prompt([{type:"input", message:"What is this intern's school?", name: "school"}])
                .then(function (res) {
                    console.log("Intern " + response.username + " is now entered into the system.");
                    internCards.push(new Intern(response.username, response.id, response.email, res.school));
                    askIfMoreEmployees();
                })
            }
        })
        }

function askIfMoreEmployees() {
    inquirer
    .prompt([{type:"list", message:"Do you have more employees to enter into this team?", choices:["yes", "no"], name:"more"}])
    .then(function (responsive) {
        if(responsive.more === "yes") {
            collectTeamInfo();
        } else {
            console.log("Very well then, that team is done");
            inquirer
            .prompt([{type:"list", message:"Do you have an additional team to enter into this company's directory?", choices:["yes", "no"], name:"newTeam"}])
            .then(function (newTeamResponse) {
                if(newTeamResponse.newTeam === "yes") {
                    exportToHTML();
                    clearTeamInfo();
                    collectTeamInfo();
                } else {
                    console.log("Your directory is now complete.");
                    exportToHTML();
                    finalHTMLPiece();
                    clearTeamInfo();
                }
            })
        }
    })
}

function clearTeamInfo() {
    managerCards = [];
    engineerCards = [];
    internCards = [];
}

function exportToHTML() {
    teamComplete = []
    if (managerCards.length > 0) {
        teamComplete.push(managerCards);
    }
    if (engineerCards.length > 0){
        teamComplete.push(engineerCards);
    }
    if (internCards.length > 0) {
        teamComplete.push(internCards);
    }
    console.log("The team you just entered consists of: " + teamComplete);
}

function finalHTMLPiece() {
    //add final piece of HTML
}

createStartOfHTML();
collectTeamInfo();


