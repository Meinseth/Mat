using Mapster;
using Mat.Database;
using Mat.Dtos;
using Mat.Services;
using Microsoft.EntityFrameworkCore;

namespace Mat.Endpoints;

public static class RecipesEndpoint
{
    public static void AddRecipesEndpoints(this IEndpointRouteBuilder app)
    {
        var recipesGroup = app.MapGroup("/api/recipes/").RequireAuthorization();

        recipesGroup
            .MapGet(
                "",
                async (MatDbContext db, IUserService userService) =>
                {
                    var user = await userService.GetCurrentUserAsync();
                    if (user is null)
                        return Results.Unauthorized();

                    var recipes = await db
                        .Recipes.Where(r => r.UserId == user.Id)
                        .Include(r => r.Ingredients)
                        .ToListAsync();

                    return Results.Ok(recipes.Adapt<List<RecipeDto>>());
                }
            )
            .Produces<RecipeDto[]>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized);
    }
}
