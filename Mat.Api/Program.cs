using System.Text.Json.Serialization;
using Mapster;
using Mat.Database;
using Mat.Endpoints;
using Mat.Mappings;
using Mat.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new Exception("No connection string");

var dbPassword =
    builder.Configuration["DbPassword"]
    ?? throw new InvalidOperationException("Missing DbPassword");

var connectionStringWithPassword = $"{connectionString}Password={dbPassword}";

builder.Services.AddDbContext<MatDbContext>(options =>
    options.UseNpgsql(connectionStringWithPassword)
);

builder.Services.AddAuthorization();
builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddOpenIdConnect(
        OpenIdConnectDefaults.AuthenticationScheme,
        options =>
        {
            options.Authority =
                builder.Configuration["Authority"]
                ?? throw new InvalidOperationException("Missing Authority");
            options.ClientId =
                builder.Configuration["ClientId"]
                ?? throw new InvalidOperationException("Missing ClientId");
            options.ClientSecret =
                builder.Configuration["ClientSecret"]
                ?? throw new InvalidOperationException("Missing ClientSecret");

            options.ResponseType = OpenIdConnectResponseType.Code;
            options.SaveTokens = true;
            options.GetClaimsFromUserInfoEndpoint = true;
            options.Scope.Add("openid");
            options.Scope.Add("profile");
            options.Scope.Add("email");
        }
    );
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddMapster();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "MatAPI";
    config.Title = "MatAPI v1";
    config.Version = "v1";
});

var frontendBaseUrl =
    builder.Configuration["Frontend:BaseUrl"]
    ?? throw new InvalidOperationException("Missing Frontend BaseUrl");

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(frontendBaseUrl)
                .AllowCredentials()
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
    db.Database.Migrate();
}
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.AddRecipesEndpoints();
app.AddRecipeEndpoints();
app.AddAuthEndpoints(frontendBaseUrl);
app.AddUserEndpoints();
app.Run();
