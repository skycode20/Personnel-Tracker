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
      choices: ["View All Employees", "View All Employees By Department", "View All Employees By Role", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Employees By Manager", "Add Role", "Remove Role", "EXIT"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions 
      if (answer.userWhatToDo === "View All Employees") {
        viewEmployeesAll();
      }
      else if (answer.userWhatToDo === "View All Employees By Department") {
        viewEmployeesByDept();
      }
      else if (answer.userWhatToDo === "View All Employees By Role") {
        viewEmployeesByRole();
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
      else if (answer.userWhatToDo === "View All Employees By Manager") {
        viewEmployeesByManager();
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
  console.log("Selecting employees by dept...\n");
  let userChoice = [];
  connection.query("SELECT department.dept_name FROM personnel_tracker_db.department", function (err, res) {
    if (err) throw err;
    let userChoice = new Map(res.map(n => ([n.dept_name, n.id])));
    let selectDept = Array.from(userChoice.keys());
    inquirer
      .prompt([{
        name: "deptSelection",
        type: "list",
        message: "Which role would you like to select?",
        choices: selectDept
      }]).then(function (answer) {
        connection.query(`SELECT *
          FROM personnel_tracker_db.employee 
          JOIN personnel_tracker_db.role
          ON personnel_tracker_db.employee.role_id=personnel_tracker_db.role.id
          JOIN personnel_tracker_db.department 
          ON personnel_tracker_db.role.dept_id=personnel_tracker_db.department.id
          WHERE personnel_tracker_db.department.dept_name = ?
          ORDER BY employee.id, first_name ASC`, answer.deptSelection, function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
          start();
          //   connection.end();
        });
      })
  })

}

function viewEmployeesByRole() {
  console.log("Selecting employees by role...\n");
  let userChoice = [];
  connection.query("SELECT role.title FROM personnel_tracker_db.role", function (err, res) {
    if (err) throw err;
    let userChoice = new Map(res.map(n => ([n.title, n.id])));
    let selectRole = Array.from(userChoice.keys());
    inquirer
      .prompt([{
        name: "roleSelection",
        type: "list",
        message: "Which role would you like to select?",
        choices: selectRole
      }]).then(function (answer) {
        connection.query(`SELECT *
          FROM personnel_tracker_db.employee 
          JOIN personnel_tracker_db.role
          ON personnel_tracker_db.employee.role_id=personnel_tracker_db.role.id
          JOIN personnel_tracker_db.department 
          ON personnel_tracker_db.department.id=personnel_tracker_db.role.dept_id
          WHERE personnel_tracker_db.role.title = ?
          ORDER BY employee.id, first_name ASC`, answer.roleSelection, function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
          start();
          //   connection.end();
        });
      })
  })

}

function addEmployee() {
  let selectedRole = [];
  connection.query("SELECT * FROM role", function (err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
          let roleList = result[i].title;
          selectedRole.push(roleList);
      };
      let selectedDept = [];
      connection.query("SELECT * FROM department", function (err, data) {
          if (err) throw err;
          for (let i = 0; i < data.length; i++) {
              let deptList = data[i].dept_name;
              selectedDept.push(deptList);
          }
          inquirer
              .prompt([
                  {
                      name: "empFirstName",
                      type: "input",
                      message: "Please enter the new employees first name:"
                  }, {
                      name: "empLastName",
                      type: "input",
                      message: "Please enter the new employees last name:"
                  },
                  {
                      name: "role_id",
                      type: "list",
                      message: "Select employee's role:",
                      choices: selectedRole
                  },
                  {
                      name: "dept_id",
                      type: "list",
                      message: "Select employee's department:",
                      choices: selectedDept
                  },
              ]).then(function (answer) {
                  let roleChosen;
                  for (let i = 0; i < result.length; i++) {
                      if (result[i].title === answer.role_id) {
                          roleChosen = result[i];
                      }
                  };
                  let deptChosen;
                  for (let i = 0; i < data.length; i++) {
                      if (data[i].dept_name === answer.dept_id) {
                          deptChosen = data[i];
                      }
                  };
                  //connection to insert response into database  
                  connection.query(
                      "INSERT INTO employee SET ?",
                      {
                          first_name: answer.empFirstName,
                          last_name: answer.empLastName,
                          role_id: roleChosen.id,
                          // dept_id: deptChosen.id
                      },
                      function (err) {
                          if (err) throw err;
                          console.log("Employee " + answer.empFirstName + " " + answer.empLastName + " added!");
                          start();
                      }
                  );
              })
      });
  })
};