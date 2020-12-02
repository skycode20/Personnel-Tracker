var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "personnel_tracker_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "userWhatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions 
        if (answer.userWhatToDo === "View All Employees") {
          viewEmployeesAll();
        }
        else if(answer.userWhatToDo === "View All Employees By Department") {
          viewEmployeesByDept();
        } 
        else if(answer.userWhatToDo === "EXIT") {
          connection.end();
        }
      });
  }