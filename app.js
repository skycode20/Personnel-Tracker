const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "CodingDreams2020!",
  database: "personnel_tracker_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
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
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions 
      if (answer.userWhatToDo === "View All Employees") {
        viewEmployeesAll();
      }
      else if (answer.userWhatToDo === "View All Employees By Department") {
        viewEmployeesByDept();
      }
      else if (answer.userWhatToDo === "View All Employees By Manager") {
        viewEmployeesByManager();
      }
      else if (answer.userWhatToDo === "Add Employee") {
        addEmployee();
      }
      else if (answer.userWhatToDo === "Remove Employee") {
        removeEmployee();
      }
      else if (answer.userWhatToDo === "Update Employee Role") {
        updateEmployeeRole();
      }
      else if (answer.userWhatToDo === "Update Employee Manager") {
        updateEmployeeManager();
      }
      else if (answer.userWhatToDo === "View All Roles") {
        viewAllRoles();
      }
      else if (answer.userWhatToDo === "Add Role") {
        addRole();
      }
      else if (answer.userWhatToDo === "Remove Role") {
        removeRole();
      }
      else if (answer.userWhatToDo === "EXIT") {
        connection.end();
      }
    });
}

function viewEmployeesAll() {
  console.log("Selecting all employees...\n");
  connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.dept_id, department.dept_name, role.salary
    FROM personnel_tracker_db.employee
    JOIN personnel_tracker_db.role
    ON personnel_tracker_db.employee.role_id=personnel_tracker_db.role.id
    JOIN personnel_tracker_db.department
    ON personnel_tracker_db.role.dept_id=personnel_tracker_db.department.id`, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
    //   connection.end();
  });
}

function viewEmployeesByDept() {
  console.log("Selecting employees by deparment...\n");
  let userChoice = [];
  connection.query("SELECT department.dept_name FROM personnel_tracker_db.department", function (err, res) {
    if (err) throw err;
    userChoice = res;
    inquirer
      .prompt([{
        name: "selectDept",
        type: "list",
        message: "Which department would you like to select?",
        choices: userChoice
      }]).then(function (answer) {
        connection.query(`SELECT employee.first_name, employee.last_name, department.dept_name AS department 
          FROM employee JOIN role ON employee.role_id = role.id 
          JOIN department ON role.dept_id = department.id 
          ORDER BY employee.id`, answer.selectDept, function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
          start();
          //   connection.end();
        });
      })
  })
}