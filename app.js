var mysql = require("mysql");
var inquirer = require("inquirer");
// var pword = process.env.SQL_PASSWORD
require('dotenv').config();
var clear = require('clear');




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



connection.connect(function (err) {
    if (err) throw err;
    console.log(`\x1b[32m`, '...................................')
    console.log(`\x1b[32m`, 'WELCOME TO THE APPRENTICE MANSION!')
    console.log(`\x1b[32m`, '...................................')
    runSearch1();
})



function runSearch1() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by Department",
                "View all employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "QUIT-YOU QUITTER"
            ]
        })

        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    viewEmp();
                    break;

                case "View all employees by Department":
                    viewEmpDep();
                    break;

                case "View all employees by Manager":
                    viewEmpMan();
                    break;

                case "Add Employee":
                    addEmp();
                    break;

                case "Remove Employee":
                    removeEmp();
                    break;

                case "Update Employee Role":
                    updateEmpRole();
                    break;
                case "Update Employee Manager":
                    updateEmpManager();
                    break;
                case "QUIT-YOU QUITTER":
                    byeee();
                    break;
            }


            function viewEmp() {
                console.log(`\x1b[32m`, '...................................')
                console.log(`\x1b[32m`, 'HERE ARE THE SURVIVING EMPLOYEES')
                console.log(`\x1b[32m`, '...................................')

                connection.query("SELECT * FROM employee2", function (err, res) {
                    if (err) throw err;
                    clear()
                    console.table(res)
                    runSearch1()
                })
            }


            function viewEmpDep() {
                console.log(`\x1b[32m`, '...................................')
                console.log(`\x1b[32m`, 'HERE ARE THE EMPLOYEES BY DEPARTMENT')
                console.log(`\x1b[32m`, '...................................')
                inquirer
                    .prompt({
                        name: "action",
                        type: "rawlist",
                        message: "Which department would you like to look through?",
                        choices: [
                            "Management",
                            "Human Resources",
                            "Marketing",
                            "Legal",
                            "Finance",
                            "Engineering",
                            "Sales"
                        ]
                    })
                    .then(function (answer) {


                        var query = " SELECT * FROM apprentice.employee2 WHERE ? ";
                        connection.query(query, { department_name: answer.action }, function (err, res) {
                            if (err) throw err;
                            clear()
                            console.table(res)
                            runSearch1()
                        });
                    });
            }




            function viewEmpMan() {
                console.log(`\x1b[32m`, '...................................')
                console.log(`\x1b[32m`, 'HERE ARE EMPLOYEES BY MANAGER!')
                console.log(`\x1b[32m`, '...................................')
                clear()
                inquirer
                    .prompt({
                        name: "action",
                        type: "rawlist",
                        message: "Which manager are you wanting to stalk?",

                        choices: ["Kali Mah: Senior Manager",
                            "Richard Swett: Human Resources",
                            "Janice Keihanaikukauakahihuliheekahaunaele: Marketing Manager",
                            "Rollo Koster: Legal Manager",
                            "Kash Rehster: Financial Manager",
                            "Lord Brain: Engineering Manager",
                            "Gowen Geter: Sales Manager"]

                    }).then(function (answer) {


                        connection.query("SELECT * FROM apprentice.employee2 WHERE ?", { manager: answer.action }, function (err, res) {
                            if (err) throw err;
                            clear()

                            console.table(res)
                            runSearch1()

                        });
                    });



            }


            function addEmp() {
                console.log(`\x1b[32m`, '...................................')
                console.log(`\x1b[32m`, 'BEGIN CREATING YOUR NEW EMPLOYEE!')
                console.log(`\x1b[32m`, '...................................')
                inquirer
                    .prompt([
                        {
                            name: "firstName",
                            type: "input",
                            message: "Employees First Name:"
                        },
                        {
                            name: "lasttName",
                            type: "input",
                            message: "Employees Last Name:"
                        },

                        {
                            name: "title",
                            type: "input",
                            message: "Employee Job Title:"
                        },
                        {
                            name: "department",
                            type: "rawlist",
                            message: "Employee Department:",
                            choices: [
                                "Management",
                                "Human Resources",
                                "Marketing",
                                "Legal",
                                "Finance",
                                "Engineering",
                                "Sales"
                            ]
                        },
                        {
                            name: "salary",
                            type: "rawlist",
                            message: "Employee Salary:",
                            choices: [
                                "50000",
                                "60000",
                                "65000",
                                "70000",
                                "80000",
                                "90000",
                                "100000"
                            ]
                        },
                        {
                            name: "manager",
                            type: "rawlist",
                            message: "Employee Manager:",

                            choices: ["Kali Mah: Senior Manager",
                                "Richard Swett: Human Resources",
                                "Janice Keihanaikukauakahihuliheekahaunaele: Marketing Manager",
                                "Rollo Koster: Legal Manager",
                                "Kash Rehster: Financial Manager",
                                "Lord Brain: Engineering Manager",
                                "Gowen Geter: Sales Manager"]

                        }]

                    ).then(function (answer) {
                        connection.query("INSERT INTO employee2 SET ?",
                            {
                                first_name: answer.firstName,
                                last_name: answer.lasttName,
                                title: answer.title,
                                department_name: answer.department,
                                salary: answer.salary,
                                manager: answer.manager

                            }, function (err, res) {
                                if (err) throw err;
                                clear()
                                viewEmp()

                            })
                    })

            }


            function removeEmp() {
                clear()
                console.log(`\x1b[32m`, '...................................')
                console.log(`\x1b[32m`, 'YOURE FIRED!')
                console.log(`\x1b[32m`, '...................................')
                inquirer
                    .prompt(
                        {
                            name: "delete",
                            type: "input",
                            message: "Employees ID:"
                        }
                    ).then(function (answer) {

                        connection.query(
                            "DELETE FROM employee2 WHERE ?",
                            {
                                id: answer.delete
                            },
                            function (err, res) {
                                if (err) throw err;
                                console.log(`\x1b[32m`, '...................................')
                                console.log(`\x1b[32m`, 'YOURE FIRED!')
                                console.log(`\x1b[32m`, '...................................')

                                viewEmp()

                            }
                        );
                    })

            }


            function updateEmpRole() {
                clear()
                inquirer
                    .prompt([
                        {
                            name: "updRole",
                            type: "input",
                            message: "Employees ID:"
                        },
                        {
                            name: "title",
                            type: "input",
                            message: "Employee NEW Job Title:"
                        }]
                    )
                    .then(function (answer) {

                        connection.query(
                            `UPDATE employee2 SET title = '${answer.title}' WHERE id = '${answer.updRole}'`,

                            function (err, res) {
                                if (err) throw err;
                                console.log(`\x1b[32m`, '...................................')
                                console.log(`\x1b[32m`, 'YOURE FIRED!')
                                console.log(`\x1b[32m`, '...................................')

                                viewEmp()

                            }
                        );
                    })


            }
            function updateEmpManager() {

                clear()
                inquirer
                    .prompt([
                        {
                            name: "updMan",
                            type: "input",
                            message: "Employees ID:"
                        },
                        {
                            name: "manager",
                            type: "rawlist",
                            message: "Employees new manager?",

                            choices: ["Kali Mah: Senior Manager",
                                "Richard Swett: Human Resources",
                                "Janice Keihanaikukauakahihuliheekahaunaele: Marketing Manager",
                                "Rollo Koster: Legal Manager",
                                "Kash Rehster: Financial Manager",
                                "Lord Brain: Engineering Manager",
                                "Gowen Geter: Sales Manager"]
                        }
                    ]
                    ).then(function (answer) {

                        connection.query(
                            `UPDATE employee2 SET manager = '${answer.manager}' WHERE id = '${answer.updMan}'`,

                            function (err, res) {
                                if (err) throw err;


                                viewEmp()

                            }
                        );
                    })

            }
            function byeee() {
                connection.end();

            }


        })
}