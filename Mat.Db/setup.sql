-- Create database if it doesn't exist
IF DB_ID('Mat') IS NULL
    CREATE DATABASE Mat;
GO

-- Create login if not exists
IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'matuser')
BEGIN
    DECLARE @sql NVARCHAR(MAX) = 'CREATE LOGIN matuser WITH PASSWORD = $(DB_PASSWORD);';
    EXEC sp_executesql @sql;
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