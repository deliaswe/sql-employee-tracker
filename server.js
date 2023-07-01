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