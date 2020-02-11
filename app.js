var mysql = require("mysql");
var inquirer = require("inquirer");
// var pword = process.env.SQL_PASSWORD
require('dotenv').config();


// console.log(process.env)

var connection = mysql.createConnection({
    host: process.env.DB_HOST,

    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: process.env.DB_USER,
  
    // Your password
    password: process.env.DB_PASS,
    database: "apprentice"
});

connection.connect( function(err) {
    if (err) throw err;
    console.log('connected!')
})