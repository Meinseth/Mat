FROM mcr.microsoft.com/mssql/server:2022-latest

# Accept EULA and define runtime env vars
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=""
ENV DB_PASSWORD=""

# Copy scripts
COPY setup.sql /setup.sql
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

# Use custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]