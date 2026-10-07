CREATE DATABASE subquery_db;
USE subquery_db;

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);

INSERT INTO departments VALUES
(1, 'IT'),
(2, 'HR'),
(3, 'Finance'),
(4, 'Sales'),
(5, 'Marketing');

INSERT INTO departments VALUES
(1, 'IT'),
(2, 'HR'),
(3, 'Finance'),
(4, 'Sales'),
(5, 'Marketing');

INSERT INTO employees VALUES
(101, 'Tabasiya', 'IT', 50000),
(102, 'Saneera', 'HR', 35000),
(103, 'Achana', 'IT', 60000),
(104, 'Suvarna', 'Finance', 45000),
(105, 'Rohini', 'HR', 30000),
(106, 'Fawziya', 'Sales', 40000),
(107, 'Sheerin', 'IT', 55000),
(108, 'Ayesha', 'Finance', 48000);

-- 1
SELECT AVG (salary)FROM employees;
SELECT * FROM employees
WHERE salary > ( SELECT AVG(salary) FROM employees);

-- 2
SELECT MAX(salary) FROM employees;
SELECT * FROM employees
WHERE salary = ( SELECT MAX(salary) FROM employees );

-- 3
SELECT MIN(salary) FROM employees;
SELECT * FROM employees WHERE salary = ( SELECT MAX(salary) FROM employees );

-- 4
SELECT AVG(salary) FROM employees WHERE department = 'IT';
SELECT * FROM employees
WHERE salary > ( SELECT AVG(salary) FROM employees WHERE department = 'IT' );

-- 5
SELECT department_name FROM departments WHERE department_name IN ('IT', 'HR');
SELECT * FROM employees
WHERE department IN ( SELECT department_name FROM departments  
WHERE department_name IN ('IT', 'HR') );

-- 6
SELECT department_name FROM departments WHERE department_name = 'HR';
SELECT * FROM departments d
WHERE EXISTS ( SELECT 1 FROM employees e WHERE e.department = d.department_name );

-- 7
 
SELECT department FROM employees;
SELECT 1
FROM employees
WHERE department = 'IT';

SELECT * FROM departments d
WHERE EXISTS ( SELECT 1 FROM employees e WHERE e.department = d.department_name );

-- 8

SELECT department FROM employees;
SELECT department_name FROM departments;
SELECT * FROM departments d
WHERE NOT EXISTS ( SELECT 1 FROM employees e WHERE e.department = d.department_name );

-- 9

SELECT MAX(salary) FROM employees;
SELECT * FROM employees
WHERE salary < ( SELECT MAX(salary) FROM employees );

-- 10

SELECT department, AVG(salary) FROM employees GROUP BY department;
SELECT * FROM employees e WHERE salary > (
    SELECT AVG(salary) FROM employees WHERE department = e.department );