using System.Text.Json.Serialization;
using Mapster;
using Mat.Endpoints;
using Mat.Mappings;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MatDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddMapster();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "MatAPI";
    config.Title = "MatAPI v1";
    config.Version = "v1";
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5001") // frontend origin
                .AllowAnyMethod()
                .AllowAnyHeader();
        }
    );
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

var app = builder.Build();

MappingConfig.RegisterMappings();

app.UseOpenApi();
app.UseSwaggerUi(config =>
{
    config.DocumentTitle = "MatAPI";
    config.Path = "/swagger";
    config.DocumentPath = "/swagger/{documentName}/swagger.json";
    config.DocExpansion = "list";
});

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MatDbContext>();
    db.Database.Migrate(); // Applies migrations automatically
}

app.AddRecipesEndpoints();
app.AddRecipeEndpoints();
app.UseCors("AllowFrontend");
app.Run();
