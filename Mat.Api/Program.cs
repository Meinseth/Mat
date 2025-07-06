using Mat.Endpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MatDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "MatAPI";
    config.Title = "MatAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "MatAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });

    // Redirect "/" to Swagger UI in development
    app.MapGet(
        "/",
        context =>
        {
            context.Response.Redirect("/swagger");
            return Task.CompletedTask;
        }
    );
}
else
{
    // Optional: Add a different root route in production
    app.MapGet("/", () => "API is running.");
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MatDbContext>();
    db.Database.Migrate(); // Applies migrations automatically
}

app.AddRecipesEndpoints();

app.Run();
