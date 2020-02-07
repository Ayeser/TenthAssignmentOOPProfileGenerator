const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const fs = require("fs");

var managerCards = [];
var engineerCards = [];
var internCards = [];
var finalDirectory = [];

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
                    createDirectoryFinal();
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
    teamComplete = [];
    if (managerCards.length > 0) {
        for(j=0;j<managerCards.length;j++) {
            teamComplete.push(managerCards[j]);
        }
    }
    if (engineerCards.length > 0){
        for(k=0;k<engineerCards.length;k++) {
            teamComplete.push(engineerCards[k]);
        }
    }
    if (internCards.length > 0) {
        for(l=0;l<internCards.length;l++) {
            teamComplete.push(internCards[l]);
        }
    }
    for (m=0;m<teamComplete.length;m++) {
        finalDirectory.push(teamComplete[m]);
    }
}

function createDirectoryFinal() {
    var stringFinalDirectory = ``;
    for (i=0;i<finalDirectory.length;i++) {
        stringFinalDirectory += `<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title"> ${JSON.stringify(finalDirectory[i])} </h5><h6 class="card-subtitle mb-2 text-muted"> ${JSON.stringify(finalDirectory[i].name)} </h6><p> ${JSON.stringify(finalDirectory[i].id)}</p><p>${JSON.stringify(finalDirectory[i].email)}</p><p>${JSON.stringify(finalDirectory[i][3])}</p>`;
    };
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
          </nav>` + stringFinalDirectory + `<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'></script><script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script></body><footer class='wrapper'></footer></html>`;
    console.log(directory);
    fs.appendFile("./output/directory.html", directory, err => {
        if(err) {
            console.log(err);
        }
        console.log("Success!");
    });
}

collectTeamInfo();


