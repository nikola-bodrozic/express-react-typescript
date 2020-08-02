CREATE database sampledb;

USE sampledb;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
)  ENGINE=INNODB;

INSERT INTO tasks VALUES (1, 'get milk');