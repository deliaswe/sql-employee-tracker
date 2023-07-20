const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require('cfonts');

// Create a mySQL connection using the mysql2 package
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "BMWMercedes2020",
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
    colors: ['candy'],
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

                case "add a manager":
                    addManager();
                    break;

                case "Update an employee role":
                    updateEmployeeRole();
                    break;

                case "View employees by manager":
                    viewEmployeesByManager();
                    break;

                case "View employees by department":
                    viewEmployeesByDepartment();
                    break;

                case "Delete | employee | role | department":
                    deleteEmployeeRoleDepartment();
                    break;

                case "View the total utilized budget of a department":
                    viewTotalBudget();
                    break;

                case "Exit":
                    connection.end();
                    console.log("Goodbye!");
                    break;
            }
        });
}

// Function to view all departments
function viewDepartments() {
    const query = "SELECT * FROM departments";

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
}

// Function to view all roles
function viewRoles() {
    const query = `SELECT 
    roles.title, 
    roles.id, 
    departments.department_name, 
    roles.salary 
    FROM 
    roles 
    LEFT JOIN departments ON roles.department_id = departments.id`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
}

// Function to view all employees
function viewEmployees() {
    const query = `SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    departments.department_name AS department, 
    roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM 
    employees 
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees manager ON manager.id = employees.manager_id`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
}

// Function to add an a department
function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the department you would like to add?",
        })
        .then((answer) => {
            console.log(answer);
            const query = "INSERT INTO departments (department_name) VALUES (?)";
            connection.query(query,[answer.department], (err, res) => {
                if (err) throw err;
                console.log("Department added.");
                start();
            }
            );
        });
}

// Function to add a role
function addRole() {
    const query = `SELECT * FROM departments`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What is the name of the role you would like to add?",
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary of the role you would like to add?",
                },
                {
                    name: "department",
                    type: "list",
                    message: "Which department does this role belong to?",
                    choices: res.map((department) => department.department_name),
                },
            ])
            .then((answer) => {
                const department = res.find(
                    (department) => department.department_name === answer.department
                );
                const query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
                connection.query(
                    query,
                    [answer.title, answer.salary, department.id],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Role added.");
                        start();
                    }
                );
            }
            );
    }
    );
}

// Function to add an employee
function addEmployee() {
    connection.query("SELECT id, title FROM roles", (error, roles) => {
        if (error) {
            console.error(error);
            return;
        }
        const role = roles.map((role) => {
            return {
                name: role.title,
                value: role.id,
            };
        }
        );

// Retrieve all employees from the database
connection.query("SELECT id, first_name, last_name FROM employees", (error, results) => {
    if (error) {
        console.error(error);
        return;
    }
    const manager = results.map((employee) => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        };
    }
    );
    manager.push({ name: "None", value: null });

    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "role_id",
                type: "list",
                message: "What is the employee's role?",
                choices: role,
            },
            {
                name: "manager_id",
                type: "list",
                message: "Who is the employee's manager?",
                choices: manager,
            },
        ])
        .then((answer) => {
            const sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            const value = [
                answer.first_name,
                answer.last_name,
                answer.role_id,
                answer.manager_id,
            ];
            connection.query(sql, value, (error) => {
                if (error) {
                    console.error(error);
                    return;
                }
                console.log("Employee added.");
                start();
            });
        })
        .catch((error) => {
            console.error(error);
        });
}
);
});
}

// Function to add a manager
function addManager() {
    const queryDepartment = "SELECT * FROM departments";
    const queryEmployee = "SELECT * FROM employees";
    connection.query(queryDepartment, (err, resDepartment) => {
        if (err) throw err;
        connection.query(queryEmployee, (err, resEmployee) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "department",
                        type: "input",
                        message: "What is the department?",
                    },
                    {
                        name: "employee",
                        type: "input",
                        message: "Select the employee to add a manager to:",
                    },
                    {
                        name: "manager",
                        type: "list",
                        message: "Select the employee's manager:",
                        choices: resEmployee.map((employee) => employee.first_name),
                    },
                ])
                .then((answer) => {
                    const department = resDepartment.find(
                        (department) => department.department_name === answer.department
                    );
                    const employee = resEmployee.find(
                        (employee) => employee.first_name === answer.employee
                    );
                    const manager = resEmployee.find(
                        (employee) => employee.first_name === answer.manager
                    );
                    const query = 
                    "UPDATE employees SET manager_id = ? WHERE id = ? AND role_id IN (SELECT id FROM roles WHERE department_id = ?)";
                    connection.query(
                        query,
                        [manager.id, employee.id, department.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log("Manager added, to employee, in department.");
                            start();
                        }
                    );
                }
                );
        }
        );
    }
    );
}

// Function to update an employee's role
function updateEmployeeRole() {
    const queryEmployee = "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee JOIN roles ON employee.role_id = roles.id";
    const queryRole = "SELECT * FROM roles";
    connection.query(queryEmployee, (err, resEmployee) => {
        if (err) throw err;
        connection.query(queryRole, (err, resRole) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "employee",
                        type: "list",
                        message: "Select the employee to update:",
                        choices: resEmployee.map((employee) => employee.name),
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "Select the employee's new role:",
                        choices: resRole.map((role) => role.title),
                    },
                ])
                .then((answer) => {
                    const employee = resEmployee.find(
                        (employee) => employee.name === answer.employee
                    );
                    const role = resRole.find((role) => role.title === answer.role);
                    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
                    connection.query(
                        query,
                        [role.id, employee.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log("Employee role updated.");
                            start();
                        }
                    );
                }
                );
        }
        );
    }
    );
}

// Function to to view employees by manager
function viewEmployeesByManager() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id ORDER BY manager;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        const viewEmployeesByManager = res.reduce((acc, cur) => {
            const managerName = cur.manager;
            if (!acc[managerName]) {
                acc[managerName].push(cur);
            } else {
                acc[managerName] = [cur];
            }
            return acc;
        }, {});
        console.log(viewEmployeesByManager);
        for (const managerName in viewEmployeesByManager) {
            console.log(`n${managerName}`);
            const employees = viewEmployeesByManager[managerName];
            employees.forEach((employee) => {
                console.log(
                    `${employee.first_name} ${employee.last_name} | ${employee.title} | ${employee.department} | ${employee.salary} | ${employee.manager}`
                );
            });
        }
        start();
    }
    );
}

// Function to view employees by department
function viewEmployeesByDepartment() {
    const query = `SELECT department.department_name, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id ORDER BY department_name ASC;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\nEmployees by Department:");
        console.table(res);
        start();
    }
    );
}

// Function to delete departments roles employees
function deleteDepartmentRoleEmployee() {
    inquirer
        .prompt([
            {
                name: "delete",
                type: "list",
                message: "What would you like to delete?",
                choices: ["Department", "Role", "Employee"],
            },
        ])
        .then((answer) => {
            switch (answer.delete) {
                case "Department":
                    deleteDepartment();
                    break;
                case "Role":
                    deleteRole();
                    break;
                case "Employee":
                    deleteEmployee();
                    break;
                default:
                    console.log(`Invalid action: ${answer.delete}`);
                    start();
                    break;
            }
        }
        );
}

// Function to delete employees
function deleteEmployee() {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        const employeeList = res.map((employee) => employee.name);
    });
        employeeList.push({ name: "Go Back", value: "back" });
        inquirer
            .prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Select the employee to delete:",
                    choices: employeeList,
                },
            ])
            .then((answer) => {
                if (answer.id === "back") {
                    deleteDepartmentRoleEmployee();
                    return;
                }
                const query = "DELETE FROM employee WHERE id = ?";
                connection.query(query, [answer.id], (err, res) => {
                    if (err) throw err;
                    console.log("Employee deleted.");
                    start();
                }
                );
            }
            );
}

// Function to delete roles
function deleteDepartment() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        const departmentChoices = res.map((department) => ({
            name: department.department_name,
            value: department.id,
        }));
        inquirer
            .prompt({
                type: "list",
                name: "departmentId",
                message: "Which department do you want to delete?",
                choices: [
                    ...departmentChoices,
                    { name: "Go Back", value: "back" },
                ],
            })
            .then((answer) => {
                if (answer.departmentId === "back") {
                    deleteDepartmentsRolesEmployees();
                } else {
                    const query = "DELETE FROM departments WHERE id = ?";
                    connection.query(
                        query,
                        [answer.departmentId],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Deleted department with ID ${answer.departmentId} from the database!`
                            );
                            start();
                        }
                    );
                }
            });
    });
}

// Function to view total utilized budget of a department
function viewTotalUtilizedBudgetOfDepartment() {
    const query = `SELECT * FROM departments`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        const departmentChoices = res.map((department) => ({
            name: department.department_name,
            value: department.id,
        }));
        inquirer
            .prompt({
                type: "list",
                name: "departmentId",
                message: "Which department do you want to view total salary for?",
                choices: departmentChoices,
            })
            .then((answer) => {
                const query = `SELECT department.name AS department, SUM(roles.salary) AS total_salary FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id WHERE department.id = ? GROUP BY department.name;`;
                connection.query(query, [answer.departmentId], (err, res) => {
                    if (err) throw err;
                    const totalSalary = res[0].total_salary;
                    console.log(
                        `The total salary for employees in ${answer.departmentId} is ${totalSalary}`
                    );
                    start();
                });
            });
    });
}

// close connection
process.on("exit", () => {
    connection.end();
}
);
