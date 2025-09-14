using System.Text.Json.Serialization;
using Mapster;
using Mat.Database;
using Mat.Endpoints;
using Mat.Mappings;
using Mat.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

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
var frontendBaseUrl =
    builder.Configuration["Frontend:BaseUrl"]
    ?? throw new InvalidOperationException("Missing Frontend BaseUrl");
builder.Services.AddAuthorization();
builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie(
        CookieAuthenticationDefaults.AuthenticationScheme,
        opts =>
        {
            opts.Cookie.HttpOnly = true;
            opts.Cookie.SameSite = SameSiteMode.Strict;
            opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        }
    )
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
            options.CallbackPath = "/api/auth/callback";
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = $"{builder.Configuration["Authority"]}/",
                ValidateAudience = false, // we don’t care about audience here
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(2),
            };
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

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    // Tell ASP.NET Core which X‑Forwarded‑* headers we care about
    options.ForwardedHeaders = ForwardedHeaders.XForwardedProto | ForwardedHeaders.XForwardedFor;
    options.KnownProxies.Clear(); // removes any previously added IPs
    options.KnownNetworks.Clear(); // removes any previously added CIDRs
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
app.UseForwardedHeaders();
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();
app.AddRecipesEndpoints();
app.AddRecipeEndpoints();
app.AddAuthEndpoints(frontendBaseUrl);
app.AddUserEndpoints();
app.MapGet(
    "api/debug/forwarded",
    (HttpContext ctx) =>
    {
        var result = new
        {
            Scheme = ctx.Request.Scheme,
            RemoteIp = ctx.Connection.RemoteIpAddress?.ToString(),
            Headers = ctx
                .Request.Headers.Where(h =>
                    h.Key.StartsWith("X-Forwarded", StringComparison.OrdinalIgnoreCase)
                )
                .ToDictionary(h => h.Key, h => h.Value.ToString()),
        };
        return Results.Json(result);
    }
);
app.Run();
