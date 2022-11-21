USE employee_DB;

INSERT INTO department (id, name) VALUES
(1, "Legal"),
(2, "Finance"), 
(3, "Information Technology"), 
(4, "Marketing");

INSERT INTO Role (id, title, salary, department_id) VALUES
(1, "Partner", 3000000, 1),
(2, "Lawyer", 120000, 1),
(3, "Legal assistant", 55000, 1),
(4, "Finance manager.", 110000, 2),
(5, "Financial analyst", 75000, 2),
(6, "Network administrator", 55000, 3),
(7, "Service desk analyst", 50000, 3),
(8, "Marketing specialist", 60000, 4);

INSERT INTO Employee (first_name, last_name, role_id) VALUES
("Sebastian","Lane",1),
("Jenson","Robertson",1),
("Anastasia","Dickson",1),
("Dane","Kane",2),
("James","Rose",2),
("Spencer ","Howard",3),
("Harry","James",3),
("Ronald","Bedard",3),
("Gillian","Harder",4),
("Helene","Lawson",4);
