USE master;

-- Create database
IF DB_ID('Mat') IS NULL
    CREATE DATABASE Mat;
GO

-- Create login
IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'matuser')
    CREATE LOGIN matuser WITH PASSWORD = N'${DB_PASSWORD}';
GO

-- Create user in the database
USE Mat;
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'matuser')
    CREATE USER matuser FOR LOGIN matuser;
ALTER ROLE db_datareader ADD MEMBER matuser;
ALTER ROLE db_datawriter ADD MEMBER matuser;
GO