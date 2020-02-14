CREATE DATABASE apprentice;

USE apprentice;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  
  PRIMARY KEY (id)
);

CREATE TABLE manager (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  title VARCHAR(30) NULL,
  department_name VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);



INSERT INTO role (title, salary, department_id) values ('Project Manager', 'Kim Possible', 1);

INSERT INTO employee2 (first_name, last_name, title, department_name ,salary, manager) values ('Kali', 'Mah',"Head Meownager","Dis Mah Cats Depawtment",100000 , 'Cat Ma Kayla' );


INSERT INTO manager (first_name, last_name, title, department_name ,salary) values ('Rollo', 'Koster',"Legal Manager","Legal", 500000 );
INSERT INTO manager (first_name, last_name, title, department_name ,salary) values ('Gowen', 'Geter',"Sales Manager","Sales", 160000 );

