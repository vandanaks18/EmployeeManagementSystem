-- ===========================
-- EMS DATABASE SETUP
-- Run this in MySQL before starting the project
-- ===========================

CREATE DATABASE IF NOT EXISTS ems_db;
USE ems_db;

-- Table will be auto-created by Spring Boot (ddl-auto=update)
-- But if you want to create manually:

CREATE TABLE IF NOT EXISTS employees (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    department  VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    salary      DOUBLE NOT NULL,
    phone       VARCHAR(20)
);

-- Sample data to test the app
INSERT INTO employees (first_name, last_name, email, department, designation, salary, phone) VALUES
('Rahul',   'Kumar',   'rahul.kumar@ems.com',   'Engineering',     'Java Developer',      650000, '+91 9876543210'),
('Priya',   'Sharma',  'priya.sharma@ems.com',  'Human Resources', 'HR Manager',          720000, '+91 9876543211'),
('Arjun',   'Mehta',   'arjun.mehta@ems.com',   'Finance',         'Financial Analyst',   580000, '+91 9876543212'),
('Sneha',   'Patel',   'sneha.patel@ems.com',   'Marketing',       'Marketing Lead',      610000, '+91 9876543213'),
('Vikram',  'Singh',   'vikram.singh@ems.com',  'Engineering',     'Senior Developer',    900000, '+91 9876543214');
