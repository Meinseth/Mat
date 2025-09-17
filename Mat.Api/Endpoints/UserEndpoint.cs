using Mapster;
using Mat.Dtos;
using Mat.Services;

namespace Mat.Endpoints;

public static class UserEndpoint
{
    public static void AddUserEndpoints(this IEndpointRouteBuilder app)
    {
        var userGroup = app.MapGroup("/api/user/");

        userGroup
            .MapGet(
                "me",
                async (IUserService userService) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    return Results.Ok(user.Adapt<UserDto>());
                }
            )
            .Produces<UserDto>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status401Unauthorized);
    }
}
