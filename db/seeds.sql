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
('Software Engineer', 120000.00, 2),
('Accountant', 125000.00, 3),
('Lawyer', 190000.00, 4),
('Lead Marketer', 130000.00, 5),
('IT Manager', 150000.00, 6),
('IT Support', 100000.00, 6),
('Customer Service Manager', 120000.00, 7),
('Customer Service Representative', 90000.00, 7),
('Research and Development Manager', 150000.00, 8),
('Research and Development Associate', 100000.00, 8),
('Human Resources Manager', 150000.00, 9);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Jeff', 'Bezos', 1, 1),
('Larry', 'Page', 2, 1),
('Elon', 'Musk', 3, 2),
('Sergey', 'Brin', 4, 2),
('Bill', 'Gates', 5, 3),
('Steve', 'Ballmer', 6, 3),
('Mark', 'Zuckerberg', 7, 4),
('Rob', 'Walton', 8, 8),
('Jack', 'Dorsey', 9, 8),
('Bobby', 'Murphy', 10, 9),
('Michael', 'Dell', 11, 9);