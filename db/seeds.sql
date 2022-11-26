USE employee_DB;

INSERT INTO department (id, name) VALUES
(1, "Legal"),
(2, "Finance"), 
(3, "Information Technology"), 
(4, "Marketing");

INSERT INTO Role (id, title, salary, department_id) VALUES
(1, "Partner", 300000, 1),
(2, "Lawyer", 120000, 1),
(3, "Legal assistant", 55000, 1),
(4, "Finance manager.", 110000, 2),
(5, "Financial analyst", 75000, 2),
(6, "Network administrator", 55000, 3),
(7, "Service desk analyst", 50000, 3),
(8, "Marketing specialist", 60000, 4);

INSERT INTO Employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, "Sebastian","Lane",1, NULL),
(2, "Jenson","Robertson",2, 1),
(3, "Anastasia","Dickson",3, 1),
(4, "Dane","Kane",4, NULL),
(5, "James","Rose",5, 4),
(6, "Spencer ","Howard",6, NULL),
(7, "Harry","James",7, NULL),
(8, "Ronald","Bedard",7, NULL),
(9, "Gillian","Harder",8, NULL),
(10, "Helene","Lawson",8, NULL);
