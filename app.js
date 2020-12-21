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
      choices: ["View All Employees", "View All Employees By Department", "View All Employees By Role", "Add Employee", "Add Role", "Add Department", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Employees By Manager", "Remove Employee", "Remove Role", "EXIT"]
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
      else if (answer.userWhatToDo === "Add Role") {
        addRole();
      }
      else if (answer.userWhatToDo === "Add Department") {
        addDept();
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
      else if (answer.userWhatToDo === "Remove Role") {
        removeRole();
      }
      else if (answer.userWhatToDo === "EXIT") {
        connection.end();
      }
    });
}

function viewEmployeesAll() {
  console.log("\nSelecting all employees...\n");
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
  console.log("\nSelecting employees by dept...\n");
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
  console.log("\nSelecting employees by role...\n");
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
          };
          // let selectedManager = [];
          // connection.query("SELECT * FROM employee", function (err, data) {
          //   if (err) throw err;
          //   for (let i = 0; i < data.length; i++) {
          //       let empList = data[i].first_name + " " + data[i].last_name;
          //       selectedManager.push(empList);
          //   };
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
                  // {
                  //     name: "manager_id",
                  //     type: "list",
                  //     message: "Select employee's manager:",
                  //     choices: selectedManager
                  // },
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
                  // let managerChosen;
                  // for (let i = 0; i < data.length; i++) {
                  //     if (data[i].id === answer.manager_id) {
                  //         managerChosen = data[i];
                  //     }
                  // };
                  //connection to insert response into database  
                  connection.query(
                      "INSERT INTO employee SET ?",
                      {
                          first_name: answer.empFirstName,
                          last_name: answer.empLastName,
                          role_id: roleChosen.id,
                          // manager_id: managerChosen.manager_id
                      },
                      function (err) {
                          if (err) throw err;
                          console.log("\nEmployee " + answer.empFirstName + " " + answer.empLastName + " added!\n");
                          start();
                      }
                  );
              })
      });
  })
};

function addRole() {
  inquirer
      .prompt([{
          name: "roleName",
          type: "input",
          message: "Please enter the role you would like to add:"
      }, {
          name: "roleSalary",
          type: "input",
          message: "Please enter the salary of this position:"
        }, {
          name: "roleDepartment", 
          type: "input",
          message: "Please enter the department id number of this role:"
      }]).then(function (answer) {

          connection.query(
              "INSERT INTO role SET ?",
              {
                  title: answer.roleName,
                  salary: answer.roleSalary,
                  dept_id: answer.roleDepartment
              },
              function (err, res) {
                  if (err) throw err;
                  console.log("\nThe " + answer.roleName + " role was successfully added!\n")
                  start();
              }
          );          
      })
};

function addDept() {
  inquirer
      .prompt({
          name: "departmentName",
          type: "input",
          message: "Please enter the department would you like to add:",
      }).then(function (answer) {
          connection.query(
              "INSERT INTO department SET ?",
              { 
                dept_name: answer.departmentName 
              },
              function (err, res) {
                if (err) throw err;
                console.log("The " + answer.departmentName + " department was successfully added!")
                start();
            }
          );
      })
};

function removeEmployee() {
  let employeeSelection = [];
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
          let empList = res[i].name;
          employeeSelection.push(empList);
      };

      inquirer
          .prompt([
              {
                  name: "employee_id",
                  type: "list",
                  message: "Select the employee you would like to remove:",
                  choices: employeeSelection
              },
          ])
          .then(function (answer) {

              let employeeChosen;
              for (let i = 0; i < res.length; i++) {
                  if (res[i].name === answer.employee_id) {
                      employeeChosen = res[i];
                  }
              };

              connection.query(
                  "DELETE FROM employee WHERE id=?",
                  [employeeChosen.id],

                  function (err) {
                      if (err) throw err;
                      console.log("\nThe employee was successfully removed. Good Luck!\n");
                      start();
                  }
              );
          });
  })
};


function updateEmployeeRole() {
  connection.query(
      "SELECT employee.first_name, employee.id FROM personnel_tracker_db.employee",
      null,
      function (err, results) {
          if (err) throw err;        
          let personnelArray = new Map(results.map(a => ([a.first_name, a.id])));

          connection.query(
              "SELECT role.title, role.id FROM personnel_tracker_db.role",
              null,
              function (err, data) {
                  if (err) throw err;

                  let rolesArray = new Map(data.map(b => ([b.title, b.id])));
                  inquirer
                      .prompt([{
                          name: "changeEmpRole",
                          type: "list",
                          message: "Please select the employee's role you would like to change:",
                          choices: Array.from(personnelArray.keys()),
                      }, {
                          name: "newEmpRole",
                          type: "list",
                          message: "Please enter the employee's new role:",
                          choices: Array.from(rolesArray.keys()),
                      }]).then(function (answer) {
                          connection.query(
                              "UPDATE personnel_tracker_db.employee SET role_id = ? WHERE id = ?",
                              [rolesArray.get(answer.newEmpRole), personnelArray.get(answer.changeEmpRole)],
                              function (err) {
                                  if (err) throw err;
                                  console.log("\nThe employee's role was successfully updated!\n");
                                  start();
                              }
                          );
                      }
                      )
              }
          );
      })
};