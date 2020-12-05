DROP DATABASE IF EXISTS personnel_tracker_db;

CREATE DATABASE IF NOT EXISTS personnel_tracker_db;

USE personnel_tracker_db;

DROP TABLE IF EXISTS department;

DROP TABLE IF EXISTS role;

DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id INT NOT NULL,
    PRIMARY KEY (id),
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
);