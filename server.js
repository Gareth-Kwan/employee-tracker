//Import and require modules needed for the project
const mysql = require("mysql2");
const connection = require("./config/connection");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3000;

//Inquirer function to begin the list of choices using SQL
function runInquirer() {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "1. View all department",
          "2. View all role",
          "3. View all employees",
          "4. View all employees by department",
          "5. View all employees by manager",
          "6. Add a department",
          "7. Add a role",
          "8. Add an employee",
          "9. Update employee role",
          "10. Update employee manager",
          "11. Delete a department",
          "12. Delete a role",
          "13. Delete an employee",
        ],
      },
    ])
    .then(({ choice }) => {
      console.log(choice);
      switch (choice) {
        case "1. View all department":
          viewAllDepartments();
          break;
        case "2. View all role":
          viewAllRoles();
          break;
        case "3. View all employees":
          viewAllEmployees();
          break;
        case "4. View all employees by department":
          viewAllEmployeesByDepartment();
          break;
        case "5. View all employees by manager":
          viewAllEmployeesByManager();
          break;
        case "6. Add a department":
          inquirer
            .prompt([
              {
                name: "Department",
                type: "input",
                message: "Please enter the name of the department you would like to add.",
                validate: (answer) => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                },
              },
            ])
            .then((answers) => {
              addADepartment(answers.Department);
              viewAllDepartments();
              runInquirer();
            });
          break;
        case "7. Add a role":
          inquirer
            .prompt([
              {
                name: "title",
                type: "input",
                message: "Please enter the title for this role.",
                validate: (answer) => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                },
              },
              {
                name: "salary",
                type: "input",
                message: "Please enter the salary for this role.",
              },
              {
                name: "department_id",
                type: "input",
                message: "Please enter the department id.",
              },
            ])
            .then((answers) => {
              addARole(answers.title, answers.salary, answers.department_id);
              viewAllRoles();
              runInquirer();
            });
          break;
        case "8. Add an employee":
          inquirer
            .prompt([
              {
                name: "first_name",
                type: "input",
                message: "Please enter the employee's first name.",
                validate: (answer) => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                },
              },
              {
                name: "last_name",
                type: "input",
                message: "Please enter the employee's last name.",
                validate: (answer) => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                },
              },
              {
                name: "role",
                type: "input",
                message: "Please enter what role is the employee in.",
              },
              {
                name: "manager",
                type: "input",
                message: "Please enter the employee ID that this employee reports to.",
              },
            ])
            .then((answers) => {
              addAnEmployee(answers.first_name, answers.last_name, answers.role, answers.manager);
              viewAllEmployees();
              runInquirer();
            });
          break;
        case "9. Update employee role":
          inquirer
            .prompt([
              {
                name: "id",
                type: "input",
                message: "Please enter the id of the employee you wish to update.",
              },
              {
                name: "role_id",
                type: "input",
                message: "Please enter the new role id of the employee.",
              },
            ])
            .then((answers) => {
              updateEmployeeRole(answers.role_id, answers.id);
              viewAllEmployees();
              runInquirer();
            });
          break;
        case "10. Update employee manager":
          inquirer
            .prompt([
              {
                name: "employee_id",
                type: "input",
                message: "Please enter the id of the employee you wish to update.",
              },
              {
                name: "manager_id",
                type: "input",
                message: "Please enter the updated manager id.",
              },
            ])
            .then((answers) => {
              updateEmployeeManager(answers.manager_id, answers.employee_id);
              viewAllEmployees();
              runInquirer();
            });
          break;
        case "11. Delete a department":
          inquirer
            .prompt([
              {
                name: "department_id",
                type: "input",
                message: "Please enter id of the department you wish to delete.",
              },
            ])
            .then((answers) => {
              deleteADepartment(answers.department_id);
              viewAllDepartments();
              runInquirer();
            });
          break;
        case "12. Delete a role":
          inquirer
            .prompt([
              {
                name: "role_id",
                type: "input",
                message: "Please enter id of the role you wish to delete.",
              },
            ])
            .then((answers) => {
              deleteARole(answers.role_id);
              viewAllRoles();
              runInquirer();
            });
          break;
        case "13. Delete an employee":
          inquirer
            .prompt([
              {
                name: "employee_id",
                type: "input",
                message: "Please enter id of the employee you wish to delete.",
              },
            ])
            .then((answers) => {
              deleteAnEmployee(answers.employee_id);
              viewAllEmployees();
              runInquirer();
            });
          break;
        default:
          runInquirer();
          break;
      }
    });
}
//--------------------------------------------View Section---------------------------------------
// View all departments
function viewAllDepartments() {
  //Setting the query for SQL as a variable so I could call it later in the function below
  let results = connection.query(
    "SELECT * FROM department;",

    function (error, results) {
      if (error) throw error;
      console.table(results);
      runInquirer();
    }
  );
}

// View all roles
function viewAllRoles() {
  let results = connection.query(
    "SELECT * FROM role;",

    function (error, results) {
      if (error) throw error;
      console.table(results);
      runInquirer();
    }
  );
}

// View all employees
function viewAllEmployees() {
  let results = connection.query(
    "SELECT * FROM employee;",

    function (error, results) {
      if (error) throw error;
      console.table(results);
      runInquirer();
    }
  );
}

// View all employees by department
function viewAllEmployeesByDepartment() {
  let results = connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.name as department FROM employee JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id;",

    function (error, results) {
      if (error) throw error;
      console.table(results);
      runInquirer();
    }
  );
}

// View all employees by manager
function viewAllEmployeesByManager() {
  let results = connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.name, employee.manager_id as department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id;",

    function (error, results) {
      if (error) throw error;
      console.table(results);
      runInquirer();
    }
  );
}

//--------------------------------------------Add Section---------------------------------------
// Add a department
function addADepartment(department) {
  let results = connection.query(
    "INSERT INTO department SET name = ?",
    [department],

    function (error, results) {
      if (error) throw error;
      return;
    }
  );
}

// Add a role
function addARole(title, salary, department_id) {
  let results = connection.query(
    "INSERT INTO role SET title = ?, salary = ?, department_id = ?",
    [title, salary, department_id],

    function (error, results) {
      if (error) throw error;
      return;
    }
  );
}

// Add an employee
function addAnEmployee(first_name, last_name, role, manager) {
  let results = connection.query(
    "INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?",
    [first_name, last_name, role, manager],

    function (error, results) {
      if (error) throw error;
      return;
    }
  );
}

//--------------------------------------------Update Section---------------------------------------
// Update employee role
function updateEmployeeRole(role_id, id) {
  let results = connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [role_id, id],

    function (error, results) {
      if (error) throw error;
    }
  );
}

// Update employee manager
function updateEmployeeManager(manager_id, employee_id) {
  let results = connection.query(
    "UPDATE employee SET manager_id = ? WHERE id = ?",
    [manager_id, employee_id],

    function (error, results) {
      if (error) throw error;
    }
  );
}

//--------------------------------------------Delete Section---------------------------------------
// Delete a department
function deleteADepartment(id) {
  let results = connection.query(
    "DELETE FROM department WHERE id = ?",
    [id],

    function (error, results) {
      if (error) throw error;
    }
  );
}

// Delete a role
function deleteARole(id) {
  let results = connection.query(
    "DELETE FROM role WHERE id = ?",
    [id],

    function (error, results) {
      if (error) throw error;
    }
  );
}

// Delete an employee
function deleteAnEmployee(id) {
  let results = connection.query(
    "DELETE FROM employee WHERE id = ?",
    [id],

    function (error, results) {
      if (error) throw error;
    }
  );
}

//Invoking the Inquirer function
runInquirer();
