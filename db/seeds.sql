INSERT INTO departments (department_name) VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Marketing'),
('Information Technology'),
('Customer Service'),
('Research and Development'),
('Human Resources');

INSERT INTO roles (title, salary, department_id) VALUES 
('Sales Lead', 100000.00, 1),
('Salesperson', 80000.00, 1),
('Lead Engineer', 150000.00, 2),
('Software Engineer', 120000.00, 2),
('Accountant', 125000.00, 3),
('Legal Team Lead', 250000.00, 4),
('Lawyer', 190000.00, 4),
('Lead Marketer', 130000.00, 5),
('Marketing Associate', 100000.00, 5),
('IT Manager', 150000.00, 6),
('IT Support', 100000.00, 6),
('Customer Service Manager', 120000.00, 7),
('Customer Service Representative', 90000.00, 7),
('Research and Development Manager', 150000.00, 8),
('Research and Development Associate', 100000.00, 8),
('Human Resources Manager', 150000.00, 9),
('Human Resources Associate', 100000.00, 9);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Jeff', 'Bezos', 1, 1),
('Larry', 'Page', 2, 1),
('Elon', 'Musk', 3, 2),
('Sergey', 'Brin', 4, 2),
('Bill', 'Gates', 5, 3),
('Steve', 'Ballmer', 6, 3),
('Mark', 'Zuckerberg', 7, 4),
('Larry', 'Ellison', 8, 4),
('Carlos', 'Slim', 9, 5),
('Robert', 'Pera', 10, 5),
('Shiv', 'Nadar', 11, 6),
('Paul', 'Allen', 12, 6),
('Pierre', 'Omidyar', 13, 7),
('Jan', 'Koum', 14, 7),
('Rob', 'Walton', 15, 8),
('Jack', 'Dorsey', 16, 8),
('Bobby', 'Murphy', 17, 9),
('Michael', 'Dell', 18, 9);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
