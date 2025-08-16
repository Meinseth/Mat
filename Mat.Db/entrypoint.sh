#!/bin/bash
# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait until SQL Server is ready
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1" &>/dev/null; do
  echo "Waiting for SQL Server to start..."
  sleep 2
done

# Check if the user already exists
USER_EXISTS=$(/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -h -1 -Q "SELECT COUNT(*) FROM sys.sql_logins WHERE name = 'matuser'" | tr -d '[:space:]')

if [ "$USER_EXISTS" = "0" ]; then
    echo "Running DB setup script..."
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -v DB_PASSWORD="'$DB_PASSWORD'" -i /setup.sql
else
    echo "DB setup already done, skipping..."
fi

# Keep SQL Server running
wait