-- Create database if not exists
IF DB_ID('Mat') IS NULL
    CREATE DATABASE Mat;
GO

-- Create login (placeholder for password)
IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'matuser')
BEGIN
    CREATE LOGIN matuser WITH PASSWORD = '{{DB_PASSWORD}}';
END
GO

-- Map login to database user
USE Mat;
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'matuser')
BEGIN
    CREATE USER matuser FOR LOGIN matuser;
    ALTER ROLE db_datareader ADD MEMBER matuser;
    ALTER ROLE db_datawriter ADD MEMBER matuser;
END
GO