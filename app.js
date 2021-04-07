const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


const memberType = [];
const teamID = [];

//engineer

function nodeApp() {

function createEngineer() {
    console.log("Let's build your dream team!");
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
      },

      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's GitHub username?",
      },

      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
  
      }

    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerGithub, answers.engineerEmail);
      memberType.push(engineer);
      teamID.push(answers.engineerId);
      generateTeam();
    });
  }



  // inquirer to add more team members

  function generateTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Manager",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch (userChoice.memberChoice) {
        case "Manager":
          addManager();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          makeTeam();
      }
    });
  }


  // intern

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
      },

      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
      },

      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
      },

      {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?",
      }

    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      memberType.push(intern);
      teamID.push(answers.internId);
      generateTeam();
    });
  }

  // manager

  function addManager() {
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the team manager's name?",
      },

      {
        type: "input",
        name: "managerId",
        message: "What is the team manager's id?",
      },

      {
        type: "input",
        name: "managerEmail",
        message: "What is the team manager's email?",
      },

      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the team manager's office number?",
      }

    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      memberType.push(manager);
      teamID.push(answers.managerId);
      generateTeam();
    });
  }


  function makeTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createEngineer();

}

nodeApp();







// inquirer
//   .prompt([
//     {
//       name: "pizza_crust",
//       type: "list",
//       message: "Choose your crust:",
//       choices: ["Thin Crust", "Stuffed Crust", "Pan"],
//     },
//   ])
//   .then((answer) => {
//     console.log(answer.pizza_crust);
//   });