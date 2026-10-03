CREATE DATABASE employee_db;

DROP TABLE IF EXISTS employees;
USE employee_db;

CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    salary INT,
    age INT,
    department VARCHAR(30),
    city VARCHAR(30)
);

INSERT INTO employees (name, salary, age, department, city)
VALUES
('Tabasiya', 45000, 26, 'IT', 'Chennai'),
('Sameera', 38000, 29, 'HR', 'Madurai'),
('Fousiya', 52000, 31, 'IT', 'Salem'),
('Aslambasha', 42000, 27, 'Finance', 'Chennai'),
('Archana', 35000, 25, 'Sales', 'Chennai'),
('Suba', 48000, 30, 'IT', NULL),
('Pavithra', 40000, 28, 'Finance', 'Madurai'),
('Surya', 55000, 29, 'HR', 'Chennai'),
('Divya', 36000, 24, 'Sales', 'Salem'),
('Fathima', 30000, 32, 'IT', NULL);


SELECT * FROM employees;

SELECT name,salary,city FROM employees;

SELECT * FROM employees WHERE city='chennai';

SELECT * FROM employees WHERE salary > 45000;

SELECT * FROM employees  WHERE age < 28;

SELECT * FROM employees WHERE salary >= 40000;

SELECT * FROM employees WHERE department != 'HR';

SELECT * FROM employees WHERE department = 'IT' AND city = 'Chennai';

SELECT * FROM employees WHERE city = 'Chennai' OR city = 'Madurai'; 

SELECT * FROM employees WHERE salary > 40000 AND age < 30; 

SELECT * FROM employees WHERE city IN ('Chennai', 'Madurai', 'Salem');  

SELECT * FROM employees WHERE department NOT IN ('IT', 'HR');

SELECT * FROM employees WHERE city IS NULL;

SELECT * FROM employees WHERE city IS NOT NULL;

SELECT * FROM employees WHERE salary BETWEEN 35000 AND 50000;

SELECT *
FROM employees WHERE age BETWEEN 25 AND 30 AND city = 'Chennai';

SELECT *FROM employees WHERE name LIKE 'A%';

SELECT *FROM employees WHERE name LIKE '%vi%';

SELECT DISTINCT department FROM employees;

SELECT name AS employee_name,department AS department_name,salary AS monthly_salary FROM employees;