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
          "View all department",
          "View all role",
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
          "Update employee manager",
          "Delete a department",
          "Delete a role",
          "Delete an employee",
        ],
      },
    ])
    .then(({ choice }) => {
      console.log(choice);
      switch (choice) {
        case "View all department":
          viewAllDepartment();
          break;
        case "View all role":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllRoles();
          break;
        default:
          runInquirer();
          break;
      }
    });
}

// View all departments
function viewAllDepartment() {
  console.log("view all deparments was selected");
  let results = connection.query(
    "SELECT * FROM department;",

    function (error, department) {
      if (error) throw error;
      console.table(department);
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
    }
  );
}

runInquirer();
