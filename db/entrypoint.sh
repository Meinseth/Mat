#!/bin/bash
# Start SQL Server in background
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to be ready
sleep 15

# Run SQL commands using env variables from Portainer
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "
IF DB_ID('Mat') IS NULL
    CREATE DATABASE Mat;
USE Mat;
IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'matuser')
    CREATE LOGIN matuser WITH PASSWORD = '${DB_PASSWORD}';
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'matuser')
BEGIN
    CREATE USER matuser FOR LOGIN matuser;
    ALTER ROLE db_datareader ADD MEMBER matuser;
    ALTER ROLE db_datawriter ADD MEMBER matuser;
END
"
# Keep container running
wait