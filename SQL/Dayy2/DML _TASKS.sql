
CREATE DATABASE student_db;
USE student_db;

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT,
    department VARCHAR(20),
    city VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- TASK1
INSERT INTO students (name, age, department, city) VALUES ('Ravi', 22, 'CSE', 'Chennai');

-- TASK2
INSERT INTO students (name, age, department, city)
VALUES
("Arun", 23, "IT", "Madurai"),
("Bala", 21, "ECE", "Chennai"),
("Priya", 24, "CSE", "Coimbatore");

-- TASK3
UPDATE students SET city = "Bangalore" WHERE id = 2;
 
-- TASK4
UPDATE students SET age = 25 WHERE id = 3;

-- TASK5
UPDATE students SET age = 24, department = 'IT', city = 'Chennai'
WHERE id = 1;

-- TASK6
UPDATE studentsSET city = 'Madurai'
WHERE department = 'CSE';

-- TASK7
DELETE FROM students
WHERE id = 4;

-- TASK8
DELETE FROM students
WHERE city = 'Salem';

-- TASK9
UPDATE students
SET city = 'Bangalore'
WHERE id = 2;

SELECT id, name, city, updated_at
FROM students
WHERE id = 2;

-- TASK10

INSERT INTO students (name, age, department, city)
VALUES ('Karthik', 22, 'CSE', 'Chennai');

INSERT INTO students (name, age, department, city)
VALUES
('Suresh', 23, 'IT', 'Madurai'),
('Divya', 21, 'ECE', 'Coimbatore');

UPDATE students
SET city = 'Bangalore'
WHERE id = 5;

UPDATE students
SET age = 25,
    department = 'IT'
WHERE id = 6;

DELETE FROM students
WHERE id = 7;



