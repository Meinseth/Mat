FROM mcr.microsoft.com/mssql/server:2022-latest

# Environment variables (will be passed at runtime)
ENV SA_PASSWORD=""
ENV DB_PASSWORD=""
ENV ACCEPT_EULA=Y

# Copy setup scripts into the image
COPY setup.sql /setup.sql
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]