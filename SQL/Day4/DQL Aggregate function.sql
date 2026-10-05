CREATE DATABASE employee_group_db;
USE employee_group_db;

CREATE TABLE employee_group_data (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT,
    city VARCHAR(50)
);

INSERT INTO employee_group_data (name, department, salary, city) VALUES
('Arun', 'IT', 45000, 'Chennai'),
('Priya', 'IT', 50000, 'Chennai'),
('Vijay', 'IT', 60000, 'Coimbatore'),
('Kumar', 'HR', 35000, 'Bangalore'),
('Divya', 'HR', 40000, 'Bangalore'),
('Ravi', 'Finance', 55000, 'Chennai'),
('Meena', 'Finance', 60000, 'Chennai'),
('Kavya', 'Finance', 45000, 'Coimbatore'),
('Suresh', 'Sales', 30000, 'Madurai'),
('Anitha', 'Sales', 35000, 'Madurai');

-- SIMPLE

SELECT department, COUNT(*) AS employee_count FROM employee_group_data GROUP BY department;

SELECT department,sum(salary) AS total_salary FROM employee_group_data GROUP BY department;

SELECT department,avg(salary) AS avg_salary FROM employee_group_data GROUP BY department;

SELECT city, COUNT(*) AS employee_count FROM  employee_group_data GROUP BY city;

-- SIMPLE TO MODERATE

SELECT department, COUNT(*) AS employee_count FROM employee_group_data GROUP BY department HAVING COUNT(*) > 2;

SELECT department, SUM(salary) AS total_salary FROM employee_group_data GROUP BY department
HAVING SUM(salary) > 100000;

SELECT department, AVG(salary) AS average_salary FROM employee_group_data GROUP BY department
HAVING AVG(salary) > 40000;

-- MODERATE

SELECT department, COUNT(*) AS employee_count, AVG(salary) AS average_salary FROM employee_group_data
GROUP BY department HAVING COUNT(*) >= 2;

SELECT city,SUM(salary) AS total_salary,MAX(salary) AS maximum_salary
FROM employee_group_data GROUP BY city HAVING SUM(salary) > 80000;

SELECT department,COUNT(*) AS total_employees,SUM(salary) AS total_salary,AVG(salary) AS average_salary,
MIN(salary) AS minimum_salary,MAX(salary) AS maximum_salary
FROM employee_group_data GROUP BY department HAVING COUNT(*) >= 2
AND AVG(salary) > 40000 ORDER BY average_salary DESC;
