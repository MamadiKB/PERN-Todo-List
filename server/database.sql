CREATE DATABASE testtodo;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    status CHAR(2) DEFAULT 0
);
