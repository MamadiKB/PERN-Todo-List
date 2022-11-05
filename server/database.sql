CREATE DATABASE todopern;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    status CHAR(1) DEFAULT 0
);
