FROM mcr.microsoft.com/mssql/server:2022-latest

# Copy setup scripts into the image
COPY setup.sql /setup.sql
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]