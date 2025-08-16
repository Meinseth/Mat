#!/bin/bash
set -e

# Replace placeholder in SQL script with environment variable
sed -i "s/{{DB_PASSWORD}}/${DB_PASSWORD}/g" /setup.sql

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait until SQL Server is ready
echo "Waiting for SQL Server to start..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "SELECT 1" &>/dev/null
do
  sleep 1
done

# Run SQL setup script
echo "Running setup.sql..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -i /setup.sql

# Keep SQL Server in the foreground
fg %1