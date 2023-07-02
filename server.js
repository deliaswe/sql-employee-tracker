const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require('cfonts');

// Create a mySQL connection using the mysql2 package
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerDB",
});

// Connect to the mySQL server and database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database.");

    // Call the function to start the application
    start();
});

// Function to start the application of CFONTS
cfonts.say('Delia Young \nSQL Employee Tracker', {
    font: 'block',
    align: 'center',
    colors: ['pink'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
    gradient: false,
    independentGradient: false,
    transitionGradient: false,
    env: 'node'
});

// Function to start the application
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do? \n",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add an employee",
                "Add a department",
                "Add a role",
                "add a manager",
                "Update an employee role",
                "View employees by manager",
                "View employees by department",
                "Delete | employee | role | department",
                "View the total utilized budget of a department",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all employees":
                    viewEmployees();
                    break;

                case "View all departments":
                    viewDepartments();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "Add an employee":
                    addEmployee();
                    break;

                case "Add a department":
                    addDepartment();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Add a manager":
                    addManager();
                    break;

                case "Update an employee role":
                    updateRole();
                    break;

                    case "View employees by manager":
                        viewByManager();
                        break;

                    case "View employees by department":
                        viewByDepartment();
                        break;

                    case "Delete | employee | role | department":
                        deleteEmployee();
                        break;

                    case "View the total utilized budget of a department":
                        viewBudget();
                        break;

                case "Exit":
                    connection.end();
                    console.log("Goodbye!");
                    break;
            }
        });
}