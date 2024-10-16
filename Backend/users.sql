CREATE DATABASE user_auth;

USE user_auth;

CREATE TABLE users (
    id INT AUTO_INCREMNT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(12),
    email VARCHAR(100) UNIQUE
    password VARCHAR(255),
    profile_photo VARCHAR(255),
    terms_and_conditions BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
