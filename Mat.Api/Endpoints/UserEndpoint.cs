using System.Security.Claims;
using Mapster;
using Mat.Database;
using Mat.Database.Model;
using Mat.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Mat.Endpoints;

public static class UserEndpoint
{
    public static void AddUserEndpoints(this IEndpointRouteBuilder app)
    {
        var userGroup = app.MapGroup("/api/user/");

        userGroup
            .MapGet(
                "me",
                async (HttpContext httpContext, MatDbContext db) =>
                {
                    if (!httpContext.User.Identity?.IsAuthenticated ?? true)
                        return Results.Unauthorized();

                    var claims = httpContext.User.Claims;

                    var username = claims
                        .FirstOrDefault(c => c.Type == "preferred_username")
                        ?.Value;

                    if (username is null)
                        return Results.BadRequest("Missing claims");

                    var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

                    if (user is null)
                    {
                        user = new User
                        {
                            Username = username!,
                            Email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                            FirstName = claims
                                .FirstOrDefault(c => c.Type == ClaimTypes.GivenName)
                                ?.Value,
                            LastName = claims
                                .FirstOrDefault(c => c.Type == ClaimTypes.Surname)
                                ?.Value,
                        };

                        db.Users.Add(user);
                        await db.SaveChangesAsync();
                    }

                    return Results.Ok(user.Adapt<UserDto>());
                }
            )
            .Produces<UserDto>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status401Unauthorized);
    }
}
