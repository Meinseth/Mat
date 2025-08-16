#!/bin/bash
# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait until SQL Server is ready
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1" &>/dev/null; do
  echo "Waiting for SQL Server to start..."
  sleep 2
done

# Run DB setup script with dynamic password
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -v DB_PASSWORD="'$DB_PASSWORD'" -i /setup.sql

# Keep SQL Server running
wait