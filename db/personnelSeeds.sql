USE personnel_tracker_db;

INSERT INTO department (dept_name) VALUES ("Basketball"), ("Boxing"), ("Spirits"), ("Marketing"), ("Product Development"), ("Fashion");


INSERT INTO role (title, salary, dept_id) VALUES ("Power Forward", "900000", "1"), ("Boxer", "700000", "2"), ("Chief Distiller", "250000", "3"), ("Director", "300000", "4"), ("Engineer", "120000", "5"), ("Designer", "90000", "6");


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brick", "Shooter", "1", "2"), ("Floyd", "Mayweather", "2", "3"), ("Andy", "Brandy", "3", "4"), ("Ashanti", "Dior", "4", "5"), ("Melinda", "Ruiz", "5", "6"), ("Tyrone", "Jackson", "6", "1");


