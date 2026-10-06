CREATE DATABASE normalization_db;
USE normalization_db;

-- TASK1
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50),
    trainer_name VARCHAR(50)
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50),
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);


INSERT INTO courses VALUES (101, 'Java', 'Ravi'),(102, 'Python', 'Karthik');

INSERT INTO students VALUES
(1, 'Arun', 101),
(2, 'Bala', 101),
(3, 'Kumar', 102),
(4, 'Priya', 101),
(5, 'Divya', 102);

-- TASK2

-- TASK 2 - INNER JOIN

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    salary INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

INSERT INTO departments VALUES
(10, 'IT'),
(20, 'HR'),
(30, 'Finance'),
(40, 'Marketing');

INSERT INTO employees VALUES
(1, 'Arun', 45000, 10),
(2, 'Bala', 35000, 20),
(3, 'Kumar', 55000, 10),
(4, 'Priya', 40000, 30);

-- INNER JOIN QUERY

SELECT
    e.employee_id,
    e.employee_name,
    e.salary,
    d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id;



