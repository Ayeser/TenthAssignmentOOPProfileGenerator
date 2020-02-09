const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const fs = require("fs");

var managerCards = [];
var engineerCards = [];
var internCards = [];
var managerString = "";
var engineerString = ``;
var internString = ``;

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
                .then(function (respo) {
                    console.log("Manager " + response.username + " is now entered into the system.");
                    managerCards.push(new Manager(response.username, response.id, response.email, respo.officeNumber));
                    console.log(managerCards);
                    askIfMoreEmployees();
                })
            }

            if(response.role === "Engineer"){
                inquirer.prompt([{type:"input", message:"What is this engineer's github?", name: "github"}])
                .then(function (respon) {
                    console.log("Engineer " + response.username + " is now entered into the system.");
                    engineerCards.push(new Engineer(response.username, response.id, response.email, respon.github));
                    askIfMoreEmployees();
                })
            }

            if (response.role === "Intern") {
                inquirer.prompt([{type:"input", message:"What is this intern's school?", name: "school"}])
                .then(function (respond) {
                    console.log("Intern " + response.username + " is now entered into the system.");
                    internCards.push(new Intern(response.username, response.id, response.email, respond.school));
                    askIfMoreEmployees();
                })
            }
        })
        }

function askIfMoreEmployees() {
    inquirer
    .prompt([{type:"list", message:"Do you have more employees to enter into this team?", choices:["yes", "no"], name: "emplore"}])
    .then(function (resp) {
        if(resp.emplore === "yes") {
            collectTeamInfo();
        } else {
            console.log("Very well then, that team is done");
            createDirectoryFinal();
        }
    })
}

function createDirectoryFinal() {
    if (managerCards.length > 0) {
    for (i=0;i<managerCards.length;i++) {
        console.log(managerCards);
        managerString += "<div class='card' style='width: 18rem;'><div class='card-body'><h5 class='card-title'>Manager</h5><h6 class='card-subtitle mb-2 text-muted'> Name: " + managerCards[i].name + "</h6><p>Employee ID: " + managerCards[i].id + "</p><p>E-mail: " + managerCards[i].email + "</p><p>Office Number: " + managerCards[i].officeNumber + "</p>";
    };
    }

    if(engineerCards.length > 0) {
    for (j=0;j<engineerCards.length;j++) {
        console.log(engineerCards);
        engineerString += `<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">Engineer</h5><h6 class="card-subtitle mb-2 text-muted"> Name: ${engineerCards[j].name} </h6><p>Employee ID: ${engineerCards[j].id}</p><p>E-mail: ${engineerCards[j].email}</p><p>Github Username: ${engineerCards[j].github} </p>`;
    };}

    if(internCards.length > 0) {
    for (k=0;k<internCards.length;k++) {
        console.log(internCards);
        internString += `<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">Intern</h5><h6 class="card-subtitle mb-2 text-muted"> Name: ${internCards[k].name} </h6><p>Employee ID: ${internCards[k].id}</p><p>E-mail: ${internCards[k].email}</p><p>School: ${internCards[k].school} </p>`;
    };
}
    const directory = `<!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
          <title>Company Directory</title>
          <nav class="navbar navbar-light bg-light">
          <span class="navbar-brand mb-0 h1">Company Directory</span>
          </nav>` + managerString + engineerString + internString + `<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'></script><script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script></body><footer class='wrapper'></footer></html>`;
    console.log(directory);
    fs.appendFile("./directory.html", directory, err => {
        if(err) {
            console.log(err);
        }
        console.log("Success!");
    });
};

collectTeamInfo();


